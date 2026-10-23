import { NextRequest, NextResponse } from "next/server";
import {
  getRunById,
  getRegistrationCount,
  getGenderCount,
  isDuplicate,
  getNextBib,
  appendRegistration,
} from "@/lib/sheets";

const INDIAN_PHONE = /^[6-9]\d{9}$/;

// Special events that are not stored in the Runs sheet
const SPECIAL_EVENTS: Record<
  string,
  { title: string; capacity: number; status: "open" | "closed" | "soon"; week: string; maleLimit?: number; femaleLimit?: number }
> = {
  "sundowner-004": {
    title: "MNP Sundowner — Run, Jam & Kojagiri",
    capacity: 40,
    status: "open",
    week: "004",
    maleLimit: 24,
    femaleLimit: 16,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      run_id,
      name,
      whatsapp,
      email,
      instagram,
      age_group,
      gender,
      distance,
      experience,
      emergency_name,
      emergency_phone,
      source,
      waiver,
      whatsapp_optin,
      transaction_id,
      validate_only,
    } = body;

    const isSpecialEvent = run_id in SPECIAL_EVENTS;

    // Validation
    const errors: string[] = [];
    if (!run_id) errors.push("Run ID is required");
    if (!name || name.trim().length < 2) errors.push("Name is required (min 2 chars)");
    if (!whatsapp || !INDIAN_PHONE.test(whatsapp.replace(/\s/g, "")))
      errors.push("Valid Indian mobile number required");
    if (!email || !email.includes("@")) errors.push("Valid email required");

    if (isSpecialEvent) {
      // Special event validation
      if (!distance || !["Run + Jamming", "Jamming Only"].includes(distance))
        errors.push("Please select your attendance preference");
      if (!gender || !["Male", "Female"].includes(gender))
        errors.push("Gender is required");
    } else {
      // Standard run validation
      if (!age_group) errors.push("Age group is required");
      if (!distance || !["3K", "5K"].includes(distance))
        errors.push("Distance must be 3K or 5K");
      if (!experience) errors.push("Experience is required");
      if (!gender || !["Male", "Female"].includes(gender))
        errors.push("Gender is required");
    }

    if (waiver !== "true" && waiver !== true)
      errors.push("Waiver must be accepted");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    }

    // Resolve event/run config
    let capacity: number;
    let status: string;
    let week: string;

    if (isSpecialEvent) {
      const evt = SPECIAL_EVENTS[run_id];
      capacity = evt.capacity;
      status = evt.status;
      week = evt.week;
    } else {
      const run = await getRunById(run_id);
      if (!run) {
        return NextResponse.json({ error: "Run not found" }, { status: 404 });
      }
      if (run.status !== "open") {
        return NextResponse.json({ error: "Registrations are not open for this run" }, { status: 400 });
      }
      capacity = run.capacity;
      status = run.status;
      week = run.week;
    }

    if (status !== "open") {
      return NextResponse.json({ error: "Registrations are not open" }, { status: 400 });
    }

    // Check capacity
    const count = await getRegistrationCount(run_id);
    if (count >= capacity) {
      return NextResponse.json({ error: "This event is full" }, { status: 400 });
    }

    // Gender-based capacity
    if (gender) {
      let maleLimit: number;
      let femaleLimit: number;
      if (isSpecialEvent) {
        const evt = SPECIAL_EVENTS[run_id];
        maleLimit = evt.maleLimit ?? Math.floor(capacity * 0.6);
        femaleLimit = evt.femaleLimit ?? capacity - maleLimit;
      } else {
        maleLimit = Math.floor(capacity * 0.622);
        femaleLimit = capacity - maleLimit;
      }
      const genderCount = await getGenderCount(run_id, gender);
      const genderLimit = gender === "Male" ? maleLimit : femaleLimit;
      if (genderCount >= genderLimit) {
        return NextResponse.json(
          { error: `${gender} spots are full for this event. ${genderLimit} spots were available.` },
          { status: 400 }
        );
      }
    }

    // Check duplicate
    const cleanPhone = whatsapp.replace(/\s/g, "");
    const dup = await isDuplicate(run_id, cleanPhone);
    if (dup) {
      return NextResponse.json(
        { error: "You have already registered for this event with this phone number" },
        { status: 409 }
      );
    }

    // Validate-only mode: return success without saving
    if (validate_only) {
      return NextResponse.json({
        success: true,
        validated: true,
        run_id,
        week,
      });
    }

    // Assign bib
    const bib = await getNextBib(run_id);

    // Save
    await appendRegistration({
      run_id,
      bib,
      name: name.trim(),
      whatsapp: cleanPhone,
      email: email.trim(),
      instagram: (instagram || "").trim(),
      age_group: age_group || "",
      gender: gender || "",
      distance,
      experience: experience || "",
      emergency_name: (emergency_name || "").trim(),
      emergency_phone: (emergency_phone || "").replace(/\s/g, ""),
      source: source || "",
      waiver: "TRUE",
      whatsapp_optin: whatsapp_optin ? "TRUE" : "",
      transaction_id: transaction_id || "",
    });

    return NextResponse.json({
      success: true,
      bib,
      name: name.trim(),
      run_id,
      week,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

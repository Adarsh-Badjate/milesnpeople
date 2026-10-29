import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRegistrations } from "@/lib/sheets";
import earlyAttendees from "@/data/early-attendees.json";

const CURRENT_EVENT = "halloween-005";

function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allRegs = await getRegistrations();

  // Phones already registered for the current event
  const registeredPhones = new Set(
    allRegs.filter((r) => r.run_id === CURRENT_EVENT).map((r) => r.whatsapp)
  );

  // Past attendees from sheets, deduplicated by phone
  const seen = new Set<string>();
  const contacts: { name: string; firstName: string; whatsapp: string; gender: string; source: string }[] = [];

  // Add from sheets (week 3, sundowner etc.)
  for (const r of allRegs) {
    if (r.run_id === CURRENT_EVENT || !r.whatsapp || registeredPhones.has(r.whatsapp) || seen.has(r.whatsapp)) continue;
    seen.add(r.whatsapp);
    contacts.push({
      name: r.name,
      firstName: r.name.split(" ")[0],
      whatsapp: r.whatsapp,
      gender: r.gender,
      source: `Week ${r.run_id}`,
    });
  }

  // Add from early attendees CSV (week 1 & 2)
  for (const ea of earlyAttendees as { name: string; whatsapp: string }[]) {
    if (!ea.whatsapp || registeredPhones.has(ea.whatsapp) || seen.has(ea.whatsapp)) continue;
    seen.add(ea.whatsapp);
    contacts.push({
      name: ea.name,
      firstName: ea.name.split(" ")[0],
      whatsapp: ea.whatsapp,
      gender: "",
      source: "Week 1/2",
    });
  }

  return NextResponse.json({
    total: contacts.length,
    alreadyRegistered: registeredPhones.size,
    contacts,
  });
}

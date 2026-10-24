import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRegistrations } from "@/lib/sheets";

function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allRegs = await getRegistrations();

  // Phones already registered for sundowner
  const sundownerPhones = new Set(
    allRegs.filter((r) => r.run_id === "sundowner-004").map((r) => r.whatsapp)
  );

  // Past attendees not yet registered for sundowner, deduplicated by phone
  const seen = new Set<string>();
  const contacts = allRegs
    .filter((r) => r.run_id !== "sundowner-004" && r.whatsapp && !sundownerPhones.has(r.whatsapp))
    .filter((r) => {
      if (seen.has(r.whatsapp)) return false;
      seen.add(r.whatsapp);
      return true;
    })
    .map((r) => ({
      name: r.name,
      firstName: r.name.split(" ")[0],
      whatsapp: r.whatsapp,
      gender: r.gender,
      run_id: r.run_id,
    }));

  return NextResponse.json({
    total: contacts.length,
    alreadyRegistered: sundownerPhones.size,
    contacts,
  });
}

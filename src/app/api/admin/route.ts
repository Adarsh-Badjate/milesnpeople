import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRegistrations, getRuns, updateCheckedIn } from "@/lib/sheets";

function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runId = req.nextUrl.searchParams.get("runId") || undefined;
  const [registrations, runs] = await Promise.all([
    getRegistrations(runId),
    getRuns(),
  ]);

  return NextResponse.json({ registrations, runs });
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json();

  // Login
  if (body.action === "login") {
    if (body.password === process.env.ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_token", process.env.ADMIN_PASSWORD!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return res;
    }
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check-in toggle
  if (body.action === "checkin") {
    await updateCheckedIn(body.runId, body.bib, body.checkedIn);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

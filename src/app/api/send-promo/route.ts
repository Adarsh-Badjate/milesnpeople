import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRegistrations } from "@/lib/sheets";
import { generateSundownerPromoHTML, sendTicketEmail } from "@/lib/email";

function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

// GET: Preview — show who would receive the promo
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all past registrations (from the main Registrations sheet, not Sundowner 004)
  const excludeRunId = req.nextUrl.searchParams.get("exclude") || "sundowner-004";
  const allRegs = await getRegistrations();

  // Unique emails from past events, excluding current sundowner registrations
  const sundowerEmails = new Set(
    allRegs.filter((r) => r.run_id === excludeRunId).map((r) => r.email.toLowerCase())
  );

  const pastRegs = allRegs.filter(
    (r) => r.run_id !== excludeRunId && r.email && !sundowerEmails.has(r.email.toLowerCase())
  );

  // Deduplicate by email
  const seen = new Set<string>();
  const unique = pastRegs.filter((r) => {
    const email = r.email.toLowerCase();
    if (seen.has(email)) return false;
    seen.add(email);
    return true;
  });

  return NextResponse.json({
    totalPastRegistrations: pastRegs.length,
    uniqueEmails: unique.length,
    alreadyRegisteredForSundowner: sundowerEmails.size,
    recipients: unique.map((r) => ({
      name: r.name,
      email: r.email,
      run_id: r.run_id,
    })),
  });
}

// POST: Send promo emails
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { dryRun = true, testEmail } = body as {
    dryRun?: boolean;
    testEmail?: string;
  };

  const subject = "You ran with us. Now jam with us. Sunday, 25 Oct.";

  // Test mode: send to a single email
  if (testEmail) {
    const html = generateSundownerPromoHTML(testEmail.split("@")[0]);
    try {
      await sendTicketEmail(testEmail, subject, html);
      return NextResponse.json({
        success: true,
        message: `Test promo email sent to ${testEmail}`,
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to send test email", details: String(err) },
        { status: 500 }
      );
    }
  }

  // Get unique past attendee emails (excluding those already registered for sundowner)
  const allRegs = await getRegistrations();
  const sundowerEmails = new Set(
    allRegs.filter((r) => r.run_id === "sundowner-004").map((r) => r.email.toLowerCase())
  );

  const pastRegs = allRegs.filter(
    (r) => r.run_id !== "sundowner-004" && r.email && !sundowerEmails.has(r.email.toLowerCase())
  );

  const seen = new Set<string>();
  const unique = pastRegs.filter((r) => {
    const email = r.email.toLowerCase();
    if (seen.has(email)) return false;
    seen.add(email);
    return true;
  });

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      wouldSend: unique.map((r) => ({ name: r.name, email: r.email })),
      totalSend: unique.length,
      skippedAlreadyRegistered: sundowerEmails.size,
    });
  }

  // Send emails
  const results: { name: string; email: string; status: "sent" | "failed"; error?: string }[] = [];

  for (const reg of unique) {
    const firstName = reg.name.split(" ")[0];
    const html = generateSundownerPromoHTML(firstName);
    try {
      await sendTicketEmail(reg.email, subject, html);
      results.push({ name: reg.name, email: reg.email, status: "sent" });
    } catch (err) {
      results.push({ name: reg.name, email: reg.email, status: "failed", error: String(err) });
    }
  }

  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return NextResponse.json({
    dryRun: false,
    sent,
    failed,
    results,
  });
}

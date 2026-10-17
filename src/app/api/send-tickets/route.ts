import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRegistrations, getRunById, getRuns } from "@/lib/sheets";
import { generateTicketHTML, generateQRBuffer, sendTicketEmail } from "@/lib/email";

function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

// GET: Preview / dry-run summary
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

  const summary = registrations.map((r) => ({
    bib: r.bib,
    name: r.name,
    email: r.email,
    distance: r.distance,
    run_id: r.run_id,
  }));

  return NextResponse.json({
    totalRegistrations: registrations.length,
    withEmail: registrations.filter((r) => r.email).length,
    withoutEmail: registrations.filter((r) => !r.email).length,
    availableRuns: runs.map((r) => ({ id: r.id, title: r.title, date: r.date })),
    registrations: summary,
  });
}

// POST: Send ticket emails
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { dryRun = true, runId, testEmail } = body as {
    dryRun?: boolean;
    runId?: string;
    testEmail?: string;
  };

  if (!runId) {
    return NextResponse.json({ error: "runId is required" }, { status: 400 });
  }

  const run = await getRunById(runId);
  if (!run) {
    return NextResponse.json({ error: `Run '${runId}' not found` }, { status: 404 });
  }

  const registrations = await getRegistrations(runId);

  // Test mode: send a single email to testEmail using the first registration as sample
  if (testEmail) {
    const sample = registrations[0];
    if (!sample) {
      return NextResponse.json({ error: "No registrations found to use as sample" }, { status: 404 });
    }
    const html = generateTicketHTML(sample, run);
    const qrBuffer = await generateQRBuffer(sample);
    const subject = `Your Ticket: ${run.title} — Bib #${sample.bib}`;
    try {
      await sendTicketEmail(testEmail, subject, html, qrBuffer);
      return NextResponse.json({
        success: true,
        message: `Test email sent to ${testEmail} (using registration: ${sample.name}, bib ${sample.bib})`,
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to send test email", details: String(err) },
        { status: 500 },
      );
    }
  }

  // Build the list of emails to send
  const toSend = registrations.filter((r) => r.email);
  const skipped = registrations.filter((r) => !r.email);

  // Dry run: just return what would be sent
  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      run: { id: run.id, title: run.title, date: run.date },
      wouldSend: toSend.map((r) => ({
        bib: r.bib,
        name: r.name,
        email: r.email,
        distance: r.distance,
      })),
      wouldSkip: skipped.map((r) => ({
        bib: r.bib,
        name: r.name,
        reason: "no email address",
      })),
      totalSend: toSend.length,
      totalSkip: skipped.length,
    });
  }

  // Actually send emails
  const results: { bib: string; name: string; email: string; status: "sent" | "failed"; error?: string }[] = [];

  for (const reg of toSend) {
    const html = generateTicketHTML(reg, run);
    const qrBuffer = await generateQRBuffer(reg);
    const subject = `Your Ticket: ${run.title} — Bib #${reg.bib}`;
    try {
      await sendTicketEmail(reg.email, subject, html, qrBuffer);
      results.push({ bib: reg.bib, name: reg.name, email: reg.email, status: "sent" });
    } catch (err) {
      results.push({ bib: reg.bib, name: reg.name, email: reg.email, status: "failed", error: String(err) });
    }
  }

  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return NextResponse.json({
    dryRun: false,
    run: { id: run.id, title: run.title, date: run.date },
    sent,
    failed,
    skippedNoEmail: skipped.length,
    results,
  });
}

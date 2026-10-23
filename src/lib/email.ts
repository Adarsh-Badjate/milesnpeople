import nodemailer from "nodemailer";
import QRCode from "qrcode";
import type { Registration, Run } from "./sheets";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://milesnpeople.in";
const INSTAGRAM_URL = "https://www.instagram.com/milesnpeople/";
const WHATSAPP_URL = "https://chat.whatsapp.com/KVCSvYsJskdIjZSZDkiLOT";

// ── Gmail SMTP Transporter ──

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Sundowner Promo Email ──

export function generateSundownerPromoHTML(firstName: string): string {
  const registerUrl = `${SITE_URL}/events/sundowner-jamming-kojagiri`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="dark">
<title>MNP Sundowner #04</title>
<style>
  body { margin:0; padding:0; background:#0A0A0A; }
  table { border-collapse:collapse; }
  img { border:0; display:block; outline:none; text-decoration:none; }
  a { text-decoration:none; }
  @media only screen and (max-width:620px) {
    .container { width:100% !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
    .hero-title { font-size:42px !important; line-height:44px !important; }
    .btn { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background:#0A0A0A;">

<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#0A0A0A;">You ran with us. Now jam with us. Sunday, 25 Oct. Only 40 spots.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0A0A0A;">
<tr><td align="center" style="padding:28px 12px;">

<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">

  <!-- Header -->
  <tr><td class="px" style="background:#111111; border-radius:18px 18px 0 0; padding:26px 36px 22px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-weight:900; font-size:20px; letter-spacing:2px; color:#F4F2ED;">MILES <span style="color:#C8A55C;">&amp;</span> PEOPLE</td>
      <td align="right" style="font-family:Arial, Helvetica, sans-serif; font-weight:bold; font-size:11px; letter-spacing:2.5px; color:#C8A55C;">EVENT #04</td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#C8A55C; height:4px; line-height:4px; font-size:4px;">&nbsp;</td></tr>

  <!-- Hero -->
  <tr><td class="px" style="background:#111111; padding:40px 36px 32px; font-family:Arial, Helvetica, sans-serif; color:#F4F2ED;">
    <div style="font-size:12px; font-weight:bold; letter-spacing:3px; color:#C8A55C;">SUNDAY, 25 OCTOBER &middot; 5 PM &ndash; 8 PM</div>
    <div class="hero-title" style="margin-top:14px; font-family:Impact, 'Arial Narrow Bold', sans-serif; font-size:52px; line-height:54px; letter-spacing:0.5px; color:#F4F2ED;">YOU RAN WITH US.<br><span style="color:#C8A55C;">NOW JAM WITH US.</span></div>
    <div style="margin-top:16px; font-size:16px; line-height:24px; color:#CFCAC0;">Hey ${firstName}, you've been part of the MNP community runs. This Sunday, we're doing something bigger — a full evening experience under the full moon.</div>
  </td></tr>

  <!-- What's happening -->
  <tr><td class="px" style="background:#111111; padding:0 36px 36px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1A1A1A; border-radius:14px; border:1px solid #2A2A2A;">
      <tr><td style="padding:24px 24px 6px;">
        <div style="font-size:11px; font-weight:bold; letter-spacing:3px; color:#C8A55C;">WHAT&rsquo;S HAPPENING</div>
      </td></tr>
      <tr><td style="padding:16px 24px 6px;">
        <div style="font-size:15px; line-height:22px; color:#F4F2ED;">&#127939; <strong>Sundowner Run</strong></div>
        <div style="font-size:14px; line-height:20px; color:#9B968C;">A chill 3K as the sun sets. Optional.</div>
      </td></tr>
      <tr><td style="padding:12px 24px 6px;">
        <div style="font-size:15px; line-height:22px; color:#F4F2ED;">&#127928; <strong>Open Jamming</strong></div>
        <div style="font-size:14px; line-height:20px; color:#9B968C;">Live music, guitars, singing under the sky.</div>
      </td></tr>
      <tr><td style="padding:12px 24px 6px;">
        <div style="font-size:15px; line-height:22px; color:#F4F2ED;">&#127919; <strong>Ice Breaker Activities</strong></div>
        <div style="font-size:14px; line-height:20px; color:#9B968C;">Meet new people. No awkward silences.</div>
      </td></tr>
      <tr><td style="padding:12px 24px 6px;">
        <div style="font-size:15px; line-height:22px; color:#F4F2ED;">&#129371; <strong>Kojagiri Milk</strong></div>
        <div style="font-size:14px; line-height:20px; color:#9B968C;">Traditional, under the full moon. Included.</div>
      </td></tr>
      <tr><td style="padding:12px 24px 20px;">
        <div style="font-size:15px; line-height:22px; color:#F4F2ED;">&#129309; <strong>New Friends</strong></div>
        <div style="font-size:14px; line-height:20px; color:#9B968C;">Come alone, leave with a circle.</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Price -->
  <tr><td class="px" style="background:#111111; padding:0 36px 36px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#C8A55C; border-radius:14px;">
      <tr><td align="center" style="padding:28px 24px;">
        <div style="font-size:11px; font-weight:bold; letter-spacing:3px; color:#111111;">EARLY BIRD &middot; ALL INCLUSIVE</div>
        <div style="margin-top:8px; font-family:Impact, 'Arial Narrow Bold', sans-serif; font-size:56px; line-height:56px; color:#111111;">&rupee;199</div>
        <div style="margin-top:8px; font-size:14px; color:#333;">Run. Jamming. Activities. Milk. Everything.</div>
        <div style="margin-top:4px; font-size:13px; font-weight:bold; color:#111;">This price won&rsquo;t come back.</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Scarcity -->
  <tr><td class="px" style="background:#111111; padding:0 36px 36px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1A1A1A; border-radius:14px; border:1px solid #C8A55C33;">
      <tr><td align="center" style="padding:24px;">
        <div style="font-size:11px; font-weight:bold; letter-spacing:3px; color:#C8A55C;">&#9888;&#65039; LIMITED CAPACITY</div>
        <div style="margin-top:12px; font-family:Impact, 'Arial Narrow Bold', sans-serif; font-size:42px; line-height:42px; color:#F4F2ED;">ONLY 40 SPOTS</div>
        <div style="margin-top:10px; font-size:14px; line-height:20px; color:#9B968C;">24 men &middot; 16 women &middot; No waitlist<br>Once full, registration closes automatically.</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td class="px" align="center" style="background:#111111; padding:0 36px 36px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
      <td align="center" class="btn" style="background:#C8A55C; border-radius:999px;">
        <a href="${registerUrl}" style="display:block; padding:18px 48px; color:#111111; font-family:Arial,Helvetica,sans-serif; font-size:16px; font-weight:bold; letter-spacing:1.5px; text-decoration:none;">REGISTER NOW &rarr;</a>
      </td>
    </tr></table>
    <div style="margin-top:12px; font-size:13px; color:#9B968C;">2 days left. Don&rsquo;t miss this one.</div>
  </td></tr>

  <!-- Venue -->
  <tr><td class="px" style="background:#111111; padding:0 36px 36px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #2A2A2A;">
      <tr><td style="padding:24px 0 0;">
        <div style="font-size:11px; font-weight:bold; letter-spacing:3px; color:#C8A55C;">VENUE</div>
        <div style="margin-top:8px; font-size:16px; font-weight:bold; color:#F4F2ED;">The E47 Cafe</div>
        <div style="margin-top:4px; font-size:14px; color:#9B968C;">MIDC Industrial Area, Chilkalthana<br>Chhatrapati Sambhajinagar</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td class="px" align="center" style="background:#0A0A0A; border-radius:0 0 18px 18px; padding:28px 36px 30px; font-family:Arial, Helvetica, sans-serif; border-top:1px solid #1A1A1A;">
    <div style="font-family:Impact, 'Arial Narrow Bold', sans-serif; font-size:22px; line-height:26px; color:#F4F2ED;">YOU CAME FOR THE MILES.<br><span style="color:#C8A55C;">STAY FOR THE MUSIC.</span></div>
    <div style="margin-top:16px; font-size:12px; font-weight:bold; letter-spacing:2px;"><a href="${INSTAGRAM_URL}" style="color:#F4F2ED;">INSTAGRAM</a> <span style="color:#555555;">&nbsp;&middot;&nbsp;</span> <a href="${WHATSAPP_URL}" style="color:#F4F2ED;">WHATSAPP</a></div>
    <div style="margin-top:12px; font-size:11px; color:#555555;">You&rsquo;re receiving this because you&rsquo;ve attended a Miles &amp; People community event.</div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Generate QR as Buffer ──

export async function generateQRBuffer(
  registration: Registration,
): Promise<Buffer> {
  const checkinUrl = `${SITE_URL}/admin/checkin?runId=${registration.run_id}&bib=${registration.bib}`;
  return QRCode.toBuffer(checkinUrl, {
    width: 300,
    margin: 1,
    color: { dark: "#111111", light: "#FFFFFF" },
  });
}

// ── Send Email with embedded QR ──

export async function sendTicketEmail(
  to: string,
  subject: string,
  html: string,
) {
  return transporter.sendMail({
    from: `"Miles & People" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

// ── Format date for display ──

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ── Generate Google Calendar URL ──

function generateCalendarUrl(run: Run): string {
  const date = run.date.replace(/-/g, "");
  const title = encodeURIComponent(`Miles & People — ${run.title}`);
  const location = encodeURIComponent(run.meeting_point || "");
  const details = encodeURIComponent(
    `Community Run by Miles & People. Meeting Point: ${run.meeting_point || "TBA"}. Map: ${run.map_url || ""}`,
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}T000000/${date}T040000&location=${location}&details=${details}`;
}

// ── Generate Ticket HTML ──

export function generateTicketHTML(
  registration: Registration,
  run: Run,
): string {
  const firstName = registration.name.split(" ")[0].toUpperCase();
  const fullName = registration.name;
  const distanceLabel = registration.distance || "5K";
  const dateDisplay = formatDate(run.date);
  const startTime = run.start_time || "5:30 AM";
  const meetingPoint = run.meeting_point || "TBA";
  const mapUrl = run.map_url || "#";
  const bibNumber = registration.bib;
  const week = run.week ? `WEEK ${run.week}` : "";
  const calendarUrl = generateCalendarUrl(run);
  const checkinUrl = `${SITE_URL}/admin/checkin?runId=${registration.run_id}&bib=${registration.bib}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(checkinUrl)}`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>You're in — Miles &amp; People</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:#F1EEE8; }
  table { border-collapse:collapse; }
  img { border:0; display:block; outline:none; text-decoration:none; }
  a { text-decoration:none; }
  @media only screen and (max-width:620px) {
    .container { width:100% !important; }
    .px { padding-left:22px !important; padding-right:22px !important; }
    .col { display:block !important; width:100% !important; padding:0 0 16px 0 !important; }
    .bibno { font-size:84px !important; }
    .btn { display:block !important; width:100% !important; margin:0 0 10px 0 !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background:#F1EEE8;">

<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#F1EEE8;">Your bib for Sunday is ready. Show the QR at check-in. Come for the miles, stay for the people.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F1EEE8;">
<tr><td align="center" style="padding:28px 12px;">

<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">

  <!-- Header -->
  <tr><td class="px" style="background:#0A0A0A; border-radius:18px 18px 0 0; padding:26px 36px 22px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-weight:900; font-size:20px; letter-spacing:2px; color:#F4F2ED;">MILES <span style="color:#E0733D;">&amp;</span> PEOPLE</td>
      <td align="right" style="font-family:Arial, Helvetica, sans-serif; font-weight:bold; font-size:11px; letter-spacing:2.5px; color:#9B968C;">RUN CLUB</td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#C2531F; height:5px; line-height:5px; font-size:5px;">&nbsp;</td></tr>

  <!-- Greeting -->
  <tr><td class="px" style="background:#0A0A0A; padding:34px 36px 30px; font-family:Arial, Helvetica, sans-serif; color:#F4F2ED;">
    <div style="font-size:12px; font-weight:bold; letter-spacing:3px; color:#E0733D;">REGISTRATION CONFIRMED</div>
    <div style="margin-top:10px; font-family:Anton, Impact, 'Arial Narrow Bold', sans-serif; font-size:52px; line-height:54px; letter-spacing:0.5px; color:#F4F2ED;">YOU'RE IN, ${firstName}.</div>
    <div style="margin-top:12px; font-size:16px; line-height:24px; color:#CFCAC0;">Your bib for Sunday is below. Come for the miles, stay for the people.</div>
  </td></tr>

  <!-- Bib ticket -->
  <tr><td class="px" style="background:#0A0A0A; padding:0 36px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F2ED; border-radius:16px; overflow:hidden;">
      <tr><td style="background:#C2531F; padding:14px 24px; font-family:Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="font-weight:bold; font-size:13px; letter-spacing:2.5px; color:#FFFFFF;">${week} · COMMUNITY RUN</td>
          <td align="right" style="font-weight:bold; font-size:13px; letter-spacing:2px; color:#FFFFFF;">FREE ENTRY</td>
        </tr></table>
      </td></tr>
      <tr><td align="center" style="padding:26px 24px 8px; font-family:Arial, Helvetica, sans-serif; color:#111111;">
        <div style="font-size:11px; font-weight:bold; letter-spacing:3px; color:#7A766E;">BIB NO.</div>
        <div class="bibno" style="font-family:Anton, Impact, 'Arial Narrow Bold', sans-serif; font-size:104px; line-height:104px; color:#111111;">${bibNumber}</div>
        <div style="margin-top:12px;">
          <span style="display:inline-block; padding:7px 14px; border-radius:999px; background:#FFFFFF; border:1px solid #DDD8CE; font-size:14px; font-weight:bold; color:#111111;">${fullName}</span>
          <span style="display:inline-block; padding:7px 14px; border-radius:999px; background:#C2531F; font-size:14px; font-weight:bold; color:#FFFFFF;">${distanceLabel}</span>
        </div>
      </td></tr>
      <tr><td style="padding:18px 14px 0;"><div style="border-top:2px dashed #C9C3B8; height:1px; line-height:1px; font-size:1px;">&nbsp;</div></td></tr>
      <tr><td style="padding:20px 24px 24px; font-family:Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td class="col" valign="middle" style="padding-right:16px;">
            <div style="font-size:11px; font-weight:bold; letter-spacing:2.5px; color:#7A766E;">DATE</div>
            <div style="margin-top:4px; font-size:17px; font-weight:bold; color:#111111;">${dateDisplay}</div>
            <div style="margin-top:14px; font-size:11px; font-weight:bold; letter-spacing:2.5px; color:#7A766E;">START</div>
            <div style="margin-top:4px; font-size:17px; font-weight:bold; color:#111111;">${startTime}</div>
            <div style="margin-top:14px; font-size:11px; font-weight:bold; letter-spacing:2.5px; color:#7A766E;">MEETING POINT</div>
            <div style="margin-top:4px; font-size:17px; font-weight:bold; color:#111111;"><a href="${mapUrl}" style="color:#111111; text-decoration:underline;">${meetingPoint}</a></div>
          </td>
          <td class="col" valign="middle" align="center" width="180" style="width:180px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF; border-radius:12px; border:2px solid #111111;"><tr><td align="center" style="padding:12px;">
              <img src="${qrUrl}" width="140" height="140" alt="Check-in QR code for bib ${bibNumber}" style="width:140px; height:140px;">
              <div style="margin-top:8px; font-family:Arial, Helvetica, sans-serif; font-size:10px; font-weight:bold; letter-spacing:2px; color:#111111;">SCAN AT CHECK-IN</div>
            </td></tr></table>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- Partner perk -->
  <tr><td class="px" style="background:#FFFFFF; padding:30px 36px 8px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#D7262B; border-radius:14px;"><tr>
      <td style="padding:20px 22px; color:#FFFFFF;">
        <div style="font-size:11px; font-weight:bold; letter-spacing:2.5px; color:#FFD9D6;">POST-RUN PERK</div>
        <div style="margin-top:6px; font-family:Anton, Impact, 'Arial Narrow Bold', sans-serif; font-size:30px; line-height:34px;">15% OFF AT MERIDIAN ICE CREAM</div>
        <div style="margin-top:6px; font-size:14px; line-height:20px; color:#FFE9E7;">Valid for every runner after Sunday's run. Show this ticket at the counter.</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Buttons -->
  <tr><td class="px" style="background:#FFFFFF; padding:22px 36px 6px; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding:0 0 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
          <td align="center" style="background:#111111; border-radius:999px;">
            <a href="${calendarUrl}" style="display:block; padding:14px 28px; color:#FFFFFF; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; letter-spacing:1.5px; text-decoration:none;">ADD TO CALENDAR</a>
          </td>
        </tr></table>
      </td></tr>
      <tr><td align="center" style="padding:0 0 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
          <td align="center" style="border:2px solid #111111; border-radius:999px;">
            <a href="${WHATSAPP_URL}" style="display:block; padding:12px 28px; color:#111111; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; letter-spacing:1.5px; text-decoration:none;">JOIN WHATSAPP GROUP</a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- Before you run -->
  <tr><td class="px" style="background:#FFFFFF; padding:22px 36px 28px; font-family:Arial, Helvetica, sans-serif;">
    <div style="font-size:12px; font-weight:bold; letter-spacing:2.5px; color:#111111;">BEFORE YOU RUN</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;">
      <tr><td width="26" valign="top" style="font-size:15px; font-weight:bold; color:#C2531F; padding:5px 0;">01</td><td style="font-size:15px; line-height:22px; color:#333333; padding:5px 0;">Carry your own water bottle</td></tr>
      <tr><td width="26" valign="top" style="font-size:15px; font-weight:bold; color:#C2531F; padding:5px 0;">02</td><td style="font-size:15px; line-height:22px; color:#333333; padding:5px 0;">Wear comfortable running shoes</td></tr>
      <tr><td width="26" valign="top" style="font-size:15px; font-weight:bold; color:#C2531F; padding:5px 0;">03</td><td style="font-size:15px; line-height:22px; color:#333333; padding:5px 0;">Have fun and run at your own pace</td></tr>
    </table>
  </td></tr>

  <!-- Terms -->
  <tr><td class="px" style="background:#F7F5F1; padding:22px 36px 24px; font-family:Arial, Helvetica, sans-serif; border-top:1px solid #E8E3DA;">
    <div style="font-size:11px; font-weight:bold; letter-spacing:2px; color:#6B675F;">TERMS &amp; CONDITIONS</div>
    <div style="margin-top:8px; font-size:12px; line-height:19px; color:#7A766E;">
      This is a free community run; no entry fee is charged. You participate at your own risk, and Miles &amp; People is not liable for injuries, health issues or loss of belongings. By registering, you confirm you are medically fit for physical activity. Photos and videos from the event may be used by Miles &amp; People for promotion. Organisers may change the route or timings, or cancel due to weather or unforeseen circumstances. This ticket is non-transferable and valid only for the registered participant.
    </div>
  </td></tr>

  <!-- Footer -->
  <tr><td class="px" align="center" style="background:#0A0A0A; border-radius:0 0 18px 18px; padding:28px 36px 30px; font-family:Arial, Helvetica, sans-serif;">
    <div style="font-family:Anton, Impact, 'Arial Narrow Bold', sans-serif; font-size:26px; line-height:30px; color:#F4F2ED;">SEE YOU ON THE ROAD.</div>
    <div style="margin-top:6px; font-size:13px; color:#9B968C;">Come for the miles. <span style="color:#E0733D;">Stay for the people.</span></div>
    <div style="margin-top:16px; font-size:12px; font-weight:bold; letter-spacing:2px;"><a href="${INSTAGRAM_URL}" style="color:#F4F2ED;">INSTAGRAM</a> <span style="color:#555555;">&nbsp;&middot;&nbsp;</span> <a href="${WHATSAPP_URL}" style="color:#F4F2ED;">WHATSAPP</a></div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

import nodemailer from "nodemailer";
import QRCode from "qrcode";
import type { Registration, Run } from "./sheets";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://milesnpeople.in";

// ── Gmail SMTP Transporter ──

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Generate QR as Buffer ──

export async function generateQRBuffer(
  registration: Registration,
): Promise<Buffer> {
  const checkinUrl = `${SITE_URL}/admin/checkin?runId=${registration.run_id}&bib=${registration.bib}`;
  return QRCode.toBuffer(checkinUrl, {
    width: 300,
    margin: 1,
    color: { dark: "#141414", light: "#FAF9F6" },
  });
}

// ── Send Email with embedded QR ──

export async function sendTicketEmail(
  to: string,
  subject: string,
  html: string,
  qrBuffer: Buffer,
) {
  return transporter.sendMail({
    from: `"Miles & People" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "qr-checkin.png",
        content: qrBuffer,
        cid: "qrcheckin",
      },
    ],
  });
}

// ── Generate Ticket HTML ──

export function generateTicketHTML(
  registration: Registration,
  run: Run,
): string {
  const firstName = registration.name.split(" ")[0];
  const distanceLabel = registration.distance || "5K";
  const formattedDate = run.date || "Oct 18, 2026";
  const startTime = run.start_time || "5:30 AM";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Running Ticket - Miles &amp; People</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#141414;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF9F6;">
    <tr>
      <td align="center" style="padding:24px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#141414;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-size:28px;font-weight:900;letter-spacing:2px;color:#FAF9F6;text-transform:uppercase;">
                MILES <span style="color:#C2531F;">&amp;</span> PEOPLE
              </h1>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:4px;color:#999;text-transform:uppercase;">Running Community</p>
            </td>
          </tr>

          <!-- Accent stripe -->
          <tr>
            <td style="background:linear-gradient(90deg,#C2531F,#E0733D);height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:28px 32px 8px;text-align:center;">
              <p style="margin:0;font-size:15px;color:#6B6B6B;text-transform:uppercase;letter-spacing:2px;">You're in, ${firstName}!</p>
              <h2 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#141414;line-height:1.3;">
                ${run.title || "Morning Run"}
              </h2>
            </td>
          </tr>

          <!-- QR Code (top, replaces bib) -->
          <tr>
            <td align="center" style="padding:20px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="border:3px dashed #C2531F;border-radius:12px;width:220px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <img src="cid:qrcheckin" alt="Check-in QR Code" width="160" height="160" style="display:block;margin:0 auto;border-radius:8px;" />
                    <p style="margin:12px 0 0;font-size:12px;font-weight:700;color:#141414;text-transform:uppercase;letter-spacing:1px;">Show this at check-in</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#6B6B6B;">Bib #${registration.bib}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Runner info pills -->
          <tr>
            <td align="center" style="padding:0 32px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 6px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:#FAF9F6;border-radius:20px;">
                      <tr>
                        <td style="padding:6px 16px;font-size:13px;font-weight:700;color:#141414;">
                          ${registration.name}
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding:0 6px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:#C2531F;border-radius:20px;">
                      <tr>
                        <td style="padding:6px 16px;font-size:13px;font-weight:700;color:#FFFFFF;">
                          ${distanceLabel}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px dashed #D9D6CF;font-size:0;line-height:0;height:1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Run details -->
          <tr>
            <td style="padding:20px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;font-size:10px;letter-spacing:2px;color:#6B6B6B;text-transform:uppercase;">Date</p>
                    <p style="margin:2px 0 0;font-size:15px;font-weight:700;color:#141414;">${formattedDate}</p>
                  </td>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;font-size:10px;letter-spacing:2px;color:#6B6B6B;text-transform:uppercase;">Start Time</p>
                    <p style="margin:2px 0 0;font-size:15px;font-weight:700;color:#141414;">${startTime}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;font-size:10px;letter-spacing:2px;color:#6B6B6B;text-transform:uppercase;">Meeting Point</p>
                    <p style="margin:2px 0 0;font-size:15px;font-weight:700;color:#141414;">${run.meeting_point || "TBA"}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${run.partner ? `
          <!-- Partner perk -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px dashed #D9D6CF;font-size:0;line-height:0;height:1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:10px;letter-spacing:2px;color:#6B6B6B;text-transform:uppercase;">Post-Run Perk</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#C2531F;">
                ${run.partner}
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#6B6B6B;">15% discount on everything</p>
            </td>
          </tr>
          ` : ""}

          <!-- Reminders -->
          <tr>
            <td style="background-color:#FAF9F6;padding:20px 32px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#141414;text-transform:uppercase;letter-spacing:1px;">Before you run</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:3px 0;font-size:13px;color:#6B6B6B;">
                    &#x2022;&ensp;Arrive 15 mins early for check-in
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:13px;color:#6B6B6B;">
                    &#x2022;&ensp;Carry your own water bottle
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:13px;color:#6B6B6B;">
                    &#x2022;&ensp;Wear comfortable running shoes
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:13px;color:#6B6B6B;">
                    &#x2022;&ensp;Have fun and pace yourself!
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Terms & Conditions -->
          <tr>
            <td style="padding:16px 32px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#141414;text-transform:uppercase;letter-spacing:1px;">Terms &amp; Conditions</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:2px 0;font-size:11px;color:#999;">&#x2022;&ensp;This is a free community run. No entry fee is charged.</td></tr>
                <tr><td style="padding:2px 0;font-size:11px;color:#999;">&#x2022;&ensp;You participate at your own risk. Miles &amp; People is not liable for any injuries, health issues, or loss of personal belongings.</td></tr>
                <tr><td style="padding:2px 0;font-size:11px;color:#999;">&#x2022;&ensp;By registering, you confirm you are medically fit to participate in physical activity.</td></tr>
                <tr><td style="padding:2px 0;font-size:11px;color:#999;">&#x2022;&ensp;Photos and videos taken during the event may be used by Miles &amp; People for promotional purposes.</td></tr>
                <tr><td style="padding:2px 0;font-size:11px;color:#999;">&#x2022;&ensp;The organizers reserve the right to modify the route, timings, or cancel the event due to weather or unforeseen circumstances.</td></tr>
                <tr><td style="padding:2px 0;font-size:11px;color:#999;">&#x2022;&ensp;This ticket is non-transferable and valid only for the registered participant.</td></tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#141414;padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#FAF9F6;font-weight:600;">
                See you on the road! &#x1F3C3;
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#6B6B6B;">
                Miles &amp; People &mdash; Bengaluru Running Community
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#6B6B6B;">
                Questions? Reply to this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

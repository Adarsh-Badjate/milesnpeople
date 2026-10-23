import { google } from "googleapis";

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

const SHEET_ID = process.env.SHEET_ID!;

// Map special event run_ids to their own sheet tabs
const EVENT_SHEET_TABS: Record<string, string> = {
  "sundowner-004": "Sundowner 004",
};

function getSheetTab(runId?: string): string {
  return (runId && EVENT_SHEET_TABS[runId]) || "Registrations";
}

// ── Runs ──

export interface Run {
  id: string;
  week: string;
  title: string;
  date: string;
  start_time: string;
  meeting_point: string;
  map_url: string;
  distances: string;
  capacity: number;
  status: "open" | "closed" | "soon";
  partner: string;
  partner_perk: string;
}

export async function getRuns(): Promise<Run[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Runs!A2:L",
  });
  const rows = res.data.values || [];
  return rows.map((r) => ({
    id: r[0] || "",
    week: r[1] || "",
    title: r[2] || "",
    date: r[3] || "",
    start_time: r[4] || "",
    meeting_point: r[5] || "",
    map_url: r[6] || "",
    distances: r[7] || "",
    capacity: parseInt(r[8] || "0", 10),
    status: (r[9] || "soon") as Run["status"],
    partner: r[10] || "",
    partner_perk: r[11] || "",
  }));
}

export async function getRunById(runId: string): Promise<Run | null> {
  const runs = await getRuns();
  return runs.find((r) => r.id === runId) || null;
}

// ── Registrations ──

export interface Registration {
  timestamp: string;
  run_id: string;
  bib: string;
  name: string;
  whatsapp: string;
  email: string;
  instagram: string;
  age_group: string;
  gender: string;
  distance: string;
  experience: string;
  emergency_name: string;
  emergency_phone: string;
  source: string;
  waiver: string;
  whatsapp_optin: string;
  checked_in: string;
  payment_screenshot: string;
}

function parseRows(rows: string[][]): Registration[] {
  return rows.map((r) => ({
    timestamp: r[0] || "",
    run_id: r[1] || "",
    bib: r[2] || "",
    name: r[3] || "",
    whatsapp: r[4] || "",
    email: r[5] || "",
    instagram: r[6] || "",
    age_group: r[7] || "",
    gender: r[8] || "",
    distance: r[9] || "",
    experience: r[10] || "",
    emergency_name: r[11] || "",
    emergency_phone: r[12] || "",
    source: r[13] || "",
    waiver: r[14] || "",
    whatsapp_optin: r[15] || "",
    checked_in: r[16] || "",
    payment_screenshot: r[17] || "",
  }));
}

export async function getRegistrations(runId?: string): Promise<Registration[]> {
  const sheets = getSheets();

  if (runId) {
    const tab = getSheetTab(runId);
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${tab}!A2:R`,
    });
    return parseRows(res.data.values || []).filter((r) => r.run_id === runId);
  }

  // No runId — merge all tabs
  const allTabs = ["Registrations", ...Object.values(EVENT_SHEET_TABS)];
  const results = await Promise.all(
    allTabs.map((tab) =>
      sheets.spreadsheets.values
        .get({ spreadsheetId: SHEET_ID, range: `${tab}!A2:R` })
        .then((res) => parseRows(res.data.values || []))
        .catch(() => [] as Registration[])
    )
  );
  return results.flat();
}

export async function getRegistrationCount(runId: string): Promise<number> {
  const regs = await getRegistrations(runId);
  return regs.length;
}

export async function getGenderCount(runId: string, gender: string): Promise<number> {
  const regs = await getRegistrations(runId);
  return regs.filter((r) => r.gender.toLowerCase() === gender.toLowerCase()).length;
}

export async function isDuplicate(runId: string, whatsapp: string): Promise<boolean> {
  const regs = await getRegistrations(runId);
  return regs.some((r) => r.whatsapp === whatsapp);
}

export async function getNextBib(runId: string): Promise<string> {
  const regs = await getRegistrations(runId);
  const num = regs.length + 1;
  return String(num).padStart(4, "0");
}

export async function appendRegistration(data: Omit<Registration, "timestamp" | "checked_in" | "payment_screenshot">) {
  const sheets = getSheets();
  const tab = getSheetTab(data.run_id);
  const timestamp = new Date().toISOString();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A:R`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        timestamp,
        data.run_id,
        data.bib,
        data.name,
        data.whatsapp,
        data.email,
        data.instagram,
        data.age_group,
        data.gender,
        data.distance,
        data.experience,
        data.emergency_name,
        data.emergency_phone,
        data.source,
        data.waiver,
        data.whatsapp_optin,
        "",
        "",
      ]],
    },
  });
}

export async function uploadPaymentScreenshot(
  runId: string,
  whatsapp: string,
  fileBuffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  const drive = google.drive({ version: "v3", auth: getAuth() });

  // Upload file to Google Drive
  const driveRes = await drive.files.create({
    requestBody: {
      name: `payment_${runId}_${whatsapp}_${Date.now()}_${fileName}`,
      parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined,
    },
    media: {
      mimeType,
      body: require("stream").Readable.from(fileBuffer),
    },
    fields: "id,webViewLink",
  });

  const fileId = driveRes.data.id!;
  const viewLink = driveRes.data.webViewLink!;

  // Make file viewable by anyone with the link
  await drive.permissions.create({
    fileId,
    requestBody: { role: "reader", type: "anyone" },
  });

  // Update the registration row with the screenshot link
  const sheets = getSheets();
  const tab = getSheetTab(runId);
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A2:R`,
  });
  const rows = res.data.values || [];
  const rowIndex = rows.findIndex((r) => r[1] === runId && r[4] === whatsapp);
  if (rowIndex !== -1) {
    const sheetRow = rowIndex + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${tab}!R${sheetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[viewLink]] },
    });
  }

  return viewLink;
}

export async function updateCheckedIn(runId: string, bib: string, checkedIn: boolean) {
  const sheets = getSheets();
  const tab = getSheetTab(runId);
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A2:R`,
  });
  const rows = res.data.values || [];
  const rowIndex = rows.findIndex((r) => r[1] === runId && r[2] === bib);
  if (rowIndex === -1) return;
  const sheetRow = rowIndex + 2; // 1-indexed + header
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${tab}!Q${sheetRow}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[checkedIn ? "TRUE" : ""]] },
  });
}

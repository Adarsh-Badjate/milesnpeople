# Miles & People

Free Sunday-morning community run club in Chhatrapati Sambhajinagar, India.

**Come for the miles. Stay for the people.**

## Setup

### 1. Google Sheet

Create a Google Sheet with two tabs:

**Tab: `Runs`** — columns (row 1 headers):

| id | week | title | date | start_time | meeting_point | map_url | distances | capacity | status | partner | partner_perk |
|----|------|-------|------|------------|---------------|---------|-----------|----------|--------|---------|--------------|

Add this seed row (row 2):

| 003 | 003 | Community Run | 2026-10-18 | 5:30 AM | TBA | | 3K,5K | 50 | open | Meridian Ice Cream | |

**Tab: `Registrations`** — columns (row 1 headers):

| timestamp | run_id | bib | name | whatsapp | email | instagram | age_group | gender | distance | experience | emergency_name | emergency_phone | source | waiver | whatsapp_optin | checked_in |
|-----------|--------|-----|------|----------|-------|-----------|-----------|--------|----------|------------|----------------|-----------------|--------|--------|----------------|------------|

### 2. Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the **Google Sheets API**
4. Go to **IAM & Admin > Service Accounts** and create a service account
5. Create a JSON key for the service account
6. Copy the `client_email` and `private_key` from the JSON key

### 3. Share the Sheet

Share your Google Sheet with the service account email (the `client_email` from the JSON key) and give it **Editor** access.

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — the service account email
- `GOOGLE_PRIVATE_KEY` — the private key (include the `-----BEGIN/END-----` markers, use `\n` for newlines)
- `SHEET_ID` — the Google Sheet ID (from the URL: `docs.google.com/spreadsheets/d/{SHEET_ID}/edit`)
- `WHATSAPP_GROUP_URL` — your WhatsApp group invite link
- `ADMIN_PASSWORD` — password for the organizer dashboard at `/admin`

### 5. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set the same environment variables in your Vercel project settings.

## Pages

- `/` — Home page with upcoming runs, how it works, community, partners, FAQ
- `/register/[runId]` — Registration form for a specific run
- `/register/[runId]/done` — Confirmation page with digital bib
- `/admin` — Organizer dashboard (password-protected)

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Google Sheets as database (via `googleapis`)
- Hosted on Vercel

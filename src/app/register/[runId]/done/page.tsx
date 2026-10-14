import { getRunById } from "@/lib/sheets";
import { ConfirmedClient } from "./ConfirmedClient";

const FALLBACK_RUN = {
  id: "003",
  week: "003",
  title: "Community Run",
  date: "2026-10-18",
  start_time: "5:30 AM",
  meeting_point: "TBA",
  map_url: "",
  distances: "3K,5K",
  capacity: 50,
  status: "open" as const,
  partner: "Meridian Ice Cream",
  partner_perk: "",
};

export default async function DonePage({
  params,
  searchParams,
}: {
  params: Promise<{ runId: string }>;
  searchParams: Promise<{ bib?: string; name?: string; week?: string; distance?: string }>;
}) {
  const { runId } = await params;
  const sp = await searchParams;

  let run;
  try {
    run = await getRunById(runId);
  } catch {
    run = null;
  }
  if (!run) run = FALLBACK_RUN;

  const bib = sp.bib || "0001";
  const name = sp.name || "Runner";
  const week = sp.week || run.week;
  const distance = sp.distance || "5K";

  return (
    <ConfirmedClient
      bib={bib}
      name={name}
      week={week}
      distance={distance}
      date={run.date}
      startTime={run.start_time}
      meetingPoint={run.meeting_point}
      runId={runId}
      whatsappUrl={process.env.WHATSAPP_GROUP_URL || ""}
    />
  );
}

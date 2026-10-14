import { NextResponse } from "next/server";
import { getRuns, getRegistrationCount } from "@/lib/sheets";

export async function GET() {
  try {
    const runs = await getRuns();
    const runsWithCounts = await Promise.all(
      runs.map(async (run) => ({
        ...run,
        registered: await getRegistrationCount(run.id),
      }))
    );
    return NextResponse.json(runsWithCounts);
  } catch (err) {
    console.error("Error fetching runs:", err);
    return NextResponse.json([], { status: 500 });
  }
}

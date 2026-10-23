import { NextRequest, NextResponse } from "next/server";
import { updateTransactionId } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const { run_id, whatsapp, transaction_id } = await req.json();

    if (!run_id || !whatsapp || !transaction_id) {
      return NextResponse.json(
        { error: "run_id, whatsapp, and transaction_id are required" },
        { status: 400 }
      );
    }

    await updateTransactionId(run_id, whatsapp, transaction_id.trim());

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

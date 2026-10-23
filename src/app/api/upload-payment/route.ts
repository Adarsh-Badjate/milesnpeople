import { NextRequest, NextResponse } from "next/server";
import { uploadPaymentScreenshot } from "@/lib/sheets";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const runId = formData.get("run_id") as string | null;
    const whatsapp = formData.get("whatsapp") as string | null;

    if (!file || !runId || !whatsapp) {
      return NextResponse.json(
        { error: "File, run_id, and whatsapp are required" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP, and HEIC images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size must be under 5 MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const viewLink = await uploadPaymentScreenshot(
      runId,
      whatsapp,
      buffer,
      file.type,
      file.name
    );

    return NextResponse.json({ success: true, url: viewLink });
  } catch (err) {
    console.error("Payment upload error:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

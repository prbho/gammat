// app/api/download-brochure/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Generate a signed URL for the PDF (valid for 60 seconds)
    const signedUrl = cloudinary.utils.url(
      "brochures/gammat-2026-brochure.pdf",
      {
        resource_type: "raw",
        secure: true,
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 60, // 60 seconds expiry
      }
    );

    return NextResponse.json({ success: true, url: signedUrl });
  } catch (error) {
    console.error("Error generating download URL:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate download link" },
      { status: 500 }
    );
  }
}

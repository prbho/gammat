// app/api/debug-coupons/route.ts
import { NextResponse } from "next/server";
import { getValidCodes } from "@/lib/coupons";

export const runtime = "nodejs";

export async function GET() {
  const raw = process.env.COUPON_CODES;
  return NextResponse.json({
    // What the environment variable literally contains
    rawValue: raw ?? null,
    // Whether the key is set at all
    isSet: raw !== undefined,
    // What getValidCodes() returns after parsing
    parsedCodes: getValidCodes(),
    // Sanity check: is the string quoted?
    looksQuoted: !!raw && raw.startsWith('"') && raw.endsWith('"'),
    nodeEnv: process.env.NODE_ENV,
  });
}

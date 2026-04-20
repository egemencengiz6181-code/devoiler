import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || "";
const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const merchant_oid = formData.get("merchant_oid") as string;
    const status = formData.get("status") as string;
    const total_amount = formData.get("total_amount") as string;
    const hash = formData.get("hash") as string;
    const failed_reason_code = formData.get("failed_reason_code") as string;
    const failed_reason_msg = formData.get("failed_reason_msg") as string;
    const test_mode = formData.get("test_mode") as string;
    const payment_type = formData.get("payment_type") as string;
    const currency = formData.get("currency") as string;
    const payment_amount = formData.get("payment_amount") as string;

    if (!MERCHANT_KEY || !MERCHANT_SALT) {
      return new NextResponse("OK", { status: 200 });
    }

    // Verify HMAC hash from PayTR
    const hashStr = `${merchant_oid}${MERCHANT_SALT}${status}${total_amount}`;
    const expectedHash = crypto
      .createHmac("sha256", MERCHANT_KEY)
      .update(hashStr)
      .digest("base64");

    if (hash !== expectedHash) {
      console.error("PayTR callback hash mismatch", { merchant_oid });
      return new NextResponse("FAIL", { status: 400 });
    }

    // Hash verified — process the payment result
    if (status === "success") {
      console.log("PayTR payment SUCCESS", {
        merchant_oid,
        total_amount,
        payment_type,
        currency,
        payment_amount,
        test_mode,
      });
      // In production: update order status in database to "paid"
    } else {
      console.log("PayTR payment FAILED", {
        merchant_oid,
        total_amount,
        failed_reason_code,
        failed_reason_msg,
        test_mode,
      });
      // In production: update order status to "failed"
    }

    // PayTR expects "OK" response
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("PayTR callback error:", error);
    return new NextResponse("OK", { status: 200 });
  }
}

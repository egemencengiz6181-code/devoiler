import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase-server";

// PayTR sandbox/production credentials from environment variables
const MERCHANT_ID = process.env.PAYTR_MERCHANT_ID || "";
const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || "";
const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      payment_amount, // kuruş cinsinden (e.g. 59000 = ₺590)
      user_basket,
      user_name,
      user_address,
      user_phone,
      merchant_oid,
      user_ip,
      no_installment = 0,
      max_installment = 0,
      currency = "TL",
      test_mode = process.env.PAYTR_TEST_MODE || "1",
    } = body;

    if (!MERCHANT_ID || !MERCHANT_KEY || !MERCHANT_SALT) {
      return NextResponse.json(
        { status: "error", reason: "PayTR credentials not configured" },
        { status: 500 }
      );
    }

    const merchant_ok_url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://devoiler.com.tr"}/checkout/success`;
    const merchant_fail_url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://devoiler.com.tr"}/checkout/fail`;

    // user_basket must be base64 encoded JSON array
    const user_basket_b64 = Buffer.from(JSON.stringify(user_basket)).toString("base64");

    // Create hash string per PayTR docs
    const hashStr = `${MERCHANT_ID}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket_b64}${no_installment}${max_installment}${currency}${test_mode}`;
    const paytr_token = crypto
      .createHmac("sha256", MERCHANT_KEY)
      .update(hashStr + MERCHANT_SALT)
      .digest("base64");

    const params = new URLSearchParams({
      merchant_id: MERCHANT_ID,
      user_ip,
      merchant_oid,
      email,
      payment_amount: String(payment_amount),
      paytr_token,
      user_basket: user_basket_b64,
      debug_on: "1",
      no_installment: String(no_installment),
      max_installment: String(max_installment),
      user_name,
      user_address,
      user_phone,
      merchant_ok_url,
      merchant_fail_url,
      timeout_limit: "30",
      currency,
      test_mode: String(test_mode),
      lang: "tr",
    });

    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const result = await response.json();

    if (result.status === "success") {
      // ── Supabase: profili upsert et ve bekleyen siparişi oluştur ──────────
      try {
        const supabase = createAdminClient();

        // 1. Profili e-posta üzerinden upsert et
        const { data: profile } = await supabase
          .from("profiles")
          .upsert(
            {
              email,
              full_name: user_name,
              phone: user_phone,
              address: user_address,
            },
            { onConflict: "email", ignoreDuplicates: false }
          )
          .select("id")
          .single();

        // 2. Sepet ürünlerini nesne dizisine dönüştür
        const basket_details = (
          user_basket as [string, string, string][]
        ).map(([name, price, quantity]) => ({ name, price, quantity }));

        // 3. Bekleyen siparişi kaydet
        await supabase.from("orders").insert({
          user_id: profile?.id ?? null,
          paytr_oid: merchant_oid,
          total_amount: Number(payment_amount),
          status: "pending",
          basket_details,
          address_snapshot: {
            name: user_name,
            address: user_address,
            phone: user_phone,
            email,
          },
        });
      } catch (dbError) {
        // Veritabanı hatası ödeme akışını durdurmamalı — sadece logla
        console.error("Supabase order insert error:", dbError);
      }
      // ─────────────────────────────────────────────────────────────────────

      return NextResponse.json({ token: result.token });
    } else {
      return NextResponse.json(
        { status: "error", reason: result.reason },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayTR token error:", error);
    return NextResponse.json(
      { status: "error", reason: "Internal server error" },
      { status: 500 }
    );
  }
}

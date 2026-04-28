import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || "";
const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const merchant_oid = formData.get("merchant_oid") as string;
    const status = formData.get("status") as string;
    const total_amount = formData.get("total_amount") as string;
    const hash = formData.get("hash") as string;

    // Hash doğrulaması: merchant_oid + merchant_salt + status + total_amount
    const hashStr = `${merchant_oid}${MERCHANT_SALT}${status}${total_amount}`;
    const expectedHash = crypto
      .createHmac("sha256", MERCHANT_KEY)
      .update(hashStr)
      .digest("base64");

    if (hash !== expectedHash) {
      console.error("PAYTR notification failed: bad hash", { merchant_oid });
      return new NextResponse("PAYTR notification failed: bad hash", {
        status: 400,
      });
    }

    // Hash doğrulandı — ödeme durumunu işle
    if (status === "success") {
      console.log("PayTR ödeme başarılı:", { merchant_oid, total_amount });
      // TODO: Veritabanında ilgili siparişin durumunu "ödendi" olarak güncelle
    } else {
      console.log("PayTR ödeme başarısız:", { merchant_oid, total_amount });
      // TODO: Veritabanında ilgili siparişin durumunu "başarısız" olarak güncelle
    }

    // PayTR bildirimlerin tekrarlanmaması için mutlaka "OK" yanıtı dön
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("PayTR webhook hatası:", error);
    // Hata durumunda bile PayTR'a 200 dönülmeli; aksi hâlde bildirimler tekrar gönderilir
    return new NextResponse("OK", { status: 200 });
  }
}

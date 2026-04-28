import type { NextRequest } from "next/server";

// Web Crypto API kullanılıyor: Node.js 'crypto' Edge Runtime'da desteklenmez.
const HMAC_PAYLOAD = "devoiler-admin-v1";

export async function generateAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "";
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(HMAC_PAYLOAD)
  );

  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verifies the admin cookie in an API route or proxy.
 * Her iki taraf da HMAC çıktısı — sabit uzunlukta string karşılaştırması güvenlidir.
 */
export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("dv_admin")?.value;
  if (!token) return false;

  try {
    const expected = await generateAdminToken();
    return token === expected;
  } catch {
    return false;
  }
}

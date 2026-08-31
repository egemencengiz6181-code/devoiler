import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/** Admin yazma işlemlerinden sonra tüm public sayfaların cache'ini tazeler. */
export function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // revalidate başarısız olsa bile yazma işlemi geçerlidir
  }
}

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

/** Supabase hatalarını okunabilir Türkçe mesaja çevirir. */
export function describeSupabaseError(error: unknown): string {
  const e = error as { message?: string; code?: string; details?: string } | null;
  const msg = e?.message ?? String(error);
  if (/relation .* does not exist/i.test(msg) || e?.code === "42P01") {
    return "Veritabanı tabloları bulunamadı. supabase/migrations/001_cms.sql dosyasını Supabase SQL Editor'de çalıştırın.";
  }
  if (/fetch failed|ENOTFOUND|ECONNREFUSED|getaddrinfo/i.test(msg)) {
    return "Supabase projesine ulaşılamıyor. Proje duraklatılmış olabilir — dashboard'dan 'Restore' edin.";
  }
  return msg;
}

export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

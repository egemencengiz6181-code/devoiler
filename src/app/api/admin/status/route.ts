import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

type Check = { name: string; ok: boolean; detail: string };

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checks: Check[] = [];

  const envOk = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  checks.push({
    name: "Supabase ortam değişkenleri",
    ok: envOk,
    detail: envOk
      ? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
      : "NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY tanımlı değil.",
  });

  if (envOk) {
    const supabase = createAdminClient();

    for (const table of ["cms_products", "cms_content", "orders", "profiles"]) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });
        if (error) throw error;
        checks.push({
          name: `Tablo: ${table}`,
          ok: true,
          detail: `${count ?? 0} kayıt`,
        });
      } catch (error) {
        checks.push({
          name: `Tablo: ${table}`,
          ok: false,
          detail: describeSupabaseError(error),
        });
      }
    }

    try {
      const { data, error } = await supabase.storage.getBucket("media");
      if (error) throw error;
      checks.push({
        name: "Görsel deposu (media)",
        ok: Boolean(data?.public),
        detail: data?.public ? "Hazır ve herkese açık" : "Bucket public değil",
      });
    } catch (error) {
      checks.push({
        name: "Görsel deposu (media)",
        ok: false,
        detail: describeSupabaseError(error),
      });
    }
  }

  return NextResponse.json({ checks, ok: checks.every((c) => c.ok) });
}

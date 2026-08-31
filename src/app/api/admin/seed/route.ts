import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError, revalidateSite } from "@/lib/admin-api";
import { products as staticProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

/**
 * Koddaki statik ürünleri veritabanına aktarır.
 * Varsayılan olarak yalnızca eksik ürünleri ekler; `?force=1` tüm ürünleri
 * koddaki hallerine geri döndürür.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const force = request.nextUrl.searchParams.get("force") === "1";

  try {
    const supabase = createAdminClient();

    const { data: existing, error: readError } = await supabase
      .from("cms_products")
      .select("slug");
    if (readError) throw readError;

    const existingSlugs = new Set((existing ?? []).map((r) => r.slug));

    const rows = staticProducts
      .filter((p) => force || !existingSlugs.has(p.slug))
      .map((p) => ({
        slug: p.slug,
        data: p,
        sort_order: staticProducts.findIndex((x) => x.slug === p.slug),
        is_active: true,
      }));

    if (rows.length === 0) {
      return NextResponse.json({ ok: true, inserted: 0, message: "Tüm ürünler zaten kayıtlı." });
    }

    const { error } = await supabase
      .from("cms_products")
      .upsert(rows, { onConflict: "slug" });
    if (error) throw error;

    revalidateSite();
    return NextResponse.json({ ok: true, inserted: rows.length });
  } catch (error) {
    console.error("[admin/seed]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError, revalidateSite, slugify } from "@/lib/admin-api";
import { products as staticProducts, type Product } from "@/lib/data";

export const dynamic = "force-dynamic";

const emptyProduct = (slug: string): Product => ({
  slug,
  name: "Yeni Ürün",
  tagline: "",
  category: "Serumlar",
  activeIngredient: "",
  activeConcentration: "",
  price: "₺0",
  skinNeeds: [],
  description: "",
  ingredients: [],
  howToUse: [],
  faqs: [],
  image: "",
  detailImages: [],
  reviews: [],
  soldOut: false,
});

const staticFallback = () =>
  staticProducts.map((p, i) => ({
    slug: p.slug,
    data: p,
    sort_order: i,
    is_active: true,
    updated_at: null,
  }));

/** Tüm ürünler (pasifler dahil). Veritabanı boşsa statik listeyi döner. */
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("cms_products")
      .select("slug, data, sort_order, is_active, updated_at")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ products: staticFallback(), source: "static" });
    }

    return NextResponse.json({ products: data, source: "db" });
  } catch (error) {
    // Veritabanına ulaşılamıyorsa panel boş kalmasın: statik listeyi uyarıyla göster
    console.error("[admin/products GET]", error);
    return NextResponse.json({
      products: staticFallback(),
      source: "static",
      warning: describeSupabaseError(error),
    });
  }
}

/** Yeni ürün oluşturur. */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const name: string = body?.name?.trim() || "Yeni Ürün";
    const slug: string = slugify(body?.slug || name) || `urun-${Date.now()}`;

    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from("cms_products")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Bu slug zaten kullanılıyor." },
        { status: 409 }
      );
    }

    const { data: last } = await supabase
      .from("cms_products")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const product: Product = { ...emptyProduct(slug), name };

    const { error } = await supabase.from("cms_products").insert({
      slug,
      data: product,
      sort_order: (last?.sort_order ?? -1) + 1,
      is_active: false,
    });

    if (error) throw error;

    revalidateSite();
    return NextResponse.json({ ok: true, slug });
  } catch (error) {
    console.error("[admin/products POST]", error);
    return NextResponse.json(
      { error: describeSupabaseError(error) },
      { status: 500 }
    );
  }
}

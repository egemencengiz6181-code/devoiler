import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError, revalidateSite, slugify } from "@/lib/admin-api";
import { products as staticProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Ctx) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("cms_products")
      .select("slug, data, sort_order, is_active")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      const fallback = staticProducts.find((p) => p.slug === slug);
      if (!fallback) {
        return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
      }
      return NextResponse.json({
        product: { slug, data: fallback, sort_order: 0, is_active: true },
        source: "static",
      });
    }

    return NextResponse.json({ product: data, source: "db" });
  } catch (error) {
    console.error("[admin/products/:slug GET]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const body = await request.json();
    const incoming = body?.data;
    if (!incoming || typeof incoming !== "object") {
      return NextResponse.json({ error: "Geçersiz ürün verisi" }, { status: 400 });
    }

    const nextSlug = slugify(incoming.slug || slug) || slug;
    if (!incoming.name?.trim()) {
      return NextResponse.json({ error: "Ürün adı zorunludur." }, { status: 400 });
    }

    const supabase = createAdminClient();

    if (nextSlug !== slug) {
      const { data: clash } = await supabase
        .from("cms_products")
        .select("slug")
        .eq("slug", nextSlug)
        .maybeSingle();
      if (clash) {
        return NextResponse.json(
          { error: "Bu slug başka bir üründe kullanılıyor." },
          { status: 409 }
        );
      }
    }

    const payload = {
      slug: nextSlug,
      data: { ...incoming, slug: nextSlug },
      is_active: body?.is_active !== false,
      ...(typeof body?.sort_order === "number" ? { sort_order: body.sort_order } : {}),
    };

    const { data: existing } = await supabase
      .from("cms_products")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("cms_products")
        .update(payload)
        .eq("slug", slug);
      if (error) throw error;
    } else {
      // Veritabanında henüz yoksa (statik ürün ilk kez düzenleniyor) ekle
      const idx = staticProducts.findIndex((p) => p.slug === slug);
      const { error } = await supabase
        .from("cms_products")
        .insert({ ...payload, sort_order: idx >= 0 ? idx : 999 });
      if (error) throw error;
    }

    revalidateSite();
    return NextResponse.json({ ok: true, slug: nextSlug });
  } catch (error) {
    console.error("[admin/products/:slug PUT]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("cms_products").delete().eq("slug", slug);
    if (error) throw error;

    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/products/:slug DELETE]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

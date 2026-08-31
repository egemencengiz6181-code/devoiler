import { cache } from "react";
import { createAdminClient } from "@/lib/supabase-server";
import { products as staticProducts, type Product } from "@/lib/data";
import {
  defaultSiteContent,
  mergeContent,
  type SiteContent,
} from "@/lib/site-content";

/**
 * CMS okuma katmanı.
 *
 * Tasarım ilkesi: veritabanı boş, kapalı ya da erişilemez olsa bile site
 * ASLA patlamaz — bu durumda `src/lib/data.ts` içindeki statik veriler ve
 * `defaultSiteContent` devreye girer.
 */

const QUERY_TIMEOUT_MS = 6000;

async function withTimeout<T>(promise: PromiseLike<T>): Promise<T | null> {
  try {
    return await Promise.race([
      Promise.resolve(promise),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), QUERY_TIMEOUT_MS)),
    ]);
  } catch {
    return null;
  }
}

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ─── Ürünler ───────────────────────────────────────────────────────────────

export type CmsProductRow = {
  slug: string;
  data: Product;
  sort_order: number;
  is_active: boolean;
};

export const getAllProductRows = cache(async (): Promise<CmsProductRow[] | null> => {
  if (!hasSupabaseEnv()) return null;
  try {
    const supabase = createAdminClient();
    const result = await withTimeout(
      supabase
        .from("cms_products")
        .select("slug, data, sort_order, is_active")
        .order("sort_order", { ascending: true })
    );
    if (!result || result.error || !result.data || result.data.length === 0) return null;
    return result.data as CmsProductRow[];
  } catch {
    return null;
  }
});

/** Sitede gösterilecek ürünler (pasif olanlar hariç). */
export const getProducts = cache(async (): Promise<Product[]> => {
  const rows = await getAllProductRows();
  if (!rows) return staticProducts;
  return rows
    .filter((r) => r.is_active !== false && r.data && typeof r.data === "object")
    .map((r) => ({ ...r.data, slug: r.slug }));
});

export const getProduct = cache(async (slug: string): Promise<Product | undefined> => {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
});

// ─── Site içeriği ──────────────────────────────────────────────────────────

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!hasSupabaseEnv()) return defaultSiteContent;
  try {
    const supabase = createAdminClient();
    const result = await withTimeout(
      supabase.from("cms_content").select("data").eq("key", "site").maybeSingle()
    );
    if (!result || result.error || !result.data?.data) return defaultSiteContent;
    return mergeContent(defaultSiteContent, result.data.data);
  } catch {
    return defaultSiteContent;
  }
});

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError, revalidateSite } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

/** body: { slugs: string[] } — dizideki sıra yeni sıralamadır. */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slugs } = await request.json();
    if (!Array.isArray(slugs)) {
      return NextResponse.json({ error: "slugs dizisi gerekli" }, { status: 400 });
    }

    const supabase = createAdminClient();
    for (let i = 0; i < slugs.length; i++) {
      const { error } = await supabase
        .from("cms_products")
        .update({ sort_order: i })
        .eq("slug", slugs[i]);
      if (error) throw error;
    }

    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/products/reorder]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

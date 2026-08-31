import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError, revalidateSite } from "@/lib/admin-api";
import { defaultSiteContent, mergeContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("cms_content")
      .select("data")
      .eq("key", "site")
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({
      content: data?.data
        ? mergeContent(defaultSiteContent, data.data)
        : defaultSiteContent,
      source: data?.data ? "db" : "default",
    });
  } catch (error) {
    console.error("[admin/content GET]", error);
    return NextResponse.json({
      content: defaultSiteContent,
      source: "default",
      warning: describeSupabaseError(error),
    });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const content = body?.content;
    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Geçersiz içerik" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("cms_content")
      .upsert({ key: "site", data: content }, { onConflict: "key" });

    if (error) throw error;

    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/content PUT]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

/** İçeriği fabrika ayarlarına döndürür. */
export async function DELETE(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("cms_content").delete().eq("key", "site");
    if (error) throw error;

    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/content DELETE]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

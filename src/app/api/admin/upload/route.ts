import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeSupabaseError, slugify } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const BUCKET = "media";
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg+xml"];

async function ensureBucket(supabase: ReturnType<typeof createAdminClient>) {
  const { data } = await supabase.storage.getBucket(BUCKET);
  if (!data) {
    await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
    });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Dosya çok büyük (en fazla 8 MB)." },
        { status: 413 }
      );
    }
    if (file.type && !ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "Yalnızca görsel dosyaları yüklenebilir (jpg, png, webp, avif, gif, svg)." },
        { status: 415 }
      );
    }

    const supabase = createAdminClient();
    await ensureBucket(supabase);

    const dot = file.name.lastIndexOf(".");
    const ext = dot > -1 ? file.name.slice(dot + 1).toLowerCase() : "jpg";
    const base = slugify(dot > -1 ? file.name.slice(0, dot) : file.name) || "gorsel";
    const path = `${new Date().getFullYear()}/${Date.now()}-${base}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, await file.arrayBuffer(), {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (error) throw error;

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ ok: true, url: pub.publicUrl, path });
  } catch (error) {
    console.error("[admin/upload]", error);
    return NextResponse.json({ error: describeSupabaseError(error) }, { status: 500 });
  }
}

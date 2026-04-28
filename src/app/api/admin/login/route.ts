import { NextRequest, NextResponse } from "next/server";
import { generateAdminToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("[Admin Login API] ADMIN_PASSWORD env değişkeni tanımlı değil!");
      return NextResponse.json(
        { error: "ADMIN_PASSWORD env tanımlı değil" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      console.warn("[Admin Login API] Yanlış şifre denemesi");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await generateAdminToken();
    const response = NextResponse.json({ ok: true });

    response.cookies.set("dv_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[Admin Login API] Beklenmeyen hata:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

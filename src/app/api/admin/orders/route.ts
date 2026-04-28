import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        profiles (
          email,
          full_name,
          phone
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ orders: data });
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

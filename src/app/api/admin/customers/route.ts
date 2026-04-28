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
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ customers: data });
  } catch (error) {
    console.error("Admin customers fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

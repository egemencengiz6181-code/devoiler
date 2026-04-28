import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import type { SupabaseOrderStatus } from "@/lib/types";

const VALID_STATUSES: SupabaseOrderStatus[] = [
  "pending",
  "paid",
  "failed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ order: data });
  } catch (error) {
    console.error("Admin order update error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

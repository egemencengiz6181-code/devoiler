import { NextResponse } from "next/server";
import { getProducts } from "@/lib/cms";

export const revalidate = 60;

/** Public ürün listesi — istemci tarafı sayfalar (favoriler vb.) için. */
export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

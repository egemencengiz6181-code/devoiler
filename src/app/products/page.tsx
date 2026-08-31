import { getProducts, getSiteContent } from "@/lib/cms";
import ProductsClient from "./ProductsClient";

export const revalidate = 60;

export async function generateMetadata() {
  const content = await getSiteContent();
  return {
    title: `${content.productsPage.title} — Devoiler`,
    description: content.productsPage.description,
  };
}

export default async function ProductsPage() {
  const [products, content] = await Promise.all([getProducts(), getSiteContent()]);
  const c = content.productsPage;

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-4">
            {c.label}
          </p>
          <h1 className="text-[40px] md:text-[56px] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            {c.title}
          </h1>
          <p className="text-[15px] leading-[1.9] text-[#4A4A4A] max-w-xl">
            {c.description}
          </p>
        </div>
      </section>

      <ProductsClient
        products={products}
        categories={content.productCategories}
        emptyText={c.emptyText}
      />
    </div>
  );
}

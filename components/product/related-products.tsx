import { ProductGrid } from "@/components/product/product-grid";
import type { ProductSummary } from "@/features/products/types/product.types";

interface RelatedProductsProps {
  products: ProductSummary[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-neutral-200 pt-16">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          You may also like
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Related products
        </h2>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}

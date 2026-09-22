import { routePaths } from "@/config/routes";
import { Product } from "@/features/products/types/product.types";
import Link from "next/link";
import { ProductPrice } from "./product-price";
import { ProductPurchasePanel } from "./product-purchase-panel";

interface ProductInfoProps {
  product: Product;

  selectedProductColorId: string | null;
  selectedVariantId: string | null;

  onColorChange: (productColorId: string) => void;
  onVariantChange: (variantId: string) => void;
}

export function ProductInfo({
  product,
  selectedProductColorId,
  selectedVariantId,
  onColorChange,
  onVariantChange,
}: ProductInfoProps) {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <Link
        href={routePaths.category(product.category.slug)}
        className="text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-400 transition-colors hover:text-neutral-950"
      >
        {product.category.name}
      </Link>

      <h1 className="mt-4 max-w-xl text-3xl font-medium uppercase leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl xl:text-[44px]">
        {product.name}
      </h1>

      <div className="mt-5">
        <ProductPrice
          price={product.price}
          comparePrice={product.comparePrice}
        />
      </div>

      {(product.baseProduct.fit ||
        product.baseProduct.gsm ||
        product.baseProduct.material) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
          {product.baseProduct.fit && <span>{product.baseProduct.fit}</span>}

          {product.baseProduct.fit && product.baseProduct.gsm && (
            <span aria-hidden="true">/</span>
          )}

          {product.baseProduct.gsm && (
            <span>{product.baseProduct.gsm} GSM</span>
          )}

          {(product.baseProduct.fit || product.baseProduct.gsm) &&
            product.baseProduct.material && <span aria-hidden="true">/</span>}

          {product.baseProduct.material && (
            <span>{product.baseProduct.material}</span>
          )}
        </div>
      )}

      {product.description && (
        <div className="mt-8 border-t border-black/10 pt-7">
          <p className="max-w-lg text-sm leading-7 text-neutral-600">
            {product.description}
          </p>
        </div>
      )}

      <ProductPurchasePanel
        product={product}
        selectedProductColorId={selectedProductColorId}
        selectedVariantId={selectedVariantId}
        onColorChange={onColorChange}
        onVariantChange={onVariantChange}
      />

      <div className="mt-9 border-t border-black/10">
        <ProductDetailRow
          label="Material"
          value={product.baseProduct.material}
        />

        {product.baseProduct.fabricComposition && (
          <ProductDetailRow
            label="Composition"
            value={product.baseProduct.fabricComposition}
          />
        )}

        {product.baseProduct.gsm != null && (
          <ProductDetailRow
            label="Weight"
            value={`${product.baseProduct.gsm} GSM`}
          />
        )}

        {product.baseProduct.fit && (
          <ProductDetailRow label="Fit" value={product.baseProduct.fit} />
        )}
      </div>

      {product.careInstructions && (
        <div className="border-t border-black/10 py-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-950">
            Care
          </h2>

          <p className="mt-3 max-w-lg whitespace-pre-line text-sm leading-6 text-neutral-500">
            {product.careInstructions}
          </p>
        </div>
      )}

      <div className="border-t border-black/10 py-6">
        <div className="flex items-center justify-between gap-6">
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
            Product code
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-700">
            {product.sku}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ProductDetailRowProps {
  label: string;
  value?: string | null;
}

function ProductDetailRow({ label, value }: ProductDetailRowProps) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-8 border-b border-black/10 py-4">
      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </span>

      <span className="text-right text-xs font-medium uppercase tracking-[0.08em] text-neutral-800">
        {value}
      </span>
    </div>
  );
}

import { calculateDiscountPercentage } from "@/features/products/utils/product.utils";
import { formatCurrency } from "@/lib/utils/currency";

interface ProductPriceProps {
  price: number;
  comparePrice?: number | null;
  discount?: number | null;
}

export function ProductPrice({
  price,
  comparePrice,
  discount,
}: ProductPriceProps) {
  const hasDiscount = discount !== null && discount! > 0;

  return (
    <div className="flex items-center gap-2">
      <span
        className={
          hasDiscount
            ? "text-sm text-neutral-400 line-through"
            : "font-semibold text-neutral-950"
        }
      >
        {formatCurrency(price)}
      </span>

      {hasDiscount && (
        <span
          className={
            !hasDiscount
              ? "text-sm text-neutral-400 line-through"
              : "font-semibold text-neutral-950"
          }
        >
          {formatCurrency(comparePrice!)}
        </span>
      )}
    </div>
  );
}

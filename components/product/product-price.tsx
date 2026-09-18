import { formatCurrency } from "@/lib/utils/currency";

interface ProductPriceProps {
  price: number;
  comparePrice?: number | null;
}

export function ProductPrice({ price, comparePrice }: ProductPriceProps) {
  const hasDiscount =
    comparePrice !== null && comparePrice !== undefined && comparePrice > price;

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-neutral-950">
        {formatCurrency(price)}
      </span>

      {hasDiscount && (
        <span className="text-sm text-neutral-400 line-through">
          {formatCurrency(comparePrice)}
        </span>
      )}
    </div>
  );
}

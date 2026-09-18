import { env } from "@/config/env";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(env.locale, {
    style: "currency",
    currency: env.currency,
    minimumFractionDigits: 2,
  }).format(value);
}

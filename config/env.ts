const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
}

export const env = {
  apiBaseUrl,
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Furniture Store",
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? "LKR",
  locale: process.env.NEXT_PUBLIC_LOCALE ?? "en-LK",
} as const;

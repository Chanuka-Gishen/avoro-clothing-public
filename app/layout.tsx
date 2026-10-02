import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "./providers";

import "./globals.css";

const SITE_URL = "https://www.avoroclothing.lk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AVORO | Clothing for the Unbound",
    template: "%s | AVORO",
  },

  description:
    "Discover AVORO streetwear - premium clothing designed for those who move beyond convention. Clothing for the unbound.",

  applicationName: "AVORO",

  keywords: [
    "AVORO",
    "AVORO clothing",
    "streetwear Sri Lanka",
    "Sri Lankan streetwear",
    "oversized t-shirts",
    "baggy t-shirts",
    "premium streetwear",
    "clothing Sri Lanka",
  ],

  authors: [{ name: "AVORO" }],
  creator: "AVORO",
  publisher: "AVORO",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: SITE_URL,
    siteName: "AVORO",
    title: "AVORO | Clothing for the Unbound",
    description:
      "Premium streetwear designed for those who move beyond convention. Clothing for the unbound.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AVORO — Clothing for the Unbound",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AVORO | Clothing for the Unbound",
    description:
      "Premium streetwear designed for those who move beyond convention.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "fashion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://avoro.lk"),

  title: "AVORO | Coming Soon",
  description:
    "AVORO is coming soon. Premium streetwear designed for those who move differently.",

  openGraph: {
    title: "AVORO | Coming Soon",
    description: "Premium streetwear. Built differently. AVORO is coming soon.",
    url: "https://avoro.lk",
    siteName: "AVORO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AVORO — Coming Soon",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AVORO | Coming Soon",
    description: "Premium streetwear. Built differently. AVORO is coming soon.",
    images: ["/og-image.jpg"],
  },
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

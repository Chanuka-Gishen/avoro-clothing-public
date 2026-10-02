import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account/",
        "/checkout/",
        "/cart/",
        "/wishlist/",
        "/login/",
        "/register/",
        "/forgot-password/",
        "/guest/",
        "/order-confirmation/",
        "/reset-password",
      ],
    },

    sitemap: "https://www.avoroclothing.lk/sitemap.xml",
  };
}

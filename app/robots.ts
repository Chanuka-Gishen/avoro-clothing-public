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
      ],
    },

    sitemap: "https://avoro.lk/sitemap.xml",
  };
}

// src/config/site.ts

export const siteConfig = {
  name: "Avoro Furniture Store",
  description: "Premium furniture for modern living.",

  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "New Arrivals",
      href: "/shop?sort=newest",
    },
  ],

  contact: {
    phone: "",
    email: "",
  },

  social: {
    facebook: "",
    instagram: "",
  },
} as const;

export const siteConfig = {
  name: "Avoro Clothing",
  description: "Clothing for the unbound.",

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
    phone: "+94 76 077 4708",
    email: "avoroclothing@gmail.com",
    whatsapp: "94760774708",
  },

  social: {
    facebook: "https://www.facebook.com/people/Avoro-Clothing/61591664553357/",
    instagram: "https://www.instagram.com/clothingavoro",
    tiktok: "",
  },
} as const;

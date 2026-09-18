// import { CategorySection } from "@/components/home/category-section";
// import { FeaturedProductsSection } from "@/components/home/featured-products-section";
// import { HeroSection } from "@/components/home/hero-section";
// import { NewArrivalsSection } from "@/components/home/new-arrivals-section";

// import { getCategories } from "@/features/categories/api/category.api";
// import { getProducts } from "@/features/products/api/product.api";

// export default async function HomePage() {
//   const [categoriesResult, featuredResult, newestResult] = await Promise.all([
//     getCategories(),

//     getProducts({
//       page: 1,
//       limit: 8,
//       featured: true,
//     }),

//     getProducts({
//       page: 1,
//       limit: 8,
//       sort: "newest",
//     }),
//   ]);

//   const categories = categoriesResult.response ?? [];

//   const featuredProducts = featuredResult.response?.data ?? [];

//   const newestProducts = newestResult.response?.data ?? [];

//   return (
//     <>
//       <HeroSection />

//       <CategorySection categories={categories} />

//       <FeaturedProductsSection products={featuredProducts} />

//       <NewArrivalsSection products={newestProducts} />
//     </>
//   );
// }

import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />
      </div>

      {/* Top */}
      <header className="absolute left-0 top-0 z-10 flex w-full items-center justify-between px-6 py-7 md:px-12 md:py-9">
        <Image
          src="/logo-light.png"
          alt="AVORO"
          width={150}
          height={50}
          priority
          className="h-auto w-[110px] object-contain md:w-[140px]"
        />

        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
          Est. 2026
        </span>
      </header>

      {/* Main content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.5em] text-white/45 md:text-xs">
            AVORO / Coming Soon
          </p>

          <h1 className="text-5xl font-medium uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-8xl lg:text-[110px]">
            Clothing for
            <br />
            the unbound.
          </h1>

          <div className="mx-auto my-8 h-px w-12 bg-white/40 md:my-10" />

          <p className="mx-auto max-w-md text-sm leading-6 text-white/50 md:text-base md:leading-7">
            A new expression of streetwear is taking shape.
            <br className="hidden sm:block" />
            Designed beyond convention. Made to move your way.
          </p>

          <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.45em] text-white/35">
            First Drop · Coming Soon
          </p>
        </div>
      </section>

      {/* Bottom */}
      <footer className="absolute bottom-0 left-0 z-10 flex w-full items-end justify-between px-6 py-7 md:px-12 md:py-9">
        <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 md:text-[10px]">
          © {new Date().getFullYear()} AVORO
        </p>

        <p className="hidden text-right text-[9px] uppercase tracking-[0.25em] text-white/30 sm:block md:text-[10px]">
          Sri Lanka
        </p>
      </footer>
    </main>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[680px] overflow-hidden bg-[#d1d1d3] md:min-h-[700px] lg:min-h-[760px]"
      aria-labelledby="hero-heading"
    >
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet="/images/hero/avoro-hero-mobile.png"
        />

        <img
          src="/images/hero/avoro-hero.png"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent md:hidden"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1600px] items-end px-5 pb-10 md:min-h-[700px] md:items-center md:px-8 md:pb-0 lg:min-h-[760px] lg:px-12 xl:px-16">
        <div className="max-w-[600px] text-white md:text-neutral-950">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/80 md:text-neutral-700">
            AVORO / New Collection
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-[46px] font-medium uppercase leading-[0.9] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[82px]"
          >
            Clothing for
            <br />
            the unbound.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/80 md:mt-6 md:text-base md:leading-7 md:text-neutral-700">
            Premium streetwear designed beyond convention. Built for comfort,
            movement, and self-expression.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
            <Link
              href={ROUTES.SHOP}
              className="inline-flex h-12 items-center gap-3 bg-white px-6 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-neutral-200 md:bg-black md:text-white md:hover:bg-neutral-800"
            >
              Shop now
              <ArrowRight
                className="size-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/shop?sort=newest"
              className="inline-flex h-12 items-center border border-white px-6 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black md:border-black md:text-black md:hover:bg-black md:hover:text-white"
            >
              New arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

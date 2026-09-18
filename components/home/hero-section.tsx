import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";

export function HeroSection() {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center overflow-hidden rounded-3xl bg-neutral-100 px-6 py-16 sm:px-10 lg:min-h-[640px] lg:px-16">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Modern living
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-7xl">
            Furniture made for the way you live.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
            Thoughtfully designed furniture that brings comfort, function, and
            character into your home.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ROUTES.SHOP}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Shop collection
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/shop?sort=newest"
              className="inline-flex h-12 items-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
            >
              New arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

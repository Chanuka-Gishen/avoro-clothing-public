import Image from "next/image";
import Link from "next/link";

import { routePaths, ROUTES } from "@/config/routes";
import type { Category } from "@/features/categories/types/category.types";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <section
      className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16"
      aria-labelledby="categories-heading"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            Explore AVORO
          </p>

          <h2
            id="categories-heading"
            className="mt-3 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl"
          >
            Shop by category
          </h2>
        </div>

        <Link
          href={ROUTES.SHOP}
          className="group hidden items-center gap-2 border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950 sm:inline-flex"
        >
          Shop all
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
        {categories.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            href={routePaths.shopCategory(category.slug)}
            className="group block"
          >
            <article>
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={`${category.name} clothing collection`}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-neutral-100">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                      {category.name}
                    </span>
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950 sm:text-sm">
                  {category.name}
                </h3>

                <ArrowRight
                  className="size-4 shrink-0 text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-950"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-10 sm:hidden">
        <Link
          href={ROUTES.SHOP}
          className="inline-flex items-center gap-2 border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950"
        >
          Shop all
          <ArrowRight
            className="size-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}

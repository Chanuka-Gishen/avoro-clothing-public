import Image from "next/image";
import Link from "next/link";

import { routePaths } from "@/config/routes";
import type { Category } from "@/features/categories/types/category.types";

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Browse
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Shop by category
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            href={routePaths.shopCategory(category.slug)}
            className="group"
          >
            <article>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                    {category.name}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="font-medium text-neutral-950">
                  {category.name}
                </h3>

                <span className="text-sm text-neutral-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

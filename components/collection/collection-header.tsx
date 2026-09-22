import { Category } from "@/features/categories/types/category.types";
import Image from "next/image";

interface CollectionHeaderProps {
  category: Category;
}

export function CollectionHeader({ category }: CollectionHeaderProps) {
  if (category.image) {
    return (
      <header className="relative overflow-hidden bg-neutral-950">
        <div className="relative h-[52vh] min-h-[420px] max-h-[680px]">
          <Image
            src={category.image}
            alt={`${category.name} collection by AVORO`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1600px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16 xl:px-16">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 sm:text-xs">
                AVORO / Collection
              </p>

              <h1 className="mt-3 text-4xl font-medium uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-400 sm:text-xs">
          AVORO / Collection
        </p>

        <h1 className="mt-3 text-4xl font-medium uppercase tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
          {category.name}
        </h1>

        {category.description && (
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
            {category.description}
          </p>
        )}
      </div>
    </header>
  );
}

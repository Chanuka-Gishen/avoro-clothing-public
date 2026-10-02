import { routePaths } from "@/config/routes";
import { getCategories } from "@/features/categories/api/category.api";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://www.avoroclothing.lk";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore all AVORO clothing collections, from oversized streetwear to everyday essentials. Clothing for the unbound.",
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    type: "website",
    url: "/collections",
    title: "AVORO Collections",
    description:
      "Explore all AVORO clothing collections and discover premium streetwear designed for the unbound.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AVORO Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVORO Collections",
    description:
      "Explore all AVORO clothing collections and discover premium streetwear designed for the unbound.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function CollectionsPage() {
  const result = await getCategories();

  const categories = result.response ?? [];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AVORO Collections",
    description:
      "Explore all AVORO clothing collections and premium streetwear.",
    url: `${SITE_URL}/collections`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${SITE_URL}${routePaths.collection(category.slug)}`,
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            Explore AVORO
          </p>

          <h1 className="mt-4 text-4xl font-medium uppercase tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
            Collections
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Explore every AVORO collection. Built around comfort, movement, and
            expression for those who move beyond convention.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section
        aria-labelledby="all-collections-heading"
        className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16"
      >
        <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-5 sm:mb-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-400">
              Shop by category
            </p>

            <h2
              id="all-collections-heading"
              className="mt-2 text-xl font-medium uppercase tracking-[-0.02em] text-neutral-950 sm:text-2xl"
            >
              All Collections
            </h2>
          </div>

          {categories.length > 0 && (
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400 sm:block">
              {categories.length}{" "}
              {categories.length === 1 ? "Collection" : "Collections"}
            </p>
          )}
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CollectionCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="border-y border-neutral-200 py-20 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              No collections available
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function CollectionCard({
  category,
}: {
  category: {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
    imageUrl?: string | null;
    description?: string | null;
  };
}) {
  const image = category.image ?? category.imageUrl ?? null;

  return (
    <article className="group">
      <Link
        href={routePaths.collection(category.slug)}
        className="block"
        aria-label={`Shop ${category.name}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {image ? (
            <Image
              src={image}
              alt={`${category.name} collection by AVORO`}
              fill
              sizes="
                (max-width: 767px) 50vw,
                (max-width: 1023px) 33vw,
                25vw
              "
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-300">
                AVORO
              </span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium uppercase tracking-[0.04em] text-neutral-950 sm:text-base">
            {category.name}
          </h3>

          {category.description && (
            <p className="mt-1.5 line-clamp-2 max-w-sm text-xs leading-5 text-neutral-500 sm:text-sm">
              {category.description}
            </p>
          )}

          <span className="mt-3 inline-block border-b border-neutral-950 pb-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-950 transition-opacity group-hover:opacity-50 sm:text-[10px]">
            Shop collection
          </span>
        </div>
      </Link>
    </article>
  );
}

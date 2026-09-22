import { Metadata } from "next";

import { notFound } from "next/navigation";

import { ProductDetailsClient } from "@/components/product/product-details-client";
import { RelatedProducts } from "@/components/product/related-products";
import {
  getCachedProductBySlug,
  getProductBySlug,
  getProducts,
} from "@/features/products/api/product.api";
import { routePaths } from "@/config/routes";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getProductImage(
  product: Awaited<ReturnType<typeof getProductBySlug>>["response"],
) {
  if (!product) {
    return null;
  }

  return (
    product.images?.[0] ??
    product.colors?.find((productColor) => productColor.images?.length)
      ?.images?.[0] ??
    null
  );
}

function getProductDescription(
  product: NonNullable<
    Awaited<ReturnType<typeof getProductBySlug>>["response"]
  >,
) {
  // return (
  //   product.metaDescription?.trim() ||
  //   product.description?.trim() ||
  //   `Shop ${product.name} by AVORO. Premium streetwear designed for the unbound.`
  // );
  return `Shop ${product.name} by AVORO. Premium streetwear designed for the unbound.`;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const result = await getCachedProductBySlug(slug);
  const product = result;

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getProductDescription(product);
  const primaryImage = getProductImage(product);

  return {
    title: product.metaTitle?.trim() || product.name,

    description,

    keywords: product.metaTags?.length > 0 ? product.metaTags : undefined,

    alternates: {
      canonical: routePaths.product(product.slug),
    },

    openGraph: {
      type: "website",
      url: routePaths.product(product.slug),
      title: product.metaTitle?.trim() || product.name,
      description,
      siteName: "AVORO",

      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              alt: primaryImage.alt || product.name,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: product.metaTitle?.trim() || product.name,
      description,

      images: primaryImage ? [primaryImage.url] : undefined,
    },

    robots: {
      index: product.isActive,
      follow: product.isActive,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const result = await getCachedProductBySlug(slug);

  const product = result;

  if (!product) {
    notFound();
  }

  const relatedResult = await getProducts({
    page: 1,
    limit: 5,
    categorySlug: product.category.slug,
  });

  const relatedProducts =
    relatedResult.response?.data
      ?.filter((item) => item.id !== product.id)
      .slice(0, 4) ?? [];

  const productImages = [
    ...product.images,
    ...product.colors.flatMap((productColor) => productColor.images ?? []),
  ];

  const uniqueImageUrls = [...new Set(productImages.map((image) => image.url))];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,
    description: getProductDescription(product),

    sku: product.sku,

    ...(product.barcode && {
      gtin: product.barcode,
    }),

    ...(uniqueImageUrls.length > 0 && {
      image: uniqueImageUrls,
    }),

    brand: {
      "@type": "Brand",
      name: "AVORO",
    },

    category: product.category.name,

    offers: {
      "@type": "Offer",

      url: `https://avoro.lk/products/${product.slug}`,

      priceCurrency: "LKR",
      price: product.price,

      availability: product.baseProduct.variants.some(
        (variant) =>
          variant.isActive && variant.inStock && variant.availableQuantity > 0,
      )
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ProductDetailsClient product={product} />

        <RelatedProducts products={relatedProducts} />
      </div>
    </>
  );
}

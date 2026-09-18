"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { ProductImage } from "@/features/products/types/product.types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const selectedImage = images[selectedIndex];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        {selectedImage?.url ? (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image available
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, index) => {
            const selected = selectedIndex === index;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-neutral-100 transition ${
                  selected
                    ? "border-neutral-950"
                    : "border-transparent hover:border-neutral-300"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

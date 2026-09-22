"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type UIEvent } from "react";

import type { ProductImage } from "@/features/products/types/product.types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    setActiveIndex(0);

    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "instant",
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (window.matchMedia("(min-width: 640px)").matches) {
      galleryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [images]);

  if (!images.length) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center bg-neutral-100">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Image unavailable
        </span>
      </div>
    );
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const container = event.currentTarget;

    if (!container.clientWidth) {
      return;
    }

    const index = Math.round(container.scrollLeft / container.clientWidth);

    setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
  }

  return (
    <div ref={galleryRef} className="scroll-mt-24">
      {/* Mobile carousel */}
      <div className="sm:hidden">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[3/4] w-full shrink-0 snap-center bg-[#f3f3f1]"
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} product image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile pagination */}
        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              {images.map((image, index) => (
                <span
                  key={image.id}
                  className={`h-[2px] transition-all duration-300 ${
                    activeIndex === index
                      ? "w-6 bg-neutral-950"
                      : "w-2.5 bg-neutral-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-[10px] font-medium tracking-[0.12em] text-neutral-400">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Desktop gallery */}
      <div className="hidden grid-cols-2 gap-1 sm:grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden bg-[#f3f3f1] ${
              index === 0 ? "col-span-2" : ""
            }`}
          >
            <div
              className={
                index === 0 ? "relative aspect-[3/2]" : "relative aspect-[3/4]"
              }
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} product image ${index + 1}`}
                fill
                priority={index === 0}
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 60vw"
                    : "(max-width: 1024px) 50vw, 30vw"
                }
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

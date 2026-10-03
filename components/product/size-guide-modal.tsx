"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface SizeGuideModalProps {
  open: boolean;
  image: string;
  productName: string;
  onClose: () => void;
}

export function SizeGuideModal({
  open,
  image,
  productName,
  onClose,
}: SizeGuideModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex h-[100dvh] items-center justify-center overflow-hidden bg-black/60 p-4 backdrop-blur-[2px] sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} size guide`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-4rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 bg-white px-5 sm:px-6">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400">
              AVORO
            </p>

            <h2 className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950">
              Size guide
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="flex size-9 items-center justify-center transition-opacity hover:opacity-50"
          >
            <X className="size-5" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        {/* Size chart */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-3 sm:p-5">
          <Image
            src={image}
            alt={`${productName} size guide`}
            width={1200}
            height={1600}
            sizes="(max-width: 768px) calc(100vw - 32px), 768px"
            className="h-auto w-auto max-h-[calc(100dvh-7rem)] max-w-full object-contain sm:max-h-[calc(100dvh-10rem)]"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

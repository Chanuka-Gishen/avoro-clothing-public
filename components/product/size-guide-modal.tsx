"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

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
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px] sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} size guide`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 px-5 sm:px-6">
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
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="relative mx-auto min-h-[400px] w-full">
            <Image
              src={image}
              alt={`${productName} size guide`}
              width={1200}
              height={1600}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({
  value,
  min = 1,
  max,
  onChange,
}: QuantitySelectorProps) {
  function decrease() {
    if (value <= min) {
      return;
    }

    onChange(value - 1);
  }

  function increase() {
    if (max !== undefined && value >= max) {
      return;
    }

    onChange(value + 1);
  }

  return (
    <div className="inline-flex h-11 items-center rounded-lg border border-neutral-300 bg-white">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex size-10 items-center justify-center text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>

      <span className="min-w-10 text-center text-sm font-medium text-neutral-950">
        {value}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={max !== undefined && value >= max}
        aria-label="Increase quantity"
        className="flex size-10 items-center justify-center text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

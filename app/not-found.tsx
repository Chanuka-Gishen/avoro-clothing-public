import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center border-b border-neutral-200 lg:min-h-[calc(100vh-4.5rem)]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
              AVORO / Error
            </p>

            <p
              aria-hidden="true"
              className="mt-5 text-[clamp(7rem,22vw,17rem)] font-medium leading-[0.75] tracking-[-0.08em] text-neutral-950"
            >
              404
            </p>
          </div>

          <div className="max-w-xl lg:pb-2">
            <h1 className="text-3xl font-medium uppercase tracking-[-0.035em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Page not found
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-500 sm:text-base">
              The page you&apos;re looking for may have been moved, removed, or
              no longer exists.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ROUTES.HOME}
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-neutral-950 px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
              >
                Back to home
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>

              <Link
                href={ROUTES.SHOP}
                className="inline-flex min-h-12 items-center justify-center border border-neutral-300 px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-950 transition-colors hover:border-neutral-950"
              >
                Shop AVORO
              </Link>
            </div>

            <div className="mt-10 border-t border-neutral-200 pt-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                Or explore
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href={ROUTES.COLLECTIONS}
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-opacity hover:opacity-50"
                >
                  Collections
                </Link>

                <Link
                  href={ROUTES.WISHLIST}
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-opacity hover:opacity-50"
                >
                  Wishlist
                </Link>

                <Link
                  href={ROUTES.CART}
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-opacity hover:opacity-50"
                >
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

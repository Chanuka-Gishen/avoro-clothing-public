import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";

export function StoreFooter() {
  const year = new Date().getFullYear();

  const whatspHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(
    /\D/g,
    "",
  )}?text=${encodeURIComponent(
    "Hi AVORO, I'd like to know more about your products.",
  )}`;

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-4">
            <Link
              href={ROUTES.HOME}
              className="text-xl font-semibold uppercase tracking-[0.08em] text-white"
            >
              {siteConfig.name}
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-400">
              {siteConfig.description}
            </p>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Shop
            </h3>

            <nav className="mt-5 flex flex-col items-start gap-3.5 text-sm text-neutral-400">
              <Link
                href={ROUTES.SHOP}
                className="transition-colors hover:text-white"
              >
                All Products
              </Link>

              <Link
                href="/shop?sort=newest"
                className="transition-colors hover:text-white"
              >
                New Arrivals
              </Link>

              <Link
                href={ROUTES.WISHLIST}
                className="transition-colors hover:text-white"
              >
                Wishlist
              </Link>
            </nav>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Account
            </h3>

            <nav className="mt-5 flex flex-col items-start gap-3.5 text-sm text-neutral-400">
              <Link
                href={ROUTES.ACCOUNT}
                className="transition-colors hover:text-white"
              >
                My Account
              </Link>

              <Link
                href={ROUTES.ACCOUNT_ORDERS}
                className="transition-colors hover:text-white"
              >
                Orders
              </Link>

              <Link
                href={ROUTES.CART}
                className="transition-colors hover:text-white"
              >
                Cart
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Follow
            </h3>

            <div className="mt-5 flex flex-col items-start gap-3.5 text-sm text-neutral-400">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook
                </a>
              )}

              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              )}

              {siteConfig.social.tiktok && (
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  TikTok
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Contact
            </h3>

            <div className="mt-5 flex flex-col items-start gap-3.5 text-sm text-neutral-400">
              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              )}

              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              )}

              {siteConfig.contact.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(
                    /\D/g,
                    "",
                  )}?text=${encodeURIComponent(
                    "Hi AVORO, I'd like to know more about your products.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center justify-center border border-neutral-700 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:text-neutral-950"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-[10px] uppercase tracking-[0.1em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href={ROUTES.PRIVACY}
              className="transition-colors hover:text-neutral-300"
            >
              Privacy Policy
            </Link>

            <Link
              href={ROUTES.TERMS}
              className="transition-colors hover:text-neutral-300"
            >
              Terms & Conditions
            </Link>
            <Link
              href={ROUTES.SHIPPING}
              className="transition-colors hover:text-neutral-300"
            >
              Shipping & Delivery
            </Link>
            <Link
              href={ROUTES.RETURNS}
              className="transition-colors hover:text-neutral-300"
            >
              Returns & Exchanges
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

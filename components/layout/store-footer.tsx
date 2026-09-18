import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";

export function StoreFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href={ROUTES.HOME} className="text-xl font-semibold text-white">
            {siteConfig.name}
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
            Premium furniture designed for comfortable, modern living.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Shop</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href={ROUTES.SHOP} className="hover:text-white">
              All Products
            </Link>

            <Link href="/shop?sort=newest" className="hover:text-white">
              New Arrivals
            </Link>

            <Link href={ROUTES.WISHLIST} className="hover:text-white">
              Wishlist
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Account</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href={ROUTES.ACCOUNT} className="hover:text-white">
              My Account
            </Link>

            <Link href={ROUTES.ACCOUNT_ORDERS} className="hover:text-white">
              Orders
            </Link>

            <Link href={ROUTES.CART} className="hover:text-white">
              Cart
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>

          <div className="mt-4 space-y-3 text-sm text-neutral-400">
            {siteConfig.contact.phone && <p>{siteConfig.contact.phone}</p>}

            {siteConfig.contact.email && <p>{siteConfig.contact.email}</p>}

            {!siteConfig.contact.phone && !siteConfig.contact.email && (
              <p>Contact information will be available soon.</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href={ROUTES.PRIVACY} className="hover:text-neutral-300">
              Privacy
            </Link>

            <Link href={ROUTES.TERMS} className="hover:text-neutral-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

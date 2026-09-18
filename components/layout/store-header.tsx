import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { AccountMenu } from "./account-menu";
import { CartButton } from "./cart-button";
import { WishlistButton } from "./wishlist-button";

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <MobileNav />

          <Link
            href={ROUTES.HOME}
            className="text-xl font-semibold tracking-tight text-neutral-950"
          >
            {siteConfig.name}
          </Link>
        </div>

        <DesktopNav />

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href={ROUTES.SHOP}
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
          >
            <Search className="size-5" />
          </Link>

          <WishlistButton />

          <AccountMenu />

          <CartButton />
        </div>
      </div>
    </header>
  );
}

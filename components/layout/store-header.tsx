import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { ROUTES } from "@/config/routes";
import { WishlistButton } from "./wishlist-button";
import { AccountMenu } from "./account-menu";
import { CartButton } from "./cart-button";

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center px-4 sm:px-6 lg:h-[72px] lg:px-10 xl:px-12">
        {/* Mobile menu */}
        <div className="flex flex-1 items-center lg:hidden">
          <MobileNav />
        </div>

        <div className="hidden flex-1 items-center lg:flex">
          <DesktopNav />
        </div>

        <Link
          href={ROUTES.HOME}
          aria-label="AVORO Home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/logo-dark.png"
            alt="AVORO"
            width={400}
            height={120}
            priority
            className="h-6 w-auto object-contain lg:h-8"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
          <Link
            href={ROUTES.SHOP}
            aria-label="Search products"
            className="flex size-10 items-center justify-center transition-opacity hover:opacity-50"
          >
            <Search strokeWidth={1.6} className="size-[19px]" />
          </Link>

          <WishlistButton />

          <AccountMenu />

          <CartButton />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

import { siteConfig } from "@/config/site";

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {siteConfig.navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

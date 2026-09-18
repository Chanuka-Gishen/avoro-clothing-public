"use client";

import { LayoutDashboard, LogOut, Package, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { useLogout } from "@/features/auth/hooks/use-logout";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    label: "Overview",
    href: ROUTES.ACCOUNT,
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: ROUTES.ACCOUNT_ORDERS,
    icon: Package,
  },
  {
    label: "Profile",
    href: ROUTES.ACCOUNT_PROFILE,
    icon: UserRound,
  },
];

export function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <h1 className="text-xl font-semibold text-neutral-950">My account</h1>

          <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === ROUTES.ACCOUNT
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  <Icon className="size-4" />

                  {item.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={logout}
              className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </nav>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}

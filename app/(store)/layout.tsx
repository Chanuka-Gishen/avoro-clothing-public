import type { ReactNode } from "react";

import { StoreHeader } from "@/components/layout/store-header";
import { StoreFooter } from "@/components/layout/store-footer";

interface StoreLayoutProps {
  children: ReactNode;
}

export default function StoreLayout({ children }: Readonly<StoreLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreHeader />

      <main className="flex-1">{children}</main>

      <StoreFooter />
    </div>
  );
}

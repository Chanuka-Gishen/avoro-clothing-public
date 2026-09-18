// src/app/(store)/checkout/layout.tsx

import { AuthGuard } from "@/components/auth/auth-guard";
import type { ReactNode } from "react";

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function CheckoutLayout({
  children,
}: Readonly<CheckoutLayoutProps>) {
  return <AuthGuard>{children}</AuthGuard>;
}

import type { ReactNode } from "react";

import { AccountLayout } from "@/components/account/account-layout";
import { AuthGuard } from "@/components/auth/auth-guard";

interface AccountRouteLayoutProps {
  children: ReactNode;
}

export default function AccountRouteLayout({
  children,
}: Readonly<AccountRouteLayoutProps>) {
  return (
    <AuthGuard>
      <AccountLayout>{children}</AccountLayout>
    </AuthGuard>
  );
}

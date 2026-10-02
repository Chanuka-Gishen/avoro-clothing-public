import { AuthUser, CustomerStatus } from "@/features/auth/types/auth.types";
import {
  AlertCircle,
  CheckCircle2,
  CircleX,
  Mail,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";

interface AccountStatusProps {
  user: AuthUser;
}

export function AccountStatus({ user }: AccountStatusProps) {
  // TOFO - isActive = ACTIVE
  const isActive =
    user.status !== CustomerStatus.BLOCKED &&
    user.status !== CustomerStatus.SUSPENDED;

  // TODO - add mobile verification
  const canOrder = isActive && user.isEmailVerified;

  return (
    <div className="rounded-xl border border-neutral-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-neutral-950">Account status</h3>

          <p className="mt-1 text-sm text-neutral-500">
            Complete these requirements before placing an order.
          </p>
        </div>

        {canOrder ? (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            Ready to order
          </span>
        ) : (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Action required
          </span>
        )}
      </div>

      <div className="mt-5 divide-y divide-neutral-100">
        <StatusItem
          icon={UserRoundCheck}
          label="Account"
          completed={isActive}
          completedText="Active"
          incompleteText="Not active"
        />

        <StatusItem
          icon={Mail}
          label="Email"
          completed={user.isEmailVerified}
          completedText="Verified"
          incompleteText="Not verified"
        />

        {/* <StatusItem
          icon={Smartphone}
          label="Mobile number"
          completed={user.isMobileVerified}
          completedText="Verified"
          incompleteText="Not verified"
        /> */}
      </div>

      {!canOrder && (
        <div className="mt-4 flex gap-2 rounded-lg bg-amber-50 p-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-700" />

          <p className="text-xs leading-5 text-amber-800">
            Your account must be active and both your email and mobile number
            must be verified before you can place an order.
          </p>
        </div>
      )}
    </div>
  );
}

function StatusItem({
  icon: Icon,
  label,
  completed,
  completedText,
  incompleteText,
}: {
  icon: React.ElementType;
  label: string;
  completed: boolean;
  completedText: string;
  incompleteText: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <div className="flex size-9 items-center justify-center rounded-full bg-neutral-100">
        <Icon className="size-4 text-neutral-600" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
      </div>

      <div className="flex items-center gap-1.5">
        {completed ? (
          <CheckCircle2 className="size-4 text-green-600" />
        ) : (
          <CircleX className="size-4 text-amber-600" />
        )}

        <span
          className={
            completed
              ? "text-xs font-medium text-green-700"
              : "text-xs font-medium text-amber-700"
          }
        >
          {completed ? completedText : incompleteText}
        </span>
      </div>
    </div>
  );
}

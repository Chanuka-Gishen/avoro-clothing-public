"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  type FieldErrors,
  type UseFormRegister,
  useForm,
} from "react-hook-form";

import { PaymentMethodSection } from "@/components/checkout/payment-method-section";
import { routePaths } from "@/config/routes";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/features/checkout/schemas/checkout.schema";
import { useCreateOrder } from "@/features/orders/hooks/use-orders";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { CreateOrderPayload } from "@/features/checkout/types/checkout.types";
import {
  useSendGuestOtp,
  useVerifyGuestOtp,
} from "@/features/orders/hooks/use-guest-otp";
import { useEffect, useRef, useState } from "react";
import { CustomerStatus } from "@/features/auth/types/auth.types";

interface AddressSectionProps {
  title: string;

  prefix: "shippingAddress" | "billingAddress";

  register: UseFormRegister<CheckoutFormValues>;

  errors?: FieldErrors<{
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }>;
}

export function CheckoutForm() {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const user = useAuthStore((state) => state.user);

  const createOrder = useCreateOrder();

  const sendOtp = useSendGuestOtp();
  const verifyOtp = useVerifyGuestOtp();

  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [formError, setFormError] = useState("");

  const verifiedMobileRef = useRef<string | null>(null);

  const canCheckout =
    user?.status === CustomerStatus.ACTIVE &&
    user.isEmailVerified &&
    user.isMobileVerified;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      mobile: user?.mobile ?? "",

      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "Sri Lanka",
      },

      paymentMethodId: "",
      notes: "",
    },
  });

  const useDifferentBillingAddress = watch("useDifferentBillingAddress");
  const mobile = watch("mobile");

  async function handleSendOtp() {
    if (!mobile) {
      return;
    }

    const normalizedMobile = mobile.trim();

    if (!/^07\d{8}$/.test(normalizedMobile)) {
      return;
    }

    try {
      await sendOtp.mutateAsync({
        mobile: normalizedMobile,
      });

      setOtpSent(true);
      setMobileVerified(false);
      setOtpCode("");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleVerifyOtp() {
    if (!mobile || !otpCode) {
      return;
    }

    try {
      await verifyOtp.mutateAsync({
        mobile: mobile.trim(),
        code: otpCode.trim(),
      });

      verifiedMobileRef.current = mobile.trim();

      setMobileVerified(true);
      setFormError("");
    } catch (error) {
      setFormError(getApiErrorMessage(error));

      setMobileVerified(false);
    }
  }

  async function onSubmit(values: CheckoutFormValues) {
    const payload: CreateOrderPayload = {
      shippingAddress: values.shippingAddress,

      billingAddress: values.billingAddress,

      paymentMethodId: values.paymentMethodId,

      notes: values.notes?.trim() || undefined,
    };

    if (!isAuthenticated) {
      if (
        !values.firstName ||
        !values.lastName ||
        !values.email ||
        !values.mobile
      ) {
        setFormError("Please complete your contact information.");

        return;
      }

      if (!mobileVerified) {
        setFormError(
          "Please verify your mobile number before placing the order.",
        );

        return;
      }

      payload.firstName = values.firstName!.trim();
      payload.lastName = values.lastName!.trim();
      payload.email = values.email!.trim();
      payload.mobile = values.mobile!.trim();
    }

    try {
      const result = await createOrder.mutateAsync(payload);

      const order = result.response;

      if (!order) {
        throw new Error("Invalid order response.");
      }

      router.replace(routePaths.orderConfirmation(order.id));
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  }

  useEffect(() => {
    if (!verifiedMobileRef.current) {
      return;
    }

    if (mobile?.trim() !== verifiedMobileRef.current) {
      setMobileVerified(false);
      setOtpSent(false);
      setOtpCode("");

      verifiedMobileRef.current = null;
    }
  }, [mobile]);

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10"
    >
      {isAuthenticated && !canCheckout && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-900">
            Complete your account verification
          </p>

          <p className="mt-1 text-sm leading-6 text-amber-700">
            Your account must be active and your email and mobile number must be
            verified before you can place an order.
          </p>
        </div>
      )}
      {formError && (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}
      {!isAuthenticated && (
        <section className="rounded-xl border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold text-neutral-950">
            Contact information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            We’ll use these details for this order.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-neutral-900"
              >
                First name
              </label>

              <input
                id="firstName"
                {...register("firstName")}
                className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />

              {errors.firstName?.message && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-neutral-900"
              >
                Last name
              </label>

              <input
                id="lastName"
                {...register("lastName")}
                className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />

              {errors.lastName?.message && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-900"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />

              {errors.email?.message && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="mb-2 block text-sm font-medium text-neutral-900"
              >
                Mobile number
              </label>

              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="07xxxxxxxx"
                autoComplete="tel"
                {...register("mobile")}
                className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />

              {errors.mobile?.message && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {!isAuthenticated && (
              <div className="mt-3">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={
                      sendOtp.isPending ||
                      !mobile ||
                      !/^07\d{8}$/.test(mobile.trim())
                    }
                    className="text-sm font-medium text-neutral-950 underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sendOtp.isPending
                      ? "Sending OTP..."
                      : "Verify mobile number"}
                  </button>
                ) : !mobileVerified ? (
                  <div className="space-y-3 rounded-lg bg-neutral-50 p-4">
                    <p className="text-sm text-neutral-600">
                      Enter the verification code sent to{" "}
                      <span className="font-medium text-neutral-950">
                        {mobile}
                      </span>
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otpCode}
                        onChange={(event) =>
                          setOtpCode(event.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter OTP"
                        className="h-11 flex-1 rounded-lg border border-neutral-300 bg-white px-4 text-sm outline-none focus:border-neutral-950"
                      />

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={verifyOtp.isPending || otpCode.length < 6}
                        className="rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {verifyOtp.isPending ? "Verifying..." : "Verify"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={sendOtp.isPending}
                      className="text-xs font-medium text-neutral-500 underline hover:text-neutral-950"
                    >
                      Resend OTP
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-emerald-700">
                    Mobile number verified
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
      <AddressSection
        title="Shipping address"
        prefix="shippingAddress"
        register={register}
        errors={errors.shippingAddress}
      />

      <div className="border-t border-neutral-200 pt-8">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            {...register("useDifferentBillingAddress")}
            className="size-4 accent-neutral-950"
          />

          <span className="text-sm font-medium text-neutral-900">
            Use a different billing address
          </span>
        </label>
      </div>

      {useDifferentBillingAddress && (
        <AddressSection
          title="Billing address"
          prefix="billingAddress"
          register={register}
          errors={errors.billingAddress}
        />
      )}

      <PaymentMethodSection
        register={register}
        error={errors.paymentMethodId}
      />

      <div className="border-t border-neutral-200 pt-8">
        <label
          htmlFor="notes"
          className="text-sm font-semibold text-neutral-950"
        >
          Order notes
        </label>

        <textarea
          id="notes"
          rows={4}
          {...register("notes")}
          placeholder="Delivery instructions or other notes..."
          className="mt-3 w-full rounded-xl border border-neutral-300 p-3 text-sm outline-none transition focus:border-neutral-950"
        />

        {errors.notes?.message && (
          <p className="mt-1.5 text-xs text-red-600">{errors.notes.message}</p>
        )}
      </div>

      {createOrder.isError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {getApiErrorMessage(createOrder.error)}
        </p>
      )}

      <button
        type="submit"
        disabled={
          createOrder.isPending ||
          (!isAuthenticated && !mobileVerified) ||
          (isAuthenticated && !canCheckout)
        }
        className="h-12 w-full rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
      >
        {createOrder.isPending ? "Creating order..." : "Place order"}
      </button>
    </form>
  );
}

function AddressSection({
  title,
  prefix,
  register,
  errors,
}: AddressSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>

      <div className="mt-5 space-y-4">
        <CheckoutInput label="Street address" error={errors?.street?.message}>
          <input
            {...register(`${prefix}.street` as const)}
            className={inputClass}
          />
        </CheckoutInput>

        <div className="grid gap-4 sm:grid-cols-2">
          <CheckoutInput label="City" error={errors?.city?.message}>
            <input
              {...register(`${prefix}.city` as const)}
              className={inputClass}
            />
          </CheckoutInput>

          <CheckoutInput
            label="State / Province"
            error={errors?.state?.message}
          >
            <input
              {...register(`${prefix}.state` as const)}
              className={inputClass}
            />
          </CheckoutInput>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CheckoutInput label="Postal code" error={errors?.zip?.message}>
            <input
              {...register(`${prefix}.zip` as const)}
              className={inputClass}
            />
          </CheckoutInput>

          <CheckoutInput label="Country" error={errors?.country?.message}>
            <input
              {...register(`${prefix}.country` as const)}
              className={inputClass}
            />
          </CheckoutInput>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-neutral-950";

function CheckoutInput({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-900">
        {label}
      </label>

      {children}

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

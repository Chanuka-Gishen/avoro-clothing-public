import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the AVORO Privacy Policy to understand how Avoro Clothing collects, uses, stores, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | AVORO",
    description:
      "Learn how Avoro Clothing collects, uses, stores, and protects your personal information.",
    url: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            AVORO / Legal
          </p>

          <h1 className="mt-4 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            This Privacy Policy explains how Avoro Clothing collects, uses,
            stores, and shares your personal information when you visit our
            website, create an account, contact us, or place an order.
          </p>

          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Last updated: 29 September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-3xl space-y-12">
          <PolicySection number="01" title="About AVORO">
            <p>
              AVORO is a clothing brand operated by Avoro Clothing. Throughout
              this Privacy Policy, references to &quot;AVORO&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; refer to Avoro
              Clothing.
            </p>

            <p>
              This policy applies to personal information collected through our
              website, customer accounts, checkout process, order fulfilment,
              customer support, and related services.
            </p>
          </PolicySection>

          <PolicySection number="02" title="Information we collect">
            <p>
              We may collect information that you provide directly to us when
              you create an account, place an order, verify your contact
              information, or communicate with AVORO.
            </p>

            <ul>
              <li>First and last name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>Shipping address</li>
              <li>Billing address, where applicable</li>
              <li>Order and purchase history</li>
              <li>Selected products, sizes, colours, and quantities</li>
              <li>Payment method and payment-related status</li>
              <li>Email and mobile verification information</li>
              <li>Information you provide when contacting customer support</li>
            </ul>

            <p>
              You may be able to purchase from AVORO using a customer account or
              through available guest checkout options. The information required
              may vary depending on how you place your order.
            </p>
          </PolicySection>

          <PolicySection number="03" title="How we use your information">
            <p>
              We use personal information only where reasonably necessary to
              operate AVORO and provide our services. This includes:
            </p>

            <ul>
              <li>Creating and managing customer accounts</li>
              <li>Processing and fulfilling orders</li>
              <li>Confirming payments and payment status</li>
              <li>Arranging deliveries</li>
              <li>
                Sending verification codes and other security-related
                communications
              </li>
              <li>
                Sending order confirmations, delivery updates, and other
                transactional communications
              </li>
              <li>Providing customer support</li>
              <li>Preventing fraudulent or unauthorised activity</li>
              <li>
                Maintaining records relating to purchases, payments, and
                customer service
              </li>
              <li>Operating, maintaining, and improving our website</li>
            </ul>

            <p>
              We currently use customer contact information for transactional
              communications rather than promotional email, SMS, or WhatsApp
              marketing.
            </p>
          </PolicySection>

          <PolicySection number="04" title="Payments">
            <p>
              AVORO may offer payment methods including cash on delivery and
              bank transfer. We may also introduce third-party online payment
              methods and payment providers, including card payments and
              instalment or payment services.
            </p>

            <p>
              When a third-party payment provider is used, certain information
              required to process or verify your payment may be provided
              directly to that provider and handled according to its own privacy
              practices and terms.
            </p>

            <p>
              AVORO does not intend to store complete card numbers, card
              security codes, or other sensitive card credentials when payments
              are processed by an external payment gateway.
            </p>
          </PolicySection>

          <PolicySection number="05" title="Delivery information">
            <p>
              To fulfil and deliver orders, we may provide necessary delivery
              information to our courier and logistics providers, including
              Koombiyo and any other delivery provider we may use.
            </p>

            <p>This information may include:</p>

            <ul>
              <li>Your name</li>
              <li>Mobile number</li>
              <li>Delivery address</li>
              <li>Order and delivery details</li>
              <li>
                Other information reasonably required to complete the delivery
              </li>
            </ul>

            <p>
              We share only information reasonably necessary for order delivery
              and related logistics.
            </p>
          </PolicySection>

          <PolicySection number="06" title="Cookies & local storage">
            <p>
              Our website may use cookies, browser local storage, and similar
              technologies to provide essential website functionality and
              improve your shopping experience.
            </p>

            <p>These technologies may be used for purposes such as:</p>

            <ul>
              <li>Maintaining login or authentication state</li>
              <li>Maintaining a guest shopping cart</li>
              <li>Remembering wishlist items</li>
              <li>Maintaining security and session information</li>
              <li>Remembering certain website preferences</li>
            </ul>

            <p>
              Some of these technologies are necessary for features of the
              website to operate correctly. Disabling browser storage or cookies
              may cause certain functionality to become unavailable.
            </p>
          </PolicySection>

          <PolicySection number="07" title="Analytics & advertising">
            <p>
              AVORO does not currently use third-party advertising pixels or
              analytics services for behavioural advertising or marketing
              tracking.
            </p>

            <p>
              If we introduce analytics, advertising technologies, or similar
              tracking services in the future, we may update this Privacy Policy
              and provide any additional notices or choices required for their
              use.
            </p>
          </PolicySection>

          <PolicySection number="08" title="Service providers">
            <p>
              We rely on third-party infrastructure and technology providers to
              operate our online store. Depending on how our services are
              deployed, these may include hosting providers, virtual private
              server providers, Amazon Web Services (AWS/S3), Vercel, Netlify,
              courier providers, email or communication services, and payment
              providers.
            </p>

            <p>
              These providers may process limited personal information where
              necessary to provide their services to us. Their handling of
              information may also be governed by their own privacy policies and
              contractual obligations.
            </p>
          </PolicySection>

          <PolicySection number="09" title="International orders & data">
            <p>
              AVORO may accept international orders where delivery can be
              arranged. International shipping availability, charges, and other
              delivery requirements may be discussed and confirmed with the
              customer before fulfilment.
            </p>

            <p>
              Some of the technology and service providers used to operate AVORO
              may process or store information outside your country. Where this
              occurs, information may be subject to the laws and safeguards
              applicable to those service providers and locations.
            </p>
          </PolicySection>

          <PolicySection number="10" title="How we protect your information">
            <p>
              We take reasonable technical and organisational measures to
              protect personal information against unauthorised access,
              disclosure, alteration, loss, or misuse.
            </p>

            <p>
              These measures may include access controls, account
              authentication, contact verification, secure server configuration,
              encrypted network connections, and restricting access to
              information where appropriate.
            </p>

            <p>
              However, no website, internet transmission, or electronic storage
              system can be guaranteed to be completely secure.
            </p>
          </PolicySection>

          <PolicySection number="11" title="How long we keep information">
            <p>
              We retain personal information for as long as reasonably necessary
              to provide our services, maintain customer accounts, fulfil
              orders, provide support, maintain transaction and business
              records, resolve disputes, prevent fraud, and meet applicable
              legal or regulatory requirements.
            </p>

            <p>
              Different categories of information may therefore be retained for
              different periods.
            </p>
          </PolicySection>

          <PolicySection
            number="12"
            title="Your information & deletion requests"
          >
            <p>
              You may contact AVORO to request access to, correction of, or
              deletion of personal information associated with you.
            </p>

            <p>
              Before completing certain requests, we may need to verify your
              identity or ownership of the relevant account.
            </p>

            <p>
              Some information may need to be retained even after an account
              deletion request where reasonably necessary for completed
              transactions, accounting or business records, fraud prevention,
              dispute resolution, or legal obligations.
            </p>
          </PolicySection>

          <PolicySection number="13" title="Children's privacy">
            <p>
              AVORO provides clothing and ecommerce services to the general
              public and does not knowingly operate its services for the purpose
              of collecting personal information specifically from children.
            </p>

            <p>
              Where a person is not legally able to enter into a purchase or
              provide required consent independently, a parent or legal guardian
              should assist with the transaction as required by applicable law.
            </p>
          </PolicySection>

          <PolicySection number="14" title="Changes to this policy">
            <p>
              We may update this Privacy Policy when our business, website,
              service providers, payment methods, or legal requirements change.
            </p>

            <p>
              The latest version will be published on this page with an updated
              revision date. We encourage customers to review this policy
              periodically.
            </p>
          </PolicySection>

          <PolicySection number="15" title="Contact us">
            <p>
              If you have a question about this Privacy Policy, the personal
              information we hold about you, or would like to request a
              correction or deletion, you can contact Avoro Clothing using the
              details below.
            </p>

            <div className="mt-5 border-l-2 border-neutral-950 pl-5">
              <p className="font-medium text-neutral-950">Avoro Clothing</p>

              {siteConfig.contact.email && (
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-neutral-950 underline underline-offset-4"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              )}

              {siteConfig.contact.phone && (
                <p className="mt-1">
                  Phone:{" "}
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="font-medium text-neutral-950 underline underline-offset-4"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              )}
            </div>
          </PolicySection>

          {/* Related policies */}
          <div className="border-t border-neutral-200 pt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Related information
            </p>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href={ROUTES.TERMS}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Terms & Conditions
              </Link>

              {/* Add when these routes are created */}
              {/*
              <Link
                href={ROUTES.SHIPPING}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Shipping & Delivery
              </Link>

              <Link
                href={ROUTES.RETURNS}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Returns & Exchanges
              </Link>
              */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3">
        <span className="text-[9px] font-medium tracking-[0.16em] text-neutral-300">
          {number}
        </span>

        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-neutral-950">
          {title}
        </h2>
      </div>

      <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-600 [&_li]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}

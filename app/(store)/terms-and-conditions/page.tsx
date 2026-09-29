import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the AVORO Terms & Conditions governing purchases, payments, delivery, accounts, and use of the Avoro Clothing website.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | AVORO",
    description: "Terms governing purchases and use of the AVORO online store.",
    url: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            AVORO / Legal
          </p>

          <h1 className="mt-4 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            These Terms & Conditions govern your use of the AVORO website and
            purchases made from Avoro Clothing. By accessing our website or
            placing an order, you agree to these terms.
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
              AVORO is a clothing brand operated by Avoro Clothing. References
              to &quot;AVORO&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot; throughout these Terms refer to Avoro Clothing.
            </p>

            <p>
              These Terms apply to the use of our website, customer accounts,
              purchases, payments, deliveries, and other services provided by
              AVORO.
            </p>
          </PolicySection>

          <PolicySection number="02" title="Placing an order">
            <p>
              When you place an order through AVORO, you are making a request to
              purchase the selected products. Submission of an order does not
              necessarily mean that the order has been finally accepted or
              processed.
            </p>

            <p>
              Orders may initially be placed in a pending state while we confirm
              relevant information, stock availability, payment where
              applicable, and our ability to fulfil the order.
            </p>

            <p>
              You are responsible for ensuring that the information provided
              when placing an order is complete and accurate, including your
              name, contact details, delivery address, selected products,
              colours, sizes, and quantities.
            </p>
          </PolicySection>

          <PolicySection number="03" title="Order acceptance & availability">
            <p>
              All orders are subject to acceptance and product availability.
              Although we make reasonable efforts to maintain accurate inventory
              information, stock discrepancies or other availability issues may
              occasionally occur.
            </p>

            <p>
              AVORO reserves the right to decline, hold, or cancel an order
              where reasonably necessary, including in circumstances involving:
            </p>

            <ul>
              <li>Insufficient or unavailable stock</li>
              <li>Incorrect product or pricing information</li>
              <li>Payment or verification issues</li>
              <li>Suspected fraudulent or unauthorised activity</li>
              <li>Incorrect or incomplete customer information</li>
              <li>Delivery or fulfilment difficulties</li>
              <li>Unusually large quantities or suspected resale activity</li>
              <li>Technical or system errors affecting the order</li>
            </ul>

            <p>
              If we are unable to fulfil an order for which payment has already
              been received, we will arrange an appropriate refund for the
              affected amount.
            </p>
          </PolicySection>

          <PolicySection number="04" title="Prices">
            <p>
              Prices displayed on the AVORO website are shown in Sri Lankan
              Rupees (LKR) unless another currency is expressly stated.
            </p>

            <p>
              We make reasonable efforts to ensure that product prices and other
              information displayed on our website are accurate. However, errors
              may occasionally occur.
            </p>

            <p>
              If a material pricing error is identified after an order is
              placed, we may contact you before processing the order. We reserve
              the right to cancel an order affected by an obvious or material
              pricing error rather than being required to supply the product at
              the incorrect price.
            </p>

            <p>
              Delivery charges, where applicable, are shown or communicated
              separately and may vary depending on the destination and delivery
              method.
            </p>
          </PolicySection>

          <PolicySection number="05" title="Payment methods">
            <p>
              Available payment methods may include Cash on Delivery (COD), bank
              transfer, and any other payment options made available by AVORO at
              checkout.
            </p>

            <h3>Cash on Delivery</h3>

            <p>
              Cash on Delivery is available for eligible orders within Sri
              Lanka, subject to our delivery and order acceptance requirements.
            </p>

            <h3>Bank Transfer</h3>

            <p>
              Orders placed using bank transfer may remain in a pending state
              until payment is received and confirmed.
            </p>

            <p>
              Bank transfer payment should be completed within 24 hours of
              placing the order. If payment is not received within that period,
              AVORO may cancel the pending order and release the reserved
              products back into available inventory.
            </p>

            <h3>Online Payments</h3>

            <p>
              We may introduce card payments, online payment gateways,
              instalment services, or other third-party payment methods.
              Additional terms imposed by the relevant payment provider may
              apply when those services are used.
            </p>
          </PolicySection>

          <PolicySection number="06" title="Order cancellation">
            <p>
              You may request cancellation of an order while it remains pending
              and before AVORO has begun processing it.
            </p>

            <p>
              Once an order has been processed, prepared for dispatch, or
              dispatched, cancellation may no longer be possible. Any return or
              exchange after that stage will be handled according to our Returns
              & Exchanges Policy.
            </p>

            <p>
              To request a cancellation, contact AVORO as soon as possible using
              our published contact information and provide your order number.
            </p>

            <p>
              AVORO also reserves the right to cancel an order in the
              circumstances described in these Terms. Where an order that has
              already been paid is cancelled by us, any applicable refund will
              be arranged using an appropriate method.
            </p>
          </PolicySection>

          <PolicySection number="07" title="Products, colours & appearance">
            <p>
              We make reasonable efforts to present AVORO products accurately,
              including product images, colours, descriptions, materials,
              sizing, and other information.
            </p>

            <p>
              However, the appearance of colours may vary slightly depending on
              your device, display settings, lighting conditions, photography,
              and other factors. Minor differences may also occur between
              production batches.
            </p>

            <p>
              Product images are intended to represent the product as accurately
              as reasonably possible but should not be interpreted as
              guaranteeing that every visual characteristic will appear
              identical under all conditions.
            </p>
          </PolicySection>

          <PolicySection number="08" title="Sizing">
            <p>
              Where available, customers should review the size guide and
              product information provided on the relevant product page before
              selecting a size.
            </p>

            <p>
              If you select an incorrect size, a size-for-size exchange may be
              available subject to the conditions, time limits, stock
              availability, and other requirements stated in our Returns &
              Exchanges Policy.
            </p>

            <p>
              Availability of a replacement size cannot be guaranteed until the
              exchange is accepted and the requested replacement stock is
              confirmed.
            </p>
          </PolicySection>

          <PolicySection number="09" title="Discounts & promotions">
            <p>
              AVORO may offer product discounts, promotional pricing, sales,
              bundles, or other special offers from time to time.
            </p>

            <p>
              Unless otherwise stated, promotions are available for a limited
              period or while relevant stock lasts. We may modify, suspend, or
              end a promotion where reasonably necessary.
            </p>

            <p>
              Discounted prices apply only during the applicable promotion and
              do not entitle customers who purchased before or after that period
              to the same price.
            </p>

            <p>
              We reserve the right to reject orders involving misuse of a
              promotion, pricing error, manipulation, or fraudulent activity.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Delivery">
            <p>
              For standard deliveries within Sri Lanka, orders will generally be
              delivered within approximately 2–3 days after processing or
              dispatch, depending on the destination and courier operations.
            </p>

            <p>
              Delivery times are estimates rather than guaranteed deadlines.
              Delays may occur due to courier operations, weather, public
              holidays, high order volumes, incorrect delivery information,
              events outside our reasonable control, or other circumstances.
            </p>

            <p>
              Customers are responsible for providing a complete and accurate
              delivery address and a reachable mobile number.
            </p>

            <p>
              More detailed information about delivery, charges, failed
              deliveries, and international shipping will be provided in our
              Shipping & Delivery Policy.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Failed deliveries & COD orders">
            <p>
              Customers placing Cash on Delivery orders are expected to accept
              and pay for legitimate orders when delivery is attempted.
            </p>

            <p>
              If delivery fails because the address or contact information
              supplied by the customer is incorrect, the customer is repeatedly
              unreachable, or an accepted COD order is repeatedly refused
              without reasonable cause, additional delivery charges may apply
              where appropriate.
            </p>

            <p>
              AVORO reserves the right to restrict or remove Cash on Delivery
              availability for customers or orders associated with repeated
              refused deliveries, suspected abuse, fraudulent activity, or
              significant previous delivery problems.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Returns & exchanges">
            <p>
              Returns, size exchanges, defective products, incorrect items, and
              any applicable refunds are governed by our Returns & Exchanges
              Policy.
            </p>

            <p>
              Customers should review that policy before placing an order,
              particularly when selecting garment sizes.
            </p>
          </PolicySection>

          <PolicySection number="13" title="International orders">
            <p>
              AVORO may accept international orders where delivery can be
              arranged. Availability, shipping charges, expected delivery times,
              and payment arrangements may be discussed and confirmed separately
              before the order is processed.
            </p>

            <p>
              International customers are responsible for any customs duties,
              import taxes, clearance charges, or other fees imposed by the
              destination country or relevant authorities unless AVORO expressly
              states otherwise.
            </p>

            <p>
              International delivery times may vary considerably and may be
              affected by customs processing and local delivery services.
            </p>
          </PolicySection>

          <PolicySection number="14" title="Accounts & customer information">
            <p>
              Where customer accounts are available, you are responsible for
              providing accurate information and maintaining the confidentiality
              and security of your account credentials.
            </p>

            <p>
              You should notify AVORO if you become aware of unauthorised use of
              your account or believe your account security has been
              compromised.
            </p>

            <p>
              You must not impersonate another person, create accounts for
              fraudulent purposes, submit deliberately false information, or use
              another customer&apos;s account without authorisation.
            </p>
          </PolicySection>

          <PolicySection number="15" title="Acceptable use of our website">
            <p>
              You must not use the AVORO website in a manner that damages,
              disrupts, interferes with, or compromises the website, our
              systems, our customers, or our business.
            </p>

            <p>In particular, you must not:</p>

            <ul>
              <li>Attempt unauthorised access to accounts or systems</li>
              <li>Introduce malicious software or harmful code</li>
              <li>
                Interfere with website security or normal website operation
              </li>
              <li>Use the website for fraudulent transactions</li>
              <li>
                Use automated systems to excessively scrape, copy, or extract
                website content without permission
              </li>
              <li>
                Attempt to manipulate prices, inventory, promotions, checkout,
                payments, or other website functionality
              </li>
            </ul>

            <p>
              We may restrict access, cancel affected orders, or take other
              reasonable action where misuse is identified.
            </p>
          </PolicySection>

          <PolicySection number="16" title="Intellectual property">
            <p>
              The AVORO name, logos, branding, clothing artwork, graphics,
              product designs, photographs, videos, website content, written
              material, and other original content are owned by or used with
              permission by Avoro Clothing and may be protected by applicable
              intellectual property laws.
            </p>

            <p>
              Unless you have received prior written permission from AVORO, you
              may not copy, reproduce, modify, distribute, commercially use,
              manufacture from, publish, or create derivative works from AVORO
              artwork, designs, photographs, branding, or other protected
              content.
            </p>

            <p>
              Purchasing an AVORO product does not transfer ownership of the
              intellectual property embodied in its artwork, branding, or
              design.
            </p>
          </PolicySection>

          <PolicySection number="17" title="Resale & commercial purchases">
            <p>
              AVORO products are intended for personal purchase unless a
              commercial or resale arrangement has been expressly approved by
              us.
            </p>

            <p>
              Products may not be purchased for organised commercial resale as
              an authorised AVORO reseller without our prior permission.
            </p>

            <p>
              We reserve the right to limit quantities, decline orders, or
              contact the customer for additional information where an order
              contains unusually large quantities or appears to be intended for
              unauthorised commercial resale.
            </p>
          </PolicySection>

          <PolicySection number="18" title="Website availability">
            <p>
              We aim to keep the AVORO website and online store available and
              accurate, but we do not guarantee uninterrupted or error-free
              access.
            </p>

            <p>
              We may temporarily suspend, modify, update, or restrict parts of
              the website for maintenance, security, technical reasons, or
              improvements.
            </p>
          </PolicySection>

          <PolicySection number="19" title="Liability">
            <p>
              To the extent permitted by applicable law, AVORO is not
              responsible for indirect or consequential losses arising solely
              from circumstances outside our reasonable control, including
              third-party service interruptions or courier delays.
            </p>

            <p>
              Nothing in these Terms is intended to exclude or limit any right
              or remedy that cannot lawfully be excluded or limited under
              applicable consumer or other law.
            </p>
          </PolicySection>

          <PolicySection number="20" title="Privacy">
            <p>
              Personal information provided to AVORO is handled in accordance
              with our Privacy Policy.
            </p>

            <Link
              href={ROUTES.PRIVACY}
              className="inline-block border-b border-neutral-950 pb-0.5 font-medium text-neutral-950"
            >
              Read our Privacy Policy
            </Link>
          </PolicySection>

          <PolicySection number="21" title="Changes to these terms">
            <p>
              We may update these Terms & Conditions from time to time to
              reflect changes to our business, website, payment methods,
              delivery arrangements, policies, or applicable requirements.
            </p>

            <p>
              The latest version will be published on this page together with
              its updated revision date.
            </p>
          </PolicySection>

          <PolicySection number="22" title="Contact us">
            <p>
              If you have questions about these Terms, an order, cancellation,
              or another AVORO service, you can contact Avoro Clothing using the
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

              {siteConfig.contact.whatsapp && (
                <p className="mt-1">
                  WhatsApp:{" "}
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(
                      /\D/g,
                      "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-950 underline underline-offset-4"
                  >
                    Chat with AVORO
                  </a>
                </p>
              )}
            </div>
          </PolicySection>

          {/* Related policies */}
          <div className="border-t border-neutral-200 pt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Related policies
            </p>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href={ROUTES.PRIVACY}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Privacy Policy
              </Link>

              {/* Enable when these pages are created */}
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

      <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-600 [&_h3]:pt-2 [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.1em] [&_h3]:text-neutral-950 [&_li]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}

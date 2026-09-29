import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "Read the AVORO Returns & Exchanges Policy, including size exchanges, product condition requirements, damaged items, and replacement procedures.",
  alternates: {
    canonical: "/returns-exchanges",
  },
  openGraph: {
    title: "Returns & Exchanges | AVORO",
    description:
      "Information about returns, size exchanges, damaged products, and replacements at AVORO.",
    url: "/returns-exchanges",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReturnsExchangesPage() {
  return (
    <main>
      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            AVORO / Customer Care
          </p>

          <h1 className="mt-4 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Returns & Exchanges
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            We want you to choose your AVORO pieces with confidence. This policy
            explains when an item is eligible for exchange, the condition it
            must be returned in, and what to do if you receive an incorrect or
            defective product.
          </p>

          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Last updated: 29 September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-3xl space-y-12">
          <PolicySection number="01" title="Exchange period">
            <p>
              If you need to exchange an eligible AVORO product, you must
              contact us within 7 days of receiving your order.
            </p>

            <p>
              Exchange requests made after the 7-day period may not be accepted.
            </p>

            <p>
              Before requesting an exchange, please ensure that the product
              meets all of the eligibility and condition requirements described
              in this policy.
            </p>
          </PolicySection>

          <PolicySection number="02" title="Exchange conditions">
            <p>
              To be eligible for an exchange, the returned product must be in
              its original saleable condition.
            </p>

            <p>The product must be:</p>

            <ul>
              <li>Unworn</li>
              <li>Unwashed</li>
              <li>Unused</li>
              <li>Returned with its original tags attached</li>
              <li>Free from stains or marks</li>
              <li>Free from perfume, body odour, or other noticeable scents</li>
              <li>Free from customer-caused damage</li>
              <li>Unaltered in any way</li>
            </ul>

            <p>
              AVORO reserves the right to decline an exchange if the returned
              product does not meet these requirements.
            </p>
          </PolicySection>

          <PolicySection number="03" title="Size exchanges">
            <p>
              If the size you selected is not suitable, you may request an
              exchange for another available size of the same product.
            </p>

            <p>
              Size exchanges are subject to replacement stock availability at
              the time the exchange is processed.
            </p>

            <p>
              We strongly recommend reviewing the size guide provided on the
              relevant product page before placing your order.
            </p>
          </PolicySection>

          <PolicySection number="04" title="Exchange for another design">
            <p>
              An eligible item may also be exchanged for another AVORO design
              where the replacement product falls within the same regular
              selling price category.
            </p>

            <p>
              A temporary sale or discounted price does not necessarily change a
              product&apos;s regular price category for exchange purposes.
            </p>

            <p>
              Exchanges to products with a different regular selling price are
              not available under this policy.
            </p>

            <p>
              Design exchanges remain subject to product availability and all
              other exchange conditions stated in this policy.
            </p>
          </PolicySection>

          <PolicySection number="05" title="Colour changes">
            <p>
              Exchanges are currently provided for eligible size changes and,
              where applicable, eligible design changes.
            </p>

            <p>
              A product cannot be exchanged solely to change the selected
              colour.
            </p>
          </PolicySection>

          <PolicySection number="06" title="Exchange delivery charges">
            <p>
              For an exchange requested because of the customer&apos;s size or
              design selection, the customer is responsible for the delivery
              costs associated with both returning the original item and sending
              the replacement item.
            </p>

            <p>
              Any applicable exchange delivery charges will be communicated when
              the exchange is arranged.
            </p>

            <p>
              This does not apply where AVORO sent an incorrect product or an
              eligible product was received with a defect attributable to us.
            </p>
          </PolicySection>

          <PolicySection number="07" title="Incorrect items">
            <p>
              If AVORO sends a product, design, colour, or size that is
              different from what was confirmed in your order, please contact us
              within 24 hours of receiving the delivery.
            </p>

            <p>
              Once the issue is verified, AVORO will arrange an appropriate
              replacement and cover the reasonable delivery costs required to
              correct our error.
            </p>

            <p>
              Please keep the item unused and in its original condition while
              the issue is being resolved.
            </p>
          </PolicySection>

          <PolicySection number="08" title="Defective or damaged products">
            <p>
              If you believe that a product was delivered with a manufacturing
              defect or was damaged when you received it, please contact AVORO
              within 24 hours of delivery.
            </p>

            <p>
              We may ask you to provide clear photographs and/or video showing
              the product, the affected area, and any other information
              reasonably required to assess the issue.
            </p>

            <p>
              Please do not wash, wear, alter, repair, or otherwise use the
              product before we have reviewed the issue.
            </p>

            <p>
              If the product is confirmed as eligible for replacement, AVORO
              will arrange a replacement without charging you the associated
              return and replacement delivery costs.
            </p>
          </PolicySection>

          <PolicySection number="09" title="No change-of-mind returns">
            <p>
              AVORO does not accept returns simply because a customer changes
              their mind or no longer wants a correctly supplied product.
            </p>

            <p>
              Where applicable, an eligible size or design exchange may still be
              requested within the 7-day exchange period and subject to the
              requirements of this policy.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Discounted products">
            <p>
              Products purchased during a sale or at a discounted price may
              still be eligible for exchange, provided they meet all other
              requirements in this policy.
            </p>

            <p>
              An item being discounted does not by itself remove its exchange
              eligibility.
            </p>

            <p>
              Where a design exchange is requested, eligibility is determined
              using the applicable regular selling price category rather than
              solely a temporary promotional discount.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Replacement availability">
            <p>
              All exchanges and replacements are subject to available stock. We
              cannot guarantee that a requested size or alternative design will
              remain available while an exchange is being completed.
            </p>

            <p>
              If your requested replacement is unavailable, you may choose to
              wait for an expected restock or select another eligible product
              within the same applicable price category, subject to
              availability.
            </p>

            <p>
              AVORO will discuss the available replacement options with you when
              processing the exchange.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Refunds">
            <p>
              AVORO does not generally provide cash or monetary refunds for
              products returned under this policy. Eligible requests are handled
              through product replacement or exchange.
            </p>

            <p>
              Where an item is defective, damaged, or incorrectly supplied, we
              will work with you to provide an appropriate replacement in
              accordance with this policy.
            </p>

            <p>
              Nothing in this policy is intended to remove any remedy or right
              that cannot lawfully be excluded under applicable law.
            </p>
          </PolicySection>

          <PolicySection number="13" title="Approval before returning an item">
            <p>
              Do not send a product back to AVORO without contacting us and
              receiving approval for the return or exchange first.
            </p>

            <p>
              To request an exchange or report an issue, contact us with your
              order number and the reason for your request. For defective,
              damaged, or incorrectly supplied items, include the requested
              photographs or videos where applicable.
            </p>

            <p>
              Returns sent without prior approval may not be accepted or
              processed.
            </p>
          </PolicySection>

          <PolicySection number="14" title="Return address">
            <p>AVORO does not publish its product return address publicly.</p>

            <p>
              Once your exchange or replacement request has been reviewed and
              approved, we will provide the appropriate return instructions and
              return address directly to you.
            </p>

            <p>
              Please send the product only to the return location provided for
              your approved request.
            </p>
          </PolicySection>

          <PolicySection number="15" title="Inspection of returned products">
            <p>
              Receiving a returned product does not automatically mean that an
              exchange or replacement has been approved.
            </p>

            <p>
              Returned items may be inspected after receipt to confirm that they
              meet the requirements of this policy, including the condition of
              the garment, tags, signs of wear, washing, odour, stains, damage,
              or alterations.
            </p>

            <p>
              If the returned product does not meet the applicable conditions,
              AVORO may decline the exchange.
            </p>

            <p>
              Where an exchange is declined following inspection, we will
              contact you regarding the returned product and any applicable
              delivery arrangements.
            </p>
          </PolicySection>

          <PolicySection number="16" title="How to request an exchange">
            <p>
              Before sending anything back, contact AVORO within the applicable
              time period.
            </p>

            <p>Please provide:</p>

            <ul>
              <li>Your order number</li>
              <li>Your name and contact information</li>
              <li>The product you wish to exchange</li>
              <li>The reason for the exchange</li>
              <li>
                Your requested replacement size or eligible alternative design
              </li>
              <li>
                Photos or videos where you are reporting damage, a defect, or an
                incorrect item
              </li>
            </ul>

            <p>
              We will review your request and provide return instructions if it
              is eligible.
            </p>
          </PolicySection>

          <PolicySection number="17" title="Contact AVORO">
            <p>
              For an exchange, incorrect order, or product issue, contact Avoro
              Clothing using one of the available methods below.
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
                    )}?text=${encodeURIComponent(
                      "Hi AVORO, I'd like to request an exchange for my order.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-950 underline underline-offset-4"
                  >
                    Request an exchange
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

              <Link
                href={ROUTES.TERMS}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Terms & Conditions
              </Link>

              {/* Enable after Shipping & Delivery page is created */}
              {/*
              <Link
                href={ROUTES.SHIPPING}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Shipping & Delivery
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

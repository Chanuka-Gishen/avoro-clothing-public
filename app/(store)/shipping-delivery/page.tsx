import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Read the AVORO Shipping & Delivery Policy, including delivery times, charges, tracking, free delivery, failed deliveries, and international shipping.",
  alternates: {
    canonical: "/shipping-delivery",
  },
  openGraph: {
    title: "Shipping & Delivery | AVORO",
    description:
      "Information about AVORO delivery times, shipping charges, tracking, and international delivery.",
    url: "/shipping-delivery",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShippingDeliveryPage() {
  return (
    <main>
      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            AVORO / Customer Care
          </p>

          <h1 className="mt-4 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl">
            Shipping & Delivery
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            This policy explains how AVORO processes and ships orders, estimated
            delivery times, delivery charges, tracking, failed deliveries, and
            international shipping arrangements.
          </p>

          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Last updated: 29 September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-3xl space-y-12">
          <PolicySection number="01" title="Delivery within Sri Lanka">
            <p>
              AVORO delivers orders throughout Sri Lanka using our selected
              courier and delivery partners, including Koombiyo.
            </p>

            <p>
              Delivery availability and charges may depend on your delivery
              location, order value, order size, and other delivery
              requirements.
            </p>

            <p>
              Customers are responsible for providing complete and accurate
              delivery information when placing an order.
            </p>
          </PolicySection>

          <PolicySection number="02" title="Order processing">
            <p>
              In-stock orders are normally prepared for dispatch within
              approximately 24 hours after the order is ready to be processed,
              subject to order verification and any applicable payment
              requirements.
            </p>

            <p>
              Processing times may be longer during public holidays, unusually
              high order volumes, product launches, promotions, or circumstances
              outside our reasonable control.
            </p>

            <p>
              Bank transfer and prepaid orders may require payment confirmation
              before processing begins.
            </p>
          </PolicySection>

          <PolicySection number="03" title="Estimated delivery time">
            <p>
              Orders within Sri Lanka are generally delivered within
              approximately 2–3 days after the order has been shipped.
            </p>

            <p>
              Delivery times are estimates rather than guaranteed delivery
              deadlines. Some locations, including remote areas, may require
              additional delivery time.
            </p>

            <p>
              Public holidays, courier delays, weather conditions, high order
              volumes, road or transport disruptions, and other circumstances
              outside our reasonable control may also affect delivery times.
            </p>
          </PolicySection>

          <PolicySection number="04" title="Delivery charges">
            <p>
              Standard delivery charges may vary depending on the delivery
              location, order, and applicable courier charges.
            </p>

            <p>
              The applicable delivery charge will be displayed, calculated, or
              communicated to you as part of the ordering process before the
              order is finalised where possible.
            </p>

            <p>
              Additional delivery charges may apply where redelivery is required
              because of circumstances attributable to the customer, as
              described in this policy.
            </p>
          </PolicySection>

          <PolicySection number="05" title="Free delivery">
            <p>
              AVORO offers free standard delivery for qualifying orders with an
              order value of LKR 10,000 or more within Sri Lanka.
            </p>

            <p>
              Unless otherwise stated for a particular promotion, the qualifying
              amount is based on the value of eligible products after applicable
              discounts.
            </p>

            <p>
              Free delivery applies to the initial standard delivery of an
              eligible order. Additional charges may still apply for
              customer-requested exchanges, failed deliveries, redelivery, or
              other circumstances covered by our policies.
            </p>
          </PolicySection>

          <PolicySection number="06" title="Order tracking">
            <p>
              Where tracking is available, customers will be provided with
              shipment tracking information after the order has been dispatched.
            </p>

            <p>
              Tracking information may be made available through email and/or
              through a tracking link accessible from the AVORO website.
            </p>

            <p>
              Courier tracking information may take some time to update after a
              shipment is first created or handed over for delivery.
            </p>
          </PolicySection>

          <PolicySection number="07" title="Delivery updates">
            <p>
              AVORO may send transactional delivery and order updates using
              WhatsApp and email.
            </p>

            <p>
              Our courier partner may also contact you directly using the mobile
              number provided with your order when necessary to complete the
              delivery.
            </p>

            <p>
              Please ensure that the email address, mobile number, and delivery
              information associated with your order are accurate and
              accessible.
            </p>
          </PolicySection>

          <PolicySection number="08" title="Delivery attempts">
            <p>
              The number and timing of delivery attempts may depend on the
              courier, delivery location, and circumstances of the shipment.
            </p>

            <p>
              AVORO does not guarantee a fixed number of delivery attempts.
              Customers should remain reachable using the mobile number provided
              with the order while a shipment is out for delivery.
            </p>
          </PolicySection>

          <PolicySection number="09" title="Customer unavailable">
            <p>
              If a delivery cannot be completed because the customer is
              unavailable or cannot be reached, the courier may attempt
              redelivery or return the parcel according to its delivery
              procedures.
            </p>

            <p>
              Where an additional delivery or redelivery charge results from the
              customer being unavailable or unreachable, the customer may be
              required to pay that additional charge before another delivery is
              arranged.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Incorrect delivery information">
            <p>
              Customers are responsible for checking their shipping address and
              contact information before submitting an order.
            </p>

            <p>
              If delivery fails or additional courier charges are incurred
              because the customer supplied an incorrect, incomplete, or
              inaccessible address, the customer will be responsible for the
              applicable redelivery charges.
            </p>

            <p>
              Please contact AVORO as soon as possible if you notice an error in
              your delivery information.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Changing your delivery address">
            <p>
              You may request a change to your delivery address while the order
              remains pending and before it has been dispatched.
            </p>

            <p>
              Once an order has been processed for shipment or dispatched, we
              cannot guarantee that the delivery address can be changed.
            </p>

            <p>
              If a courier is able to redirect an already processed shipment,
              additional delivery charges may apply.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Cash on Delivery">
            <p>
              Cash on Delivery is available for eligible orders within Sri
              Lanka.
            </p>

            <p>
              Customers placing COD orders are expected to accept and pay for
              legitimate orders when delivery is attempted.
            </p>

            <p>
              If a COD order is refused without reasonable cause, or repeated
              failed or refused COD deliveries occur, the customer may be
              responsible for applicable delivery or redelivery costs.
            </p>

            <p>
              AVORO also reserves the right to restrict Cash on Delivery for
              future orders associated with repeated unjustified refusals,
              suspected misuse, fraudulent activity, or significant previous
              delivery problems.
            </p>
          </PolicySection>

          <PolicySection number="13" title="Receiving your order">
            <p>
              We recommend checking your order promptly after receiving it to
              confirm that the correct product, design, colour, size, and
              quantity have been delivered and that there is no visible damage
              or manufacturing defect.
            </p>

            <p>
              If you receive an incorrect, damaged, or defective product, please
              contact AVORO within 24 hours of delivery.
            </p>

            <p>
              You may be asked to provide photographs and/or video showing the
              item and the issue before a replacement is approved.
            </p>

            <Link
              href={ROUTES.RETURNS}
              className="inline-block border-b border-neutral-950 pb-0.5 font-medium text-neutral-950"
            >
              Read our Returns & Exchanges Policy
            </Link>
          </PolicySection>

          <PolicySection number="14" title="Lost shipments">
            <p>
              If a shipment appears to be lost in transit, please contact AVORO
              so that we can investigate the shipment with the relevant courier.
            </p>

            <p>
              A shipment will not be considered lost solely because its
              estimated delivery date has passed. We may first need to obtain
              confirmation or complete an investigation with the courier.
            </p>

            <p>
              If the shipment is confirmed as lost in transit and the loss was
              not caused by incorrect information or other circumstances
              attributable to the customer, AVORO will arrange a replacement
              without an additional delivery charge.
            </p>
          </PolicySection>

          <PolicySection number="15" title="Marked delivered but not received">
            <p>
              If tracking shows that your order has been delivered but you have
              not received it, contact AVORO as soon as possible.
            </p>

            <p>
              We will review the available tracking information and raise an
              investigation with the courier where appropriate.
            </p>

            <p>
              A replacement is not automatically issued solely because a
              shipment is reported as missing after being marked delivered. We
              may first need to investigate and confirm what occurred with the
              courier.
            </p>

            <p>
              Once the investigation is completed, we will determine the
              appropriate resolution based on the circumstances and available
              delivery information.
            </p>
          </PolicySection>

          <PolicySection number="16" title="International shipping">
            <p>
              AVORO may accept international orders where shipping can be
              arranged to the requested destination.
            </p>

            <p>
              International shipping is arranged individually. Before an
              international order is processed, AVORO will communicate the
              applicable shipping charge, estimated delivery time, and any
              relevant delivery requirements.
            </p>

            <p>
              The customer must agree to the applicable international shipping
              arrangements and charges before the order is processed.
            </p>

            <p>
              International orders must be prepaid. Cash on Delivery is not
              available for international orders.
            </p>
          </PolicySection>

          <PolicySection
            number="17"
            title="Customs, duties & international charges"
          >
            <p>
              International shipments may be subject to customs duties, import
              taxes, clearance charges, handling charges, or other fees imposed
              by the destination country, customs authority, courier, or another
              relevant authority.
            </p>

            <p>
              Unless AVORO expressly confirms otherwise in writing, these
              charges are the responsibility of the customer and are not
              included in the AVORO product or shipping price.
            </p>

            <p>
              Customs procedures may also delay an international shipment beyond
              the original estimated delivery period. AVORO cannot guarantee
              customs clearance times.
            </p>
          </PolicySection>

          <PolicySection number="18" title="Orders we cannot fulfil">
            <p>
              In some circumstances, AVORO may be unable to fulfil or deliver an
              order after it has been placed. This may occur because of stock
              discrepancies, delivery restrictions, technical errors, payment
              issues, or other circumstances described in our Terms &
              Conditions.
            </p>

            <p>
              If AVORO cancels an order before fulfilment and you have already
              paid for that order, we will arrange for the applicable amount
              actually paid for the unfulfilled order, including any delivery
              charge paid for that unfulfilled delivery, to be returned using an
              appropriate method.
            </p>

            <p>
              This is separate from our general Returns & Exchanges Policy for
              products that have already been correctly fulfilled and delivered.
            </p>
          </PolicySection>

          <PolicySection number="19" title="Delivery delays">
            <p>
              While we work with our delivery partners to complete shipments as
              efficiently as possible, delays can occasionally occur after an
              order leaves AVORO.
            </p>

            <p>Possible causes include:</p>

            <ul>
              <li>Remote delivery locations</li>
              <li>Public holidays</li>
              <li>Weather conditions</li>
              <li>Road or transport disruptions</li>
              <li>High courier volumes</li>
              <li>Customer availability</li>
              <li>Incorrect or incomplete delivery information</li>
              <li>Customs processing for international shipments</li>
              <li>Events outside our reasonable control</li>
            </ul>

            <p>
              If your shipment is taking significantly longer than expected,
              contact AVORO and we can review its available tracking
              information.
            </p>
          </PolicySection>

          <PolicySection number="20" title="Contact us">
            <p>
              If you have a question about shipping, tracking, delivery charges,
              or an existing shipment, contact Avoro Clothing using the details
              below.
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
                      "Hi AVORO, I'd like help with the delivery of my order.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-950 underline underline-offset-4"
                  >
                    Contact AVORO
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

              <Link
                href={ROUTES.RETURNS}
                className="border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950"
              >
                Returns & Exchanges
              </Link>
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

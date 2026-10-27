import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/components/landing/brand";
import { LegalPage } from "@/components/legal-page";
import { DraftNotice } from "@/components/pages/draft-notice";
import { buildPageSeo } from "@/lib/seo";

const DESCRIPTION = "When we refund a payment, and how to ask for one.";

export const Route = createFileRoute("/_marketing/refunds")({
  head: () =>
    buildPageSeo({
      title: "Refund policy",
      description: DESCRIPTION,
      path: "/refunds",
      titleSuffix: BRAND,
    }),
  component: Refunds,
});

function Refunds() {
  return (
    <LegalPage title="Refund policy" description={DESCRIPTION}>
      <DraftNotice />
      <h2>Plan payments</h2>
      <p>
        If you are not happy with {BRAND}, ask for a refund within [number] days
        of your first payment and we will return it in full.
      </p>
      <h2>Usage credits</h2>
      <p>
        Credits you have already used on data requests are not refundable,
        because we pay our data providers for each request. Unused credits can
        be refunded within [number] days of purchase.
      </p>
      <h2>Cancelling</h2>
      <p>
        You can cancel at any time from your billing settings. Your plan stays
        active until the end of the period you paid for. We do not refund
        partial periods unless required by law.
      </p>
      <h2>How to ask</h2>
      <p>
        Email [support email] from the address on your account. We reply within
        [number] business days.
      </p>
    </LegalPage>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/components/landing/brand";
import { LegalPage } from "@/components/legal-page";
import { DraftNotice } from "@/components/pages/draft-notice";
import { buildPageSeo } from "@/lib/seo";

const DESCRIPTION = "Which cookies we use and how to turn them off.";

export const Route = createFileRoute("/_marketing/cookies")({
  head: () =>
    buildPageSeo({
      title: "Cookie policy",
      description: DESCRIPTION,
      path: "/cookies",
      titleSuffix: BRAND,
    }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalPage title="Cookie policy" description={DESCRIPTION}>
      <DraftNotice />
      <p>
        This page explains the cookies and similar tools {BRAND} uses. List only
        what your deployment really uses before you publish.
      </p>
      <h2>Needed to run the service</h2>
      <p>
        Sign-in sessions and security tokens. The service does not work without
        them, so they cannot be turned off.
      </p>
      <h2>Analytics</h2>
      <p>
        [Name of your analytics tool] counts visits and shows which pages are
        used. It is only active if you accept it. Remove this section if you do
        not use analytics.
      </p>
      <h2>Your choices</h2>
      <p>
        You can change your choice at any time with the privacy choices link in
        the footer, or delete cookies in your browser settings.
      </p>
      <h2>Contact</h2>
      <p>Questions about cookies: [privacy email].</p>
    </LegalPage>
  );
}

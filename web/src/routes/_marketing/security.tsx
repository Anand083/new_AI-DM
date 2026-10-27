import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/components/landing/brand";
import { LegalPage } from "@/components/legal-page";
import { DraftNotice } from "@/components/pages/draft-notice";
import { buildPageSeo } from "@/lib/seo";

const DESCRIPTION = "How we protect your account and your clients' data.";

export const Route = createFileRoute("/_marketing/security")({
  head: () =>
    buildPageSeo({
      title: "Security and data",
      description: DESCRIPTION,
      path: "/security",
      titleSuffix: BRAND,
    }),
  component: Security,
});

function Security() {
  return (
    <LegalPage title="Security and data" description={DESCRIPTION}>
      <DraftNotice />
      <p>
        Only state what is true for your deployment. Replace each [bracketed]
        item with the real answer, and delete any section that does not apply.
      </p>
      <h2>Where your data lives</h2>
      <p>
        Your projects, audits and reports are stored in [hosting provider and
        region]. Backups run [how often] and are kept for [how long].
      </p>
      <h2>Who can see it</h2>
      <p>
        Only members of your organization can open your projects. Each customer
        is separated from the others. Our staff access customer data only to
        fix a problem you reported.
      </p>
      <h2>Accounts</h2>
      <p>
        Passwords are stored hashed. Sign-in uses [email and password / Google].
        Teammates are added by invitation.
      </p>
      <h2>Search data and Google data</h2>
      <p>
        Search data comes from [data provider]. If you connect Google Search
        Console or Analytics, we read your data only to show it to you, and you
        can disconnect at any time.
      </p>
      <h2>Reporting a problem</h2>
      <p>Found a security issue? Email [security email].</p>
    </LegalPage>
  );
}

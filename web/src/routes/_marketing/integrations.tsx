import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/components/landing/brand";
import { buildPageSeo } from "@/lib/seo";

const DESCRIPTION = "What connects to " + BRAND + ".";

const GROUPS = [
  {
    title: "Google",
    items: [
      ["Search Console", "Clicks, impressions and positions for your own sites."],
      ["Analytics 4", "Traffic and conversions next to your rankings."],
      ["Maps", "Map view for local rank tracking."],
    ],
  },
  {
    title: "AI assistants",
    items: [
      ["Claude and Claude Code", "Run research and audits by asking."],
      ["ChatGPT", "Use your SEO data from a chat."],
      ["Other agents", "Anything that supports MCP can connect."],
    ],
  },
  {
    title: "Search data",
    items: [
      ["Keywords, rankings, backlinks", "From licensed search data providers."],
      ["AI visibility", "Whether AI assistants mention your brand."],
    ],
  },
  {
    title: "Site tools",
    items: [
      ["IndexNow", "Tell search engines about new and changed pages."],
      ["Shopify stores", "Audit stores that block unknown crawlers."],
    ],
  },
];

export const Route = createFileRoute("/_marketing/integrations")({
  head: () =>
    buildPageSeo({
      title: "Integrations",
      description: DESCRIPTION,
      path: "/integrations",
      titleSuffix: BRAND,
    }),
  component: Integrations,
});

function Integrations() {
  return (
    <article className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
        Works with the tools you already use
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-brand-muted)]">
        Connect your Google data, your AI assistant and your site. Each one is
        optional.
      </p>
      <div className="mt-12 space-y-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="border-b-2 border-neutral-950 pb-3 text-2xl font-semibold tracking-tight text-neutral-950">
              {group.title}
            </h2>
            <ul>
              {group.items.map(([name, body]) => (
                <li
                  key={name}
                  className="grid gap-2 border-b border-[var(--color-border-subtle)] py-5 md:grid-cols-[1fr_2fr]"
                >
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {name}
                  </h3>
                  <p className="text-[var(--color-brand-muted)]">{body}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

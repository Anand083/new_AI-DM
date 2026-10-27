import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/components/landing/brand";
import { buildPageSeo } from "@/lib/seo";

type Release = {
  date: string;
  title: string;
  added: string[];
  fixed?: string[];
};

/** Newest first. Add a new object at the top for each release. */
const RELEASES: Release[] = [
  {
    date: "October 27, 2026",
    title: "A new look, and an admin view",
    added: [
      "A cleaner, lighter design with a green accent across the app and website.",
      "A text-only menu that is easier to scan.",
      "A platform admin page showing every user and organization, with plan, projects and audits.",
    ],
    fixed: ["The project switcher text is readable on the new sidebar."],
  },
];

export const Route = createFileRoute("/_marketing/changelog")({
  head: () =>
    buildPageSeo({
      title: "Changelog",
      description: `What is new in ${BRAND}.`,
      path: "/changelog",
      titleSuffix: BRAND,
    }),
  component: Changelog,
});

function Changelog() {
  return (
    <article className="mx-auto max-w-3xl">
      <header>
        <p className="text-sm font-medium text-[var(--color-brand-accent)]">
          Changelog
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-5xl">
          What is new in {BRAND}
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-brand-muted)]">
          New features and fixes, newest first.
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {RELEASES.map((release) => (
          <section
            key={release.date}
            className="rounded-xl border border-[var(--color-border-subtle)] bg-white p-6 md:p-8"
          >
            <p className="text-sm text-[var(--color-brand-muted)]">
              {release.date}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
              {release.title}
            </h2>
            <h3 className="mt-5 text-sm font-semibold text-neutral-950">
              Added
            </h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-neutral-700">
              {release.added.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {release.fixed?.length ? (
              <>
                <h3 className="mt-5 text-sm font-semibold text-neutral-950">
                  Fixed
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-neutral-700">
                  {release.fixed.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

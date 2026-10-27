import { BRAND } from "@/components/landing/brand";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SiteFooter } from "@/components/site-footer";
import { featureGroups } from "@/lib/feature-pages";

function getMobileNavItems() {
  return [
    {
      label: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      label: "Resources",
      links: [
        { label: "Agent setup", href: "/docs/agent-setup" },
        { label: "Skills", href: "/docs/skills" },
        { label: "Strategy Library", href: "/library" },
        { label: "Blog", href: "/blogs" },
        { label: "Docs", href: "/docs" },
      ],
    },
  ];
}

function MenuIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const mobileNavItems = getMobileNavItems();
  // The home route owns the full viewport width and footer;
  // every other marketing page gets the shared marketing canvas and footer.
  const isHome = pathname === "/";

  // On the landing route, paint html/body cream so the area behind the
  // header and any overscroll matches the landing canvas.
  useEffect(() => {
    if (!isHome) return;
    const root = document.documentElement;
    const prevRoot = root.style.backgroundColor;
    const prevBody = document.body.style.backgroundColor;
    root.style.backgroundColor = "#f1f1ee";
    document.body.style.backgroundColor = "#f1f1ee";
    return () => {
      root.style.backgroundColor = prevRoot;
      document.body.style.backgroundColor = prevBody;
    };
  }, [isHome]);

  // Keep the page behind the open mobile menu from scrolling. The menu is
  // md:hidden, so close it at desktop widths to release the lock.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = prevOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  return (
    <main className="fd-light mk min-h-screen bg-[var(--color-surface)] text-[var(--color-brand)]">
      <header className="sticky top-0 z-50 w-full border-b border-[#e5e7eb] bg-[#f1f1ee]/95 backdrop-blur-xl">
        <div className="relative mx-auto w-full max-w-[1232px] px-6">
          <nav
            aria-label="Main navigation"
            className="flex h-16 items-center gap-10 md:h-[76px] lg:gap-14"
          >
            <Link
              to="/"
              className="text-xl font-medium tracking-[-0.06em] hover:opacity-80 transition-opacity"
            >
              {BRAND}
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              <FeatureDropdown />
              <ResourcesDropdown />
              <Link
                to="/pricing"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                Pricing
              </Link>
            </div>

            <div className="ml-auto flex items-center justify-end gap-2 sm:gap-3">
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-[#f1f1ee] md:hidden"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
              <a
                href="https://app.openseo.so/sign-in"
                className="hidden h-9 items-center gap-2 border-l border-[#e5e7eb] pl-5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 md:inline-flex"
              >
                Sign in <span aria-hidden="true">↗</span>
              </a>
            </div>
          </nav>

          {mobileMenuOpen ? (
            <div className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-[#e5e7eb] bg-[#f1f1ee] p-4 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://app.openseo.so/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl bg-neutral-950 px-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Try {BRAND}
                </a>
                <a
                  href="https://app.openseo.so/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900"
                >
                  Sign in
                </a>
              </div>

              <div className="mt-3 space-y-3">
                {mobileNavItems.map((section) => (
                  <div key={section.label}>
                    <p className="px-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                      {section.label}
                    </p>
                    <div className="mt-1 space-y-1">
                      {section.links.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex min-h-10 items-center rounded-xl px-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-[#eef1ee] hover:text-neutral-950"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {isHome ? (
        <Outlet />
      ) : (
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <Outlet />
          <MarketingFooter />
        </div>
      )}
    </main>
  );
}

function ResourcesDropdown() {
  const resources = [
    {
      label: "MCP",
      href: "/docs/mcp",
      description: "Connect OpenSEO to AI clients.",
    },
    {
      label: "Skills",
      href: "/docs/skills",
      description: "Focused OpenSEO workflows.",
    },
    {
      label: "Strategy Library",
      href: "/library",
      description: "Practical SEO strategies grouped by topic.",
    },
    {
      label: "Blog",
      href: "/blogs",
      description: "SEO articles and guides.",
    },
    {
      label: "Docs",
      href: "/docs",
      description: "Setup, MCP, skills, and self-hosting guides.",
    },
  ];

  return (
    <div className="group relative">
      <a
        href="/blogs"
        className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:hidden"
      >
        Resources
      </a>
      <button
        type="button"
        className="hidden h-10 items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:inline-flex"
      >
        Resources
      </button>
      <div className="pointer-events-none absolute left-0 top-[calc(100%-2px)] z-20 hidden w-[280px] pt-2 opacity-0 transition md:block group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-3 shadow-xl shadow-neutral-900/10">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              className="block rounded-md px-3 py-2.5 transition-colors hover:bg-[#f1f1ee]"
            >
              <span className="block text-sm font-semibold text-neutral-900">
                {resource.label}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                {resource.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureDropdown() {
  return (
    <div className="group relative">
      <Link
        to="/features"
        className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:hidden"
      >
        Features
      </Link>
      <button
        type="button"
        className="hidden h-10 items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:inline-flex"
      >
        Features
      </button>
      <div className="pointer-events-none absolute left-0 top-[calc(100%-2px)] z-20 hidden w-[560px] pt-2 opacity-0 transition md:block group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 shadow-xl shadow-neutral-900/10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {featureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  {group.label}
                </p>
                <div className="mt-3 space-y-1">
                  {group.pages.map((page) => (
                    <a
                      key={page.slug}
                      href={`/features/${page.slug}`}
                      className="block rounded-md px-2 py-1.5 transition-colors hover:bg-[#f1f1ee]"
                    >
                      <span className="block text-sm font-semibold text-neutral-900">
                        {page.eyebrow}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                        {page.navDescription}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                AI agents
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href="/features/mcp"
                  className="block rounded-md p-2 transition-colors hover:bg-[#f1f1ee]"
                >
                  <span className="text-sm font-semibold text-neutral-900">
                    OpenSEO MCP
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                    Connect Claude, Codex, and agents.
                  </span>
                </a>
                <a
                  href="/google-search-console-mcp"
                  className="block rounded-md p-2 transition-colors hover:bg-[#f1f1ee]"
                >
                  <span className="text-sm font-semibold text-neutral-900">
                    Search Console MCP
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                    Search Console data for agents.
                  </span>
                </a>
                <a
                  href="/features"
                  className="block rounded-md border border-[var(--color-border-subtle)] bg-[#f1f1ee] px-2 py-1.5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
                >
                  View all features <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketingFooter() {
  return (
    <>
      {/* Newsletter */}
      <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-8">
        <p className="text-sm font-semibold text-neutral-900">
          Stay in the loop
        </p>
        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
          Product updates, new features, and the occasional behind-the-scenes.
        </p>
        <div className="mt-3">
          <NewsletterSignup />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <SiteFooter className="text-xs text-neutral-600 [&_a]:transition-colors [&_a]:hover:text-neutral-900" />
      </div>
    </>
  );
}

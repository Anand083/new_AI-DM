import { Link } from "@tanstack/react-router";
import { PrivacyChoicesLink } from "@/components/privacy-choices";
import { BRAND } from "@/components/landing/brand";
import { featureGroups } from "@/lib/feature-pages";
import { freeToolList } from "@/lib/free-tools/tool-pages";

const featureLinks = featureGroups.flatMap((group) =>
  group.pages.map((page) => ({
    label: page.eyebrow,
    href: `/features/${page.slug}`,
  })),
);

export function SiteFooter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link to="/" className="text-sm font-semibold text-neutral-900">
        {BRAND}
      </Link>

      <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
        <div>
          <p className="font-semibold text-neutral-900">Features</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {featureLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <Link to="/features">All features</Link>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <p className="font-semibold text-neutral-900">AI agents</p>
            <div className="mt-2 flex flex-col gap-1.5">
              <Link to="/features/mcp">OpenSEO MCP</Link>
              <Link to="/google-search-console-mcp">
                Google Search Console MCP
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-neutral-900">Compare</p>
            <div className="mt-2 flex flex-col gap-1.5">
              <Link to="/openseo-vs-dataforseo">OpenSEO vs DataForSEO</Link>
              <Link to="/semrush-alternative">Semrush alternative</Link>
              <Link to="/semrush-pricing">Semrush pricing</Link>
              <Link to="/ahrefs-alternative">Ahrefs alternative</Link>
              <Link to="/ahrefs-pricing">Ahrefs pricing</Link>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">Resources</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <a href="/docs/mcp">MCP</a>
            <a href="/docs/skills">Skills</a>
            <Link to="/library">Strategy Library</Link>
            <Link to="/open-source-seo">Why Open Source?</Link>
            <Link to="/blogs">Blog</Link>
            <a href="/docs">Docs</a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">Free Tools</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {freeToolList.map((tool) => (
              <a key={tool.slug} href={tool.path}>
                {tool.name}
              </a>
            ))}
            <Link to="/google-search-console-mcp">
              Google Search Console MCP
            </Link>
            <Link to="/tools">All free tools</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral-900">Company</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <Link to="/about">About</Link>
            <Link to="/why-openseo">Why {BRAND}</Link>
            <Link to="/support">Support</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/changelog">Changelog</Link>
            <Link to="/integrations">Integrations</Link>
            <Link to="/security">Security</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/refunds">Refunds</Link>
            <Link to="/terms-and-conditions">Terms</Link>
            <PrivacyChoicesLink />
          </div>
        </div>
      </div>

    </div>
  );
}

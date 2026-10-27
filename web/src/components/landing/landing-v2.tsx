import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BRAND, SIGN_IN_URL } from "./brand";
import "./landing-v2.css";

const FEATURES = [
  {
    title: "Keyword research",
    body: "Volume, difficulty and intent for any seed keyword, with ideas you can save and group.",
  },
  {
    title: "Rank tracking",
    body: "Daily positions for your keywords and your competitors, by country or city.",
  },
  {
    title: "Site audits",
    body: "Crawl a site and get a ranked list of broken links, missing tags and indexing problems.",
  },
  {
    title: "Backlinks",
    body: "See who links to you and to your rivals, and find the gaps worth closing.",
  },
  {
    title: "AI visibility",
    body: "Check whether ChatGPT, Claude and Gemini mention your brand for the prompts that matter.",
  },
  {
    title: "Client reports",
    body: "Share a clean report link with your own name on it. No spreadsheets to build.",
  },
];

const STEPS = [
  {
    title: "Add a website",
    body: "Paste a domain. We pull its keywords, competitors and current rankings.",
  },
  {
    title: "Run the audit",
    body: "Get a prioritized list of what is holding the site back, worst problems first.",
  },
  {
    title: "Fix and track",
    body: "Work through the list, then watch rankings and traffic move in one place.",
  },
];

const FAQ = [
  {
    q: "Do I need a subscription?",
    a: "No. You pay for the data you use, so a quiet month costs almost nothing.",
  },
  {
    q: "Where does the data come from?",
    a: "Search data comes from licensed providers and is combined with your own Google Search Console and Analytics when you connect them.",
  },
  {
    q: "Can my AI assistant use it?",
    a: "Yes. Connect Claude, ChatGPT or another agent and ask it to run research and audits for you.",
  },
  {
    q: "Can I manage several clients?",
    a: "Yes. Each client gets its own project with its own keywords, audits and reports.",
  },
  {
    q: "Will it get my site to number one?",
    a: "No tool can promise that. We show you what to fix and whether it worked.",
  },
];

function normalizeDomain(raw: string) {
  return raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "");
}

function AuditMock() {
  const issues = [
    { label: "Pages with missing titles", n: 14, level: "high" },
    { label: "Broken internal links", n: 9, level: "high" },
    { label: "Slow images over 500 KB", n: 31, level: "mid" },
    { label: "Duplicate meta descriptions", n: 22, level: "mid" },
    { label: "Missing alt text", n: 48, level: "low" },
  ];
  const bars = [38, 44, 41, 52, 58, 55, 66, 72, 69, 80, 86, 94];
  return (
    <div className="lp-mock" aria-hidden="true">
      <div className="lp-mock-card lp-mock-score">
        <div className="lp-ring">
          <span>72</span>
        </div>
        <div>
          <p className="lp-mock-kicker">Site health</p>
          <p className="lp-mock-big">Good, with 5 fixes ready</p>
        </div>
      </div>
      <div className="lp-mock-card lp-mock-issues">
        <p className="lp-mock-kicker">Fix first</p>
        <ul>
          {issues.map((i) => (
            <li key={i.label}>
              <span className={`lp-dot lp-${i.level}`} />
              <span className="lp-issue-label">{i.label}</span>
              <span className="lp-issue-n">{i.n}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="lp-mock-card lp-mock-trend">
        <p className="lp-mock-kicker">Organic visits, 12 weeks</p>
        <div className="lp-bars">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LandingV2() {
  const [domain, setDomain] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  // Lets the site header, footer and page background switch to the dark look.
  useEffect(() => {
    document.body.classList.add("lp-dark-page");
    return () => document.body.classList.remove("lp-dark-page");
  }, []);

  function start(e: React.FormEvent) {
    e.preventDefault();
    const d = normalizeDomain(domain);
    window.location.href = d
      ? `${SIGN_IN_URL}?site=${encodeURIComponent(d)}`
      : SIGN_IN_URL;
  }

  return (
    <div className="lp">
      <section className="lp-hero">
        <div className="lp-glow" aria-hidden="true" />
        <div className="lp-wrap lp-hero-inner">
          <p className="lp-pill">Free site audit. Results in minutes.</p>
          <h1>Find what holds your site back. Fix it. Prove it worked.</h1>
          <p className="lp-lead">
            {BRAND} audits any website, ranks the problems by impact, and
            tracks your rankings as you fix them. Pay only for the data you
            use.
          </p>
          <form className="lp-form" onSubmit={start}>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yourwebsite.com"
              aria-label="Website to audit"
            />
            <button type="submit">Run free audit</button>
          </form>
          <p className="lp-fine">No credit card needed.</p>
          <div className="lp-frame">
            <div className="lp-frame-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <AuditMock />
          </div>
        </div>
      </section>

      <section className="lp-band">
        <div className="lp-wrap lp-facts">
          <p>
            <strong>Pay as you go</strong>
            No monthly plan to outgrow
          </p>
          <p>
            <strong>Works with your AI</strong>
            Claude, ChatGPT and more
          </p>
          <p>
            <strong>Built for agencies</strong>
            One project per client
          </p>
          <p>
            <strong>Your name on reports</strong>
            Share a link, not a file
          </p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-wrap">
          <h2>Everything you need to rank, nothing you don't</h2>
          <p className="lp-sub">
            The core SEO workflows in one focused tool, without the bloat of a
            giant suite.
          </p>
          <div className="lp-grid">
            {FEATURES.map((f) => (
              <article key={f.title} className="lp-feature">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-alt">
        <div className="lp-wrap">
          <h2>From a domain to a plan in three steps</h2>
          <ol className="lp-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="lp-step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-wrap lp-faq">
          <h2>Questions</h2>
          {FAQ.map((f, i) => (
            <div key={f.q} className="lp-faq-item">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <span>{open === i ? "Hide" : "Show"}</span>
              </button>
              {open === i ? <p>{f.a}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="lp-cta">
        <div className="lp-wrap">
          <h2>See what is holding your site back</h2>
          <p>Run a free audit and get your first fix list today.</p>
          <div className="lp-cta-row">
            <a className="lp-btn-light" href={SIGN_IN_URL}>
              Start free
            </a>
            <Link className="lp-btn-ghost" to="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

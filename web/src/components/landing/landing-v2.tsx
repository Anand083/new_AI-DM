import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import { BRAND, SIGN_IN_URL } from "./brand";
import "./landing-v2.css";

const COVER_LINES = [
  {
    title: "The fix list",
    body: "14 missing titles, 9 broken links and 31 heavy images, ranked worst first.",
  },
  {
    title: "Rank tracking, daily",
    body: "You and every rival, by country or city.",
  },
  {
    title: "Reports with your name",
    body: "One link for the client. No spreadsheets.",
  },
];

const FEATURES = [
  {
    title: "Site audits",
    body: "Crawl any site and get the problems ranked by how much they cost you.",
  },
  {
    title: "Rank tracking",
    body: "Daily positions for your keywords and your rivals, by country or city.",
  },
  {
    title: "Keyword research",
    body: "Volume, difficulty and intent for any seed, ready to save and group.",
  },
  {
    title: "Backlinks",
    body: "See who links to you and to your competitors, and where the gaps are.",
  },
  {
    title: "AI visibility",
    body: "Check if ChatGPT, Claude and Gemini name your brand for the prompts that matter.",
  },
  {
    title: "Client reports",
    body: "Send one link with your own name on it. No spreadsheet to build.",
  },
];

const STEPS = [
  {
    title: "Add the site",
    body: "Paste a domain. We pull its keywords and rivals.",
  },
  {
    title: "Read the fix list",
    body: "Problems come ranked, with the fix next to each one.",
  },
  {
    title: "Re-run and compare",
    body: "See which fixes moved the score and the rankings.",
  },
];

const FAQ = [
  {
    q: "Do I need a subscription?",
    a: "No. You pay for the data you use, so a quiet month costs almost nothing.",
  },
  {
    q: "Where does the data come from?",
    a: "Search data comes from licensed providers. It is combined with your own Google Search Console and Analytics when you connect them.",
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

function AuditForm({ id }: { id: string }) {
  const [domain, setDomain] = useState("");

  function start(e: React.FormEvent) {
    e.preventDefault();
    const d = normalizeDomain(domain);
    window.location.href = d
      ? `${SIGN_IN_URL}?site=${encodeURIComponent(d)}`
      : SIGN_IN_URL;
  }

  return (
    <form className="mg-form" onSubmit={start}>
      <input
        id={id}
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="clientsite.com"
        aria-label="Website to audit"
      />
      <button type="submit">Run the audit</button>
    </form>
  );
}

export function LandingV2() {
  const [open, setOpen] = useState<number | null>(0);

  // The big masthead is the logo here, so the small header logo steps aside.
  useEffect(() => {
    document.body.classList.add("mg-page");
    return () => document.body.classList.remove("mg-page");
  }, []);

  return (
    <div className="mg">
      <div className="mg-mast">
        <p className="mg-logo">{BRAND}</p>
        <p className="mg-tag">The audit edition</p>
      </div>

      <section className="mg-cover">
        <div className="mg-cover-main">
          <h1>
            The site problems your agency <em>missed.</em>
          </h1>
          <div>
            <p className="mg-lead">
              Paste a client&apos;s website. Get the full list of what is
              broken, ranked worst first, then track whether the fixes worked.
            </p>
            <AuditForm id="mg-url-top" />
            <p className="mg-fine">
              Free to try. You pay only for the data you use.
            </p>
          </div>
        </div>
        <ul className="mg-lines">
          {COVER_LINES.map((l) => (
            <li key={l.title}>
              <h3>{l.title}</h3>
              <p>{l.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mg-story">
        <div className="mg-wrap">
          <h2>Cover story: the same site, three weeks apart</h2>
          <div className="mg-compare">
            <div>
              <p className="mg-cap">First audit</p>
              <p className="mg-score">54</p>
              <ul>
                <li>14 pages without a title</li>
                <li>9 broken internal links</li>
                <li>31 images over 500 KB</li>
                <li>22 duplicate descriptions</li>
              </ul>
            </div>
            <div className="mg-compare-after">
              <p className="mg-cap">After the fixes</p>
              <p className="mg-score">91</p>
              <ul>
                <li>Titles on every page</li>
                <li>Broken links redirected</li>
                <li>Images compressed</li>
                <li>Descriptions rewritten</li>
              </ul>
            </div>
          </div>
          <p className="mg-note">
            Illustration. Your numbers come from your own site.
          </p>
        </div>
      </section>

      <section className="mg-inside">
        <div className="mg-wrap">
          <h2>Inside</h2>
          <ul className="mg-toc">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mg-how">
        <div className="mg-wrap">
          <h2>How it works</h2>
          <ol>
            {STEPS.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mg-faq">
        <div className="mg-wrap mg-faq-grid">
          <h2>Letters</h2>
          <div>
            {FAQ.map((f, i) => (
              <div key={f.q} className="mg-faq-item">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {f.q}
                  <span aria-hidden="true">{open === i ? "−" : "+"}</span>
                </button>
                {open === i ? <p>{f.a}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mg-end">
        <div className="mg-wrap">
          <h2>Find out what is holding the site back</h2>
          <div className="mg-end-row">
            <a href={SIGN_IN_URL}>Run a free audit</a>
            <Link to="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

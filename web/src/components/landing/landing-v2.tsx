import { Link } from "@tanstack/react-router";
import { useState } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "@fontsource/caveat/600.css";
import { BRAND, SIGN_IN_URL } from "./brand";
import "./landing-v2.css";

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

/** A client page, marked up in red pen. One scan runs down it on load. */
function MarkedUpPage() {
  return (
    <div className="rl-sheet" aria-hidden="true">
      <div className="rl-browser">
        <span className="rl-tab">
          <i className="rl-mark rl-mark-tab" />
          clientsite.com
        </span>
      </div>
      <div className="rl-page">
        <div className="rl-nav">
          <b />
          <span />
          <span />
          <span className="rl-broken" />
          <span />
        </div>
        <div className="rl-hero">
          <div className="rl-hero-copy">
            <i className="rl-line rl-line-xl" />
            <i className="rl-line rl-line-xl rl-short" />
            <i className="rl-line" />
            <i className="rl-line rl-mid" />
            <u className="rl-btn" />
          </div>
          <div className="rl-img">
            <i className="rl-mark rl-mark-img" />
          </div>
        </div>
        <div className="rl-cols">
          {[0, 1, 2].map((n) => (
            <div key={n}>
              <i className="rl-line rl-mid" />
              <i className="rl-line" />
              <i className="rl-line rl-short" />
            </div>
          ))}
        </div>
        <div className="rl-foot">
          <i className="rl-line rl-mid" />
          <i className="rl-tick" />
        </div>
      </div>

      <p className="rl-note rl-note-tab">No title tag on 14 pages</p>
      <p className="rl-note rl-note-nav">Broken link, 9 pages point here</p>
      <p className="rl-note rl-note-img">Hero image is 2.4 MB</p>
      <p className="rl-note rl-note-ok rl-note-foot">Sitemap is fine</p>
      <div className="rl-scan" />
    </div>
  );
}

export function LandingV2() {
  const [domain, setDomain] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  function start(e: React.FormEvent) {
    e.preventDefault();
    const d = normalizeDomain(domain);
    window.location.href = d
      ? `${SIGN_IN_URL}?site=${encodeURIComponent(d)}`
      : SIGN_IN_URL;
  }

  return (
    <div className="rl">
      <section className="rl-top">
        <div className="rl-wrap rl-top-grid">
          <div className="rl-top-copy">
            <h1>
              Every site has problems. Yours get a red pen.
            </h1>
            <p className="rl-lead">
              Paste a website. {BRAND} crawls it, marks up what is broken, and
              lists the fixes worst first. Then it tracks whether rankings
              moved.
            </p>
            <form className="rl-form" onSubmit={start}>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourwebsite.com"
                aria-label="Website to audit"
              />
              <button type="submit">Mark it up</button>
            </form>
            <p className="rl-fine">Free to try. You pay only for data you use.</p>
          </div>
          <MarkedUpPage />
        </div>
      </section>

      <section className="rl-board">
        <div className="rl-wrap">
          <h2>Before and after the same page</h2>
          <div className="rl-pair">
            <figure className="rl-before">
              <figcaption>Monday: first audit</figcaption>
              <p className="rl-score rl-bad">54</p>
              <ul>
                <li>14 pages without a title</li>
                <li>9 broken internal links</li>
                <li>31 images over 500 KB</li>
                <li>22 duplicate descriptions</li>
              </ul>
            </figure>
            <p className="rl-arrow" aria-hidden="true">
              fix, re-run
            </p>
            <figure className="rl-after">
              <figcaption>Three weeks later</figcaption>
              <p className="rl-score rl-good">91</p>
              <ul>
                <li>Titles on every page</li>
                <li>Broken links redirected</li>
                <li>Images compressed</li>
                <li>Descriptions rewritten</li>
              </ul>
            </figure>
          </div>
          <p className="rl-caption">
            Illustration. Your numbers come from your own site.
          </p>
        </div>
      </section>

      <section className="rl-tools">
        <div className="rl-wrap">
          <h2>What is in the box</h2>
          <ul className="rl-list">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rl-how">
        <div className="rl-wrap rl-how-grid">
          <h2>Three steps, in this order</h2>
          <ol>
            <li>
              <b>Add the site.</b> Paste a domain. We pull its keywords and
              rivals.
            </li>
            <li>
              <b>Read the markup.</b> Problems come ranked, with the fix next
              to each.
            </li>
            <li>
              <b>Re-run and compare.</b> See which fixes moved the score and the
              rankings.
            </li>
          </ol>
        </div>
      </section>

      <section className="rl-faq">
        <div className="rl-wrap rl-faq-grid">
          <h2>Questions</h2>
          <div>
            {FAQ.map((f, i) => (
              <div key={f.q} className="rl-faq-item">
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

      <section className="rl-end">
        <div className="rl-wrap">
          <h2>Find out what is holding your site back</h2>
          <div className="rl-end-row">
            <a href={SIGN_IN_URL}>Run a free audit</a>
            <Link to="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

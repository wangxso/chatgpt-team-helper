# GEO Audit Report: Team Helper

**Audit Date:** 2026-03-18
**URL:** https://team.wangxso.com
**Business Type:** SaaS
**Pages Analyzed:** 8

---

## Executive Summary

**Overall GEO Score: 13/100 (Critical)**

Team Helper is currently close to invisible to AI systems on first fetch. The public site behaves like a client-side rendered SPA shell, so crawlers and AI agents mostly see an empty `#app` container, while `robots.txt`, `sitemap.xml`, and `llms.txt` appear misrouted to the same HTML shell instead of valid machine-readable files. The fastest gains will come from server-rendering key public pages, fixing crawl-control endpoints, and publishing quoteable product/FAQ content with schema.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---:|---:|---:|
| AI Citability | 5/100 | 25% | 1.3 |
| Brand Authority | 12/100 | 20% | 2.4 |
| Content E-E-A-T | 13/100 | 20% | 2.6 |
| Technical GEO | 28/100 | 15% | 4.2 |
| Schema & Structured Data | 5/100 | 10% | 0.5 |
| Platform Optimization | 20/100 | 10% | 2.0 |
| **Overall GEO Score** |  |  | **13/100** |

---

## Critical Issues (Fix Immediately)

1. **No server-rendered public content on key pages**
   Homepage and sampled routes return the same thin SPA shell with `<div id="app"></div>`, no H1, no paragraphs, no FAQ blocks, and almost no crawlable text.

2. **`robots.txt` is broken**
   `https://team.wangxso.com/robots.txt` returns HTML instead of a plain-text robots file, so crawler policy is effectively missing.

3. **`sitemap.xml` and `sitemap_index.xml` are broken**
   Both endpoints return the SPA shell instead of XML, which blocks normal discovery for search engines and AI systems.

4. **`llms.txt` is effectively absent**
   `https://team.wangxso.com/llms.txt` also returns HTML instead of an AI-readable resource map.

5. **Complete absence of structured data**
   No JSON-LD, microdata, or RDFa was detected on the homepage or sampled public routes.

6. **Soft-404 behavior on unknown routes**
   Nonexistent routes appear to return `200 OK` with the same app shell, which weakens crawl quality and route-level understanding.

## High Priority Issues

1. **Missing route-level metadata**
   No meta description, canonical tag, robots meta, Open Graph tags, Twitter Card tags, or route-specific titles were detected.

2. **No accessible trust pages**
   Routes such as `/about`, `/contact`, `/pricing`, and `/blog` return the same empty shell instead of substantive content.

3. **No AI-citable answer blocks**
   There are no short self-contained explanations answering what the product is, who it is for, how it works, or how it differs from alternatives.

4. **Weak entity identity**
   No `Organization`, `WebSite`, or `SoftwareApplication` schema exists, and no `sameAs` links were found to bind the brand to external profiles.

5. **Very weak third-party authority footprint**
   Little corroborating presence was found across Wikipedia, Reddit, LinkedIn, YouTube, and major review/community platforms.

## Medium Priority Issues

1. **Empty `lang` attribute**
   The document uses `<html lang="">`, which weakens language detection and accessibility.

2. **No visible freshness signals**
   No in-page publication dates, updated dates, changelog, or release notes were found.

3. **No crawlable internal-link architecture**
   The raw HTML exposes essentially no internal links, preventing topical clustering and page discovery.

4. **No author/team expertise signals**
   No founder bio, company details, credentials, or product stewardship signals are visible in accessible HTML.

5. **Hostname hygiene issues**
   `www` handling appears inconsistent, with TLS/502 issues observed during technical checks.

## Low Priority Issues

1. **Missing Open Graph and Twitter Card previews**
   Social and AI-sharing previews are not optimized.

2. **No breadcrumb structure**
   Public route hierarchy is not exposed through HTML or schema.

3. **No voice/assistant-friendly content targeting**
   No speakable content patterns or summary blocks were found.

---

## Category Deep Dives

### AI Citability (5/100)

The site currently offers almost nothing that an AI system can quote on first fetch. The homepage exposes only the title `Team Helper` and an empty app mount; there are no direct-answer paragraphs, list-based explanations, comparison tables, statistics, or FAQ sections.

**What AI systems see now**
- A generic page title
- No H1/H2 structure
- No self-contained passages
- No crawlable product description
- No examples, pricing explanations, or use cases

**Why this matters**
AI systems cite pages that contain short, self-contained passages answering one question well. Team Helper currently has no such blocks in raw HTML.

**Rewrite suggestions for highest-impact pages**
- Homepage hero should answer: **What is Team Helper?** in 35-60 words.
- Add a section answering: **Who is it for?** with 3 clear user segments.
- Add a section answering: **How does it work?** with 3-5 steps.
- Add an FAQ page with concise answers to pricing, access, security, limits, and onboarding.
- Add one comparison table or feature summary page.

**Example answer block**
> Team Helper is a web-based SaaS tool that helps teams manage shared access and workflow coordination for ChatGPT-style team usage. It is designed for operators who need simpler purchasing, redemption, and account management flows without building custom internal tooling.

### Brand Authority (12/100)

Off-site entity signals are very weak. There is little evidence that Team Helper is a recognized public entity across the platforms AI systems frequently use to validate brands.

**Observed state**
- No verified Wikipedia/Wikidata entity found
- No clear Reddit/community footprint found
- No clear LinkedIn company page found
- No clear YouTube/product demo footprint found
- Limited footprint beyond the live site and a few directory/listing references

**Implication**
Even after fixing on-site content, AI systems will still have low confidence if the brand has little corroborating presence elsewhere.

**Recommended improvements**
- Publish an official LinkedIn company page
- Publish a GitHub profile or repo clearly tied to Team Helper
- Add product demo videos on YouTube
- Create consistent external descriptions of the product
- Pursue citations in community posts, launch directories, and technical discussions

### Content E-E-A-T (13/100)

The site has almost no visible Experience, Expertise, Authoritativeness, or Trustworthiness signals in accessible HTML.

**Missing signals**
- About/company information
- Founder/team bios
- Contact details
- Privacy and Terms content
- Security/trust documentation
- Case studies or testimonials
- Author bylines or publication dates

**What is present**
- HTTPS is enabled
- Recent deployment activity is implied by response headers

**Why the score is low**
This is not mainly a “bad writing” problem. It is an “absence of accessible content” problem. AI systems and search engines cannot evaluate expertise if they cannot see any substantive content.

**Recommended improvements**
- Publish real About, Contact, Privacy, and Terms pages
- Add founder or team identity with credentials
- Add support email and company/operator details
- Add product changelog, onboarding docs, and use cases
- Add screenshots, product walkthroughs, and first-hand examples

### Technical GEO (28/100)

The biggest technical blocker is architectural: the site behaves like a client-side rendered Vue SPA with almost no route-specific HTML.

**Key findings**
- Homepage and sampled routes return the same shell HTML
- `robots.txt` returns `200 text/html` instead of plain text
- `sitemap.xml` and `sitemap_index.xml` return HTML instead of XML
- `llms.txt` returns HTML instead of plain text/markdown
- No canonical tag
- No meta description
- Empty `lang` attribute
- Unknown routes appear to return `200 OK`

**What is working**
- HTTPS is enabled
- HSTS is present
- Some basic security headers are present
- Static assets appear cacheable

**Technical fixes in order**
1. Server-render or prerender all key public pages
2. Serve real `robots.txt`, `sitemap.xml`, and `llms.txt`
3. Return proper 404s for nonexistent routes
4. Add route-level `<title>`, meta description, canonical, OG, and Twitter tags
5. Clean up `www` canonicalization and TLS behavior

### Schema & Structured Data (5/100)

No schema markup was detected on the homepage or sampled public routes.

**Missing high-value schema**
- `Organization`
- `WebSite`
- `SoftwareApplication`
- `BreadcrumbList`
- `Person` for founders/authors
- `Article` / `BlogPosting` for future help or blog content

**Why this matters**
Schema helps AI systems and search engines understand what the site is, who runs it, and how it connects to the broader web.

**Best first additions**
1. `Organization` with `sameAs` links to official profiles
2. `SoftwareApplication` on the homepage
3. `WebSite` for site identity
4. `BreadcrumbList` on public informational pages
5. `Person` schema on founder/team pages

### Platform Optimization (20/100)

Readiness is currently poor across Google AI Overviews, ChatGPT web search, Perplexity, Gemini, and Bing Copilot.

**Main blockers across platforms**
- No crawlable answer content in HTML
- No valid robots/sitemap endpoints
- No schema
- Weak external entity corroboration
- No FAQ or help content

**Platform-specific implications**
- **Google AI Overviews:** no extractable answer blocks or structured content
- **ChatGPT web search:** no clear crawler guidance and almost no quoteable text
- **Perplexity:** weak primary-source content and limited community validation
- **Gemini:** weak Knowledge Graph and sameAs signals
- **Bing Copilot:** no sitemap/IndexNow-style readiness, weak organization signals

**Best cross-platform fixes**
- Ship one server-rendered marketing/docs surface
- Fix robots/sitemaps/llms endpoints
- Add schema and `sameAs`
- Publish FAQ, changelog, and support documentation

---

## Quick Wins (Implement This Week)

1. Publish a server-rendered homepage with one H1, product summary, core features, and 3 internal links.
2. Serve a real `robots.txt` that includes a valid sitemap reference.
3. Publish a valid `sitemap.xml` listing canonical public URLs.
4. Add `Organization` and `SoftwareApplication` JSON-LD to the homepage.
5. Create one FAQ/use-cases page with short answer blocks for AI citation.

## 30-Day Action Plan

### Week 1: Crawlability Foundation
- [ ] Fix `robots.txt`, `sitemap.xml`, and `llms.txt` so they return valid machine-readable files
- [ ] Implement proper 404 handling for nonexistent routes

### Week 2: Public Content Surface
- [ ] Launch a server-rendered homepage with route-specific metadata
- [ ] Publish About, Contact, Privacy, and Terms pages with real HTML content

### Week 3: Citability and Trust
- [ ] Create FAQ, onboarding, and use-case pages with concise answer blocks
- [ ] Add screenshots, support details, founder/team information, and changelog/release notes

### Week 4: Entity and Platform Expansion
- [ ] Add `Organization`, `WebSite`, `SoftwareApplication`, and breadcrumb schema
- [ ] Strengthen external brand presence across LinkedIn, GitHub, YouTube, and relevant communities

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---:|
| https://team.wangxso.com/ | Team Helper | 11 |
| https://team.wangxso.com/about | Team Helper | 11 |
| https://team.wangxso.com/services | Team Helper | 11 |
| https://team.wangxso.com/contact | Team Helper | 11 |
| https://team.wangxso.com/pricing | Team Helper | 11 |
| https://team.wangxso.com/blog | Team Helper | 11 |
| https://team.wangxso.com/work | Team Helper | 11 |
| https://team.wangxso.com/portfolio | Team Helper | 11 |

### Infrastructure Endpoints Checked Separately

- `https://team.wangxso.com/robots.txt` -> returned HTML shell instead of robots directives
- `https://team.wangxso.com/sitemap.xml` -> returned HTML shell instead of XML sitemap
- `https://team.wangxso.com/sitemap_index.xml` -> returned HTML shell instead of XML sitemap index
- `https://team.wangxso.com/llms.txt` -> returned HTML shell instead of AI-readable file

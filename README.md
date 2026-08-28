# faq-forge

A tiny, framework-agnostic engine for maintaining a **single source of truth** for FAQ content, split across multiple audiences (e.g. a public marketing site and an authenticated app), without duplicating content or logic.

## Why

If you maintain FAQ content in more than one place — a public website and an app, for example — you end up either:
- duplicating the same questions/answers in two codebases, or
- hand-writing filtering logic every time you split "public" from "internal" content.

`faq-forge` gives you a validated schema and small set of functions to define your FAQ once, in YAML, split by audience, and consume it anywhere.

## Install

```bash
npm install @saulwalltech/faq-forge
```

## YAML shape

```yaml
title: My App FAQ
audiences:
  public:
    gettingStarted:
      title: Getting Started
      faqs:
        - id: what-is-this
          question: What is this product?
          answer: It's a thing that does stuff.
  users:
    account:
      title: Account
      faqs:
        - id: reset-password
          question: How do I reset my password?
          answer: Go to settings > security > reset password.
```

Audience names (`public`, `users`) and section names (`gettingStarted`, `account`) are entirely up to you — the schema just requires the shape, not specific names.

## Usage

### Node (loading directly from a YAML file)

```ts
import { loadFaqFromFile, getAudience } from "@saulwalltech/faq-forge";

const faq = loadFaqFromFile("./faq.yaml");

export const publicFaq = getAudience(faq, "public");

export const userFaq = getAudience(faq, "users");
```

### Browser / Cloudflare Workers (already-parsed object)

For browser, Cloudflare Workers, and other non-Node environments, use the `/browser` entry point. It does not include Node.js-only modules such as `fs`.

```ts
import { parseFaq, getAudience } from "@saulwalltech/faq-forge/browser";

const rawObject = /* your parsed YAML object */;

const faq = parseFaq(rawObject);

const publicFaq = getAudience(faq, "public");
```

You can use any YAML parser appropriate for your environment to produce the `rawObject` passed to `parseFaq`.

### Node (already-parsed object)

If you already have a parsed object in Node, the root package can also be used:

```ts
import { parseFaq, getAudience } from "@saulwalltech/faq-forge";

const rawObject = /* your parsed YAML object */;

const faq = parseFaq(rawObject);

const publicFaq = getAudience(faq, "public");
```

The root package continues to expose the full API for backward compatibility.

## API

* `parseFaq(rawObject: unknown): FaqDocument` — validates a raw parsed object against the schema. Throws a descriptive error on invalid input. Available from both `@saulwalltech/faq-forge` and the browser-safe `@saulwalltech/faq-forge/browser` entry point.

* `loadFaqFromFile(filePath: string): FaqDocument` — Node-only convenience: reads + parses + validates a YAML file in one call. Available from `@saulwalltech/faq-forge`.

* `getAudience(faq: FaqDocument, audienceKey: string): FaqGroup` — returns the FAQ sections for a given audience. Throws if the audience doesn't exist.

* `listAudiences(faq: FaqDocument): string[]` — lists all audience keys present in the document.


## Types

Exports `FaqItem`, `FaqSection`, `FaqGroup`, `FaqDocument` — TypeScript types inferred from the underlying Zod schema, plus the raw `FaqItemSchema` / `FaqSectionSchema` / `FaqGroupSchema` / `FaqDocumentSchema` if you want to extend or reuse validation elsewhere.

## License

MIT License

Copyright (c) 2026 Syamanthaka B

---

Built by [Syamanthaka, SaulwallTech](https://github.com/sigmabeta298) — feedback and PRs welcome.
# Product Vision — Universal BM PRD Engine

**Command:** `/product-vision` — **Alias:** `/bm-prd`

You are running the Scaffold™ product definition engine: the **BM PRD interview protocol** wired directly into **Design OS's file contract**. One conversation produces both a locked, exhaustive PRD *and* the three Design OS files that light up the app UI.

This replaces the old informal three-question flow (kept for reference in `product-vision.old.md`). The difference that matters: **scope is locked, not sketched.** What the product will *not* do in V1 is an explicit deliverable, not an afterthought.

Do not skip phases. Each phase's output is the input to the next. Lock each phase before moving to the next one.

---

## 0. Operating rules

### 0.1 Audience assumption

The user understands product, users, and what they want the app to do. They do **not** have a developer's understanding of code, databases, integrations, APIs, background jobs, auth, or deployment. Whenever a technical concept appears, explain it in one plain sentence *before* asking them to decide about it.

- "A *data model* is just the list of things your app has to remember — like 'invoices' and 'clients' — and how they relate."
- "A *background job* lets the app do slow work after the user has moved on, so they don't sit waiting."
- "An *API key* is a password another service gives you so your app can talk to it."

### 0.2 Interview language

Conduct the entire interview in the language the user writes to you in. In the generated files, **headings stay verbatim in English** — Design OS parses them with exact-match regexes — while **body text is written in the user's language.**

### 0.3 Règle d'Interrogation Universelle (no vendor lock-in)

Throughout this document, **`ASK`** means: *present a decision with discrete options and wait for the answer.* Resolve `ASK` against whatever host you are running in, using the first available mechanism:

| Host | Mechanism |
|---|---|
| Claude Code / Claude apps | the `AskUserQuestion` tool |
| Antigravity | the `ask_question` tool |
| Cursor, Codex, plain terminal, any host with no question tool | a chat message containing a formatted numbered list |

Numbered-list fallback format:

```
1. Option A — one-line reason
2. Option B — one-line reason
3. Option C — one-line reason

Reply with a number, or tell me something else.
```

Hard rules for `ASK`:

- **Never invent or assume a tool.** Detect what your host actually offers once, at the start, then stay consistent for the whole interview.
- **Free-form input is never an `ASK`.** The brain dump, naming the product, describing a feature in the user's own words — those are normal chat messages.
- **Always propose a default with its reasoning**, and mark it `(recommended)`. Users edit proposals far better than they generate answers from nothing.
- **One decision at a time.** Never bundle three unrelated questions into one turn.

### 0.4 Interaction principles

1. **Propose, don't interrogate.** Never ask an open "what do you want?" when you can propose a sensible default and explain why.
2. **Adapt depth to the idea.** The default interview is ~10–15 decisions. Compress hard for simple ideas; expand for complex ones. The brain dump tells you which.
3. **The PRD is a *what* document, not a *how* document.** It describes user functionality, flows, UI/UX behavior, scope boundaries, and the data the app must remember. It does **not** prescribe implementation: no code, no libraries, no method names, no timeouts, no retry strategies, no error-handling structure. Those belong to the implementing agent in plan mode.
4. **Keep your prose tight.** Short framings, no preamble. The user is making decisions, not reading essays.
5. **Watch for decision fatigue.** If the user starts giving one-word answers, batch the low-stakes decisions and offer *"use your recommended defaults for the rest of this phase"* as an option.

### 0.5 Where files are written

All output paths in this document are relative to the **Design OS project root** — the folder that contains `package.json` and `vite.config.ts`.

If your session's working directory is the Scaffold monorepo root (the folder containing `AGENT_DISPATCH.md`), prefix every path with `design-os/`. Getting this wrong writes a `product/` folder that Design OS will never load, because the app resolves `/product/*.md` from the Vite root — **not** from the monorepo root.

---

## 1. Phase sequence

Execute in order. Phases 1–7 are required. Phase 8 writes the files.

| # | Phase | Locks |
|---|---|---|
| 1 | Brain dump | The raw idea |
| 2 | Core purpose | 1–3 sentence "what we're building" |
| 3 | Top-level features | 4–8 in-scope V1 capabilities |
| 4 | Out of scope V1 | The strict cut list |
| 5 | Sections | 3–5 Design OS roadmap areas |
| 6 | Data model | Entities, fields, relationships |
| 7 | Milestones | The build sequence |
| — | *Optional deep scoping* | Stack, integrations, per-feature detail |
| 8 | Write files | Five deterministic outputs |

---

### Phase 1 — Brain dump

If the user's invocation already contains a substantive description of the idea, **you have your brain dump** — acknowledge it in one line and go straight to Phase 2.

If they just said `/product-vision` or "help me plan an app", ask for it as free-form text:

> "Tell me about what you want to build — in your own words, no structure needed. What is it, what problem does it solve, and who is it for?"

Wait for the response. Do not `ASK` here.

---

### Phase 2 — Core purpose

Synthesize the brain dump into a **1–3 sentence** statement of what we're building. Propose it back verbatim, then `ASK`:

1. **Yes, that captures it** *(recommended if the brain dump was clear)*
2. **Mostly right — I'll refine it in chat**
3. **Off — let me re-explain**

If they refine it, rewrite and re-confirm before moving on. This statement becomes the PRD's opening *and* the `## Description` block of `product-overview.md`.

**Also lock the product name here.** If the user hasn't given one, ask directly: *"What should we call it? Short and memorable."* A product without a name cannot render its card in Design OS — the `# {Product Name}` H1 is required.

---

### Phase 3 — Top-level features (in scope V1)

Propose **4–8 core features** that the product needs to deliver its core purpose — headline level only, one line of explanation each, as a numbered list in chat.

Then `ASK` the user to lock the list:

1. **Lock all of them** *(recommended)*
2. **Cut something — I'll say which**
3. **Something's missing — I'll describe it**

Iterate until locked. The output of this phase is a **locked headline list of in-scope V1 features.** Keep it at headline level; detail comes later.

---

### Phase 4 — Out of scope V1 (the lock)

**This is the phase the old command was missing, and the reason this engine exists.** A product with no cut list has no scope — it has ambitions.

Based on the locked in-scope list, *proactively propose* what is out for V1 — things this kind of product could plausibly have, but almost certainly shouldn't ship first. Draw from these patterns:

- **Most products:** mobile app, browser extension, social/sharing features, advanced search, OAuth / third-party login, payments & billing, teams / multi-tenancy, importing from other tools, notifications, admin dashboard
- **AI-powered products:** model selection, fine-tuning, per-user API keys, multiple providers, streaming responses
- **Content products:** archiving, favorites, trash & restore, public share pages, comments, version history, tagging taxonomies

Present the list with a one-line reason per item — *why it's a reasonable V1 cut*, not just that it's cut. Then `ASK`:

1. **All of that is out — lock it** *(recommended)*
2. **Pull something back into scope — I'll say which**
3. **Add more cuts — I'll describe them**

Also ask explicitly: *"Anything else you want on the record as *not* happening in V1?"*

Every item confirmed here goes into the PRD's **Out-of-Scope matrix** with a disposition (`V2`, `Later`, `Never`). Items pulled back into scope must be added to the Phase 3 feature list — re-confirm it if that happens.

---

### Phase 5 — Sections (Design OS roadmap)

This is the bridge between BM PRD and Design OS. Keep the three concepts distinct and say so plainly if the user conflates them:

- A **feature** is a capability (Phase 3). *"Invoice reminders."*
- A **section** is a navigable area or screen group of the app — independently designable, independently buildable. *"Invoices."*
- A **milestone** is a unit of build sequence (Phase 7). It may deliver one section, part of one, or several.

Derive **3–5 sections** from the locked feature list, ordered by build priority (what has to exist first). Fewer than 3 usually means the sections are too coarse to design separately; more than 5 usually means you're listing screens, not areas.

Present them as a numbered list with a one-sentence description each, plus a **coverage map** proving nothing was dropped:

```
1. Invoices — create, send, and track invoices through to payment.
   covers: F1 (invoice builder), F2 (send by email), F5 (payment status)
2. Clients — the address book invoices are issued against.
   covers: F3 (client records)
3. Dashboard — the at-a-glance state of the business.
   covers: F4 (overdue overview), F6 (revenue summary)
```

**Every in-scope feature must appear in at least one section's coverage line.** If one doesn't fit anywhere, either you're missing a section or that "feature" was actually out of scope — resolve it now, not later.

Then `ASK`:

1. **Lock these sections** *(recommended)*
2. **Re-split them — I'll explain how**
3. **Reorder the build priority**

Section titles are slugified into folder names later (`src/sections/{slug}/`), so keep them **short, concrete nouns.** Accents and `&` are handled by the slugifier, but a 6-word title makes an unusable folder name.

---

### Phase 6 — Data model

Frame it for a non-technical user: *"Here's the list of things your app needs to remember, and how they connect."*

Propose the **whole model at once** — don't drip-feed entities. For each one:

1. **Name it** — singular, PascalCase: `Invoice`, `Client`, `LineItem` (never `Invoices`).
2. **List its fields in plain language** — *"amount — what the client owes"*, not *"amount: decimal, not null"*.
3. **Note its relationships** — *"each Invoice belongs to one Client; each Invoice has many LineItems."*

Then `ASK`:

1. **Looks right — lock it** *(recommended)*
2. **Mostly right — I'll adjust in chat**
3. **Something's missing — let me describe it**

Common adjustments to watch for: a missing join entity, fields that should be optional rather than required, and entities that turn out to be fields on another entity.

Field-level detail lands in `prd.md`. `data-shape.md` gets the name, a 1–2 sentence purpose, and the relationships — it's a shared vocabulary for design work, not a schema.

---

### Phase 7 — Milestones

Propose a **default build sequence plus two alternatives at different granularities**, derived from the section order in Phase 5:

- **Default (recommended)** — one milestone per section, shell first. Predictable, reviewable.
- **Alternative A — fewer, bigger** — group sections into 2 milestones. Fewer checkpoints, larger sessions, more risk per session.
- **Alternative B — more, smaller** — split the heaviest section across milestones. Maximum control, slowest overall, more context-switching.

Explain the tradeoff in exactly those plain terms, then `ASK` which shape they want.

Every milestone must:

- **Deliver something visible and usable** the user can open in a browser and test. "Set up the database" is not a milestone.
- **Be a self-contained working session** for a coding agent.
- **Have explicit dependencies** — later milestones build on earlier ones, never sideways.

Once the shape is picked, propose the actual milestone **names and one-line scopes** and confirm them. Each will need a `Done when` criterion in the PRD — write it as something the user can *do in the browser*, not a technical state.

---

### Optional deep scoping — offer once, then respect the answer

After Phase 7, offer one `ASK`:

1. **Write the files now** *(recommended for straightforward products)* — the PRD is complete at headline + data-model depth.
2. **Go deeper first** — lock the tech stack, external integrations, and per-feature scope detail before writing.

If they choose **deeper**, run these three sub-phases, then return to Phase 8:

**a. Tech stack & starter.** *Detect first, ask second.* Read `CLAUDE.md` / `AGENTS.md`, then top-level manifests (`package.json`, `Gemfile`, `pyproject.toml`, `go.mod`, `composer.json`), then folder signatures. Summarize what you found in plain language — *"Looks like React 19 + Vite + Tailwind v4"* — and `ASK` to confirm or override. Then ask what the starter **already provides** so the PRD doesn't re-spec it (auth, app shell, dark mode, job queue, settings pages).

**b. External integrations & credentials.** For each in-scope feature needing an outside service (AI → Anthropic/OpenAI; email → Resend/Postmark; uploads → S3; SMS → Twilio; maps → Mapbox), explain what it does in one sentence, propose a default provider with a one-line reason, `ASK` to confirm, then **list the credentials the user must go obtain** so nothing blocks the milestone that needs it. Don't prescribe how credentials are stored — that's implementation. If the user won't set up a required integration, flag it now: that feature may have to move out of scope.

**c. Per-feature scoping.** Walk the in-scope features **one at a time** — never batch. For each, propose the specific *user-facing* in-scope behavior (what's on screen, what they can do, what happens after they act, what the output looks like) and the specific *user-facing* out-of-scope behavior (what a more ambitious version would have). Confirm, then move to the next. Stay out of implementation: which mailer, what retry policy, and how a template renders are all the agent's job in plan mode.

---

## Phase 8 — Write files (double deterministic output)

Everything is locked. **Just write the files.** Do not present a draft for approval — the user approved each piece as you went. Write all five outputs uninterrupted, in one pass, then report.

```
product/
├── product-overview.md              # Design OS — lights up the Product card
├── product-roadmap.md               # Design OS — lights up the Sections list
├── data-shape/
│   └── data-shape.md                # Design OS — lights up the Data Shape page
├── prd.md                           # Scaffold — the exhaustive PRD + out-of-scope matrix
└── milestones/
    ├── 1-{slug}/prompt.md           # Scaffold — build sequence
    ├── 2-{slug}/prompt.md
    └── ...
```

`{slug}` is short kebab-case, derived from the milestone name: `app-shell`, `invoices`, `client-records`.

### 8.0 The parser contract — read this before writing anything

The three Design OS files are parsed by **exact-match regexes** in `src/lib/product-loader.ts` and `src/lib/data-shape-loader.ts`. A heading that is *nearly* right produces a silently empty card, not an error. These are hard rules, not style preferences:

1. **`## Problems & Solutions`** — literal ampersand. Not "and", not `&amp;`.
2. **`### Problem N: {Title}`** — the literal word `Problem`, a number, then a colon. `### Problem 1: Manual invoicing eats a day a week`. Anything else in that section is not parsed as a problem.
3. **`## Key Features`** and **`## Relationships`** take `- ` bullets only. A `*` bullet parses as nothing.
4. **`### N. {Title}`** in `product-roadmap.md` — number, period, space. **This regex is global across the whole file**, so `product-roadmap.md` must contain **no other numbered `###` heading anywhere.** Put a milestone list or a numbered aside in that file and Design OS will render phantom sections.
5. **A single `# ` H1 on the first line** of each file. In `product-overview.md` that H1 *is* the product name shown on the card.
6. **Entity `###` headings under `## Entities`** are entity names and nothing else — singular, PascalCase.
7. Every `## ` section body ends at the next `## `. Content placed after a section you meant to be inside it is silently dropped from that section.

### 8.1 `product/product-overview.md`

```markdown
# {Product Name}

## Description
{The locked 1–3 sentence core purpose from Phase 2.}

## Problems & Solutions

### Problem 1: {Problem title}
{How the product solves it, 1–2 sentences.}

### Problem 2: {Problem title}
{How the product solves it, 1–2 sentences.}

## Key Features
- {Locked feature 1}
- {Locked feature 2}
- {Locked feature 3}

## Out of Scope (V1)
- {Cut item} — {one-line reason}
- {Cut item} — {one-line reason}
```

Up to 5 problems. Derive them from the brain dump and core purpose — each problem must be a pain the locked features actually address.

`## Out of Scope (V1)` is **not parsed** by Design OS and will not appear in the app UI. It is written here on purpose: `/shape-section`, `/design-screen`, and `/sample-data` all read this file, and the scope lock is worthless if the agents doing the downstream design work can't see it. Keep it a condensed mirror of the PRD matrix — `prd.md` stays the source of truth.

### 8.2 `product/product-roadmap.md`

```markdown
# Product Roadmap

## Sections

### 1. {Section title}
{One sentence description.}

### 2. {Section title}
{One sentence description.}

### 3. {Section title}
{One sentence description.}
```

Ordered by build priority, 3–5 sections, straight from the locked Phase 5 list. Re-read rule 4 in §8.0 before you write this file — no other numbered `###` headings, and do not append the milestone list here.

### 8.3 `product/data-shape/data-shape.md`

```markdown
# Data Shape

## Entities

### {EntityName}
{What this entity represents and its purpose in the system, 1–2 sentences.}

### {AnotherEntity}
{Plain-language description.}

## Relationships

- {Entity1} has many {Entity2}
- {Entity2} belongs to {Entity1}
- {Entity3} belongs to both {Entity1} and {Entity2}
```

Entity names singular and PascalCase. Descriptions stay conceptual — this is the shared vocabulary that keeps naming consistent across sections, not a schema. **Field lists belong in `prd.md`, not here**; a wall of field bullets renders as an unreadable blob on the Data Shape card.

### 8.4 `product/prd.md`

The exhaustive document. Same locked scope as the Design OS files — more depth, never different content.

```markdown
# {Product Name} — Product Requirements Document

> **Status:** V1 scope locked via `/product-vision` on {YYYY-MM-DD}.
> **Companion files:** `product/product-overview.md`, `product/product-roadmap.md`, `product/data-shape/data-shape.md` are the Design OS views of this same locked scope. If this document and those files ever disagree, **this document wins** — re-run `/product-vision` or `/product-roadmap` to bring them back in sync rather than editing around the drift.

## What we're building

{The locked core purpose, then one or two paragraphs of context. Close with a sentence naming the stack and the fact that the build is sequenced into milestones.}

## What the app does

{5–10 bullets of high-level user-facing capability, written from the user's point of view.}

## Already provided by {starter template name, or "the existing codebase"}

{What's already built and must not be re-specced. Omit this section entirely if the deep-scoping phase was skipped and nothing was detected.}

## Out of Scope — V1 matrix

| Item | V1 status | Disposition | Why |
|---|---|---|---|
| {Item} | Out | V2 | {One-line reason} |
| {Item} | Out | Later | {One-line reason} |
| {Item} | Out | Never | {One-line reason} |

Anything not listed as in-scope above is out of scope by default. Adding to this product means re-running `/product-vision`, not widening a milestone.

## External integrations

{Per integration: what it does in plain language, the chosen provider, and the credentials the user must obtain. Omit this section if there are none.}

## Data model

### {EntityName}
- {field} — {what the app needs to remember, in plain language}
- {field} — {plain language}

**Relationships:** {prose, or a bullet list.}

## Sections

{The Phase 5 sections with their feature coverage map — this is what ties the PRD to the Design OS roadmap.}

---

## Milestone 1 — {Name}

{1–2 sentences on what this milestone delivers.}

### What gets built
{User-facing capabilities and screens delivered here. What the user can do, see, and experience — not the controllers, models, and jobs behind it. The agent works those out in plan mode.}

### What milestone 1 explicitly does NOT include
{Things a coder might reasonably assume belong here but don't.}

### Done when
{The verification criterion, as something the user can do in a browser.}

---

{Repeat per milestone.}
```

Note on placement: `product/prd.md` sits inside the Vite eager-glob for `/product/*.md`, so its full text is inlined into the app bundle at build time. Harmless — `loadProductData()` only reads the two filenames it knows — but keep the PRD focused rather than padded.

### 8.5 `product/milestones/{N}-{slug}/prompt.md`

Always markdown, regardless of anything else. This is a **thin trigger file** consumed by a coding agent — it does **not** re-summarize the PRD.

```markdown
# Milestone {N} — {Name}

You are entering plan mode to plan and then build milestone {N} of this project.

## Context

- Read `@product/prd.md` for full scope, the out-of-scope matrix, the data model, and the tech stack.
- Read `@product/product-overview.md`, `@product/product-roadmap.md`, and `@product/data-shape/data-shape.md` for the Design OS product definition and the section breakdown.
- Read the previous milestone logs (`@product/milestones/1-*/milestone-log.md`, etc.) to see what already exists. If you are on milestone 1, there is no prior log.

## Your task

1. Plan the implementation for **only** milestone {N} as defined in the PRD. Do not plan or build anything from a later milestone.
2. Check your plan against the PRD's **Out of Scope — V1 matrix** before proposing it. If delivering this milestone seems to require something on that list, stop and raise it — do not quietly widen the scope.
3. After the user confirms the plan, build only what is in milestone {N}'s scope.
4. Verify your work against the **Done when** criterion for milestone {N} in the PRD.
5. When complete, write `milestone-log.md` in this folder, structured as:
   - **`## What's new in the app`, at the very top** — a short, scannable, non-technical bullet list of the user-facing capabilities this milestone added. Frame each as something the user can now see or do, not as a technical artifact.
   - Then, for the next milestone's agent: what was built (files, models, routes), decisions made that the PRD didn't pre-specify, anything the next milestone needs to know, and any deviation from the PRD with its reason.

Ask any clarifying questions needed to lock the implementation plan for this milestone, using the interrogation rule from `/product-vision` §0.3 — the question tool your host provides, or a formatted numbered list if it has none.
```

### 8.6 Verify before reporting

Re-read each file you just wrote and confirm:

- [ ] Each file opens with a single `# ` H1; `product-overview.md`'s H1 is the product name.
- [ ] `## Problems & Solutions` uses `&`, and every problem is `### Problem N: {Title}`.
- [ ] `## Key Features` and `## Relationships` use `- ` bullets.
- [ ] `product-roadmap.md` contains `### N. {Title}` headings for the sections **and no other numbered `###` heading.**
- [ ] Entity headings are singular PascalCase names, nothing else.
- [ ] Every in-scope feature is covered by at least one section.
- [ ] Every Phase 4 cut appears in the PRD matrix with a disposition.
- [ ] One `prompt.md` exists per locked milestone, numbered from 1, with a `Done when` criterion in the PRD to match.

### 8.7 Report to the user

> Scope locked for **{Product Name}**.
>
> **Design OS**
> 1. `product/product-overview.md` — {N} problems, {N} key features
> 2. `product/product-roadmap.md` — {N} sections
> 3. `product/data-shape/data-shape.md` — {N} entities
>
> **Scaffold**
> 4. `product/prd.md` — full PRD with the V1 out-of-scope matrix
> 5. `product/milestones/` — {N} milestones
>
> **Sections:** 1. {Section} — {description} · 2. {Section} — {description} · 3. {Section} — {description}
>
> **Entities:** {Entity1}, {Entity2}, {Entity3}
>
> **Explicitly out of V1:** {top 3–4 cuts}
>
> Design OS loads `product/*.md` at build time — **restart the dev server** if it's running, or the new cards won't appear.
>
> Next: `/design-tokens` to pick colors and typography, or `/shape-section` to start designing your first section.

Then stop. If the user asks for changes, edit the affected files directly and keep the PRD and the Design OS files in sync — a change to sections touches `product-roadmap.md` *and* the PRD's Sections block; a change to scope touches the matrix *and* `product-overview.md`'s out-of-scope mirror.

---

## Guardrails

- **Never skip Phase 4.** A run that produces no cut list has failed, however good the rest looks.
- **Never widen scope silently.** If the user asks for something during Phase 5–8 that wasn't locked in Phase 3, say so and re-confirm the feature list.
- **Never present a draft of the files for approval.** Each piece was approved during the interview; write them.
- **Never write implementation detail into the PRD.** Naming the stack and the providers is the depth limit.
- **Never assume a question tool exists.** §0.3 is the whole point of this engine being portable across Claude Code, Antigravity, Cursor, and Codex.
- **Keep the two sides in sync.** The PRD and the Design OS files are one locked scope in two presentations, never two plans.

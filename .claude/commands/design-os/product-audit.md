# Product Audit — Scaffold™ Pre-Export Conformance Check

**Command:** `/product-audit` — **Alias:** `/scaffold-audit`

You are running the Scaffold™ **pre-export audit**: a read-only conformance scan of everything `/product-vision`, `/product-roadmap`, `/data-shape`, `/shape-section` and `/export-product` have written so far. It answers one question: **is this product still the product that was locked, and will Design OS actually render it?**

Run it before `/export-product`, after any manual edit to `product/`, and any time the app shows an empty card you expected to be full.

---

## 0. Operating rules

### 0.1 This command never writes

`/product-audit` reads files and prints a report. It does not create, edit, move, or delete anything — not even to fix an obvious typo, not even when the fix is one character. An audit that repairs what it measures cannot be trusted twice.

If the user asks for the fixes after seeing the report, that is a separate piece of work: apply them one file at a time, then **re-run the audit** to confirm. Never fold a repair into the audit pass itself.

### 0.2 Deterministic, not impressionistic

Every `[PASS]` and `[FAIL]` in the report must trace to something you actually read, matched, or counted — a regex that hit or missed, a set difference, a byte comparison. Never mark a check `[PASS]` because the file "looks right". If a check cannot be evaluated because an input is missing, its status is `[SKIP]`, and the report says which input was missing.

Where a judgement is genuinely a judgement (does this section spec smuggle in an out-of-scope capability?), say so: mark it `[WARN]` with the evidence, and let the user rule on it.

### 0.3 Règle d'Interrogation Universelle (no vendor lock-in)

Throughout this document, **`ASK`** means: *present a decision with discrete options and wait for the answer.* Resolve `ASK` against whatever host you are running in, using the first available mechanism:

| Host | Mechanism |
|---|---|
| Claude Code / Claude apps | the `AskUserQuestion` tool |
| Antigravity | the `ask_question` tool |
| Cursor, Codex, plain terminal, any host with no question tool | a chat message containing a formatted numbered list |

The audit itself asks nothing — it runs start to finish and prints. `ASK` applies only if the user asks you to act on the findings and a repair needs a decision.

### 0.4 Where the files are

All paths below are relative to the **Design OS project root** — the folder containing `package.json` and `vite.config.ts`. If your working directory is the Scaffold monorepo root (the folder containing `AGENT_DISPATCH.md`), prefix every path with `design-os/`.

This matters more here than anywhere else: Design OS resolves `/product/*.md` from the **Vite root**. A `product/` folder one level too high parses perfectly and renders nothing, and this audit exists to catch exactly that class of failure.

### 0.5 Report language

Write the report in the language the user is talking to you in. Keep the status tokens `[PASS]`, `[FAIL]`, `[WARN]`, `[SKIP]`, the file paths, and the heading names quoted from the files verbatim in English — they are identifiers, not prose.

---

## 1. Step 0 — Inventory

Before checking anything, establish what exists. Resolve each of these to present / absent:

| Flag | File |
|---|---|
| `OVERVIEW` | `product/product-overview.md` |
| `ROADMAP` | `product/product-roadmap.md` |
| `SHAPE` | `product/data-shape/data-shape.md` |
| `PRD` | `product/prd.md` |
| `MILESTONES` | `product/milestones/*/prompt.md` (count them) |
| `SECTIONS` | `product/sections/*/spec.md` (count them, note the section ids) |
| `EXPORTED` | `product-plan/product-overview.md` |
| `EXPORTED_PRD` | `product-plan/prd.md` |

**If none of `OVERVIEW`, `ROADMAP`, `SHAPE` exist**, stop immediately and print only:

> No product definition found at `product/`. There is nothing to audit yet — run `/product-vision` to lock your V1 scope, then come back.

Also confirm you are auditing the folder Design OS actually loads: `product/` must sit **beside** `package.json`. If you find a `product/` folder at the monorepo root instead, that alone is a `[FAIL]` on every Design OS check — report it once, loudly, at the top: *"`product/` is at the monorepo root; Vite resolves it from `design-os/`. Design OS is rendering nothing regardless of file content."*

---

## 2. Check 1 — Scope Lock Coherence

**What it proves:** the cut list the user locked is the same cut list in every place it was copied. Drift here is the single most expensive failure in Scaffold, because the export is what a coding agent obeys.

`[SKIP]` the whole check if `PRD` is absent — with no PRD there is no source of truth, only copies. Say so.

### 2.1 Extract the three cut lists

| Set | Source | How to extract |
|---|---|---|
| **S1 (source)** | `product/prd.md` → `## Out of Scope — V1 matrix` | The first cell of every table row, excluding the header row and the `\|---\|` separator |
| **S2 (mirror)** | `product/product-overview.md` → `## Out of Scope (V1)` | Every `- ` bullet, taking the text **before the first ` — `** (em dash) as the item |
| **S3 (export)** | `product-plan/product-overview.md` → `## Out of Scope (V1)` | Same bullet rule as S2 |

Normalize before comparing, or you will report false drift: lowercase, strip backticks and `**`, collapse runs of whitespace, drop a trailing period. Compare as **sets**, not as ordered lists — order carries no meaning here.

### 2.2 The three comparisons

1. **S1 vs S2** — the mirror inside the app.
   - In S1, not in S2 → **`[FAIL]` — leak.** A locked cut is invisible to `/shape-section` and `/design-screen`, which read only the overview. Name every leaked item.
   - In S2, not in S1 → **`[FAIL]` — ghost cut.** The app is enforcing a boundary the PRD never recorded.
2. **S1 vs S3** — the export copy. `[SKIP]` if `EXPORTED` is false.
   - Any difference → **`[FAIL]` — stale export.** The handoff no longer matches the contract. This is always fixed by re-running `/export-product`, never by hand-editing `product-plan/`.
3. **`product/prd.md` vs `product-plan/prd.md`** — `[SKIP]` if `EXPORTED_PRD` is false.
   - Step 4b of `/export-product` copies the PRD **verbatim**. Compare the two files byte for byte (`diff` is enough). Any difference at all → **`[FAIL]` — the exported contract is not the contract.** Report the number of differing lines, not the diff itself.

### 2.3 In-scope coherence

The lock has two halves, and the audit checks both:

- The `## Key Features` bullet list in `product/product-overview.md` must appear **verbatim** under `## Key Features` in `product-plan/product-overview.md` (`[SKIP]` if not exported). Same items, same wording, same order. Differences → `[FAIL]`.
- Every feature in `## Key Features` must be visible in the PRD's `## What the app does` or `## Sections` blocks. A feature that exists only in the overview was added after the lock → `[WARN]`, and name it.

### 2.4 The collision test

Finally, cross the two halves: read each `## Key Features` bullet against the S1 cut list. If a locked feature *is* an item on the out-of-scope matrix, or plainly requires one, that is a self-contradicting scope → **`[FAIL]`**, quote both lines side by side. Only `/product-vision` can resolve it; no downstream command should be asked to guess which half wins.

---

## 3. Check 2 — Design OS Regex Contracts

**What it proves:** the three files Design OS renders will actually parse. These are exact-match regexes in `src/lib/product-loader.ts` and `src/lib/data-shape-loader.ts`. A heading that is *nearly* right yields a silently empty card, never an error — which is why this check exists at all.

Apply the real regexes below to the real file contents. Do not eyeball the headings.

### 3.1 `product/product-overview.md`

| # | Contract | Regex / rule | Failure mode |
|---|---|---|---|
| 1 | Product name | `/^#\s+(.+)$/m` | Falls back to the literal string "Product Overview" on the card |
| 2 | Description | `/## Description\s*\n+([\s\S]*?)(?=\n## \|\n#[^#]\|$)/` | Empty description block |
| 3 | Problems block | `/## Problems & Solutions\s*\n+([\s\S]*?)(?=\n## \|\n#[^#]\|$)/` — literal `&`, not "and", not `&amp;` | Zero problems rendered |
| 4 | Each problem | `/### Problem \d+:\s*(.+)\n+([\s\S]*?)(?=\n### \|\n## \|$)/g` — the literal word `Problem`, a number, a colon | That problem silently disappears |
| 5 | Features | `/## Key Features\s*\n+…/` then **`- ` bullets only** | A `*` bullet parses as nothing |

Also verify the **null guard**: `parseProductOverview` returns `null` — the card renders as undefined — when the description is empty **and** there are zero problems **and** there are zero features. If all three are thin, say so explicitly.

### 3.2 `product/product-roadmap.md`

| # | Contract | Regex / rule | Failure mode |
|---|---|---|---|
| 1 | H1 | one `# ` on the first line | — |
| 2 | Sections | `/### (\d+)\.\s*(.+)\n+([\s\S]*?)(?=\n### \|\n## \|\n#[^#]\|$)/g` — number, period, space | Missing sections |
| 3 | **Global scan** | that regex runs over the **whole file**, not just the `## Sections` block | **Phantom sections in the UI** |
| 4 | Null guard | zero matches → `parseProductRoadmap` returns `null` | The whole Sections list is empty |

Contract 3 is the trap, and it is worth its own count. Count `^### \d+\.` matches in the **entire file**, then count them **inside the `## Sections` block only**. If the two numbers differ, the file contains a numbered `###` heading somewhere else — a milestone list, a numbered aside — and Design OS is rendering it as a section. `[FAIL]`, and name the offending headings and their line numbers.

Also check that the section numbers are `1..N` with no gaps and no duplicates. The parser sorts by the number and tolerates gaps, but a duplicate number means the sort order shown to the user is arbitrary → `[WARN]`.

### 3.3 `product/data-shape/data-shape.md`

| # | Contract | Regex / rule | Failure mode |
|---|---|---|---|
| 1 | Path | exactly `product/data-shape/data-shape.md` — the loader keys on that literal path | Card never appears, whatever the content |
| 2 | Entities block | `/## Entities\s*\n+([\s\S]*?)(?=\n## \|\n#[^#]\|$)/` | Zero entities |
| 3 | Each entity | `/### ([^\n]+)\n+([\s\S]*?)(?=\n### \|\n## \|$)/g` | — |
| 4 | Relationships | `/## Relationships\s*\n+…/` then **`- ` bullets only** | Zero relationships |
| 5 | Null guard | zero entities **and** zero relationships → `null` | Empty Data Shape page |

Two extra rules that the regex tolerates but the UI does not:

- Entity headings must be **singular PascalCase names and nothing else**. `### Invoice` is an entity; `### Invoices (and their line items)` becomes an entity literally named that. → `[WARN]`.
- Prose placed under `## Entities` *after* the last `### Entity` is absorbed into that last entity's description and renders inside its card. → `[WARN]`, name the entity that swallowed it.

### 3.4 Section specs — the `/shape-section` contract

For each `product/sections/{id}/spec.md`, confirm the four headings `## Overview`, `## User Flows`, `## UI Requirements`, `## Configuration` are present, and that `## Configuration` carries a `- shell: true` or `- shell: false` line.

Then confirm the **slug contract**: `{id}` must equal the app's `slugify()` of the roadmap section title — lowercase, diacritics stripped, apostrophes removed, ` & ` → `-and-`, every other run of non-alphanumerics → `-`. A section folder whose id does not match any roadmap section is orphaned and will never be routed to → `[FAIL]`, name it and give the id the roadmap implies.

---

## 4. Check 3 — Feature Coverage

**What it proves:** no locked feature was quietly dropped between the feature list and the build plan. An orphaned feature is a promise with nothing scheduled to keep it.

`[SKIP]` if `OVERVIEW` or `ROADMAP` is absent.

1. Take the `## Key Features` list from `product/product-overview.md`.
2. Take the sections from `product/product-roadmap.md` (`### N. Title` + description).
3. If `PRD`, take the PRD's `## Sections` block, which carries the explicit feature-coverage map written by `/product-vision`. **Prefer it** — it is the recorded intent, not an inference.
4. Map each feature to the section(s) that deliver it. Print the mapping as `feature → section` lines, one per feature, so the reasoning is on the record and reviewable.

Verdicts:

- Every feature has ≥ 1 section → `[PASS]`.
- A feature maps to no section → `[FAIL] — orphaned feature`. Name it, and name the section it most plausibly belongs to as the suggested fix.
- A section delivers no feature → `[WARN] — unbacked section`. It may be legitimate infrastructure (an app shell, a settings area); say which feature list it fails to serve and let the user judge.
- You cannot tell whether a feature is covered, and there is no PRD coverage map to settle it → `[WARN] — unverified`, never a silent `[PASS]`.

If `MILESTONES` is non-zero, run the same test one level down: every feature should appear in at least one milestone's *What gets built*. A feature in a section but in no milestone → `[WARN]`.

---

## 5. Check 4 — Section Airtightness

**What it proves:** the scope lock survived contact with the section-level design work. This is where creep actually happens — not in the PRD, but three commands later, in a spec that quietly added "and users can share this by email".

`[SKIP]` if `SECTIONS` is zero, or if neither `PRD` nor an `## Out of Scope (V1)` block exists — with no cut list there is nothing to be airtight against.

### 5.1 Build the excluded-term set

From the S1 matrix items (or S2 if there is no PRD), extract the meaningful terms: content words of 4+ characters, plus obvious inflections and the common synonyms of each cut. `Payments & billing` yields `payment`, `billing`, `invoice`, `subscription`, `checkout`, `stripe`. `OAuth / third-party login` yields `oauth`, `sso`, `google login`, `social login`. Do this per item, and keep each term attached to the item it came from — the report has to name the collision, not just the word.

**Then subtract the in-scope vocabulary, or the scan is worthless.** Drop every term that also appears in `## Key Features`, in the PRD's `## What the app does`, or in the data model's entity names and field names. A cut phrased as *"paiement en ligne"* contributes the term `ligne`, which then matches every "ligne de prestation" in an invoicing product; a cut phrased as *"relances par email"* contributes `email`, which matches the client's email field. Both are the product, not a breach. What survives the subtraction is the vocabulary that belongs **only** to the cut — that is the term set worth scanning with.

### 5.2 Scan

Search every `product/sections/*/spec.md` — `## Overview`, `## User Flows`, `## UI Requirements` — for those terms. **Match on stems, on both sides**: a cut recorded in the plural (*"relances automatiques"*) must still hit a spec line written in the singular (*"programmer une relance automatique"*), or the check quietly passes the exact breach it exists to find.

For each hit, read the sentence and classify:

- The spec **delivers** the excluded capability → `[FAIL] — scope breach`. Quote the line, name the matrix item it collides with, give the file and line number.
- The spec **names it to exclude it** ("no sharing in V1", "export is out of scope") → not a finding. Boundaries restated at section level are the system working.
- Genuinely ambiguous → `[WARN]`. Quote the line and ask the user to rule on it. Do not resolve it yourself; you are not the product owner.

Keyword matching produces false positives — an "invoice" in an invoicing product is the product, not a payments breach. Judge every hit in context before printing it, and never report a raw grep count as a finding.

### 5.3 One level further, when a breach is found

If and only if §5.2 produced a `[FAIL]`, check whether the breach has already reached code: look for a component under `src/sections/{id}/` implementing it. If it has, say so — the fix is then a spec edit **and** a component edit, and the report should not imply that fixing the markdown is enough.

---

## 6. Check 5 — The Report

Print one table. No preamble, no restating of what an audit is.

```markdown
## Scaffold Pre-Export Audit — {Product Name}

| # | Check | Status | Detail |
|---|---|---|---|
| 1 | Scope lock coherence | [PASS] | {N} cuts, identical across prd.md, product-overview.md, product-plan/ |
| 2 | Design OS regex contracts | [FAIL] | product-roadmap.md: 5 `### N.` headings, 3 inside `## Sections` |
| 3 | Feature coverage | [WARN] | 7/8 features mapped; "Recurring reminders" unmatched |
| 4 | Section airtightness | [PASS] | 3 specs scanned against 9 cuts, no breach |

**Verdict: NOT EXPORT READY** — 1 failure, 1 warning.

### Corrective actions

1. **[FAIL] Check 2** — `product-roadmap.md` lines 24 and 31 hold `### 4. Build order` and `### 5. Notes`, which Design OS renders as phantom sections. Remove them or drop the numbering. Design OS reads `product/` at **build time** — restart the dev server after the edit.
2. **[WARN] Check 3** — "Recurring reminders" is in `## Key Features` but no section delivers it. Add it to a section with `/product-roadmap`, or cut it with `/product-vision`.
```

Rules for the report:

- **One line per finding, with a file path and a line number wherever there is one.** "The roadmap has an issue" is not a finding; `product-roadmap.md:24` is.
- **Every `[FAIL]` and `[WARN]` gets a numbered corrective action naming the command that fixes it** — `/product-vision` for scope, `/product-roadmap` for sections, `/data-shape` for entities, `/shape-section` for a spec, `/export-product` for a stale export. A finding with no stated fix is half a finding.
- **Never recommend hand-editing `product-plan/`.** It is generated. The fix is always to correct `product/` and re-export.
- **Verdict line, always.** `EXPORT READY` only when there is not a single `[FAIL]`; `EXPORT READY (with warnings)` when there are warnings but no failures; `NOT EXPORT READY` otherwise. `[SKIP]`s never block the verdict, but list them under the table so nobody reads a skipped check as a passed one.
- If everything passes, say it in one line and stop. A clean audit does not need a summary of itself.

### 6.1 After the report

Close with the single most useful next step, and nothing more:

- All clear and `EXPORTED` is false → *"Run `/export-product` to generate the handoff package."*
- All clear and already exported → *"`product-plan/` is in sync — hand it to your coding agent."*
- Failures present → *"Fix the items above, then re-run `/product-audit`."*

If the user then asks you to apply the fixes, use `ASK` (§0.3) for any repair that has more than one defensible resolution — especially a scope collision, where "cut the feature" and "pull the item back into scope" are different products. Then re-run the audit.

---

## Guardrails

- **The audit writes nothing.** Not a fix, not a reformat, not a missing newline.
- **No finding without evidence.** Every `[FAIL]` cites a path, a line, or a set difference.
- **`prd.md` is the source of truth.** When two files disagree, the PRD is right and the other file has drifted — never the reverse, and never "they're both a bit right".
- **A skipped check is not a passed check.** Say what was missing.
- **Never invent a cut list, a coverage map, or a scope boundary** to make a check evaluable. Missing input means `[SKIP]`.
- **Do not audit the code against the PRD.** This command audits the *product definition*, not the implementation. §5.3 is the one exception, and only after a breach is already proven at spec level.

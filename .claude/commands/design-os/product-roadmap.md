# Product Roadmap

You are helping the user create or update their product roadmap for Design OS.

## Step 1: Check Current State

Check two things:

- Does `/product/product-roadmap.md` exist?
- Does `/product/prd.md` exist? Call this **`PRD_EXISTS`**. It changes how this command behaves, because the roadmap is then no longer the only place the section list lives.

---

## The PRD Sync Guard — apply whenever `PRD_EXISTS`

When `/product-vision` ran the BM PRD engine, it wrote the section list into **two** places: `product/product-roadmap.md` (what Design OS renders) and the `## Sections` block of `product/prd.md` (the locked scope contract). **The PRD is the source of truth.** Editing the roadmap alone puts the two silently out of sync, and everything downstream — `/shape-section`, `/design-screen`, `/export-product` — then works from a scope nobody agreed to.

So before writing anything, say it plainly:

"One thing before we change this: your project brief already records the agreed list of areas. If we change it here and not there, the two will disagree — and the brief is what the developers receive."

Per `/product-vision` §0.6, keep that sentence in the user's register: say *your project brief*, never *the PRD*; say *the main areas of the application*, never *sections* as a technical term.

Then ASK, using the interrogation rule from `/product-vision` §0.3 — the question tool your host provides (`AskUserQuestion`, `ask_question`), or a formatted numbered list if it has none:

1. **Update both, keep them consistent** *(recommended)* — change it here and in your brief together.
2. **Change it here only** — the brief will no longer match, and I'll tell you exactly where.
3. **This changes what we're building** — stop, and revisit the vision with `/product-vision`.

Then act on the answer:

- **Both** — make the roadmap change, then update the PRD's `## Sections` block so section names, order, and descriptions match exactly. Touch nothing else in the PRD — **especially not the out-of-scope matrix.**
- **Roadmap only** — make the change, then name the sections that now differ from `prd.md`, so the drift is on the record instead of being discovered at export time.
- **Cancel** — stop and point them at `/product-vision`.

**One case overrides the user's choice.** If the requested change adds a section that delivers something sitting on the PRD's out-of-scope matrix, that is a scope change, not a roadmap edit. Name the matrix item it collides with and recommend `/product-vision`. Never widen locked scope through a roadmap edit.

If `PRD_EXISTS` is false, skip this guard entirely.

---

## If Roadmap Already Exists (Updating)

Read:
- `/product/product-overview.md`
- `/product/product-roadmap.md`
- `/product/prd.md` — if `PRD_EXISTS`, for its `## Sections` block and its out-of-scope matrix

Present the current state and ask what to change:

"Your product roadmap currently has [N] sections:

1. **[Section 1]** — [Description]
2. **[Section 2]** — [Description]
3. **[Section 3]** — [Description]

What would you like to change about the sections?"

Wait for the user's response describing what they want changed.

Then, **if `PRD_EXISTS`, run The PRD Sync Guard above before touching any file.** Otherwise **immediately proceed** to update `product/product-roadmap.md` based on their requested changes — do not present a draft for approval.

After updating, inform the user:

"I've updated the product roadmap based on your feedback. Review the changes and let me know if you'd like further adjustments."

[If you also updated the PRD, add: "I kept the `## Sections` block in `product/prd.md` in sync."]
[If the user chose roadmap-only, add: "Note: `product/prd.md` still lists the previous sections — [name them]. `/export-product` hands the PRD's version to your coding agent, so these will need reconciling before you export."]

Stop here — the remaining steps below are for generating a new roadmap from scratch.

---

## If No Roadmap Exists (Creating New)

### Check Prerequisites

Read `/product/product-overview.md`. If it doesn't exist:

"Before creating a product roadmap, you'll need to define your product vision. Please run `/product-vision` first."

Stop here if the product overview is missing.

Also read `/product/prd.md` if it exists. A PRD with no roadmap beside it is unusual — `/product-vision` writes both — so it most likely means the roadmap was deleted. In that case the PRD's `## Sections` block still holds the agreed list: **restore from it rather than inventing new sections**, and tell the user that's what you did.

### Analyze and Generate

Read the product overview and analyze:
- The core description
- The problems being solved
- The key features listed
- The `## Out of Scope (V1)` list, if present — **never create a section whose purpose is a cut item**

**Immediately proceed** to create `/product/product-roadmap.md` — do not present a draft for approval. Generate 3-5 sections that represent:
- **Navigation items** - main areas of the product UI
- **Roadmap phases** - logical order for building
- **Self-contained feature areas** - each can be designed and built independently

Use this exact format:

```markdown
# Product Roadmap

## Sections

### 1. [Section Title]
[One sentence description]

### 2. [Section Title]
[One sentence description]

### 3. [Section Title]
[One sentence description]
```

### Confirm

"I've created your product roadmap at `/product/product-roadmap.md` with [N] sections:

1. **[Section 1]** — [Description]
2. **[Section 2]** — [Description]
3. **[Section 3]** — [Description]

Review the sections and let me know if you'd like to adjust anything. When you're ready, run `/data-shape` to sketch out the general shape of your product's data."

---

## Important Notes

- Sections should be ordered by development priority
- Each section should be self-contained enough to design and build independently
- Section titles become navigation items in the app
- The numbered format (`### 1. Title`) is required for parsing
- Keep descriptions to one sentence - concise and clear
- Don't create too many sections (3-5 is ideal)
- Do NOT present a draft for approval — generate the file immediately and let the user review after
- If the user requests changes after reviewing, update the file immediately
- When `product/prd.md` exists, it is the source of truth for the section list — apply The PRD Sync Guard rather than editing the roadmap in isolation
- Never add a section that delivers an item from the PRD's out-of-scope matrix; that is a `/product-vision` decision
- This file must contain **no numbered `###` heading other than the sections themselves** — the parser matches `### N.` globally and would render phantom sections

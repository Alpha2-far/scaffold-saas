# Data Shape

You are helping the user create or update the general shape of their product's data — the core entities ("nouns") and how they relate to each other. This creates a shared vocabulary that ensures consistency across sections when generating sample data and screen designs. This is not the final data model — it's a starting point that the implementation agent will extend and refine.

## Step 1: Check Current State

Check two things:

- Does `/product/data-shape/data-shape.md` exist?
- Does `/product/prd.md` exist? Call this **`PRD_EXISTS`**. It changes how this command behaves, because the data model is then no longer described in only one place.

---

## The PRD Sync Guard — apply whenever `PRD_EXISTS`

When `/product-vision` ran the BM PRD engine, it described the data in **two** places at two depths: `product/data-shape/data-shape.md` (entity names, a one-line purpose each, and the relationships — what Design OS renders and what `/sample-data` names things from) and the `## Data model` block of `product/prd.md` (the same entities **plus their fields**, which is the locked contract). **The PRD is the source of truth.** Editing the data shape alone puts the two out of sync, and `/export-product` then hands your coding agent a field list that no longer matches the entities the screens were designed against.

So before writing anything, say it plainly:

"One thing before we change this: your project brief already records this information, along with the detail behind it. If we change it here and not there, the two will disagree — and the brief is what the developers receive."

Per `/product-vision` §0.6, keep that sentence in the user's register: say *your project brief*, never *the PRD*; say *the information the app keeps track of*, never *the data model* or *entities*.

Then ASK, using the interrogation rule from `/product-vision` §0.3 — the question tool your host provides (`AskUserQuestion`, `ask_question`), or a formatted numbered list if it has none:

1. **Update both, keep them consistent** *(recommended)* — change it here and in your brief together.
2. **Change it here only** — the brief will no longer match, and I'll tell you exactly where.
3. **This changes what we're building** — stop, and revisit the vision with `/product-vision`.

Then act on the answer:

- **Both** — make the data-shape change, then update the PRD's `## Data model` block so the entity names and relationships match exactly. Where a new entity or a renamed one needs fields, propose them in plain language and confirm before writing. Touch nothing else in the PRD — **especially not the out-of-scope matrix.**
- **Data shape only** — make the change, then name the entities that now differ from `prd.md`, so the drift is on the record instead of being discovered at export time.
- **Cancel** — stop and point them at `/product-vision`.

**One case overrides the user's choice.** If the requested change adds an entity that exists only to support something sitting on the PRD's out-of-scope matrix, that is a scope change, not a data-shape edit. Name the matrix item it collides with and recommend `/product-vision`. Never widen locked scope through a data-shape edit.

**A rename is not a local edit.** Entity names are the shared vocabulary: they appear in each section's `types.ts` and `data.json`, and in the PRD. If the user renames an entity, say which of those will need updating too — `/sample-data` regenerates per section, it does not rename retroactively.

If `PRD_EXISTS` is false, skip this guard entirely.

---

## If Data Shape Already Exists (Updating)

Read:
- `/product/data-shape/data-shape.md`
- `/product/product-overview.md` (if it exists, for context)
- `/product/product-roadmap.md` (if it exists, for context)
- `/product/prd.md` — if `PRD_EXISTS`, for its `## Data model` block and its out-of-scope matrix

Present the current state and ask what to change:

"Your data shape currently defines these entities:

- **[Entity1]** — [Description]
- **[Entity2]** — [Description]

**Relationships:**
- [Relationship 1]
- [Relationship 2]

What would you like to change about the entities or relationships?"

Wait for the user's response describing what they want changed.

Then, **if `PRD_EXISTS`, run The PRD Sync Guard above before touching any file.** Otherwise **immediately proceed** to update `product/data-shape/data-shape.md` based on their requested changes — do not present a draft for approval.

After updating, inform the user:

"I've updated the data shape based on your feedback. Review the changes and let me know if you'd like further adjustments."

[If you also updated the PRD, add: "I kept the `## Data model` block in `product/prd.md` in sync."]
[If the user chose data-shape-only, add: "Note: `product/prd.md` still describes the previous entities — [name them]. `/export-product` hands the PRD's version to your coding agent, so these will need reconciling before you export."]

Stop here — the remaining steps below are for generating a new data shape from scratch.

---

## If No Data Shape Exists (Creating New)

### Check Prerequisites

Read:
1. `/product/product-overview.md` to understand what the product does
2. `/product/product-roadmap.md` to understand the planned sections

If either file is missing, let the user know:

"Before defining your data shape, you'll need to establish your product vision. Please run `/product-vision` first."

Stop here if prerequisites are missing.

Also read `/product/prd.md` if it exists. A PRD with no data shape beside it is unusual — `/product-vision` writes both — so it most likely means the file was deleted. In that case the PRD's `## Data model` block still holds the agreed entities and relationships: **restore from it rather than inventing a new model**, condensing each entity's field list down to the one-line purpose this file wants. Tell the user that's what you did.

### Analyze and Generate

Review the product overview and roadmap, then **immediately proceed** to create the data shape file — do not present a draft for approval.

Identify:
- **Entity names** — The main nouns (things users create, view, or manage)
- **Plain-language descriptions** — What each entity represents
- **Relationships** — How entities connect to each other

If the overview has an `## Out of Scope (V1)` list, **do not create entities that exist only to serve a cut item.** An entity for a feature that isn't being built is scope creep wearing a data-model costume.

Create `/product/data-shape/data-shape.md` with this format:

```markdown
# Data Shape

## Entities

### [EntityName]
[Plain-language description of what this entity represents and its purpose in the system.]

### [AnotherEntity]
[Plain-language description.]

[Add more entities as needed]

## Relationships

- [Entity1] has many [Entity2]
- [Entity2] belongs to [Entity1]
- [Entity3] belongs to both [Entity1] and [Entity2]
[Add more relationships as needed]
```

### Confirm

"I've created your data shape at `/product/data-shape/data-shape.md`.

**Entities defined:**
- [List entities]

**Relationships:**
- [List key relationships]

This provides a shared vocabulary for your screen designs. When you run `/sample-data`, it will reference these entities to ensure consistent naming across sections.

Review and let me know if you'd like to adjust anything. When you're ready, run `/design-tokens` to choose your color palette and typography."

---

## Important Notes

- Keep it **minimal** — entity names, descriptions, and relationships
- Do NOT define detailed schemas, field types, or validation rules
- Use plain language that a non-technical person could understand
- Relationships are conceptual — they describe how data relates from the user's perspective, not database structure
- The implementation agent will decide how to model, store, and extend these entities
- Entity names should be singular (User, Invoice, Project — not Users, Invoices)
- Do NOT present a draft for approval — generate the file immediately and let the user review after
- If the user requests changes after reviewing, update the file immediately
- When `product/prd.md` exists, it is the source of truth for the data model — apply The PRD Sync Guard rather than editing the data shape in isolation
- Field-level detail lives in the PRD's `## Data model`, never here — a wall of field bullets renders as an unreadable blob on the Data Shape card
- Never add an entity that exists only to support an item from the PRD's out-of-scope matrix

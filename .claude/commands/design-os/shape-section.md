# Shape Section

You are helping the user define the specification for a section of their product. This is a conversational process to establish the scope of functionality, user flows, and UI requirements — then automatically generate the spec and sample data.

---

## 0. Interrogation rule (`ASK`)

Throughout this command, **`ASK`** means: *present a decision with discrete options and wait for the answer.* Resolve it against whatever host you are running in, first available mechanism wins:

| Host | Mechanism |
|---|---|
| Claude Code / Claude apps | the `AskUserQuestion` tool |
| Antigravity | the `ask_question` tool |
| Cursor, Codex, plain terminal, any host with no question tool | a chat message containing a formatted numbered list |

Numbered-list fallback format:

```
1. Option A — one-line reason
2. Option B — one-line reason

Reply with a number, or tell me something else.
```

Detect what your host actually offers once, at the start, then stay consistent for the whole session. **Never invent or assume a tool.** Free-form input — raw notes, a flow described in the user's own words — is never an `ASK`.

This is the same rule as `/product-vision` §0.3, restated here so this command runs unchanged in Claude Code, Antigravity, Cursor and Codex.

---

## Step 1: Check Prerequisites

First, verify that `/product/product-roadmap.md` exists. If it doesn't:

"I don't see a product roadmap defined yet. Please run `/product-roadmap` first to define your product sections, then come back to shape individual sections."

Stop here if the roadmap doesn't exist.

### Load the scope lock

Then read the V1 boundary — it constrains everything this command writes:

- `/product/product-overview.md` → its `## Out of Scope (V1)` section, if present. Call that list **`CUT_LIST`**.
- `/product/prd.md` → its `## Out of Scope — V1 matrix`, if the file exists. This is the **source of truth**. If the two disagree, the matrix wins — say so once, and suggest `/product-audit` to see the full drift.

If neither exists, `CUT_LIST` is empty: this product was scoped by hand, or before the BM PRD engine landed. Carry on normally — but never invent a boundary to fill the gap.

`CUT_LIST` is not background reading. Step 4 and Step 6a act on it.

## Step 2: Identify the Target Section

Read `/product/product-roadmap.md` to get the list of available sections.

If there's only one section, auto-select it. If there are multiple sections, `ASK` which section the user wants to work on:

"Which section would you like to define the specification for?"

Present the available sections as options.

## Step 3: Gather Initial Input

Once the section is identified, invite the user to share any initial thoughts:

"Let's define the scope and requirements for **[Section Title]**.

Do you have any notes or ideas about what this section should include? Share any thoughts about the features, user flows, or UI patterns you're envisioning. If you're not sure yet, we can start with questions."

Wait for their response. The user may provide raw notes or ask to proceed with questions.

## Step 4: Ask Clarifying Questions

Use `ASK` for 4-6 targeted questions to define:

- **Main user actions/tasks** - What can users do in this section?
- **Information to display** - What data and content needs to be shown?
- **Key user flows** - What are the step-by-step interactions?
- **UI patterns** - Any specific interactions, layouts, or components needed?
- **Scope boundaries** - What should be explicitly excluded?

Example questions (adapt based on their input and the section):
- "What are the main actions a user can take in this section?"
- "What information needs to be displayed on the primary view?"
- "Walk me through the main user flow - what happens step by step?"
- "Are there any specific UI patterns you want to use (e.g., tables, cards, modals)?"
- "What's intentionally out of scope for this section?"
- "Are there multiple views needed (e.g., list view and detail view)?"

Ask questions one or two at a time, conversationally. Focus on user experience and interface requirements - no backend or database details.

### Hold the line during the interview

If an answer pulls in something on `CUT_LIST`, do not write it into the spec — and do not silently argue it away either. Name the collision on the spot:

"That one is on the list we deliberately set aside for this first release — *[item]*, because *[the recorded reason]*. I can keep it out of this area, or we can revisit what we're building."

Per `/product-vision` §0.6: *set aside for now*, never *out of scope* or *cut*.

Then `ASK`:

1. **Leave it for later** *(recommended)* — this area ships as agreed, and the decision stands.
2. **This changes what we're building** — stop here and re-run `/product-vision`, so your brief and your summary move together.

Never take option 2 on your own by quietly widening the spec. A boundary a section spec can cross is not a boundary.

## Step 5: Ask About Shell Configuration

If a shell design has been created for this project (check if `/src/shell/components/AppShell.tsx` exists), ask the user about shell usage:

"Should this section's screen designs be displayed **inside the app shell** (with navigation header), or should they be **standalone pages** (without the shell)?

Most sections use the app shell, but some pages like public-facing views, landing pages, or embedded widgets should be standalone."

`ASK` with options:
- "Inside app shell" - The default for most in-app sections
- "Standalone (no shell)" - For public pages, landing pages, or embeds

If no shell design exists yet, skip this question and default to using the shell.

## Step 6: Auto-Proceed — Create Spec and Sample Data

Once you have enough information from the clarifying questions, **immediately proceed** without asking for approval. Do all of the following in sequence:

### 6a: Create the Spec File

Create the file at `product/sections/[section-id]/spec.md` with this exact format:

```markdown
# [Section Title] Specification

## Overview
[2-3 sentence summary of what this section does]

## User Flows
- [Flow 1]
- [Flow 2]
- [Flow 3]
[Add all flows discussed]

## UI Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
[Add all requirements discussed]

## Configuration
- shell: [true/false]
```

**Before you write it — the scope check.** Read your drafted `## User Flows` and `## UI Requirements` back against `CUT_LIST`, line by line. Any flow or requirement that delivers a cut capability comes out now, before the file exists. Two things are legitimate and one is not:

- Restating a boundary inside the spec — "sharing by email is out of V1" — is fine, and helps `/design-screen` downstream.
- Designing *around* a cut — an empty state that explains the capability isn't there — is fine.
- Shipping the cut capability under a different name is not. `/product-audit` reads these specs against the same matrix and will find it; the difference is that here it costs one sentence, and there it costs a re-export.

**Important:**
- Set `shell: true` if the section should display inside the app shell (this is the default)
- Set `shell: false` if the section should display as a standalone page without the shell
- The section-id is the slug version of the section title: lowercase, spaces → hyphens, and **` & ` → `-and-`** (e.g. "Composants & UI" → `composants-and-ui`). This must match exactly what the app's `slugify()` function produces.
- Don't add features that weren't discussed. Don't leave out features that were discussed.
- Don't add anything on `CUT_LIST`, discussed or not — see the scope check above.
- The parser hunts for the literal string `shell: false` **anywhere in the file**, case-insensitive, not just under `## Configuration`. Never write those two words together in prose — a sentence like "this view does not need shell: false" silently detaches the section from the app shell.

### 6b: Generate Sample Data and Types

Immediately after writing the spec, run the full sample data generation process for this section:

1. **Check for global data shape** — Read `/product/data-shape/data-shape.md` if it exists. Use entity names and relationships as a guide for consistency.

2. **Analyze the spec** — Determine what data entities are implied by the user flows, what fields each entity needs, and what actions can be taken (these become callback props).

3. **Create `product/sections/[section-id]/data.json`** with:
   - A `_meta` section with human-readable descriptions of each entity and their relationships
   - Realistic, believable sample data (not "Lorem ipsum" or "Test 123")
   - 5-10 sample records for main entities
   - Varied content: mix short/long text, different statuses
   - Edge cases: at least one empty array, one long description
   - TypeScript-friendly structure with consistent field names

   Required `_meta` structure:
   ```json
   {
     "_meta": {
       "models": {
         "entityName": "Plain-language description of what this entity represents."
       },
       "relationships": [
         "Description of how models connect to each other"
       ]
     }
   }
   ```

4. **Create `product/sections/[section-id]/types.ts`** with:
   - Data interfaces inferred from sample data (strings, numbers, booleans, arrays, nested objects)
   - Union types for status/enum fields based on the spec
   - A Props interface named `[SectionName]Props` with data as props and optional callback props for each action
   - JSDoc comments on callback props
   - PascalCase for interface names, camelCase for property names

### 6c: Inform the User

After all files are created, present a summary:

"I've created the following for **[Section Title]**:

1. **Spec** — `product/sections/[section-id]/spec.md`
2. **Sample Data** — `product/sections/[section-id]/data.json` ([X] records)
3. **TypeScript Types** — `product/sections/[section-id]/types.ts`

Here's a quick summary of the spec:

**Overview:** [2-3 sentence summary]

**User Flows:** [Brief list]

**Sample data includes:** [Brief description of entities and record counts]

Feel free to review these files. Let me know if you'd like to adjust anything in the spec or sample data. When you're ready, run `/design-screen` to create the screen design for this section."

## Important Notes

- Be conversational and helpful, not robotic
- Ask follow-up questions when answers are vague
- Focus on UX and UI - don't discuss backend, database, or API details
- Keep the spec concise - only include what was discussed, no bloat
- The format must match exactly for the app to parse it correctly
- Do NOT present a draft for approval — go straight to writing the files after gathering enough info
- If the user requests changes after reviewing, update the relevant files immediately — including re-running the `CUT_LIST` check on the new version
- Never assume a question tool exists: `ASK` (§0) is what keeps this command portable across Claude Code, Antigravity, Cursor and Codex
- The scope lock is not advisory. A section spec cannot widen V1; only `/product-vision` can

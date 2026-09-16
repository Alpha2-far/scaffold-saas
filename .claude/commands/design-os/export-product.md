# Export Product

You are helping the user export their complete product design as a handoff package for implementation. This generates all files needed to integrate the UI designs into a real codebase.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`

**Recommended (show warning if missing):**
- `/product/data-shape/data-shape.md` — Product entities
- `/product/DESIGN.md` — The design system pivot file (written by `/design-tokens`)
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `src/shell/components/AppShell.tsx` — Application shell
- `/product/prd.md` — Product requirements document with the V1 out-of-scope matrix

If required files are missing:

"To export your product, you need at minimum:
- A product overview (`/product-vision`)
- A roadmap with sections (`/product-roadmap`)
- At least one section with screen designs

Please complete these first."

Stop here if required files are missing.

If recommended files are missing, show warnings but continue:

"Note: Some recommended items are missing:
- [ ] Product entities — Run `/data-shape` for consistent entity naming
- [ ] Design tokens — Run `/design-tokens` for consistent styling
- [ ] Application shell — Run `/design-shell` for navigation structure
- [ ] PRD & scope lock — Run `/product-vision` so the handoff carries the V1 out-of-scope matrix

You can proceed without these, but they help ensure a complete handoff."

## Step 2: Gather Export Information

Read all relevant files:

1. `/product/product-overview.md` — Product name, description, features
2. `/product/product-roadmap.md` — List of sections in order
3. `/product/data-shape/data-shape.md` (if exists)
4. `/product/DESIGN.md` (if exists) — the design system pivot file
5. `/product/design-system/colors.json` (if exists)
6. `/product/design-system/typography.json` (if exists)
7. `/product/shell/spec.md` (if exists)
8. For each section: `spec.md`, `data.json`, `types.ts`
9. List screen design components in `src/sections/` and `src/shell/`
10. `/product/prd.md` (if exists) — the full PRD and its **Out of Scope — V1 matrix**
11. `/product/milestones/` (if exists) — the development milestone sequence written by `/product-vision`

### Scope-lock detection

Two conditional flags drive the scope-lock content in every step below. Resolve both now, before generating anything:

- **`PRD_EXISTS`** — true if `/product/prd.md` is present. This file carries the locked V1 scope and the out-of-scope matrix.
- **`OUT_OF_SCOPE_EXISTS`** — true if `/product/product-overview.md` contains an `## Out of Scope (V1)` section. `/product-vision` writes that mirror; a hand-written overview may not have it.
- **`DESIGN_EXISTS`** — true if `/product/DESIGN.md` is present. This file is the design system contract: the compiled 12 semantic tokens, their measured contrast ratios, the motion curves and the component bindings. `/design-tokens` writes it.

If `OUT_OF_SCOPE_EXISTS`, capture that section's body **verbatim** — you transport it in Step 4.

If **neither** flag is true, this product was scoped by hand or before the BM PRD engine landed. Export normally, but say so once:

"Note: no PRD or out-of-scope matrix found. Your handoff will tell the implementing agent what to build, but not what *not* to build. Run `/product-vision` if you want the V1 scope lock carried into the export."

Never invent an out-of-scope list to fill the gap. An invented boundary is worse than none — it reads as a decision the product owner never made.

## Step 3: Create Export Directory Structure

Create the `product-plan/` directory with this structure:

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary (always provide)
├── prd.md                       # Full PRD + V1 out-of-scope matrix (if PRD_EXISTS)
│
├── prompts/                     # Ready-to-use prompts for coding agents
│   ├── one-shot-prompt.md       # Prompt for full implementation
│   └── section-prompt.md        # Prompt template for section-by-section
│
├── instructions/                # Implementation instructions
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/             # For milestone-by-milestone implementation
│       ├── 01-shell.md
│       ├── 02-[first-section].md
│       ├── 03-[second-section].md
│       └── ...
│
├── DESIGN.md                    # Design system contract (if DESIGN_EXISTS)
│
├── design-system/               # Design tokens
│   ├── tokens.css
│   ├── tailwind-colors.md
│   ├── fonts.md
│   └── components-ui/           # Portable primitives (if DESIGN_EXISTS)
│       ├── button.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── data-table.tsx
│       ├── checkbox.tsx
│       ├── radio.tsx
│       ├── select.tsx
│       ├── theme-toggle.tsx
│       └── design-system.css
│
├── data-shapes/                 # UI data contracts
│   ├── README.md
│   └── overview.ts
│
├── shell/                       # Shell components
│   ├── README.md
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── MainNav.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── screenshot.png (if exists)
│
└── sections/                    # Section components
    └── [section-id]/
        ├── README.md
        ├── tests.md               # UI behavior test specs
        ├── components/
        │   ├── [Component].tsx
        │   └── index.ts
        ├── types.ts
        ├── sample-data.json
        └── screenshot.png (if exists)
```

## Step 4: Generate product-overview.md

Create `product-plan/product-overview.md`:

```markdown
# [Product Name] — Product Overview

## Summary

[Product description from product-overview.md]

## Key Features

[The `## Key Features` bullet list from `product/product-overview.md`, verbatim]

## Out of Scope (V1)

[Include this entire section — heading included — only if `OUT_OF_SCOPE_EXISTS` or `PRD_EXISTS`. Otherwise omit it completely.]

[If `OUT_OF_SCOPE_EXISTS`: the `## Out of Scope (V1)` bullet list from `product/product-overview.md`, verbatim. Same items, same reasons. Do not add, soften, or reword a single cut.]
[Else if `PRD_EXISTS`: condense the PRD's "Out of Scope — V1 matrix" into a bullet list, one line per item, keeping each item's reason.]

**Do not build anything listed above.** If a milestone appears to require one of these items, stop and raise it with the product owner rather than widening scope. The full matrix with dispositions (V2 / Later / Never) is in `prd.md`.

## Planned Sections

[Ordered list of sections from roadmap with descriptions]

1. **[Section 1]** — [Description]
2. **[Section 2]** — [Description]
...

## Product Entities

[If data shape exists: list entity names and brief descriptions]
[If not: "Entities to be defined during implementation"]

## Design System

**Colors:**
- Primary: [color or "Not defined"]
- Secondary: [color or "Not defined"]
- Neutral: [color or "Not defined"]

**Typography:**
- Heading: [font or "Not defined"]
- Body: [font or "Not defined"]
- Mono: [font or "Not defined"]

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell
2. **[Section 1]** — [Brief description]
3. **[Section 2]** — [Brief description]
...

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
```

### Step 4b: Copy the PRD

If `PRD_EXISTS`, copy `product/prd.md` to `product-plan/prd.md` **verbatim** — no summarizing, no reformatting, no trimming of the out-of-scope matrix. The PRD is the scope contract, and an edited copy is a different contract.

If `PRD_EXISTS` is false, skip this and omit `prd.md` from the directory tree, the README, the prompt files, and the completion message.

### Step 4c: Package the design system hermetically

If `DESIGN_EXISTS`, the handoff carries the design system as a **sealed unit**: the contract, the tokens, and the primitives that implement them. A coding agent that receives this package never has to look anything up, and never has to guess a value.

Hermetic means exactly this: **`product-plan/` contains everything needed to build the UI, and references nothing outside itself.** No designmd.ai URL to fetch. No API key. No Scaffold install. No "see the design system at …". If a value matters, it is in the package.

**1. Copy the contract verbatim.**

Copy `product/DESIGN.md` to `product-plan/DESIGN.md` — no summarizing, no reformatting, no dropping the contrast tables. This is the WYSIWYB seal: what the user approved on `/design` is what the implementing agent receives. An edited copy is a different design system.

**2. Derive `design-system/tokens.css` from `DESIGN.md`, not from `colors.json`.**

`colors.json` carries Tailwind palette *names* for Scaffold's own swatch UI. `DESIGN.md` carries the measured hex values. The CSS must come from the hex:

```css
/* Generated from product-plan/DESIGN.md — the 12 semantic tokens. */
@theme {
  --color-page: #ffffff;
  --color-surface: #fafafa;
  --color-hairline: #e4e4e7;
  --color-ink-display: #09090b;
  --color-ink-body: #3f3f46;
  --color-ink-muted: #52525b;
  --color-accent: #22c55e;
  --color-accent-faded: #e5f8ec;
  --color-accent-display: #065f46;
  --color-on-accent: #052e16;
  --color-signal: #fcd34d;
  --color-signal-faded: #fffaea;
  --color-signal-display: #92400e;
  --color-danger: #dc2626;
  --color-danger-faded: #fbe5e5;
  --color-danger-display: #991b1b;

  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}

.dark {
  /* the dark column of the same table */
}
```

Emit **both** modes. A single-mode token file guarantees the agent invents the other one.

**3. Copy the primitives.**

Copy from `bm-skills/skills/bm-design-system/references/` into `product-plan/design-system/components-ui/`:

- `components-ui/{button,button-dropdown,input,badge,dialog,checkbox,radio,select,data-table,dropdown-menu,theme-toggle}.tsx`
- `styles/design-system.css` → `components-ui/design-system.css`
- `lib/utils.ts` → `components-ui/utils.ts` (the `cn` helper the primitives import)

These are props-based React 19 + Tailwind v4 components that read the tokens above and nothing else. They are the executable half of the contract: the agent does not reimplement a button from a paragraph describing one.

Rewrite their `@/lib/utils` imports to `./utils` so the folder resolves standalone, with no path alias configured.

**4. Write `design-system/README.md`** stating the three rules that most often get broken:

> - **`on-accent`, never `page`, on a solid accent fill.** A bright accent under white text is unreadable. `.btn-primary` is `bg-accent text-on-accent`.
> - **Every ink in this package clears WCAG AAA (7:1)** against the surface it is specified for, in both modes. The ratios are in `DESIGN.md`. Do not substitute a color without re-measuring.
> - **Concentric radii**: `R_outer = R_inner + padding`. A `p-6` panel containing `rounded-lg` children is `rounded-2xl`, not `rounded-lg`.

**5. Scope check.** If `OUT_OF_SCOPE_EXISTS`, do not carry primitives or `DESIGN.md` component sections that serve a capability the V1 matrix excluded. The design system cannot smuggle in surface area the PRD ruled out.

If `DESIGN_EXISTS` is false, skip this step entirely and omit `DESIGN.md` and `components-ui/` from the directory tree, the README, the prompt files and the completion message. Say so once:

> "Note: no `product/DESIGN.md` found. Your handoff carries color and font tokens but no design system contract — the implementing agent will make its own component decisions. Run `/design-tokens` if you want the visual system locked and exported."

Never synthesize a `DESIGN.md` to fill the gap. An invented design system reads as a decision the product owner never made.

## Step 5: Generate Milestone Instructions

Each milestone instruction file should begin with the following preamble (adapt the milestone-specific details):

```markdown
---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

**Scope discipline (V1):**

[Include this block only if `product-plan/prd.md` was generated.]

- `prd.md` is the scope contract for this build. Read its **Out of Scope — V1 matrix** before you plan.
- Nothing on that matrix gets built in V1 — not as a stub, not as a shortcut, not "while we're already in there".
- Anything that appears in neither these instructions nor the PRD's in-scope list is out of scope by default.
- A milestone that looks like it *requires* an out-of-scope item is a scoping question, not an implementation decision. Stop and raise it with the product owner.

---
```

### 01-shell.md

Place in `product-plan/instructions/incremental/01-shell.md`:

```markdown
# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`, plus `prd.md` if it was generated
> **Prerequisites:** None

[Include the preamble above]

## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all sections.

## What to Implement

### 1. Design Tokens

[If design tokens exist:]
Configure your styling system with these tokens:

- **Read `product-plan/DESIGN.md` first** — it is the design system contract: the 12 semantic tokens with their measured contrast ratios, the motion curves, the radius ladder and the component bindings. Every value you need is in it.
- See `product-plan/design-system/tokens.css` for CSS custom properties (both modes)
- See `product-plan/design-system/components-ui/` for the props-based primitives that implement the contract — use them rather than rebuilding buttons, inputs, badges, dialogs and tables from scratch
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup
- Use `text-on-accent` on any solid `bg-accent` fill, never `text-page`

[If not:]
Define your own design tokens based on your brand guidelines.

### 2. Application Shell

[If shell exists:]

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

**Wire Up Navigation:**

Connect navigation to your routing:

[List nav items from shell spec]

**User Menu:**

The user menu expects:
- User name
- Avatar URL (optional)
- Logout callback

[If shell doesn't exist:]

Design and implement your own application shell with:
- Navigation for all sections
- User menu
- Responsive layout

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/screenshot.png` — Shell visual reference

## Done When

- [ ] Design tokens are configured
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Responsive on mobile
```

### [NN]-[section-id].md (for each section)

Place in `product-plan/instructions/incremental/[NN]-[section-id].md` (starting at 02 for the first section):

```markdown
# Milestone [N]: [Section Title]

> **Provide alongside:** `product-overview.md`, plus `prd.md` if it was generated
> **Prerequisites:** Milestone 1 (Shell) complete, plus any prior section milestones

[Include the preamble above]

## Goal

Implement the [Section Title] feature — [brief description from roadmap].

## Overview

[One paragraph describing what this section enables users to do. Focus on the user's perspective and the value they get from this feature. Extract from spec.md overview.]

**Key Functionality:**
- [Bullet point 1 — e.g., "View a list of all projects with status indicators"]
- [Bullet point 2 — e.g., "Create new projects with name, description, and due date"]
- [Bullet point 3 — e.g., "Edit existing project details inline"]
- [Bullet point 4 — e.g., "Delete projects with confirmation"]
- [Bullet point 5 — e.g., "Filter projects by status or search by name"]

[List 3-6 key capabilities that the UI components support]

## Components Provided

Copy the section components from `product-plan/sections/[section-id]/components/`:

[List components with brief descriptions]

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

[Key types from types.ts — show the main interfaces briefly]

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onView` | User clicks to view details |
| `onEdit` | User clicks to edit |
| `onDelete` | User clicks to delete |
| `onCreate` | User clicks to create new |

[Adjust based on actual Props interface]

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: [Primary Flow Name — e.g., "Create a New Project"]

1. User [starting action — e.g., "clicks 'New Project' button"]
2. User [next step — e.g., "fills in project name and description"]
3. User [next step — e.g., "clicks 'Create' to save"]
4. **Outcome:** [Expected result — e.g., "New project appears in the list"]

### Flow 2: [Secondary Flow Name — e.g., "Edit an Existing Project"]

1. User [starting action — e.g., "clicks on a project row"]
2. User [next step — e.g., "modifies the project details"]
3. User [next step — e.g., "clicks 'Save' to confirm changes"]
4. **Outcome:** [Expected result — e.g., "Project updates in place"]

### Flow 3: [Additional Flow — e.g., "Delete a Project"]

1. User [starting action — e.g., "clicks delete icon on a project"]
2. User [next step — e.g., "confirms deletion in the modal"]
3. **Outcome:** [Expected result — e.g., "Project removed from list, empty state shown if last item"]

[Include 2-4 flows covering the main user journeys in this section. Reference the specific UI elements and button labels from the components.]

## Empty States

The components include empty state designs. Make sure to handle:

- **No data yet:** Show the empty state UI when the primary list/collection is empty
- **No related records:** Handle cases where associated records don't exist (e.g., a project with no tasks)
- **First-time experience:** Guide users to create their first item with clear CTAs

## Testing

See `product-plan/sections/[section-id]/tests.md` for UI behavior test specs covering:
- User flow success and failure paths
- Empty state rendering
- Component interactions and edge cases

## Files to Reference

- `product-plan/sections/[section-id]/README.md` — Feature overview and design intent
- `product-plan/sections/[section-id]/tests.md` — UI behavior test specs
- `product-plan/sections/[section-id]/components/` — React components
- `product-plan/sections/[section-id]/types.ts` — TypeScript interfaces
- `product-plan/sections/[section-id]/sample-data.json` — Test data
- `product-plan/sections/[section-id]/screenshot.png` — Visual reference

## Done When

- [ ] Components render with real data
- [ ] Empty states display properly when no records exist
- [ ] All callback props are wired to working functionality
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
```

## Step 6: Generate one-shot-instructions.md

Create `product-plan/instructions/one-shot-instructions.md` by combining all milestone content into a single document. Include the preamble at the very top:

```markdown
# [Product Name] — Complete Implementation Instructions

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

**Scope discipline (V1):**

[Include this block only if `product-plan/prd.md` was generated.]

- `prd.md` is the scope contract for this build. Read its **Out of Scope — V1 matrix** before you plan.
- Nothing on that matrix gets built in V1 — not as a stub, not as a shortcut, not "while we're already in there".
- Anything that appears in neither these instructions nor the PRD's in-scope list is out of scope by default.
- A milestone that looks like it *requires* an out-of-scope item is a scoping question, not an implementation decision. Stop and raise it with the product owner.

---

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

[Include product-overview.md content]

---

# Milestone 1: Shell

[Include 01-shell.md content WITHOUT the preamble — it's already at the top. This includes design tokens AND application shell.]

---

# Milestone 2: [First Section Name]

[Include first section handoff content WITHOUT the preamble]

---

# Milestone 3: [Second Section Name]

[Include second section handoff content WITHOUT the preamble]

[Repeat for all sections, incrementing milestone numbers]
```

## Step 7: Copy and Transform Components

### Shell Components

Copy from `src/shell/components/` to `product-plan/shell/components/`:

- Transform import paths from `@/...` to relative paths
- Remove any Design OS-specific imports
- Ensure components are self-contained

### Section Components

For each section, copy from `src/sections/[section-id]/components/` to `product-plan/sections/[section-id]/components/`:

- Transform import paths:
  - `@/../product/sections/[section-id]/types` → `../types`
- Remove Design OS-specific imports
- Keep only the exportable components (not preview wrappers)

### Types Files

Copy `product/sections/[section-id]/types.ts` to `product-plan/sections/[section-id]/types.ts`

### Sample Data

Copy `product/sections/[section-id]/data.json` to `product-plan/sections/[section-id]/sample-data.json`

## Step 8: Generate Section READMEs

For each section, create `product-plan/sections/[section-id]/README.md`:

```markdown
# [Section Title]

## Overview

[From spec.md overview]

## User Flows

[From spec.md user flows]

## Design Decisions

[Notable design choices from the screen design]

## Data Shapes

**Entities:** [List entities from types.ts]

**From global entities:** [Which entities from data shape are used, if applicable]

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `[Component]` — [Brief description]
- `[SubComponent]` — [Brief description]

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onView` | User clicks to view details |
| `onEdit` | User clicks to edit |
| `onDelete` | User clicks to delete |
| `onCreate` | User clicks to create new |

[Adjust based on actual Props interface]
```

## Step 9: Generate Section Test Instructions

For each section, create `product-plan/sections/[section-id]/tests.md` with UI behavior test specs based on the section's spec, user flows, and UI design.

```markdown
# Test Specs: [Section Title]

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

[Brief description of what this section does and the key functionality to test]

---

## User Flow Tests

### Flow 1: [Primary User Flow Name]

**Scenario:** [Describe what the user is trying to accomplish]

#### Success Path

**Setup:**
- [Preconditions - what state the app should be in]
- [Sample data to use - reference types from types.ts]

**Steps:**
1. User navigates to [page/route]
2. User sees [specific UI element - be specific about labels, text]
3. User clicks [specific button/link with exact label]
4. User enters [specific data in specific field]
5. User clicks [submit button with exact label]

**Expected Results:**
- [ ] [Specific UI change - e.g., "Success message appears: 'Item created'"]
- [ ] [Data change - e.g., "New item appears in the list"]
- [ ] [State change - e.g., "Form is cleared and reset"]
- [ ] [Navigation - e.g., "User is redirected to /items/:id"]

#### Failure Path: [Specific Failure Scenario]

**Steps:**
1. [Same steps as success path, or modified steps]

**Expected Results:**
- [ ] [Error message - e.g., "Error message appears: 'Unable to save. Please try again.'"]
- [ ] [UI state - e.g., "Form data is preserved, not cleared"]

#### Failure Path: [Validation Error]

**Steps:**
1. User leaves [specific field] empty
2. User clicks [submit button]

**Expected Results:**
- [ ] [Validation message - e.g., "Field shows error: 'Name is required'"]
- [ ] [Form state - e.g., "Form is not submitted"]

---

### Flow 2: [Secondary User Flow Name]

[Repeat the same structure for additional flows]

---

## Empty State Tests

### Primary Empty State

**Scenario:** User has no [primary records] yet (first-time or all deleted)

**Setup:**
- [Primary data collection] is empty (`[]`)

**Expected Results:**
- [ ] [Empty state message is visible - e.g., "Shows heading 'No projects yet'"]
- [ ] [Helpful description - e.g., "Shows text 'Create your first project to get started'"]
- [ ] [Primary CTA is visible - e.g., "Shows button 'Create Project'"]
- [ ] [CTA is functional - e.g., "Clicking 'Create Project' opens the create form/modal"]

### Related Records Empty State

**Scenario:** A [parent record] exists but has no [child records] yet

**Setup:**
- [Parent record] exists with valid data
- [Child records collection] is empty (`[]`)

**Expected Results:**
- [ ] [Parent renders correctly with its data]
- [ ] [Child section shows empty state - e.g., "Shows 'No tasks yet' in the tasks panel"]
- [ ] [CTA to add child record - e.g., "Shows 'Add Task' button"]

---

## Component Interaction Tests

### [Component Name]

**Renders correctly:**
- [ ] [Specific element is visible - e.g., "Displays item title 'Sample Item'"]
- [ ] [Data display - e.g., "Shows formatted date 'Dec 12, 2025'"]

**User interactions:**
- [ ] [Click behavior - e.g., "Clicking 'Edit' button calls onEdit with item id"]
- [ ] [Hover behavior - e.g., "Hovering row shows action buttons"]
- [ ] [Keyboard - e.g., "Pressing Escape closes the modal"]

---

## Edge Cases

- [ ] [Edge case 1 - e.g., "Handles very long item names with text truncation"]
- [ ] [Edge case 2 - e.g., "Works correctly with 1 item and 100+ items"]
- [ ] [Edge case 3 - e.g., "Preserves data when navigating away and back"]
- [ ] [Transition from empty to populated - e.g., "After creating first item, list renders correctly"]
- [ ] [Transition from populated to empty - e.g., "After deleting last item, empty state appears"]

---

## Accessibility Checks

- [ ] [All interactive elements are keyboard accessible]
- [ ] [Form fields have associated labels]
- [ ] [Error messages are announced to screen readers]
- [ ] [Focus is managed appropriately after actions]

---

## Sample Test Data

Use the data from `sample-data.json` or create variations:

[Include 2-3 example data objects based on types.ts that tests can use]

```typescript
// Populated state
const mockItem = {
  id: "test-1",
  name: "Test Item",
  // ... other fields from types.ts
};

const mockItems = [mockItem, /* ... more items */];

// Empty states
const mockEmptyList = [];

const mockItemWithNoChildren = {
  id: "test-1",
  name: "Test Item",
  children: [],
};
```
```

### Guidelines for Writing tests.md

When generating tests.md for each section:

1. **Read the spec.md thoroughly** — Extract all user flows and requirements
2. **Study the screen design components** — Note exact button labels, field names, UI text
3. **Review types.ts** — Understand the data shapes for assertions
4. **Include specific UI text** — Tests should verify exact labels, messages, placeholders
5. **Cover success and failure paths** — Every action should have both tested
6. **Always test empty states** — Primary lists with no items, parent records with no children
7. **Be specific about assertions** — "Shows error" is too vague; "Shows red border and message 'Email is required' below the field" is specific
8. **Include edge cases** — Boundary conditions, transitions between empty and populated states
9. **Stay framework-agnostic** — Describe WHAT to test (UI behavior), not HOW to write the test code

## Step 10: Generate Design System Files

### tokens.css

```css
/* Design Tokens for [Product Name] */

:root {
  /* Colors */
  --color-primary: [Tailwind color];
  --color-secondary: [Tailwind color];
  --color-neutral: [Tailwind color];

  /* Typography */
  --font-heading: '[Heading Font]', sans-serif;
  --font-body: '[Body Font]', sans-serif;
  --font-mono: '[Mono Font]', monospace;
}
```

### tailwind-colors.md

```markdown
# Tailwind Color Configuration

## Color Choices

- **Primary:** `[color]` — Used for buttons, links, key accents
- **Secondary:** `[color]` — Used for tags, highlights, secondary elements
- **Neutral:** `[color]` — Used for backgrounds, text, borders

## Usage Examples

Primary button: `bg-[primary]-600 hover:bg-[primary]-700 text-white`
Secondary badge: `bg-[secondary]-100 text-[secondary]-800`
Neutral text: `text-[neutral]-600 dark:text-[neutral]-400`
```

### fonts.md

```markdown
# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[Heading+Font]&family=[Body+Font]&family=[Mono+Font]&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** [Heading Font]
- **Body text:** [Body Font]
- **Code/technical:** [Mono Font]
```

## Step 11: Generate Data Shapes Files

### data-shapes/README.md

Create `product-plan/data-shapes/README.md`:

```markdown
# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

[List all entities across sections with brief descriptions]

- **[Entity1]** — [Description] (used in: [section-name])
- **[Entity2]** — [Description] (used in: [section-name])
- **[Entity3]** — [Description] (used in: [section-name-1], [section-name-2])

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/[section-1]/types.ts`
- `sections/[section-2]/types.ts`
- ...

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
```

### data-shapes/overview.ts

Create `product-plan/data-shapes/overview.ts` by aggregating all section types:

```typescript
// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/[section-1]
// -----------------------------------------------------------------------------

[Copy entity types from section-1/types.ts — data interfaces only, not Props]

// -----------------------------------------------------------------------------
// From: sections/[section-2]
// -----------------------------------------------------------------------------

[Copy entity types from section-2/types.ts — data interfaces only, not Props]

// [Repeat for all sections]
```

Only include the data shape interfaces (e.g., `Invoice`, `LineItem`), not the component Props interfaces. The Props interfaces stay in each section's own `types.ts`.

## Step 12: Generate Prompt Files

Create the `product-plan/prompts/` directory with two ready-to-use prompt files.

### one-shot-prompt.md

Create `product-plan/prompts/one-shot-prompt.md`:

```markdown
# One-Shot Implementation Prompt

I need you to implement a complete web application based on detailed UI designs and product specifications I'm providing.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary with sections and entity overview
2. **@product-plan/prd.md** — The locked V1 scope, including the **Out of Scope — V1 matrix** *(omit this line if `prd.md` wasn't generated)*
3. **@product-plan/DESIGN.md** — The design system contract: the 12 semantic tokens with their measured contrast ratios, the motion curves and the component bindings *(omit this line if `DESIGN.md` wasn't generated)*
4. **@product-plan/instructions/one-shot-instructions.md** — Complete implementation instructions for all milestones

After reading these, also review:
- **@product-plan/design-system/** — Token CSS (both modes), fonts, and `components-ui/` — the props-based primitives that implement the contract
- **@product-plan/data-shapes/** — UI data contracts (the shapes of data the components expect)
- **@product-plan/shell/** — Application shell components
- **@product-plan/sections/** — All section components, types, sample data, and test specs

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **My tech stack** — What framework, language, and tools I'm using, and any existing codebase conventions
2. **Authentication & users** — How users should sign up, log in, and what permissions exist
3. **Product requirements** — Anything in the specs or user flows that needs clarification
4. **Anything else** — Whatever you need to know before implementing

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, create a comprehensive implementation plan before coding.

**Scope rule:** treat the PRD's **Out of Scope — V1 matrix** as binding. Do not build anything on it, and do not add features that appear in neither the instructions nor the PRD's in-scope list. If the designs seem to require an out-of-scope item, raise it with me instead of building it.

**Design rule:** `product-plan/DESIGN.md` is binding. Use its token values verbatim and the primitives in `product-plan/design-system/components-ui/` rather than rebuilding them. Put `text-on-accent` on any solid `bg-accent` fill — never `text-page`. Do not substitute a color without re-measuring its contrast; every ink in the package clears 7:1 by construction.

```

### section-prompt.md

Create `product-plan/prompts/section-prompt.md`:

```markdown
# Section Implementation Prompt

## Define Section Variables

- **SECTION_NAME** = [Human-readable name, e.g., "Invoices" or "Project Dashboard"]
- **SECTION_ID** = [Folder name in sections/, e.g., "invoices" or "project-dashboard"]
- **NN** = [Milestone number, e.g., "02" or "03" — sections start at 02 since 01 is Shell]

---

I need you to implement the **SECTION_NAME** section of my application.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/prd.md** — The locked V1 scope, including the **Out of Scope — V1 matrix** *(omit this line if `prd.md` wasn't generated)*
3. **@product-plan/DESIGN.md** — The design system contract: the 12 semantic tokens with their measured contrast ratios, the motion curves and the component bindings *(omit this line if `DESIGN.md` wasn't generated)*
4. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section

Also review the section assets:
- **@product-plan/sections/SECTION_ID/README.md** — Feature overview and design intent
- **@product-plan/sections/SECTION_ID/tests.md** — UI behavior test specs
- **@product-plan/sections/SECTION_ID/components/** — React components to integrate
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript interfaces
- **@product-plan/sections/SECTION_ID/sample-data.json** — Test data

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **Integration** — How this section connects to existing features and any APIs already built
2. **Product requirements** — Anything in the specs or user flows that needs clarification
3. **Anything else** — Whatever you need to know before implementing

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, proceed with implementation.

**Scope rule:** the PRD's **Out of Scope — V1 matrix** is binding for this section too. Build what this section's instructions specify — nothing from the matrix, and nothing that appears in neither the instructions nor the PRD's in-scope list. Raise conflicts with me instead of resolving them by adding scope.

**Design rule:** `product-plan/DESIGN.md` is binding. Use its token values verbatim and the primitives in `product-plan/design-system/components-ui/` rather than rebuilding them. Put `text-on-accent` on any solid `bg-accent` fill — never `text-page`. Do not substitute a color without re-measuring its contrast; every ink in the package clears 7:1 by construction.

```

## Step 13: Generate README.md

Create `product-plan/README.md`:

```markdown
# [Product Name] — Design Handoff

This folder contains everything needed to implement [Product Name].

## What's Included

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt template for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section implementation

**Scope & Requirements:**
- `product-overview.md` — Product summary (provide with every implementation)
- `prd.md` — The full PRD and the **Out of Scope — V1 matrix** *(omit this line if not generated)*

**Instructions:**
- `instructions/one-shot-instructions.md` — All milestones combined for full implementation
- `instructions/incremental/` — Milestone-by-milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, design tokens
- `data-shapes/` — UI data contracts (the shapes of data components expect)
- `shell/` — Application shell components
- `sections/` — All section components, types, sample data, and test specs

## Scope — read this before you build

[Include this entire section only if `prd.md` was generated.]

`prd.md` is the scope contract for V1. Its **Out of Scope — V1 matrix** lists what this product deliberately does *not* do yet, each with a disposition (V2 / Later / Never) and the reason it was cut.

- **Build what the instructions specify, and nothing on the matrix.** Not as a stub, not as a convenience, not because it looked like an obvious gap.
- **Anything in neither the instructions nor the PRD's in-scope list is out of scope by default.**
- **A milestone that appears to require an out-of-scope item is a scoping question, not an implementation decision.** Raise it with the product owner.

The designs in this handoff were drawn against that locked scope. Widening it mid-build is what produces half-finished features and screens that no longer match the designs.

## How to Use This

### Option A: Incremental (Recommended)

Build your app milestone by milestone for better control:

1. Copy the `product-plan/` folder to your codebase
2. Start with Shell (`instructions/incremental/01-shell.md`) — includes design tokens and application shell
3. For each section:
   - Open `prompts/section-prompt.md`
   - Fill in the section variables at the top (SECTION_NAME, SECTION_ID, NN)
   - Copy/paste into your coding agent
   - Answer questions and implement
4. Review and test after each milestone

### Option B: One-Shot

Build the entire app in one session:

1. Copy the `product-plan/` folder to your codebase
2. Open `prompts/one-shot-prompt.md`
3. Add any additional notes to the prompt
4. Copy/paste the prompt into your coding agent
5. Answer the agent's clarifying questions
6. Let the agent plan and implement everything

## Testing

Each section includes a `tests.md` file with UI behavior test specs. For best results:

1. Read `sections/[section-id]/tests.md` before implementing
2. Write tests for key user flows
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test specs are **framework-agnostic** — they describe WHAT to test (user-facing behavior), not HOW. Adapt to your testing setup.

## Tips

- **Use the pre-written prompts** — They prompt for important clarifying questions about your tech stack and requirements.
- **Add your own notes** — Customize prompts with project-specific context when needed.
- **Build on your designs** — Use completed sections as the starting point for future feature development.
- **Review thoroughly** — Check plans and implementations carefully to catch details and inconsistencies.
- **The components are flexible** — They accept data and fire callbacks. How you architect the backend is up to you.

---

*Generated by Design OS*
```

## Step 14: Copy Screenshots

Copy any `.png` files from:
- `product/shell/` → `product-plan/shell/`
- `product/sections/[section-id]/` → `product-plan/sections/[section-id]/`

## Step 15: Create Zip File

After generating all the export files, create a zip archive of the product-plan folder:

```bash
# Remove any existing zip file
rm -f product-plan.zip

# Create the zip file
cd . && zip -r product-plan.zip product-plan/
```

This creates `product-plan.zip` in the project root, which will be available for download on the Export page.

## Step 16: Confirm Completion

Let the user know:

"I've created the complete export package at `product-plan/` and `product-plan.zip`.

**What's Included:**

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section

**Scope & Requirements:**
- `product-overview.md` — Product summary (always provide with instructions)
- `prd.md` — Full PRD with the V1 out-of-scope matrix [omit this line if not generated]

**Instructions:**
- `instructions/one-shot-instructions.md` — All milestones combined
- `instructions/incremental/` — [N] milestone instructions (shell, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, tokens
- `data-shapes/` — UI data contracts and combined type reference
- `shell/` — Application shell components
- `sections/` — [N] section component packages with test specs

**Download:**

Restart your dev server and visit the Export page to download `product-plan.zip`.

**How to Use:**

1. Copy `product-plan/` to your implementation codebase
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Add any additional notes, then copy/paste into your coding agent
4. Answer the agent's clarifying questions about your tech stack, auth, etc.
5. Let the agent implement based on the instructions

The components are props-based and portable — they accept data and callbacks, letting your implementation agent handle routing, data fetching, and state management however fits your stack."

## Important Notes

- Always transform import paths when copying components
- Include `product-overview.md` context with every implementation session
- Include `prd.md` too whenever it exists — it is the only file in the handoff that says what *not* to build
- Use the pre-written prompts — they prompt for important clarifying questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real APIs are built
- The export is self-contained — no dependencies on Design OS
- Components are portable — they work with any React setup

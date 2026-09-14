# Markdown Parsing

`product/` markdown is written by the Design OS skills, not by hand — the heading
structure is guaranteed. Parse it with regex; do not add a markdown library.
The loaders extract structured data, they never render HTML.

## Section slicing — always use this pattern

```ts
const overviewMatch = md.match(/## Overview\s*\n+([\s\S]*?)(?=\n## |\n#[^#]|$)/)
const overview = overviewMatch?.[1]?.trim() || ''
```

The trailing `(?=\n## |\n#[^#]|$)` lookahead is mandatory — without it the lazy
`[\s\S]*?` swallows the rest of the document.

## Bullet lists — trim before testing

```ts
for (const line of section[1].split('\n')) {
  const trimmed = line.trim()
  if (trimmed.startsWith('- ')) items.push(trimmed.slice(2).trim())
}
```

## Headings are a contract with the skill

The parser and the skill that writes the file must agree on the exact heading
text. Changing one without the other breaks parsing silently — the loader just
returns `null` and the UI shows an empty state.

| File | Written by | Headings |
|---|---|---|
| `product-overview.md` | `/product-vision` | `## Description`, `## Problems & Solutions`, `### Problem N:`, `## Key Features`, `## Out of Scope (V1)` |
| `prd.md` | `/product-vision` | `# Titre`, `## Core Purpose`, `## In-Scope Features`, `## Out-of-Scope (V1)`, `## Milestones` |
| `product-roadmap.md` | `/product-roadmap` | `## Sections`, `### N. Title` (strict: pas de sous-titres `### N.` imbriqués) |
| `data-shape/data-shape.md` | `/data-shape` | `## Entities`, `### EntityName`, `## Relationships` |
| `shell/spec.md` | `/design-shell` | `## Overview`, `## Navigation Structure`, `## Layout Pattern` |
| `sections/*/spec.md` | `/shape-section` | `## Overview`, `## User Flows`, `## UI Requirements` (interdiction stricte d'inclure des éléments du hors-scope) |

When editing a parser, open the matching command in `.claude/commands/design-os/`
and update the template in the same change.

## Normalize line endings first

Every section lookahead and `split('\n')` assumes LF. On a CRLF file the
lookaheads stop matching and `\r` stays glued to extracted values.

Normalize as the first statement of every `parse*()`, after the empty guard:

```ts
if (!md || !md.trim()) return null
const normalizedMd = md.replace(/\r\n/g, '\n')
// ...match against normalizedMd, never md
```

Then match against `normalizedMd` only — a stray `md.match(...)` further down
reintroduces the bug.

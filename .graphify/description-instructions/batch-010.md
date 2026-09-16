# Node Description Batch 11 of 11

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_table_tablecaption": "TableCaption()" | kind=code-symbol | source=src/components/ui/table.tsx:L94 | neighbors=[table.tsx]
- "ui_table_tablecell": "TableCell()" | kind=code-symbol | source=src/components/ui/table.tsx:L81 | neighbors=[table.tsx]
- "ui_table_tablefooter": "TableFooter()" | kind=code-symbol | source=src/components/ui/table.tsx:L42 | neighbors=[table.tsx]
- "ui_table_tablehead": "TableHead()" | kind=code-symbol | source=src/components/ui/table.tsx:L68 | neighbors=[table.tsx]
- "ui_table_tableheader": "TableHeader()" | kind=code-symbol | source=src/components/ui/table.tsx:L22 | neighbors=[table.tsx]
- "ui_table_tablerow": "TableRow()" | kind=code-symbol | source=src/components/ui/table.tsx:L55 | neighbors=[table.tsx]
- "ui_tabs_tabs": "Tabs()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L6 | neighbors=[tabs.tsx]
- "ui_tabs_tabscontent": "TabsContent()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L51 | neighbors=[tabs.tsx]
- "ui_tabs_tabslist": "TabsList()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L19 | neighbors=[tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L35 | neighbors=[tabs.tsx]
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[f8d7caa Initial release - 0.1]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-010.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```

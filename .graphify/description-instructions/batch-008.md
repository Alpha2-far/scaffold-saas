# Node Description Batch 9 of 11

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

- "lib_product_health_productfiles": "productFiles" | kind=code-symbol | source=src/lib/product-health.ts:L16 | neighbors=[product-health.ts]
- "lib_product_loader_exportzipfiles": "exportZipFiles" | kind=code-symbol | source=src/lib/product-loader.ts:L18 | neighbors=[product-loader.ts]
- "lib_product_loader_hasproductoverview": "hasProductOverview()" | kind=code-symbol | source=src/lib/product-loader.ts:L182 | neighbors=[product-loader.ts]
- "lib_product_loader_hasproductroadmap": "hasProductRoadmap()" | kind=code-symbol | source=src/lib/product-loader.ts:L189 | neighbors=[product-loader.ts]
- "lib_product_loader_productfiles": "productFiles" | kind=code-symbol | source=src/lib/product-loader.ts:L11 | neighbors=[product-loader.ts]
- "lib_section_loader_datafiles": "dataFiles" | kind=code-symbol | source=src/lib/section-loader.ts:L21 | neighbors=[section-loader.ts]
- "lib_section_loader_screendesignmodules": "screenDesignModules" | kind=code-symbol | source=src/lib/section-loader.ts:L26 | neighbors=[section-loader.ts]
- "lib_section_loader_screenshotfiles": "screenshotFiles" | kind=code-symbol | source=src/lib/section-loader.ts:L32 | neighbors=[section-loader.ts]
- "lib_section_loader_specfiles": "specFiles" | kind=code-symbol | source=src/lib/section-loader.ts:L14 | neighbors=[section-loader.ts]
- "lib_shell_loader_getshellcomponentnames": "getShellComponentNames()" | kind=code-symbol | source=src/lib/shell-loader.ts:L169 | neighbors=[shell-loader.ts]
- "lib_shell_loader_loadshellcomponent": "loadShellComponent()" | kind=code-symbol | source=src/lib/shell-loader.ts:L106 | neighbors=[shell-loader.ts]
- "lib_shell_loader_shellcomponentmodules": "shellComponentModules" | kind=code-symbol | source=src/lib/shell-loader.ts:L16 | neighbors=[shell-loader.ts]
- "lib_shell_loader_shellpreviewmodules": "shellPreviewModules" | kind=code-symbol | source=src/lib/shell-loader.ts:L22 | neighbors=[shell-loader.ts]
- "lib_shell_loader_shellspecfiles": "shellSpecFiles" | kind=code-symbol | source=src/lib/shell-loader.ts:L9 | neighbors=[shell-loader.ts]
- "presets_index_byid": "byId" | kind=code-symbol | source=src/presets/index.ts:L136 | neighbors=[index.ts]
- "presets_index_contrastcorrection": "ContrastCorrection" | kind=code-symbol | source=src/presets/index.ts:L98 | neighbors=[index.ts]
- "presets_index_designdocloaders": "designDocLoaders" | kind=code-symbol | source=src/presets/index.ts:L39 | neighbors=[index.ts]
- "presets_index_idfrompath": "idFromPath()" | kind=code-symbol | source=src/presets/index.ts:L127 | neighbors=[index.ts]
- "presets_index_semantictokens": "SemanticTokens" | kind=code-symbol | source=src/presets/index.ts:L67 | neighbors=[index.ts]
- "presets_index_tokencache": "tokenCache" | kind=code-symbol | source=src/presets/index.ts:L164 | neighbors=[index.ts]
- "presets_index_tokenloaders": "tokenLoaders" | kind=code-symbol | source=src/presets/index.ts:L35 | neighbors=[index.ts]
- "scripts_compile_presets_catalog": "CATALOG" | kind=code-symbol | source=scripts/compile-presets.mjs:L737 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_laddererrors": "ladderErrors" | kind=code-symbol | source=scripts/compile-presets.mjs:L528 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_presets": "PRESETS" | kind=code-symbol | source=scripts/compile-presets.mjs:L37 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_ramps": "RAMPS" | kind=code-symbol | source=scripts/compile-presets.mjs:L210 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_registry": "registry" | kind=code-symbol | source=scripts/compile-presets.mjs:L767 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_registry_marks": "REGISTRY_MARKS" | kind=code-symbol | source=scripts/compile-presets.mjs:L238 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_role_rules": "ROLE_RULES" | kind=code-symbol | source=scripts/compile-presets.mjs:L375 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_root": "ROOT" | kind=code-symbol | source=scripts/compile-presets.mjs:L36 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_rows": "rows" | kind=code-symbol | source=scripts/compile-presets.mjs:L744 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_slugs": "slugs" | kind=code-symbol | source=scripts/compile-presets.mjs:L739 | neighbors=[compile-presets.mjs]
- "scripts_compile_presets_tolinear": "toLinear()" | kind=code-symbol | source=scripts/compile-presets.mjs:L62 | neighbors=[compile-presets.mjs]
- "src_main_loaddomanimation": "loadDomAnimation()" | kind=code-symbol | source=src/main.tsx:L14 | neighbors=[main.tsx]
- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L8 | neighbors=[avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L37 | neighbors=[avatar.tsx]
- "ui_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L24 | neighbors=[avatar.tsx]
- "ui_card_cardaction": "CardAction()" | kind=code-symbol | source=src/components/ui/card.tsx:L51 | neighbors=[card.tsx]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=src/components/ui/card.tsx:L41 | neighbors=[card.tsx]
- "ui_card_cardfooter": "CardFooter()" | kind=code-symbol | source=src/components/ui/card.tsx:L74 | neighbors=[card.tsx]
- "ui_dialog_dialog": "Dialog()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L9 | neighbors=[dialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-008.json

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

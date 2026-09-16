# Node Description Batch 4 of 11

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/Alpha2-far/scaffold-v1@9c6813addb2897edd22b4cbedc95ab9c2cd3de26": "9c6813a fix(shape-section): Section title with '&' generate unrecongized folder…" | kind=Commit | source=git | neighbors=[48d0c5a Merge pull request #40 from bui…, main, 3fc5cb3 Fix slugify to handle accented …] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@9dae0ba1f3dc05964463ef6cc0d8d119d77748c3": "9dae0ba Fix AGENTS.md case: tracked path was lowercase agents.md" | kind=Commit | source=git | neighbors=[main, 529dedb Configure Amp orb setup, a4cbd04 Fix CLAUDE.md case: tracked pat…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@a4cbd0453bdb28778d29e71b278683a5c21c09ef": "a4cbd04 Fix CLAUDE.md case: tracked path was lowercase claude.md; now CLAUDE.md…" | kind=Commit | source=git | neighbors=[67cef4f Adopt agentcanon convention, main, 9dae0ba Fix AGENTS.md case: tracked pat…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@a9c7f5a852959d6658687b210d45de29c6eb07a7": "a9c7f5a Fixed errors related to importing google fonts out of order." | kind=Commit | source=git | neighbors=[main, 5f773b4 added handling of & in section …, b1d4c53 Remove remaining .DS_Store file…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@b1d4c53dc471e99d86b3d53247575379b17b4e09": "b1d4c53 Remove remaining .DS_Store files from tracking" | kind=Commit | source=git | neighbors=[52ce8b7 updates to export package docum…, main, a9c7f5a Fixed errors related to importi…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@bfdc0062ef6eeff0407578b9145e036550081a28": "bfdc006 Design OS image for readme" | kind=Commit | source=git | neighbors=[main, 33a6a51 update, fc1a555 readme] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@d612181868462cc5c1889e984c8926910439907c": "d612181 github" | kind=Commit | source=git | neighbors=[33a6a51 update, main, 7fde6af Add .gitignore and remove .DS_S…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@d82ddfbc3a355fc0ec3dcb9b41c0ac60e186f2f1": "d82ddfb Streamline shape-section and sample-data flows to auto-proceed without …" | kind=Commit | source=git | neighbors=[b045c89 Merge pull request #16 from blu…, main, 3dc0061 Reframe export as UI design han…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@fc1a5552b0037836b552b42f0281a45e45634a50": "fc1a555 readme" | kind=Commit | source=git | neighbors=[f8d7caa Initial release - 0.1, main, bfdc006 Design OS image for readme] | lang=pt
- "components_designpage_designpage": "DesignPage()" | kind=code-symbol | source=src/components/DesignPage.tsx:L76 | neighbors=[DesignPage.tsx, getDesignPageStepStatuses(), router.tsx] | lang=en
- "components_motion_primitives_stagger": "Stagger()" | kind=code-symbol | source=src/components/motion-primitives.tsx:L57 | neighbors=[motion-primitives.tsx, ProductPage.tsx, StatusConsole.tsx] | lang=en
- "components_motion_primitives_staggeritem": "StaggerItem()" | kind=code-symbol | source=src/components/motion-primitives.tsx:L77 | neighbors=[motion-primitives.tsx, ProductPage.tsx, StatusConsole.tsx] | lang=en
- "components_phasenav_phasenav": "PhaseNav()" | kind=code-symbol | source=src/components/PhaseNav.tsx:L77 | neighbors=[AppLayout.tsx, PhaseNav.tsx, usePhaseStatuses()] | lang=en
- "components_productpage_productpage": "ProductPage()" | kind=code-symbol | source=src/components/ProductPage.tsx:L43 | neighbors=[ProductPage.tsx, getProductPageStepStatuses(), router.tsx] | lang=en
- "lib_data_shape_loader_loaddatashape": "loadDataShape()" | kind=code-symbol | source=src/lib/data-shape-loader.ts:L84 | neighbors=[data-shape-loader.ts, parseDataShape(), product-loader.ts] | lang=en
- "lib_lazy_preview_cachedlazy": "cachedLazy()" | kind=code-symbol | source=src/lib/lazy-preview.ts:L26 | neighbors=[ScreenDesignPage.tsx, ShellDesignPage.tsx, lazy-preview.ts] | lang=en
- "lib_phases_phase": "Phase" | kind=code-symbol | source=src/lib/phases.ts:L12 | neighbors=[NextPhaseButton.tsx, PhaseNav.tsx, phases.ts] | lang=en
- "lib_product_health_computeproducthealth": "computeProductHealth()" | kind=code-symbol | source=src/lib/product-health.ts:L54 | neighbors=[ProductPage.tsx, product-health.ts, section()] | lang=en
- "lib_product_loader_hasexportzip": "hasExportZip()" | kind=code-symbol | source=src/lib/product-loader.ts:L196 | neighbors=[ExportPage.tsx, PhaseNav.tsx, product-loader.ts] | lang=en
- "lib_product_loader_parseproductroadmap": "parseProductRoadmap()" | kind=code-symbol | source=src/lib/product-loader.ts:L125 | neighbors=[product-loader.ts, loadProductData(), slugify()] | lang=en
- "lib_section_loader_parsespec": "parseSpec()" | kind=code-symbol | source=src/lib/section-loader.ts:L94 | neighbors=[section-loader.ts, loadSectionData(), sectionUsesShell()] | lang=en
- "lib_section_loader_sectionusesshell": "sectionUsesShell()" | kind=code-symbol | source=src/lib/section-loader.ts:L237 | neighbors=[ScreenDesignPage.tsx, section-loader.ts, parseSpec()] | lang=en
- "scripts_compile_presets_clamp": "clamp()" | kind=code-symbol | source=scripts/compile-presets.mjs:L43 | neighbors=[compile-presets.mjs, deriveOnAccent(), fromLinear()] | lang=en
- "scripts_compile_presets_parsecolors": "parseColors()" | kind=code-symbol | source=scripts/compile-presets.mjs:L317 | neighbors=[compile-presets.mjs, compile(), section()] | lang=en
- "scripts_compile_presets_parseelevation": "parseElevation()" | kind=code-symbol | source=scripts/compile-presets.mjs:L430 | neighbors=[compile-presets.mjs, compile(), section()] | lang=en
- "scripts_compile_presets_parsemeta": "parseMeta()" | kind=code-symbol | source=scripts/compile-presets.mjs:L450 | neighbors=[compile-presets.mjs, compile(), section()] | lang=en
- "scripts_compile_presets_parseradii": "parseRadii()" | kind=code-symbol | source=scripts/compile-presets.mjs:L415 | neighbors=[compile-presets.mjs, compile(), section()] | lang=en
- "scripts_compile_presets_parsespacing": "parseSpacing()" | kind=code-symbol | source=scripts/compile-presets.mjs:L437 | neighbors=[compile-presets.mjs, compile(), section()] | lang=en
- "scripts_compile_presets_parsetypography": "parseTypography()" | kind=code-symbol | source=scripts/compile-presets.mjs:L398 | neighbors=[compile-presets.mjs, compile(), section()] | lang=en
- "scripts_compile_presets_pickramp": "pickRamp()" | kind=code-symbol | source=scripts/compile-presets.mjs:L219 | neighbors=[compile-presets.mjs, compile(), hexToOklch()] | lang=en
- "scripts_compile_presets_rgbtohex": "rgbToHex()" | kind=code-symbol | source=scripts/compile-presets.mjs:L56 | neighbors=[compile-presets.mjs, mix(), oklchToHex()] | lang=en
- "types_product_productdata": "ProductData" | kind=code-symbol | source=src/types/product.ts:L91 | neighbors=[StatusConsole.tsx, product-loader.ts, product.ts] | lang=en
- "types_product_productoverview": "ProductOverview" | kind=code-symbol | source=src/types/product.ts:L14 | neighbors=[ProductOverviewCard.tsx, product-loader.ts, product.ts] | lang=en
- "types_product_productroadmap": "ProductRoadmap" | kind=code-symbol | source=src/types/product.ts:L32 | neighbors=[SectionsCard.tsx, product-loader.ts, product.ts] | lang=en
- "types_product_shellinfo": "ShellInfo" | kind=code-symbol | source=src/types/product.ts:L82 | neighbors=[ShellCard.tsx, shell-loader.ts, product.ts] | lang=en
- "types_section_parsedspec": "ParsedSpec" | kind=code-symbol | source=src/types/section.ts:L14 | neighbors=[SpecCard.tsx, section-loader.ts, section.ts] | lang=en
- "types_section_screendesigninfo": "ScreenDesignInfo" | kind=code-symbol | source=src/types/section.ts:L23 | neighbors=[ScreenDesignsCard.tsx, section-loader.ts, section.ts] | lang=en
- "components_datacard_countrecords": "countRecords()" | kind=code-symbol | source=src/components/DataCard.tsx:L31 | neighbors=[DataCard.tsx, DataCard()] | lang=en
- "components_datacard_extractmeta": "extractMeta()" | kind=code-symbol | source=src/components/DataCard.tsx:L17 | neighbors=[DataCard.tsx, DataCard()] | lang=en
- "components_datacard_getdatawithoutmeta": "getDataWithoutMeta()" | kind=code-symbol | source=src/components/DataCard.tsx:L25 | neighbors=[DataCard.tsx, DataCard()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-003.json

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

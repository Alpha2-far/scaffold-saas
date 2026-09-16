# Node Description Batch 6 of 11

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

- "lib_section_loader_hassectiondata": "hasSectionData()" | kind=code-symbol | source=src/lib/section-loader.ts:L249 | neighbors=[SectionsPage.tsx, section-loader.ts]
- "lib_section_loader_hassectionspec": "hasSectionSpec()" | kind=code-symbol | source=src/lib/section-loader.ts:L229 | neighbors=[SectionsPage.tsx, section-loader.ts]
- "lib_section_loader_loadscreendesigncomponent": "loadScreenDesignComponent()" | kind=code-symbol | source=src/lib/section-loader.ts:L197 | neighbors=[ScreenDesignPage.tsx, section-loader.ts]
- "lib_shell_loader_hasshellspec": "hasShellSpec()" | kind=code-symbol | source=src/lib/shell-loader.ts:L162 | neighbors=[shell-loader.ts, hasShell()]
- "lib_shell_loader_loadappshell": "loadAppShell()" | kind=code-symbol | source=src/lib/shell-loader.ts:L118 | neighbors=[ScreenDesignPage.tsx, shell-loader.ts]
- "lib_shell_loader_loadshellpreview": "loadShellPreview()" | kind=code-symbol | source=src/lib/shell-loader.ts:L132 | neighbors=[ShellDesignPage.tsx, shell-loader.ts]
- "lib_shell_loader_parseshellspec": "parseShellSpec()" | kind=code-symbol | source=src/lib/shell-loader.ts:L43 | neighbors=[shell-loader.ts, loadShellInfo()]
- "presets_index_contrastreport": "ContrastReport" | kind=code-symbol | source=src/presets/index.ts:L88 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_gettheme": "getTheme()" | kind=code-symbol | source=src/presets/index.ts:L141 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_loaddesigndoc": "loadDesignDoc()" | kind=code-symbol | source=src/presets/index.ts:L183 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_loadtokens": "loadTokens()" | kind=code-symbol | source=src/presets/index.ts:L166 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_presettokens": "PresetTokens" | kind=code-symbol | source=src/presets/index.ts:L108 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_theme": "Theme" | kind=code-symbol | source=src/presets/index.ts:L54 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_thememode": "ThemeMode" | kind=code-symbol | source=src/presets/index.ts:L86 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_themes": "themes" | kind=code-symbol | source=src/presets/index.ts:L130 | neighbors=[ThemeStudio.tsx, index.ts]
- "presets_index_themetags": "themeTags()" | kind=code-symbol | source=src/presets/index.ts:L146 | neighbors=[ThemeStudio.tsx, index.ts]
- "scripts_compile_presets_assignroles": "assignRoles()" | kind=code-symbol | source=scripts/compile-presets.mjs:L389 | neighbors=[compile-presets.mjs, compile()]
- "scripts_compile_presets_cssblock": "cssBlock()" | kind=code-symbol | source=scripts/compile-presets.mjs:L520 | neighbors=[compile-presets.mjs, compile()]
- "scripts_compile_presets_fromlinear": "fromLinear()" | kind=code-symbol | source=scripts/compile-presets.mjs:L67 | neighbors=[compile-presets.mjs, clamp()]
- "scripts_compile_presets_normalizedesigndoc": "normalizeDesignDoc()" | kind=code-symbol | source=scripts/compile-presets.mjs:L265 | neighbors=[compile-presets.mjs, compile()]
- "scripts_compile_presets_oklchtorgbraw": "oklchToRgbRaw()" | kind=code-symbol | source=scripts/compile-presets.mjs:L109 | neighbors=[compile-presets.mjs, oklchToHex()]
- "types_product_colortokens": "ColorTokens" | kind=code-symbol | source=src/types/product.ts:L54 | neighbors=[design-system-loader.ts, product.ts]
- "types_product_datashape": "DataShape" | kind=code-symbol | source=src/types/product.ts:L45 | neighbors=[data-shape-loader.ts, product.ts]
- "types_product_designsystem": "DesignSystem" | kind=code-symbol | source=src/types/product.ts:L66 | neighbors=[design-system-loader.ts, product.ts]
- "types_product_entity": "Entity" | kind=code-symbol | source=src/types/product.ts:L40 | neighbors=[data-shape-loader.ts, product.ts]
- "types_product_problem": "Problem" | kind=code-symbol | source=src/types/product.ts:L9 | neighbors=[product-loader.ts, product.ts]
- "types_product_section": "Section" | kind=code-symbol | source=src/types/product.ts:L25 | neighbors=[product-loader.ts, product.ts]
- "types_product_shellspec": "ShellSpec" | kind=code-symbol | source=src/types/product.ts:L75 | neighbors=[shell-loader.ts, product.ts]
- "types_product_typographytokens": "TypographyTokens" | kind=code-symbol | source=src/types/product.ts:L60 | neighbors=[design-system-loader.ts, product.ts]
- "types_section_screenshotinfo": "ScreenshotInfo" | kind=code-symbol | source=src/types/section.ts:L29 | neighbors=[section-loader.ts, section.ts]
- "types_section_sectiondata": "SectionData" | kind=code-symbol | source=src/types/section.ts:L5 | neighbors=[section-loader.ts, section.ts]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=src/components/ui/badge.tsx:L8 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=src/components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_badge_variants": "badge-variants.ts" | kind=code-symbol | source=src/components/ui/badge-variants.ts:L1 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_variants_badgevariants": "badgeVariants" | kind=code-symbol | source=src/components/ui/badge-variants.ts:L12 | neighbors=[badge.tsx, badge-variants.ts]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[button.tsx, Button()]
- "ui_button_variants": "button-variants.ts" | kind=code-symbol | source=src/components/ui/button-variants.ts:L1 | neighbors=[button.tsx, buttonVariants]
- "ui_button_variants_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button-variants.ts:L12 | neighbors=[button.tsx, button-variants.ts]
- "components_applayout_applayoutprops": "AppLayoutProps" | kind=code-symbol | source=src/components/AppLayout.tsx:L8 | neighbors=[AppLayout.tsx]
- "components_datacard_datacardprops": "DataCardProps" | kind=code-symbol | source=src/components/DataCard.tsx:L13 | neighbors=[DataCard.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-005.json

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

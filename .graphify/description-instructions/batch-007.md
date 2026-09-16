# Node Description Batch 8 of 11

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

- "components_sectionscard_sectionscardprops": "SectionsCardProps" | kind=code-symbol | source=src/components/SectionsCard.tsx:L6 | neighbors=[SectionsCard.tsx]
- "components_sectionspage_getsectionprogress": "getSectionProgress()" | kind=code-symbol | source=src/components/SectionsPage.tsx:L21 | neighbors=[SectionsPage.tsx]
- "components_sectionspage_progressdot": "ProgressDot()" | kind=code-symbol | source=src/components/SectionsPage.tsx:L171 | neighbors=[SectionsPage.tsx]
- "components_sectionspage_progressdotprops": "ProgressDotProps" | kind=code-symbol | source=src/components/SectionsPage.tsx:L165 | neighbors=[SectionsPage.tsx]
- "components_sectionspage_sectionprogress": "SectionProgress" | kind=code-symbol | source=src/components/SectionsPage.tsx:L12 | neighbors=[SectionsPage.tsx]
- "components_shellcard_shellcard": "ShellCard()" | kind=code-symbol | source=src/components/ShellCard.tsx:L12 | neighbors=[ShellCard.tsx]
- "components_shellcard_shellcardprops": "ShellCardProps" | kind=code-symbol | source=src/components/ShellCard.tsx:L8 | neighbors=[ShellCard.tsx]
- "components_speccard_speccardprops": "SpecCardProps" | kind=code-symbol | source=src/components/SpecCard.tsx:L8 | neighbors=[SpecCard.tsx]
- "components_statusconsole_metrictile": "MetricTile()" | kind=code-symbol | source=src/components/StatusConsole.tsx:L47 | neighbors=[StatusConsole.tsx]
- "components_statusconsole_metrictileprops": "MetricTileProps" | kind=code-symbol | source=src/components/StatusConsole.tsx:L37 | neighbors=[StatusConsole.tsx]
- "components_statusconsole_statusconsoleprops": "StatusConsoleProps" | kind=code-symbol | source=src/components/StatusConsole.tsx:L77 | neighbors=[StatusConsole.tsx]
- "components_statusconsole_tilestate": "TileState" | kind=code-symbol | source=src/components/StatusConsole.tsx:L12 | neighbors=[StatusConsole.tsx]
- "components_statusconsole_tiletone": "tileTone" | kind=code-symbol | source=src/components/StatusConsole.tsx:L14 | neighbors=[StatusConsole.tsx]
- "components_stepindicator_stepbadge": "StepBadge()" | kind=code-symbol | source=src/components/StepIndicator.tsx:L59 | neighbors=[StepIndicator.tsx]
- "components_stepindicator_stepbadgeprops": "StepBadgeProps" | kind=code-symbol | source=src/components/StepIndicator.tsx:L51 | neighbors=[StepIndicator.tsx]
- "components_stepindicator_stepindicatorprops": "StepIndicatorProps" | kind=code-symbol | source=src/components/StepIndicator.tsx:L10 | neighbors=[StepIndicator.tsx]
- "components_themestudio_contrastreport": "ContrastReport()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L569 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_rawstage": "RawStage()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L621 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_readstate": "readState()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L49 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_sectionlabel": "SectionLabel()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L526 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_segmentedtoggle": "SegmentedToggle()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L224 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_studiostate": "StudioState" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L41 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_tagpill": "TagPill()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L198 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_themecard": "ThemeCard()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L265 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_themeheader": "ThemeHeader()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L534 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_themestudio": "ThemeStudio()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L69 | neighbors=[ThemeStudio.tsx]
- "components_themestudio_viewmode": "ViewMode" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L39 | neighbors=[ThemeStudio.tsx]
- "components_themetoggle_theme": "Theme" | kind=code-symbol | source=src/components/ThemeToggle.tsx:L9 | neighbors=[ThemeToggle.tsx]
- "eslint_config": "eslint.config.js" | kind=code-symbol | source=eslint.config.js:L1 | neighbors=[f8d7caa Initial release - 0.1]
- "lib_data_shape_loader_datashapefiles": "dataShapeFiles" | kind=code-symbol | source=src/lib/data-shape-loader.ts:L8 | neighbors=[data-shape-loader.ts]
- "lib_design_system_loader_designsystemfiles": "designSystemFiles" | kind=code-symbol | source=src/lib/design-system-loader.ts:L8 | neighbors=[design-system-loader.ts]
- "lib_design_system_loader_hascolors": "hasColors()" | kind=code-symbol | source=src/lib/design-system-loader.ts:L92 | neighbors=[design-system-loader.ts]
- "lib_design_system_loader_hastypography": "hasTypography()" | kind=code-symbol | source=src/lib/design-system-loader.ts:L99 | neighbors=[design-system-loader.ts]
- "lib_lazy_preview_registry": "registry" | kind=code-symbol | source=src/lib/lazy-preview.ts:L17 | neighbors=[lazy-preview.ts]
- "lib_motion_fadeonly": "fadeOnly" | kind=code-symbol | source=src/lib/motion.ts:L54 | neighbors=[motion.ts]
- "lib_motion_fadeup": "fadeUp" | kind=code-symbol | source=src/lib/motion.ts:L44 | neighbors=[motion.ts]
- "lib_motion_stagger": "stagger" | kind=code-symbol | source=src/lib/motion.ts:L63 | neighbors=[motion.ts]
- "lib_product_health_checkstate": "CheckState" | kind=code-symbol | source=src/lib/product-health.ts:L22 | neighbors=[product-health.ts]
- "lib_product_health_healthcheck": "HealthCheck" | kind=code-symbol | source=src/lib/product-health.ts:L25 | neighbors=[product-health.ts]
- "lib_product_health_healthstate": "HealthState" | kind=code-symbol | source=src/lib/product-health.ts:L23 | neighbors=[product-health.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-007.json

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

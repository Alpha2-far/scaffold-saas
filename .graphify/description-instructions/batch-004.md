# Node Description Batch 5 of 11

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

- "components_datashapepage_datashapepage": "DataShapePage()" | kind=code-symbol | source=src/components/DataShapePage.tsx:L9 | neighbors=[DataShapePage.tsx, router.tsx]
- "components_designpage_getdesignpagestepstatuses": "getDesignPageStepStatuses()" | kind=code-symbol | source=src/components/DesignPage.tsx:L51 | neighbors=[DesignPage.tsx, DesignPage()]
- "components_exportpage_exportpage": "ExportPage()" | kind=code-symbol | source=src/components/ExportPage.tsx:L9 | neighbors=[ExportPage.tsx, router.tsx]
- "components_phasenav_phase": "Phase" | kind=code-symbol | source=src/components/PhaseNav.tsx:L11 | neighbors=[NextPhaseButton.tsx, PhaseNav.tsx]
- "components_phasenav_usephasestatuses": "usePhaseStatuses()" | kind=code-symbol | source=src/components/PhaseNav.tsx:L18 | neighbors=[PhaseNav.tsx, PhaseNav()]
- "components_phasewarningbanner_getstoragekey": "getStorageKey()" | kind=code-symbol | source=src/components/PhaseWarningBanner.tsx:L10 | neighbors=[PhaseWarningBanner.tsx, PhaseWarningBanner()]
- "components_phasewarningbanner_readdismissed": "readDismissed()" | kind=code-symbol | source=src/components/PhaseWarningBanner.tsx:L24 | neighbors=[PhaseWarningBanner.tsx, PhaseWarningBanner()]
- "components_productoverviewcard_productoverviewcard": "ProductOverviewCard()" | kind=code-symbol | source=src/components/ProductOverviewCard.tsx:L12 | neighbors=[ProductOverviewCard.tsx, ProductPage.tsx]
- "components_productpage_getproductpagestepstatuses": "getProductPageStepStatuses()" | kind=code-symbol | source=src/components/ProductPage.tsx:L18 | neighbors=[ProductPage.tsx, ProductPage()]
- "components_screendesignpage_screendesignfullscreen": "ScreenDesignFullscreen()" | kind=code-symbol | source=src/components/ScreenDesignPage.tsx:L197 | neighbors=[ScreenDesignPage.tsx, router.tsx]
- "components_screendesignpage_screendesignpage": "ScreenDesignPage()" | kind=code-symbol | source=src/components/ScreenDesignPage.tsx:L16 | neighbors=[ScreenDesignPage.tsx, router.tsx]
- "components_sectionpage_arerequiredstepscomplete": "areRequiredStepsComplete()" | kind=code-symbol | source=src/components/SectionPage.tsx:L38 | neighbors=[SectionPage.tsx, SectionPage()]
- "components_sectionpage_getstepstatuses": "getStepStatuses()" | kind=code-symbol | source=src/components/SectionPage.tsx:L18 | neighbors=[SectionPage.tsx, SectionPage()]
- "components_sectionscard_sectionscard": "SectionsCard()" | kind=code-symbol | source=src/components/SectionsCard.tsx:L11 | neighbors=[ProductPage.tsx, SectionsCard.tsx]
- "components_sectionspage_sectionspage": "SectionsPage()" | kind=code-symbol | source=src/components/SectionsPage.tsx:L34 | neighbors=[SectionsPage.tsx, router.tsx]
- "components_shelldesignpage_shelldesignfullscreen": "ShellDesignFullscreen()" | kind=code-symbol | source=src/components/ShellDesignPage.tsx:L182 | neighbors=[ShellDesignPage.tsx, router.tsx]
- "components_shelldesignpage_shelldesignpage": "ShellDesignPage()" | kind=code-symbol | source=src/components/ShellDesignPage.tsx:L13 | neighbors=[ShellDesignPage.tsx, router.tsx]
- "components_speccard_speccard": "SpecCard()" | kind=code-symbol | source=src/components/SpecCard.tsx:L13 | neighbors=[SectionPage.tsx, SpecCard.tsx]
- "components_statusconsole_statusconsole": "StatusConsole()" | kind=code-symbol | source=src/components/StatusConsole.tsx:L86 | neighbors=[ProductPage.tsx, StatusConsole.tsx]
- "components_themestudio_usethemedetail": "useThemeDetail()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L320 | neighbors=[ThemeStudio.tsx, VisualStage()]
- "components_themestudio_visualstage": "VisualStage()" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L340 | neighbors=[ThemeStudio.tsx, useThemeDetail()]
- "lib_data_shape_loader_hasdatashape": "hasDataShape()" | kind=code-symbol | source=src/lib/data-shape-loader.ts:L92 | neighbors=[data-shape-loader.ts, product-loader.ts]
- "lib_data_shape_loader_parsedatashape": "parseDataShape()" | kind=code-symbol | source=src/lib/data-shape-loader.ts:L33 | neighbors=[data-shape-loader.ts, loadDataShape()]
- "lib_design_system_loader_hasdesignsystem": "hasDesignSystem()" | kind=code-symbol | source=src/lib/design-system-loader.ts:L82 | neighbors=[design-system-loader.ts, product-loader.ts]
- "lib_design_system_loader_loadcolortokens": "loadColorTokens()" | kind=code-symbol | source=src/lib/design-system-loader.ts:L22 | neighbors=[design-system-loader.ts, loadDesignSystem()]
- "lib_design_system_loader_loadtypographytokens": "loadTypographyTokens()" | kind=code-symbol | source=src/lib/design-system-loader.ts:L48 | neighbors=[design-system-loader.ts, loadDesignSystem()]
- "lib_motion_features": "motion-features.ts" | kind=code-symbol | source=src/lib/motion-features.ts:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, main.tsx]
- "lib_phases_phaseconfig": "PhaseConfig" | kind=code-symbol | source=src/lib/phases.ts:L16 | neighbors=[PhaseNav.tsx, phases.ts]
- "lib_phases_phases": "phases" | kind=code-symbol | source=src/lib/phases.ts:L23 | neighbors=[PhaseNav.tsx, phases.ts]
- "lib_phases_phasestatus": "PhaseStatus" | kind=code-symbol | source=src/lib/phases.ts:L14 | neighbors=[PhaseNav.tsx, phases.ts]
- "lib_product_health_producthealth": "ProductHealth" | kind=code-symbol | source=src/lib/product-health.ts:L32 | neighbors=[StatusConsole.tsx, product-health.ts]
- "lib_product_health_section": "section()" | kind=code-symbol | source=src/lib/product-health.ts:L43 | neighbors=[product-health.ts, computeProductHealth()]
- "lib_product_loader_getexportzipurl": "getExportZipUrl()" | kind=code-symbol | source=src/lib/product-loader.ts:L203 | neighbors=[ExportPage.tsx, product-loader.ts]
- "lib_product_loader_parseproductoverview": "parseProductOverview()" | kind=code-symbol | source=src/lib/product-loader.ts:L57 | neighbors=[product-loader.ts, loadProductData()]
- "lib_product_loader_slugify": "slugify()" | kind=code-symbol | source=src/lib/product-loader.ts:L28 | neighbors=[product-loader.ts, parseProductRoadmap()]
- "lib_router_router": "router" | kind=code-symbol | source=src/lib/router.tsx:L11 | neighbors=[router.tsx, main.tsx]
- "lib_section_loader_extractscreendesignname": "extractScreenDesignName()" | kind=code-symbol | source=src/lib/section-loader.ts:L60 | neighbors=[section-loader.ts, getSectionScreenDesigns()]
- "lib_section_loader_extractscreenshotname": "extractScreenshotName()" | kind=code-symbol | source=src/lib/section-loader.ts:L69 | neighbors=[section-loader.ts, getSectionScreenshots()]
- "lib_section_loader_extractsectionidfromproduct": "extractSectionIdFromProduct()" | kind=code-symbol | source=src/lib/section-loader.ts:L42 | neighbors=[section-loader.ts, getAllSectionIds()]
- "lib_section_loader_extractsectionidfromsrc": "extractSectionIdFromSrc()" | kind=code-symbol | source=src/lib/section-loader.ts:L51 | neighbors=[section-loader.ts, getAllSectionIds()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-004.json

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

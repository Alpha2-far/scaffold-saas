# Node Description Batch 2 of 11

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

- "lib_motion": "motion.ts" | kind=code-symbol | source=src/lib/motion.ts:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, motion-primitives.tsx, PhaseNav.tsx, ScaffoldLogoLoader.tsx, StatusConsole.tsx, StepIndicator.tsx] | lang=en
- "lib_product_loader_loadproductdata": "loadProductData()" | kind=code-symbol | source=src/lib/product-loader.ts:L166 | neighbors=[DataShapePage.tsx, DesignPage.tsx, ExportPage.tsx, PhaseNav.tsx, PhaseWarningBanner.tsx, ProductPage.tsx] | lang=en
- "ui_card_card": "Card()" | kind=code-symbol | source=src/components/ui/card.tsx:L5 | neighbors=[DataCard.tsx, DataShapePage.tsx, DesignPage.tsx, EmptyState.tsx, ExportPage.tsx, ProductOverviewCard.tsx] | lang=en
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=src/components/ui/card.tsx:L64 | neighbors=[DataCard.tsx, DataShapePage.tsx, DesignPage.tsx, EmptyState.tsx, ExportPage.tsx, ProductOverviewCard.tsx] | lang=en
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=src/components/ui/dialog.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Dialog(), DialogClose(), DialogContent()] | lang=en
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Sheet(), SheetClose(), SheetContent()] | lang=en
- "components_screendesignscard": "ScreenDesignsCard.tsx" | kind=code-symbol | source=src/components/ScreenDesignsCard.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, EmptyState.tsx, EmptyState(), ScreenDesignsCard(), ScreenDesignsCardProps, section.ts] | lang=en
- "components_themetoggle": "ThemeToggle.tsx" | kind=code-symbol | source=src/components/ThemeToggle.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, f8d7caa Initial release - 0.1, AppLayout.tsx, ScreenDesignPage.tsx, ShellDesignPage.tsx, motion-primitives.tsx] | lang=en
- "lib_product_health": "product-health.ts" | kind=code-symbol | source=src/lib/product-health.ts:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, ProductPage.tsx, StatusConsole.tsx, CheckState, computeProductHealth(), HealthCheck] | lang=en
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=src/components/ui/card.tsx:L18 | neighbors=[DataCard.tsx, DataShapePage.tsx, DesignPage.tsx, ExportPage.tsx, ProductOverviewCard.tsx, ScreenDesignsCard.tsx] | lang=en
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=src/components/ui/card.tsx:L31 | neighbors=[DataCard.tsx, DataShapePage.tsx, DesignPage.tsx, ExportPage.tsx, ProductOverviewCard.tsx, ScreenDesignsCard.tsx] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@b13fcb932b9de2ccb7ec014da23d40925ebea1be": "b13fcb9 feat(scaffold-v1): designmd-mcp ingestion, 43 local presets, ThemeStudi…" | kind=Commit | source=git | neighbors=[50253d8 feat(scaffold-v1): mini-charte …, main, AppLayout.tsx, DesignPage.tsx, ProductOverviewCard.tsx, SectionsCard.tsx] | lang=en
- "components_phasewarningbanner": "PhaseWarningBanner.tsx" | kind=code-symbol | source=src/components/PhaseWarningBanner.tsx:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, 5f773b4 added handling of & in section …, f8d7caa Initial release - 0.1, getStorageKey(), PhaseWarningBanner()] | lang=en
- "lib_data_shape_loader": "data-shape-loader.ts" | kind=code-symbol | source=src/lib/data-shape-loader.ts:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, ac48e7a feat: release Scaffold V1 — BM …, dataShapeFiles, hasDataShape(), loadDataShape()] | lang=en
- "ui_button": "button.tsx" | kind=code-symbol | source=src/components/ui/button.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, AppLayout.tsx, ScreenDesignPage.tsx, ShellDesignPage.tsx, ThemeToggle.tsx, utils.ts] | lang=en
- "ui_collapsible": "collapsible.tsx" | kind=code-symbol | source=src/components/ui/collapsible.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, DataCard.tsx, ExportPage.tsx, ProductOverviewCard.tsx, ShellCard.tsx, SpecCard.tsx] | lang=en
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Table(), TableBody(), TableCaption()] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@ac48e7ac34c2e6dcc3ae749db5b51007ee0cda64": "ac48e7a feat: release Scaffold V1 — BM PRD engine, scope lock pipeline, pre-exp…" | kind=Commit | source=git | neighbors=[529dedb Configure Amp orb setup, main, 24c0173 feat(scaffold-v1): official Sca…, EmptyState.tsx, SectionPage.tsx, data-shape-loader.ts] | lang=pt
- "components_emptystate_emptystate": "EmptyState()" | kind=code-symbol | source=src/components/EmptyState.tsx:L78 | neighbors=[DataCard.tsx, DataShapePage.tsx, DesignPage.tsx, EmptyState.tsx, ProductPage.tsx, ScreenDesignsCard.tsx] | lang=en
- "types_section": "section.ts" | kind=code-symbol | source=src/types/section.ts:L1 | neighbors=[f8d7caa Initial release - 0.1, ScreenDesignsCard.tsx, SpecCard.tsx, section-loader.ts, ParsedSpec, ScreenDesignInfo] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@50253d8b5dd44a21ebebcaf270977442eda7db68": "50253d8 feat(scaffold-v1): mini-charte integration, animated logo loader & agen…" | kind=Commit | source=git | neighbors=[203a22b chore(license): update copyrigh…, main, b13fcb9 feat(scaffold-v1): designmd-mcp…, ScaffoldLogoLoader.tsx, ScreenDesignPage.tsx, ShellDesignPage.tsx] | lang=en
- "components_applayout_applayout": "AppLayout()" | kind=code-symbol | source=src/components/AppLayout.tsx:L20 | neighbors=[AppLayout.tsx, DataShapePage.tsx, DesignPage.tsx, ExportPage.tsx, ProductPage.tsx, SectionPage.tsx] | lang=en
- "scripts_compile_presets_section": "section()" | kind=code-symbol | source=scripts/compile-presets.mjs:L287 | neighbors=[compile-presets.mjs, parseColors(), parseElevation(), parseMeta(), parseRadii(), parseSpacing()] | lang=en
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Badge(), badge-variants.ts, badgeVariants] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Tabs(), TabsContent(), TabsList()] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@5f773b4158e518fd050b1dfcdb022c5544cce8f8": "5f773b4 added handling of & in section names." | kind=Commit | source=git | neighbors=[main, 4cada38 fix: normalize CRLF line ending…, b045c89 Merge pull request #16 from blu…, PhaseWarningBanner.tsx, product-loader.ts, a9c7f5a Fixed errors related to importi…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@b045c894362f39d95d258eddc00a176d5d17f21a": "b045c89 Merge pull request #16 from blucyk/fix/windows-crlf-line-endings" | kind=Commit | source=git | neighbors=[4cada38 fix: normalize CRLF line ending…, 5f773b4 added handling of & in section …, main, 48d0c5a Merge pull request #40 from bui…, d82ddfb Streamline shape-section and sa…, product-loader.ts] | lang=en
- "components_scaffoldlogoloader_scaffoldlogoloader": "ScaffoldLogoLoader()" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L167 | neighbors=[DesignPage.tsx, ScaffoldLogoLoader.tsx, ScreenDesignPage.tsx, ShellDesignPage.tsx, StatusConsole.tsx, ThemeStudio.tsx] | lang=en
- "lib_phases": "phases.ts" | kind=code-symbol | source=src/lib/phases.ts:L1 | neighbors=[NextPhaseButton.tsx, PhaseNav.tsx, Phase, PhaseConfig, phases, PhaseStatus] | lang=en
- "lib_section_loader_getsectionscreendesigns": "getSectionScreenDesigns()" | kind=code-symbol | source=src/lib/section-loader.ts:L151 | neighbors=[ExportPage.tsx, PhaseNav.tsx, SectionsPage.tsx, section-loader.ts, extractScreenDesignName(), loadSectionData()] | lang=en
- "scripts_compile_presets_buildmode": "buildMode()" | kind=code-symbol | source=scripts/compile-presets.mjs:L467 | neighbors=[compile-presets.mjs, contrast(), deriveDisplay(), deriveOnAccent(), mix(), compile()] | lang=en
- "scripts_compile_presets_contrast": "contrast()" | kind=code-symbol | source=scripts/compile-presets.mjs:L81 | neighbors=[compile-presets.mjs, buildMode(), compile(), luminance(), deriveDisplay(), deriveOnAccent()] | lang=en
- "scripts_compile_presets_derivedisplay": "deriveDisplay()" | kind=code-symbol | source=scripts/compile-presets.mjs:L161 | neighbors=[compile-presets.mjs, buildMode(), compile(), contrast(), hexToOklch(), oklchToHex()] | lang=en
- "scripts_compile_presets_deriveonaccent": "deriveOnAccent()" | kind=code-symbol | source=scripts/compile-presets.mjs:L189 | neighbors=[compile-presets.mjs, buildMode(), clamp(), contrast(), hexToOklch(), oklchToHex()] | lang=en
- "src_main": "main.tsx" | kind=code-symbol | source=src/main.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, f8d7caa Initial release - 0.1, motion-features.ts, router.tsx, router, loadDomAnimation()] | lang=en
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Avatar(), AvatarFallback(), AvatarImage()] | lang=en
- "ui_button_button": "Button()" | kind=code-symbol | source=src/components/ui/button.tsx:L8 | neighbors=[AppLayout.tsx, ScreenDesignPage.tsx, ShellDesignPage.tsx, ThemeToggle.tsx, button.tsx, buttonVariants] | lang=en
- "ui_collapsible_collapsible": "Collapsible()" | kind=code-symbol | source=src/components/ui/collapsible.tsx:L6 | neighbors=[DataCard.tsx, ExportPage.tsx, ProductOverviewCard.tsx, ShellCard.tsx, SpecCard.tsx, collapsible.tsx] | lang=en
- "ui_collapsible_collapsiblecontent": "CollapsibleContent()" | kind=code-symbol | source=src/components/ui/collapsible.tsx:L32 | neighbors=[DataCard.tsx, ExportPage.tsx, ProductOverviewCard.tsx, ShellCard.tsx, SpecCard.tsx, collapsible.tsx] | lang=en
- "ui_collapsible_collapsibletrigger": "CollapsibleTrigger()" | kind=code-symbol | source=src/components/ui/collapsible.tsx:L19 | neighbors=[DataCard.tsx, ExportPage.tsx, ProductOverviewCard.tsx, ShellCard.tsx, SpecCard.tsx, collapsible.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-001.json

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

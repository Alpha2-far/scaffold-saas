# Node Description Batch 1 of 11

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/Alpha2-far/scaffold-v1@f8d7caa6d225affb33d023c02547a9c747c31ec5": "f8d7caa Initial release - 0.1" | kind=Commit | source=git | neighbors=[main, fc1a555 readme, AppLayout.tsx, DataCard.tsx, DesignPage.tsx, EmptyState.tsx]
- "lib_product_loader": "product-loader.ts" | kind=code-symbol | source=src/lib/product-loader.ts:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 3fc5cb3 Fix slugify to handle accented …, 48d0c5a Merge pull request #40 from bui…, 4cada38 fix: normalize CRLF line ending…, 5f773b4 added handling of & in section …, ac48e7a feat: release Scaffold V1 — BM …]
- "scripts_compile_presets": "compile-presets.mjs" | kind=code-symbol | source=scripts/compile-presets.mjs:L1 | neighbors=[b13fcb9 feat(scaffold-v1): designmd-mcp…, assignRoles(), buildMode(), CATALOG, clamp(), compile()]
- "components_themestudio": "ThemeStudio.tsx" | kind=code-symbol | source=src/components/ThemeStudio.tsx:L1 | neighbors=[b13fcb9 feat(scaffold-v1): designmd-mcp…, DesignPage.tsx, motion-primitives.tsx, Tappable(), ScaffoldLogoLoader.tsx, ScaffoldLogoLoader()]
- "branch:repo:github.com/Alpha2-far/scaffold-v1#main": "main" | kind=Branch | source=git | neighbors=[0c87669 Streamline product-vision to au…, 203a22b chore(license): update copyrigh…, 24c0173 feat(scaffold-v1): official Sca…, 33a6a51 update, 3dc0061 Reframe export as UI design han…, 3fc5cb3 Fix slugify to handle accented …]
- "components_productpage": "ProductPage.tsx" | kind=code-symbol | source=src/components/ProductPage.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, 3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, AppLayout.tsx, AppLayout()]
- "lib_section_loader": "section-loader.ts" | kind=code-symbol | source=src/lib/section-loader.ts:L1 | neighbors=[ac48e7a feat: release Scaffold V1 — BM …, f8d7caa Initial release - 0.1, ExportPage.tsx, PhaseNav.tsx, ScreenDesignPage.tsx, SectionPage.tsx]
- "components_designpage": "DesignPage.tsx" | kind=code-symbol | source=src/components/DesignPage.tsx:L1 | neighbors=[b13fcb9 feat(scaffold-v1): designmd-mcp…, f8d7caa Initial release - 0.1, AppLayout.tsx, AppLayout(), colorMap, ColorSwatch()]
- "components_sectionpage": "SectionPage.tsx" | kind=code-symbol | source=src/components/SectionPage.tsx:L1 | neighbors=[ac48e7a feat: release Scaffold V1 — BM …, f8d7caa Initial release - 0.1, AppLayout.tsx, AppLayout(), DataCard.tsx, DataCard()]
- "components_sectionspage": "SectionsPage.tsx" | kind=code-symbol | source=src/components/SectionsPage.tsx:L1 | neighbors=[b13fcb9 feat(scaffold-v1): designmd-mcp…, f8d7caa Initial release - 0.1, AppLayout.tsx, AppLayout(), EmptyState.tsx, EmptyState()]
- "components_exportpage": "ExportPage.tsx" | kind=code-symbol | source=src/components/ExportPage.tsx:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, AppLayout.tsx, AppLayout(), ChecklistItem()]
- "components_phasenav": "PhaseNav.tsx" | kind=code-symbol | source=src/components/PhaseNav.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, 3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, AppLayout.tsx, motion-primitives.tsx]
- "components_motion_primitives": "motion-primitives.tsx" | kind=code-symbol | source=src/components/motion-primitives.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, DataCard.tsx, Lift(), LiftProps, Reveal(), RevealProps]
- "components_statusconsole": "StatusConsole.tsx" | kind=code-symbol | source=src/components/StatusConsole.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, 4cd1f41 fix(ui): eliminate dark mode lo…, 50253d8 feat(scaffold-v1): mini-charte …, b13fcb9 feat(scaffold-v1): designmd-mcp…, ProductPage.tsx, motion-primitives.tsx]
- "components_scaffoldlogoloader": "ScaffoldLogoLoader.tsx" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L1 | neighbors=[50253d8 feat(scaffold-v1): mini-charte …, DesignPage.tsx, BARS, BEAM_Y, beamTransition, BEAT_ONSET]
- "components_datacard": "DataCard.tsx" | kind=code-symbol | source=src/components/DataCard.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, 3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, countRecords(), DataCard()]
- "lib_router": "router.tsx" | kind=code-symbol | source=src/lib/router.tsx:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, DataShapePage.tsx, DataShapePage(), DesignPage.tsx]
- "types_product": "product.ts" | kind=code-symbol | source=src/types/product.ts:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, ProductOverviewCard.tsx, SectionsCard.tsx, ShellCard.tsx]
- "components_screendesignpage": "ScreenDesignPage.tsx" | kind=code-symbol | source=src/components/ScreenDesignPage.tsx:L1 | neighbors=[50253d8 feat(scaffold-v1): mini-charte …, f8d7caa Initial release - 0.1, ScaffoldLogoLoader.tsx, ScaffoldLogoLoader(), ScreenDesignFullscreen(), ScreenDesignPage()]
- "ui_card": "card.tsx" | kind=code-symbol | source=src/components/ui/card.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, DataCard.tsx, DataShapePage.tsx, DesignPage.tsx, EmptyState.tsx, ExportPage.tsx]
- "lib_utils": "utils.ts" | kind=code-symbol | source=src/lib/utils.ts:L1 | neighbors=[f8d7caa Initial release - 0.1, motion-primitives.tsx, ScaffoldLogoLoader.tsx, StatusConsole.tsx, StepIndicator.tsx, ThemeStudio.tsx]
- "components_datashapepage": "DataShapePage.tsx" | kind=code-symbol | source=src/components/DataShapePage.tsx:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, AppLayout.tsx, AppLayout(), DataShapePage(), EmptyState.tsx]
- "lib_shell_loader": "shell-loader.ts" | kind=code-symbol | source=src/lib/shell-loader.ts:L1 | neighbors=[ac48e7a feat: release Scaffold V1 — BM …, f8d7caa Initial release - 0.1, ScreenDesignPage.tsx, ShellDesignPage.tsx, product-loader.ts, getShellComponentNames()]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=src/lib/utils.ts:L4 | neighbors=[motion-primitives.tsx, ScaffoldLogoLoader.tsx, StatusConsole.tsx, StepIndicator.tsx, ThemeStudio.tsx, utils.ts]
- "components_emptystate": "EmptyState.tsx" | kind=code-symbol | source=src/components/EmptyState.tsx:L1 | neighbors=[3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, ac48e7a feat: release Scaffold V1 — BM …, f8d7caa Initial release - 0.1, DataCard.tsx, DataShapePage.tsx]
- "components_productoverviewcard": "ProductOverviewCard.tsx" | kind=code-symbol | source=src/components/ProductOverviewCard.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, b13fcb9 feat(scaffold-v1): designmd-mcp…, f8d7caa Initial release - 0.1, motion-primitives.tsx, Lift(), ProductOverviewCard()]
- "commit:repo:github.com/Alpha2-far/scaffold-v1@24c0173196cfca4e967a53f455d50a70d723ae5d": "24c0173 feat(scaffold-v1): official Scaffold™ branding, dynamic motion system &…" | kind=Commit | source=git | neighbors=[main, 4cd1f41 fix(ui): eliminate dark mode lo…, AppLayout.tsx, DataCard.tsx, motion-primitives.tsx, NextPhaseButton.tsx]
- "components_applayout": "AppLayout.tsx" | kind=code-symbol | source=src/components/AppLayout.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, 4cd1f41 fix(ui): eliminate dark mode lo…, b13fcb9 feat(scaffold-v1): designmd-mcp…, f8d7caa Initial release - 0.1, AppLayout(), AppLayoutProps]
- "presets_index": "index.ts" | kind=code-symbol | source=src/presets/index.ts:L1 | neighbors=[b13fcb9 feat(scaffold-v1): designmd-mcp…, ThemeStudio.tsx, byId, ContrastCorrection, ContrastReport, designDocLoaders]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent()]
- "components_nextphasebutton": "NextPhaseButton.tsx" | kind=code-symbol | source=src/components/NextPhaseButton.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, 3dc0061 Reframe export as UI design han…, 48d0c5a Merge pull request #40 from bui…, f8d7caa Initial release - 0.1, DataShapePage.tsx, DesignPage.tsx]
- "components_speccard": "SpecCard.tsx" | kind=code-symbol | source=src/components/SpecCard.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, SectionPage.tsx, EmptyState.tsx, EmptyState(), SpecCard(), SpecCardProps]
- "commit:repo:github.com/Alpha2-far/scaffold-v1@48d0c5afcfb07e9f301125d1ddf91e82f0cc6324": "48d0c5a Merge pull request #40 from buildermethods/2026.2.9" | kind=Commit | source=git | neighbors=[0c87669 Streamline product-vision to au…, main, 9c6813a fix(shape-section): Section tit…, DataCard.tsx, DataShapePage.tsx, EmptyState.tsx]
- "components_stepindicator": "StepIndicator.tsx" | kind=code-symbol | source=src/components/StepIndicator.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, f8d7caa Initial release - 0.1, DataShapePage.tsx, DesignPage.tsx, ProductPage.tsx, SectionPage.tsx]
- "scripts_compile_presets_compile": "compile()" | kind=code-symbol | source=scripts/compile-presets.mjs:L530 | neighbors=[compile-presets.mjs, assignRoles(), buildMode(), contrast(), cssBlock(), deriveDisplay()]
- "commit:repo:github.com/Alpha2-far/scaffold-v1@3dc00611a55ede123aea72875ed31a4db297cd47": "3dc0061 Reframe export as UI design handoff and rename data-model to data-shape" | kind=Commit | source=git | neighbors=[main, 4fd139c Align docs with UI-focused hand…, DataCard.tsx, DataShapePage.tsx, EmptyState.tsx, ExportPage.tsx]
- "components_sectionscard": "SectionsCard.tsx" | kind=code-symbol | source=src/components/SectionsCard.tsx:L1 | neighbors=[24c0173 feat(scaffold-v1): official Sca…, b13fcb9 feat(scaffold-v1): designmd-mcp…, f8d7caa Initial release - 0.1, ProductPage.tsx, motion-primitives.tsx, Lift()]
- "components_shelldesignpage": "ShellDesignPage.tsx" | kind=code-symbol | source=src/components/ShellDesignPage.tsx:L1 | neighbors=[50253d8 feat(scaffold-v1): mini-charte …, f8d7caa Initial release - 0.1, ScaffoldLogoLoader.tsx, ScaffoldLogoLoader(), ShellDesignFullscreen(), ShellDesignPage()]
- "components_shellcard": "ShellCard.tsx" | kind=code-symbol | source=src/components/ShellCard.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, ShellCard(), ShellCardProps, product.ts, ShellInfo, card.tsx]
- "lib_design_system_loader": "design-system-loader.ts" | kind=code-symbol | source=src/lib/design-system-loader.ts:L1 | neighbors=[f8d7caa Initial release - 0.1, designSystemFiles, hasColors(), hasDesignSystem(), hasTypography(), loadColorTokens()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-000.json

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

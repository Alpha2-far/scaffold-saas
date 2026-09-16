# Node Description Batch 3 of 11

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

- "commit:repo:github.com/Alpha2-far/scaffold-v1@4cd1f413151dbc08bd6e3e039b10f26fca119213": "4cd1f41 fix(ui): eliminate dark mode logo box with true alpha transparency & up…" | kind=Commit | source=git | neighbors=[24c0173 feat(scaffold-v1): official Sca…, main, 203a22b chore(license): update copyrigh…, AppLayout.tsx, StatusConsole.tsx] | lang=en
- "components_datacard_datacard": "DataCard()" | kind=code-symbol | source=src/components/DataCard.tsx:L42 | neighbors=[DataCard.tsx, countRecords(), extractMeta(), getDataWithoutMeta(), SectionPage.tsx] | lang=en
- "components_motion_primitives_tappable": "Tappable()" | kind=code-symbol | source=src/components/motion-primitives.tsx:L155 | neighbors=[motion-primitives.tsx, NextPhaseButton.tsx, PhaseNav.tsx, ThemeStudio.tsx, ThemeToggle.tsx] | lang=en
- "components_nextphasebutton_nextphasebutton": "NextPhaseButton()" | kind=code-symbol | source=src/components/NextPhaseButton.tsx:L17 | neighbors=[DataShapePage.tsx, DesignPage.tsx, NextPhaseButton.tsx, ProductPage.tsx, SectionsPage.tsx] | lang=en
- "components_phasewarningbanner_phasewarningbanner": "PhaseWarningBanner()" | kind=code-symbol | source=src/components/PhaseWarningBanner.tsx:L33 | neighbors=[PhaseWarningBanner.tsx, getStorageKey(), readDismissed(), SectionPage.tsx, SectionsPage.tsx] | lang=en
- "components_stepindicator_stepindicator": "StepIndicator()" | kind=code-symbol | source=src/components/StepIndicator.tsx:L17 | neighbors=[DataShapePage.tsx, DesignPage.tsx, ProductPage.tsx, SectionPage.tsx, StepIndicator.tsx] | lang=en
- "components_stepindicator_stepstatus": "StepStatus" | kind=code-symbol | source=src/components/StepIndicator.tsx:L8 | neighbors=[DataShapePage.tsx, DesignPage.tsx, ProductPage.tsx, SectionPage.tsx, StepIndicator.tsx] | lang=en
- "lib_motion_ease_out": "EASE_OUT" | kind=code-symbol | source=src/lib/motion.ts:L17 | neighbors=[motion-primitives.tsx, ScaffoldLogoLoader.tsx, StatusConsole.tsx, StepIndicator.tsx, motion.ts] | lang=en
- "lib_section_loader_getallsectionids": "getAllSectionIds()" | kind=code-symbol | source=src/lib/section-loader.ts:L256 | neighbors=[ExportPage.tsx, PhaseNav.tsx, section-loader.ts, extractSectionIdFromProduct(), extractSectionIdFromSrc()] | lang=en
- "lib_section_loader_loadsectiondata": "loadSectionData()" | kind=code-symbol | source=src/lib/section-loader.ts:L208 | neighbors=[SectionPage.tsx, section-loader.ts, getSectionScreenDesigns(), getSectionScreenshots(), parseSpec()] | lang=en
- "lib_shell_loader_loadshellinfo": "loadShellInfo()" | kind=code-symbol | source=src/lib/shell-loader.ts:L139 | neighbors=[ScreenDesignPage.tsx, product-loader.ts, shell-loader.ts, hasShellComponents(), parseShellSpec()] | lang=en
- "scripts_compile_presets_hextooklch": "hexToOklch()" | kind=code-symbol | source=scripts/compile-presets.mjs:L89 | neighbors=[compile-presets.mjs, deriveDisplay(), deriveOnAccent(), hexToRgb(), pickRamp()] | lang=en
- "scripts_compile_presets_mix": "mix()" | kind=code-symbol | source=scripts/compile-presets.mjs:L140 | neighbors=[compile-presets.mjs, buildMode(), compile(), hexToRgb(), rgbToHex()] | lang=en
- "scripts_compile_presets_oklchtohex": "oklchToHex()" | kind=code-symbol | source=scripts/compile-presets.mjs:L129 | neighbors=[compile-presets.mjs, deriveDisplay(), deriveOnAccent(), oklchToRgbRaw(), rgbToHex()] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@3fc5cb374129fea6c5178f142dc21578d6be5613": "3fc5cb3 Fix slugify to handle accented characters and apostrophes (#46)" | kind=Commit | source=git | neighbors=[main, 67cef4f Adopt agentcanon convention, product-loader.ts, 9c6813a fix(shape-section): Section tit…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@4cada38548af6664a6590a3d0e5dc1745e316167": "4cada38 fix: normalize CRLF line endings in markdown parsers" | kind=Commit | source=git | neighbors=[main, b045c89 Merge pull request #16 from blu…, product-loader.ts, 5f773b4 added handling of & in section …] | lang=en
- "components_motion_primitives_lift": "Lift()" | kind=code-symbol | source=src/components/motion-primitives.tsx:L111 | neighbors=[DataCard.tsx, motion-primitives.tsx, ProductOverviewCard.tsx, SectionsCard.tsx] | lang=en
- "components_sectionpage_sectionpage": "SectionPage()" | kind=code-symbol | source=src/components/SectionPage.tsx:L45 | neighbors=[SectionPage.tsx, areRequiredStepsComplete(), getStepStatuses(), router.tsx] | lang=en
- "components_themetoggle_themetoggle": "ThemeToggle()" | kind=code-symbol | source=src/components/ThemeToggle.tsx:L11 | neighbors=[AppLayout.tsx, ScreenDesignPage.tsx, ShellDesignPage.tsx, ThemeToggle.tsx] | lang=en
- "lib_design_system_loader_loaddesignsystem": "loadDesignSystem()" | kind=code-symbol | source=src/lib/design-system-loader.ts:L67 | neighbors=[design-system-loader.ts, loadColorTokens(), loadTypographyTokens(), product-loader.ts] | lang=en
- "lib_lazy_preview": "lazy-preview.ts" | kind=code-symbol | source=src/lib/lazy-preview.ts:L1 | neighbors=[ScreenDesignPage.tsx, ShellDesignPage.tsx, cachedLazy(), registry] | lang=en
- "lib_motion_duration": "DURATION" | kind=code-symbol | source=src/lib/motion.ts:L22 | neighbors=[motion-primitives.tsx, StatusConsole.tsx, StepIndicator.tsx, motion.ts] | lang=en
- "lib_motion_ease_soft": "EASE_SOFT" | kind=code-symbol | source=src/lib/motion.ts:L20 | neighbors=[motion-primitives.tsx, ScaffoldLogoLoader.tsx, StatusConsole.tsx, motion.ts] | lang=en
- "lib_section_loader_getsectionscreenshots": "getSectionScreenshots()" | kind=code-symbol | source=src/lib/section-loader.ts:L174 | neighbors=[SectionsPage.tsx, section-loader.ts, extractScreenshotName(), loadSectionData()] | lang=en
- "lib_shell_loader_hasshell": "hasShell()" | kind=code-symbol | source=src/lib/shell-loader.ts:L155 | neighbors=[product-loader.ts, shell-loader.ts, hasShellComponents(), hasShellSpec()] | lang=en
- "lib_shell_loader_hasshellcomponents": "hasShellComponents()" | kind=code-symbol | source=src/lib/shell-loader.ts:L91 | neighbors=[ScreenDesignPage.tsx, shell-loader.ts, hasShell(), loadShellInfo()] | lang=en
- "scripts_compile_presets_hextorgb": "hexToRgb()" | kind=code-symbol | source=scripts/compile-presets.mjs:L45 | neighbors=[compile-presets.mjs, hexToOklch(), luminance(), mix()] | lang=en
- "scripts_compile_presets_luminance": "luminance()" | kind=code-symbol | source=scripts/compile-presets.mjs:L73 | neighbors=[compile-presets.mjs, compile(), contrast(), hexToRgb()] | lang=en
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Input()] | lang=en
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Label()] | lang=en
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Separator()] | lang=en
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[f8d7caa Initial release - 0.1, utils.ts, cn(), Skeleton()] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@0c876697f6eb08c590cedefe58ba2d1c400b4e8b": "0c87669 Streamline product-vision to auto-generate overview, roadmap, and data …" | kind=Commit | source=git | neighbors=[main, 48d0c5a Merge pull request #40 from bui…, 4fd139c Align docs with UI-focused hand…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@203a22bec427d0cf529fbe40447ee150e940610a": "203a22b chore(license): update copyright notice to Scaffold™ 2026" | kind=Commit | source=git | neighbors=[main, 50253d8 feat(scaffold-v1): mini-charte …, 4cd1f41 fix(ui): eliminate dark mode lo…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@33a6a511ecf78d7fbcde282b803b069ff6a1bc2e": "33a6a51 update" | kind=Commit | source=git | neighbors=[main, d612181 github, bfdc006 Design OS image for readme] | lang=pt
- "commit:repo:github.com/Alpha2-far/scaffold-v1@4fd139c1d7f1b2ef8abac34502f526854beeb18f": "4fd139c Align docs with UI-focused handoff reframe" | kind=Commit | source=git | neighbors=[3dc0061 Reframe export as UI design han…, main, 0c87669 Streamline product-vision to au…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@529dedb43bfec24b2cbb128f26dd8cbc6143f754": "529dedb Configure Amp orb setup" | kind=Commit | source=git | neighbors=[main, ac48e7a feat: release Scaffold V1 — BM …, 9dae0ba Fix AGENTS.md case: tracked pat…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@52ce8b7b7620dc19b9316bb6ed766b3ed990962c": "52ce8b7 updates to export package documentation and consolidated the foundation…" | kind=Commit | source=git | neighbors=[main, b1d4c53 Remove remaining .DS_Store file…, 7fde6af Add .gitignore and remove .DS_S…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@67cef4f2d8e588867820f5bc84932090fbd40259": "67cef4f Adopt agentcanon convention" | kind=Commit | source=git | neighbors=[3fc5cb3 Fix slugify to handle accented …, main, a4cbd04 Fix CLAUDE.md case: tracked pat…] | lang=en
- "commit:repo:github.com/Alpha2-far/scaffold-v1@7fde6afd2f1a59450870a71b345d3fafb0ece0f9": "7fde6af Add .gitignore and remove .DS_Store from tracking" | kind=Commit | source=git | neighbors=[main, 52ce8b7 updates to export package docum…, d612181 github] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-002.json

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

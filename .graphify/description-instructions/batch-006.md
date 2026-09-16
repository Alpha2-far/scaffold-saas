# Node Description Batch 7 of 11

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

- "components_datacard_datameta": "DataMeta" | kind=code-symbol | source=src/components/DataCard.tsx:L8 | neighbors=[DataCard.tsx]
- "components_designpage_colormap": "colorMap" | kind=code-symbol | source=src/components/DesignPage.tsx:L22 | neighbors=[DesignPage.tsx]
- "components_designpage_colorswatch": "ColorSwatch()" | kind=code-symbol | source=src/components/DesignPage.tsx:L328 | neighbors=[DesignPage.tsx]
- "components_designpage_colorswatchprops": "ColorSwatchProps" | kind=code-symbol | source=src/components/DesignPage.tsx:L323 | neighbors=[DesignPage.tsx]
- "components_designpage_themestudio": "ThemeStudio" | kind=code-symbol | source=src/components/DesignPage.tsx:L17 | neighbors=[DesignPage.tsx]
- "components_emptystate_config": "config" | kind=code-symbol | source=src/components/EmptyState.tsx:L10 | neighbors=[EmptyState.tsx]
- "components_emptystate_emptystateprops": "EmptyStateProps" | kind=code-symbol | source=src/components/EmptyState.tsx:L6 | neighbors=[EmptyState.tsx]
- "components_emptystate_emptystatetype": "EmptyStateType" | kind=code-symbol | source=src/components/EmptyState.tsx:L4 | neighbors=[EmptyState.tsx]
- "components_exportpage_checklistitem": "ChecklistItem()" | kind=code-symbol | source=src/components/ExportPage.tsx:L276 | neighbors=[ExportPage.tsx]
- "components_exportpage_checklistitemprops": "ChecklistItemProps" | kind=code-symbol | source=src/components/ExportPage.tsx:L271 | neighbors=[ExportPage.tsx]
- "components_exportpage_exportitem": "ExportItem()" | kind=code-symbol | source=src/components/ExportPage.tsx:L299 | neighbors=[ExportPage.tsx]
- "components_exportpage_exportitemprops": "ExportItemProps" | kind=code-symbol | source=src/components/ExportPage.tsx:L293 | neighbors=[ExportPage.tsx]
- "components_motion_primitives_liftprops": "LiftProps" | kind=code-symbol | source=src/components/motion-primitives.tsx:L98 | neighbors=[motion-primitives.tsx]
- "components_motion_primitives_reveal": "Reveal()" | kind=code-symbol | source=src/components/motion-primitives.tsx:L28 | neighbors=[motion-primitives.tsx]
- "components_motion_primitives_revealprops": "RevealProps" | kind=code-symbol | source=src/components/motion-primitives.tsx:L14 | neighbors=[motion-primitives.tsx]
- "components_motion_primitives_staggeritemprops": "StaggerItemProps" | kind=code-symbol | source=src/components/motion-primitives.tsx:L70 | neighbors=[motion-primitives.tsx]
- "components_motion_primitives_staggerprops": "StaggerProps" | kind=code-symbol | source=src/components/motion-primitives.tsx:L48 | neighbors=[motion-primitives.tsx]
- "components_motion_primitives_tappableprops": "TappableProps" | kind=code-symbol | source=src/components/motion-primitives.tsx:L146 | neighbors=[motion-primitives.tsx]
- "components_nextphasebutton_nextphasebuttonprops": "NextPhaseButtonProps" | kind=code-symbol | source=src/components/NextPhaseButton.tsx:L6 | neighbors=[NextPhaseButton.tsx]
- "components_nextphasebutton_phaseconfig": "phaseConfig" | kind=code-symbol | source=src/components/NextPhaseButton.tsx:L10 | neighbors=[NextPhaseButton.tsx]
- "components_phasenav_phaseconfig": "PhaseConfig" | kind=code-symbol | source=src/components/PhaseNav.tsx:L13 | neighbors=[PhaseNav.tsx]
- "components_phasenav_phaseinfo": "PhaseInfo" | kind=code-symbol | source=src/components/PhaseNav.tsx:L12 | neighbors=[PhaseNav.tsx]
- "components_phasenav_phases": "phases" | kind=code-symbol | source=src/components/PhaseNav.tsx:L20 | neighbors=[PhaseNav.tsx]
- "components_phasenav_phasestatus": "PhaseStatus" | kind=code-symbol | source=src/components/PhaseNav.tsx:L28 | neighbors=[PhaseNav.tsx]
- "components_productoverviewcard_productoverviewcardprops": "ProductOverviewCardProps" | kind=code-symbol | source=src/components/ProductOverviewCard.tsx:L8 | neighbors=[ProductOverviewCard.tsx]
- "components_scaffoldlogoloader_bars": "BARS" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L32 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_beam_y": "BEAM_Y" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L67 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_beamtransition": "beamTransition" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L69 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_beat_onset": "BEAT_ONSET" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L84 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_beat_opacity": "BEAT_OPACITY" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L90 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_beat_transitions": "BEAT_TRANSITIONS" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L92 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_calm_opacity": "CALM_OPACITY" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L118 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_calmtransition": "calmTransition" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L119 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_halo_opacity": "HALO_OPACITY" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L110 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_halo_scale": "HALO_SCALE" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L111 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_halotransition": "haloTransition" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L112 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_scaffoldlogoloaderprops": "ScaffoldLogoLoaderProps" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L159 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_scaffoldlogoloader_sizes": "SIZES" | kind=code-symbol | source=src/components/ScaffoldLogoLoader.tsx:L121 | neighbors=[ScaffoldLogoLoader.tsx]
- "components_screendesignscard_screendesignscard": "ScreenDesignsCard()" | kind=code-symbol | source=src/components/ScreenDesignsCard.tsx:L12 | neighbors=[ScreenDesignsCard.tsx]
- "components_screendesignscard_screendesignscardprops": "ScreenDesignsCardProps" | kind=code-symbol | source=src/components/ScreenDesignsCard.tsx:L7 | neighbors=[ScreenDesignsCard.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-006.json

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

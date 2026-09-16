# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

LANGUAGE: each community line ends with a `[lang=…]` marker giving the
language of its source nodes. Write that community's name in EXACTLY that
language. Do not normalize every name to one common language.

## Communities

Community 0: AppLayout(, EmptyState(, Card(, CardHeader(, CardTitle(, CardContent(, loadProductData(, AppLayout.tsx, AppLayoutProps, DataCard.tsx, DataMeta, DataCardProps [lang=en]
Community 1: PhaseWarningBanner.tsx, getStorageKey(, readDismissed(, PhaseWarningBanner(, data-shape-loader.ts, dataShapeFiles, parseDataShape(, loadDataShape(, hasDataShape(, design-system-loader.ts, designSystemFiles, loadColorTokens( [lang=en]
Community 2: ScaffoldLogoLoader.tsx, BARS, BEAM_Y, beamTransition, BEAT_ONSET, BEAT_OPACITY, BEAT_TRANSITIONS, HALO_OPACITY, HALO_SCALE, haloTransition, CALM_OPACITY, calmTransition [lang=es]
Community 3: DataShapePage(, getDesignPageStepStatuses(, DesignPage(, ExportPage(, getProductPageStepStatuses(, ProductPage(, ScaffoldLogoLoader(, ScreenDesignPage.tsx, ScreenDesignPage(, ScreenDesignFullscreen(, SectionsPage(, ShellDesignPage.tsx [lang=en]
Community 4: section(, compile(, compile-presets.mjs, ROOT, PRESETS, clamp(, hexToRgb(, rgbToHex(, toLinear(, fromLinear(, luminance(, contrast( [lang=en]
Community 5: PhaseNav.tsx, PhaseInfo, usePhaseStatuses(, PhaseNav(, phases.ts, Phase, PhaseStatus, PhaseConfig, phases, hasExportZip(, section-loader.ts, specFiles [lang=en]
Community 6: ThemeStudio.tsx, ViewMode, StudioState, readState(, ThemeStudio(, TagPill(, SegmentedToggle(, ThemeCard(, useThemeDetail(, VisualStage(, SectionLabel(, ThemeHeader( [lang=en]
Community 7: cn(, eslint.config.js, avatar.tsx, Avatar(, AvatarImage(, AvatarFallback(, input.tsx, Input(, label.tsx, Label(, separator.tsx, Separator( [lang=en]
Community 8: dropdown-menu.tsx, DropdownMenu(, DropdownMenuPortal(, DropdownMenuTrigger(, DropdownMenuContent(, DropdownMenuGroup(, DropdownMenuItem(, DropdownMenuCheckboxItem(, DropdownMenuRadioGroup(, DropdownMenuRadioItem(, DropdownMenuLabel(, DropdownMenuSeparator( [lang=en]
Community 9: dialog.tsx, Dialog(, DialogTrigger(, DialogPortal(, DialogClose(, DialogOverlay(, DialogContent(, DialogHeader(, DialogFooter(, DialogTitle(, DialogDescription( [lang=en]
Community 10: sheet.tsx, Sheet(, SheetTrigger(, SheetClose(, SheetPortal(, SheetOverlay(, SheetContent(, SheetHeader(, SheetFooter(, SheetTitle(, SheetDescription( [lang=en]
Community 11: table.tsx, Table(, TableHeader(, TableBody(, TableFooter(, TableRow(, TableHead(, TableCell(, TableCaption( [lang=en]
Community 12: badge-variants.ts, badgeVariants, badge.tsx, Badge( [lang=en]
Community 13: tabs.tsx, Tabs(, TabsList(, TabsTrigger(, TabsContent( [lang=en]

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/label-instructions/communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `graphify update` (or `graphify label`) to ingest the names.

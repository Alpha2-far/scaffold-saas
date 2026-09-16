# Graph Report - .  (2026-09-16)

## Corpus Check
- 164 files · ~267,741 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 411 nodes · 943 edges · 9 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 321 · imports: 235 · imports_from: 145 · MODIFIES: 110 · calls: 73 · PARENT_OF: 30 · ON_BRANCH: 29


## Input Scope
- Requested: all
- Resolved: all (source: cli)
- Included files: 164 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 44 sensitive · 0 missing committed

## Graph Freshness
- Built from Git commit: `b13fcb9`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 20 edges
2. `compile()` - 16 edges
3. `Card()` - 13 edges
4. `CardContent()` - 13 edges
5. `loadProductData()` - 13 edges
6. `CardHeader()` - 12 edges
7. `CardTitle()` - 12 edges
8. `EmptyState()` - 9 edges
9. `section()` - 7 edges
10. `AppLayout()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `203a22b chore(license): update copyright notice to Scaffold™ 2026` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 2 → community 1_
- `24c0173 feat(scaffold-v1): official Scaffold™ branding, dynamic motion system & pro landing page console (Jalon 4)` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 0 → community 1_
- `24c0173 feat(scaffold-v1): official Scaffold™ branding, dynamic motion system & pro landing page console (Jalon 4)` --PARENT_OF--> `4cd1f41 fix(ui): eliminate dark mode logo box with true alpha transparency & upgrade to Midnight Navy palette`  [EXTRACTED]
  git → git  _Bridges community 0 → community 2_
- `f8d7caa Initial release - 0.1` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 7 → community 1_

## Communities

### Community 7 - "Community 7"
Cohesion: 0.19
Nodes (2): cn(), f8d7caa Initial release - 0.1

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (35): ROOT, PRESETS, clamp(), hexToRgb(), rgbToHex(), fromLinear(), luminance(), contrast() (+27 more)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (50): AppLayoutProps, AppLayout(), DataMeta, DataCardProps, extractMeta(), getDataWithoutMeta(), countRecords(), DataCard() (+42 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (32): DataShapePage(), getDesignPageStepStatuses(), DesignPage(), ExportPage(), getProductPageStepStatuses(), ProductPage(), ScaffoldLogoLoader(), ScreenDesignPage() (+24 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (32): PhaseInfo, usePhaseStatuses(), PhaseNav(), Phase, PhaseStatus, PhaseConfig, phases, hasExportZip() (+24 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (52): getStorageKey(), readDismissed(), PhaseWarningBanner(), dataShapeFiles, parseDataShape(), loadDataShape(), hasDataShape(), designSystemFiles (+44 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (41): BARS, BEAM_Y, beamTransition, BEAT_ONSET, BEAT_OPACITY, BEAT_TRANSITIONS, HALO_OPACITY, HALO_SCALE (+33 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (19): ViewMode, StudioState, useThemeDetail(), VisualStage(), tokenLoaders, designDocLoaders, Theme, SemanticTokens (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.60
Nodes (3): badgeVariants, Badge(), badgeVariants

## Knowledge Gaps
- **86 isolated node(s):** `ROOT`, `PRESETS`, `RAMPS`, `REGISTRY_MARKS`, `ROLE_RULES` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 7`** (2 nodes): `cn()`, `f8d7caa Initial release - 0.1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 7` to `Community 2`, `Community 0`, `Community 6`, `Community 12`, `Community 3`, `Community 9`, `Community 8`, `Community 10`, `Community 11`, `Community 13`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `loadProductData()` connect `Community 0` to `Community 5`, `Community 1`, `Community 3`, `Community 2`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `ScaffoldLogoLoader()` connect `Community 3` to `Community 0`, `Community 2`, `Community 6`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `ROOT`, `PRESETS`, `RAMPS` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.11561561561561562 - nodes in this community are weakly interconnected._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07043167802661474 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07272727272727272 - nodes in this community are weakly interconnected._
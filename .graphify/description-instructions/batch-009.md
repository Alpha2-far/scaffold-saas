# Node Description Batch 10 of 11

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

- "ui_dialog_dialogclose": "DialogClose()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L27 | neighbors=[dialog.tsx]
- "ui_dialog_dialogcontent": "DialogContent()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L49 | neighbors=[dialog.tsx]
- "ui_dialog_dialogdescription": "DialogDescription()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L119 | neighbors=[dialog.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L93 | neighbors=[dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L83 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L33 | neighbors=[dialog.tsx]
- "ui_dialog_dialogportal": "DialogPortal()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L21 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L106 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtrigger": "DialogTrigger()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L15 | neighbors=[dialog.tsx]
- "ui_dropdown_menu_dropdownmenu": "DropdownMenu()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L7 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L83 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L32 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenugroup": "DropdownMenuGroup()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L52 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L60 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L144 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuportal": "DropdownMenuPortal()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L13 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradiogroup": "DropdownMenuRadioGroup()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L109 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L120 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L164 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L177 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusub": "DropdownMenuSub()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L193 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L223 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L199 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenutrigger": "DropdownMenuTrigger()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L21 | neighbors=[dropdown-menu.tsx]
- "ui_input_input": "Input()" | kind=code-symbol | source=src/components/ui/input.tsx:L5 | neighbors=[input.tsx]
- "ui_label_label": "Label()" | kind=code-symbol | source=src/components/ui/label.tsx:L6 | neighbors=[label.tsx]
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=src/components/ui/separator.tsx:L8 | neighbors=[separator.tsx]
- "ui_sheet_sheet": "Sheet()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L7 | neighbors=[sheet.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L17 | neighbors=[sheet.tsx]
- "ui_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L45 | neighbors=[sheet.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L115 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L92 | neighbors=[sheet.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L82 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L29 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L23 | neighbors=[sheet.tsx]
- "ui_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L102 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L11 | neighbors=[sheet.tsx]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L3 | neighbors=[skeleton.tsx]
- "ui_table_table": "Table()" | kind=code-symbol | source=src/components/ui/table.tsx:L7 | neighbors=[table.tsx]
- "ui_table_tablebody": "TableBody()" | kind=code-symbol | source=src/components/ui/table.tsx:L32 | neighbors=[table.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/FAREL OS/design-os/.graphify/description-instructions/batch-009.json

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

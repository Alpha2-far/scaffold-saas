# Empty States

Design OS never writes to `product/` — only agents do. So an empty state with no
command is a dead end: the only available action is running the right command in
Claude Code, and the screen must name it.

Every empty state goes through `<EmptyState type="…" />`. Never hand-roll the
markup.

```tsx
{sectionData?.data
  ? <DataCard data={sectionData.data} />
  : <EmptyState type="data" />}
```

## Adding a new empty state

Add an entry to the one config map in `src/components/EmptyState.tsx` — copy
lives there and nowhere else:

```tsx
const config: Record<EmptyStateType, { icon; title; command; description }> = {
  data: {
    icon: Database,
    title: 'No sample data generated yet',
    command: '/sample-data',
    description: 'Create realistic sample data for screen designs',
  },
}
```

- `command` is the exact slash command, leading `/` included.
- `title` states what's missing, `description` says what the command produces.
- Extend the `EmptyStateType` union in the same change — TypeScript then flags
  any missing config entry.

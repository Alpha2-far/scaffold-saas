# Exportable Components

Everything in `src/sections/*/components/` leaves for another codebase. Write it
as if it already had.

## Data arrives as props — always

```tsx
import type { InvoiceListProps } from '@/../product/sections/invoices/types'

export function InvoiceList({ invoices, onView, onCreate }: InvoiceListProps) { … }
```

```tsx
import data from '@/../product/sections/invoices/data.json'   // ❌ never here
```

Only the preview wrapper imports data. A component that reaches for `data.json`
cannot be exported.

## Callbacks are optional, called with `?.`

```tsx
onClick={() => onDelete?.(invoice.id)}
```

The receiving codebase won't have every action built on day one. Optional
callbacks let the component mount with nothing wired, then get connected action
by action — never crashing on an undefined handler.

## Name the intent, not the destination

```tsx
onView?.(invoice.id)                          // ✅ what the user wants
navigate(`/invoices/${invoice.id}`)           // ❌ assumes a route tree
<Link to={…}>                                 // ❌
```

The component declares intent; the host app decides where it leads. A component
that knows a URL is coupled to a route tree that may not exist.

## No navigation chrome

No header, sidebar, breadcrumbs, or tab bar. The shell provides all navigation —
a section that ships its own renders it twice.

## Also required

- Responsive: `sm:` / `md:` / `lg:` prefixes, works from mobile up.
- Both themes: a `dark:` variant on every color.
- Design tokens when defined, else `stone` neutrals and `lime` accents.
- Sub-components are props-based too, and re-exported from `components/index.ts`.

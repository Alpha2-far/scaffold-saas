# Preview Wrappers

`src/sections/[section-id]/[ViewName].tsx` is the only file that connects sample
data to a component. It stays in Design OS and is never exported.

```tsx
import data from '@/../product/sections/invoices/data.json'
import { InvoiceList } from './components/InvoiceList'

export default function InvoiceListPreview() {
  return (
    <InvoiceList
      invoices={data.invoices}
      onView={(id) => console.log('View invoice:', id)}
      onCreate={() => console.log('Create new invoice')}
    />
  )
}
```

## Default export, required

The glob resolves a module from its file path and never learns the name of any
export — `default` is the only addressable entry point. The loader checks it
before handing the module to `React.lazy`:

```ts
if (module && typeof module.default === 'function') return module
return { default: () => <div>Invalid screen design: {name}</div> }
```

A named-only export shows that inline message instead of the design. A named
export *alongside* the default is fine.

## Crossing into `product/`

```tsx
import data from '@/../product/sections/invoices/data.json'
import type { Invoice } from '@/../product/sections/invoices/types'
```

`@` aliases `./src`, so `@/../` climbs to the project root and back down into
`product/`. It is the only way to reach the portable tree without a brittle
relative path — use this exact form everywhere, including from inside
`components/`.

## Rules

- Wire every callback, even unused ones, to `console.log('Action:', arg)`.
- Suffix the function `…Preview` — the file name (not the function name) is what
  Design OS lists.
- No layout, no styling, no state. The wrapper injects data and nothing else.

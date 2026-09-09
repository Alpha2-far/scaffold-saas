# Color Vocabulary

Four roles, no others. Readers decode the hue before the text — introducing
green or blue for success breaks the language.

| Role | Hue | Used for |
|---|---|---|
| Neutral | `stone` | Everything structural: text, surfaces, borders, dividers |
| Accomplishment | `lime` | Completion only — the check pill on a finished phase |
| Reversible warning | `amber` | Missing prerequisite, `skipped` step status |
| Error | `--destructive` token | Via `ui/` primitives — never a red/rose literal |

```tsx
// Accomplishment — the only place lime appears
<span className="w-4 h-4 rounded-full bg-lime-500 …"><Check /></span>

// Warning — always the full amber set, background + border + text
<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200
                dark:border-amber-800 rounded-lg …">
  <AlertTriangle className="text-amber-600 dark:text-amber-400" />
  <p className="text-amber-800 dark:text-amber-200">…</p>
</div>
```

- Amber means *you can continue anyway*. If the user is blocked, it isn't amber.
- Lime never carries text; it's a marker. Labels stay stone.
- Dark-mode amber backgrounds use an alpha token (`amber-900/20`), not a solid.
- Product screen designs are exempt — they use the product's own design tokens.

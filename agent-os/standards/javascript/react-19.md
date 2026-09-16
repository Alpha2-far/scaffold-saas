# React 19 (Scaffold™)

> **Standard Agent OS — Scaffold™**
> Ce que React 19 change dans du code écrit pour React 18, et les quatre règles que
> `eslint-plugin-react-hooks@7` fait respecter dans ce dépôt.

Scaffold tourne sur React 19.2 et **exporte** des composants annoncés comme
« React 19 + Tailwind v4 » dans `product-plan/`. Ce qui suit vaut donc autant pour
`design-os/src/` que pour les primitives de
`bm-skills/skills/bm-design-system/references/components-ui/`.

---

## 1. `ref` est une prop — `forwardRef` disparaît

En React 19, un composant fonction reçoit `ref` comme n'importe quelle autre prop.
`forwardRef` est déprécié et sera retiré.

```tsx
// ❌ Forme React 18
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => <input ref={ref} {...props} />,
)
Input.displayName = "Input"

// ✅ Forme React 19
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
}
function Input({ className, ref, ...props }: InputProps) {
  return <input ref={ref} {...props} />
}
```

`displayName` devient inutile : le nom de la fonction est ce que les devtools affichent.
Un `displayName` posé à la main sur une fonction nommée est du bruit qui peut diverger.

### Wrappers Radix

Pour un wrapper qui ne fait qu'habiller une primitive, ne pas déclarer `ref` du tout :
`React.ComponentProps<typeof Primitive>` **inclut déjà `ref`**, donc `{...props}` le
transmet.

```tsx
// ✅
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn("modal-title", className)} {...props} />
}
```

`React.ElementRef` est **déprécié** dans `@types/react` 19 (remplacé par
`React.ComponentRef`). Avec la forme ci-dessus, ni l'un ni l'autre n'est nécessaire.

`useImperativeHandle` est inchangé — seul le wrapper `forwardRef` autour a disparu. Un
composant qui possède son propre nœud (un éditeur, un champ qui doit dispatcher un event
DOM) continue de publier la ref du parent par un handle impératif.

---

## 2. Ne pas créer de composant pendant le rendu

`React.lazy` doit être appelé **hors** rendu. À l'intérieur d'un composant — **y compris
derrière `useMemo`** — il crée un nouveau type de composant chaque fois que le memo est
abandonné, et React abandonne les memos librement : `useMemo` est une indication de
performance, pas une garantie. Un nouveau type est un type différent, donc React démonte
et remonte le sous-arbre : l'état est perdu et le Suspense se redéclenche.

Passer par `cachedLazy` (`@/lib/lazy-preview`), qui indexe un registre au niveau module,
et rendre le résultat avec `createElement` — voir
[`preview-iframe`](preview-iframe.md).

La même règle interdit de **définir** un composant dans le corps d'un autre.

---

## 3. Lire l'état initial dans l'initialiseur, pas dans un effet

```tsx
// ❌ Deux rendus : le premier peint une valeur fausse, le second la corrige.
const [dismissed, setDismissed] = useState(true)
useEffect(() => { setDismissed(localStorage.getItem(key) === 'true') }, [key])

// ✅ Un seul rendu, déjà juste.
const [dismissed, setDismissed] = useState(() => readDismissed(key))
```

`setState` synchrone dans un effet provoque un rendu en cascade que React 19 signale. Le
symptôme classique est une valeur initiale codée en dur « pour éviter le flash » — le flash
n'existe que parce que la lecture arrive trop tard.

Toute lecture de `localStorage` passe par une fonction qui **échoue en se refermant** :
il n'y a pas de `localStorage` sous le harnais de rendu headless, et l'accès **lève** en
navigation privée ou avec les données de site bloquées.

```tsx
function readDismissed(key: string): boolean {
  if (typeof window === 'undefined') return true
  try { return window.localStorage.getItem(key) === 'true' } catch { return true }
}
```

Si la clé peut changer, mémoriser la clé à côté de la valeur et relire **pendant le
rendu** (patron documenté « adjusting state when a prop changes »), jamais dans un second
effet.

---

## 4. Un module exporte des composants, ou des valeurs — pas les deux

React Fast Refresh ne peut pas recharger à chaud un module qui exporte à la fois un
composant et une valeur ordinaire : chaque édition retombe en rechargement complet de la
page, et l'état de la vue est perdu. Le coût est invisible en CI et payé à chaque
sauvegarde pendant la conception.

Les recettes `cva`, les tableaux de configuration et les constantes partagées vivent donc
dans leur propre module :

| Valeur | Module |
|---|---|
| `buttonVariants` | `components/ui/button-variants.ts` |
| `badgeVariants` | `components/ui/badge-variants.ts` |
| `phases` | `lib/phases.ts` |

Les **exports de types** ne posent pas ce problème et peuvent rester dans le fichier du
composant.

---

## 5. Vérification

`npm run lint` doit rester à **0 erreur et 0 warning**. Les quatre règles ci-dessus sont
mécaniquement vérifiées par `react-hooks/static-components`,
`react-hooks/set-state-in-effect` et `react-refresh/only-export-components`.

Les primitives de `bm-design-system` **ne sont dans aucun `tsconfig` du dépôt** : `npm run
build` ne les voit pas. Les vérifier demande un typecheck isolé (leurs imports `@/*`
remappés sur le dossier, les dépendances absentes stubbées). Sans cela, une prop invalide
y survit indéfiniment — c'est exactement ainsi qu'un `tone="muted"` inexistant a survécu
au Jalon 5, rendant les badges concernés sans aucune classe de tonalité.

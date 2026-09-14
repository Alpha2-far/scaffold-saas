# Color Vocabulary & Palette Officielle (Scaffold™)

Le système de couleurs repose sur la **mini-charte officielle de Scaffold™** et des rôles sémantiques stricts. L'utilisateur décode la teinte avant le texte.

---

## 🎨 1. Palette Officielle Scaffold™ (`src/index.css`)

Ces variables CSS sont les valeurs exactes de la marque, à utiliser pour le branding, le header, l'emblème et les surfaces principales :

```css
--color-scaffold-navy: #01062b;       /* Midnight Navy — fond sombre officiel */
--color-scaffold-navy-deep: #020826;  /* Nuance nuit océanique profonde */
--color-scaffold-green: #22c55e;      /* Vert électrique — accent vibrant principal */
--color-scaffold-lime: #84cc16;       /* Lime éclatant — point haut du dégradé */
--color-scaffold-emerald: #064e3b;    /* Émeraude profond — point bas du dégradé */
```

---

## 🏷️ 2. Rôles Sémantiques dans la Console

| Rôle | Teinte | Usage |
|---|---|---|
| **Fond & Surfaces** | `scaffold-navy` / `stone` | En mode sombre : fond `#01062B`, cartes en verre teinté nuit (`#070E28`), bordures laser (`#1E293B`). Éradication définitive du marron-gris `stone-900`. |
| **Succès & Verrouillage** | `scaffold-green` / `lime` | Validation de phase, pastille de complétion, jalon verrouillé, verdict `[PASS]`. |
| **Avertissement réversible** | `amber` | Prérequis manquant, étape en cours non bloquante. |
| **Erreur & Viol de périmètre** | `--destructive` | Rejet de section hors-scope, échec d'audit `[FAIL]`. |

---

## 🔍 3. Règles d'Application

```tsx
// Accent de marque Scaffold (slogan, pastilles clés)
<p className="text-scaffold-emerald dark:text-scaffold-green">
  De l’idée floue au projet structuré.
</p>

// Carte en verre dépoli sombre officiel
<div className="bg-[#070E28]/80 backdrop-blur-xl border border-[#1E293B] rounded-xl">
  ...
</div>

// Avertissement réversible (toujours le jeu complet avec alpha en dark mode)
<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
  <AlertTriangle className="text-amber-600 dark:text-amber-400" />
</div>
```

- **Zéro « sticker noir »** : Tout logo ou asset inséré dans le header doit posséder un canal alpha 100 % transparent pour se fondre dans le verre dépoli (`backdrop-blur-xl`).
- **Mode sombre prioritaire** : Le noir de Scaffold est un bleu-nuit profond luxueux (`#01062B`), jamais un noir pur `#000000` ni un gris éteint.

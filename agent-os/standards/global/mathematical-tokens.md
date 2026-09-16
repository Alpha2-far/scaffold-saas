# Tokens Mathématiques & Registre des Thèmes d'Auteur

> **Standard Agent OS — Scaffold™**
> Le contrat de tokens que tout thème Scaffold honore, la loi de contraste que le
> compilateur fait respecter, et le registre des 43 thèmes compilés localement.

Le standard de dérivation en amont (espace OKLCH, 5 palettes d'auteur, procédure de
dérivation personnalisée) vit dans
[`bm-skills/skills/bm-design-system/references/derive-palette.md`](../../../../bm-skills/skills/bm-design-system/references/derive-palette.md).
Le présent document décrit ce que `design-os/` **applique et vérifie**.

---

## 1. Les 12 tokens sémantiques, plus un

| Groupe | Token | Rôle |
|---|---|---|
| Surfaces | `page` | Fond primaire |
| | `surface` | Carte / conteneur |
| | `hairline` | Bordure fine |
| Encres | `ink-display` | Titres — contraste maximal |
| | `ink-body` | Corps de texte |
| | `ink-muted` | Métadonnées, horodatages, placeholders |
| Accent | `accent` | Couleur de marque |
| | `accent-faded` | Teinte douce — badges, sélections |
| | `accent-display` | Variante lisible de l'accent **sur `page`** |
| Signaux | `signal` · `signal-faded` · `signal-display` | Avertissements |
| | `danger` · `danger-faded` · `danger-display` | Erreurs, actions destructives |
| **Extension** | **`on-accent`** | **Ce qui s'écrit *par-dessus* `accent`** |

### Pourquoi `on-accent` existe

`.btn-primary` était écrit `bg-accent text-page`. Cette écriture suppose que l'accent est
**sombre** : elle pose l'encre sur la couleur de la page. Avec le vert de la charte
Scaffold (`#22c55e`), le blanc mesure **2,28:1** — un bouton primaire illisible.

**11 des 43 thèmes ingérés ont un accent clair.** Sans ce token, ils produisent tous des
boutons primaires et des badges pleins illisibles. `on-accent` est donc déclaré par thème
**et par mode**, et `.btn-primary` / `.badge-solid` le consomment.

Il n'est pas soumis à la même barre que les encres : c'est un libellé court sur un aplat
coloré, donc la barre est **4,5:1** (AA large), pas 7:1 — voir §2.

---

## 2. La loi de contraste est une porte de compilation

`scripts/compile-presets.mjs` (`npm run presets`) n'avertit pas : il **échoue**.

| Invariant | Barre | Portée |
|---|---|---|
| `ink-display`, `ink-body`, `ink-muted` sur `page` | **≥ 7:1** (AAA) | les deux modes |
| `accent-display`, `signal-display`, `danger-display` sur `page` | **≥ 7:1** | les deux modes |
| `on-accent` sur `accent` | **≥ 4,5:1** | les deux modes |
| Hiérarchie `display > body > muted` | strictement décroissante | les deux modes |
| Séparabilité carte / page | par le fond **ou** par la bordure | les deux modes |

### Trois règles qui découlent de l'expérience, pas de la théorie

1. **Corriger, ne pas remplacer.** Une encre sous la barre est remontée **le long de sa
   propre teinte**, et l'on retient le candidat *le plus proche de la clarté d'origine* —
   la couleur bouge du minimum que la légalité impose, pas du maximum que le contraste
   permet. Le kit garde son ton. 38 encres ont été remontées ainsi, et chaque déplacement
   est consigné dans `contrastCorrections` **et affiché à l'utilisateur**.

2. **Corriger chaque encre isolément détruit la hiérarchie.** Le corps et le muted d'un
   même kit peuvent atterrir sur la même valeur, et la différence entre un paragraphe et
   son horodatage disparaît. Chaque barreau doit donc dépasser le précédent d'un facteur
   **1,15×**.

3. **Pas de plafond d'escalade.** Un plafond laisse passer les *inversions* : un
   `ink-display` à 14,34:1 sous un `ink-body` à 14,58:1 « passe » un plafond de 13. Le
   compilateur assert l'ordre strict et échoue plutôt que de livrer.

**La sortie de gamut réduit le chroma, elle ne clippe pas les canaux** : clipper décale la
teinte, ce qui est précisément l'artefact que l'espace perceptuel sert à éviter.

---

## 3. Le registre des 43 thèmes

Compilés localement depuis leur `DESIGN.md`. **Zéro appel réseau, ni à la compilation ni à
l'exécution** — l'invariant d'interdiction d'errance externe est tenu structurellement,
pas par convention.

| Dimension | Répartition |
|---|---|
| Thèmes | **43** |
| Mode natif | 33 light · 10 dark (le mode absent est **synthétisé** sur la rampe neutre dont la teinte est la plus proche, les surfaces *authored* étant conservées dans leur mode natif) |
| Rampe neutre | zinc 30 · neutral 5 · gray 4 · slate 3 · stone 1 |
| Ratios encre/display vérifiés | **516**, tous ≥ 7:1 |
| Ratios `on-accent` vérifiés | **86**, tous ≥ 4,5:1 |
| Échelles typographiques | **86**, toutes strictement `display > body > muted` |

**Le neutre par défaut de Scaffold est Zinc** (`#09090b` en fond sombre), conformément au
présent standard. Titanium l'incarne ; Hyper Indigo conserve Slate ; Rose Quartz utilise
Stone.

### Artefacts

| Fichier | Rôle | Bundlé ? |
|---|---|---|
| `src/presets/<id>/DESIGN.md` | La spécification d'auteur, source de la compilation | lazy, par thème |
| `src/presets/<id>/tokens.json` | Tokens mesurés, palette, typographie, rayons, élévation, `contrastCorrections` | lazy, par thème |
| `src/presets/<id>/theme.css` | Deux blocs scopés — voir §4 | oui (feuille de style) |
| `src/presets/_registry.json` | Ce que la galerie peint : `id, name, tags, nativeMode, neutralRamp, accessible, swatches` | **oui, eager** |
| `src/presets/_catalog.json` | Provenance (identifiants, auteurs, URLs) | **jamais** — lu par le compilateur via `fs`, jamais importé par l'application |

⚠️ **Le registre est chargé en eager : tout ce qu'il porte est livré.** Charger les 43
`tokens.json` en eager avait fait passer le bundle principal de 462 kB à **602 kB**. Le
registre reste donc minimal, et le `tokens.json` complet d'**un seul** thème se charge à
la sélection, mémoïsé.

---

## 4. Le scope est structurel, pas conventionnel

Chaque `theme.css` n'émet que deux blocs :

```css
[data-scaffold-preset="<id>"]                          { /* mode clair */ }
[data-scaffold-preset="<id>"][data-scaffold-mode="dark"] { /* mode sombre */ }
```

**Aucun sélecteur n'en sort.** Le chrome de Scaffold — stone/lime, dark mode Midnight
Navy — est donc *structurellement* intouchable par un thème de produit : ce n'est pas une
discipline d'écriture, c'est une propriété de la feuille de style générée. Basculer de
thème est **un seul changement d'attribut**, pas un re-rendu du CSS.

---

## 5. Ce qu'un agent ne doit pas faire

* **Ne pas éditer `tokens.json` ni `theme.css` à la main** — ils portent l'en-tête
  *generated, do not edit* et la prochaine exécution de `npm run presets` les écrase.
  Corriger le `DESIGN.md` ou le compilateur.
* **Ne pas coder une couleur en dur dans un composant de prévisualisation.** Les
  composants vivants ne lisent que `--ds-*`. Une valeur en dur brise le contrat WYSIWYB :
  ce qui est vu cesse d'être ce qui est exporté.
* **Ne pas réintroduire `text-page` sur un fond d'accent.** Utiliser `on-accent`.
* **Ne pas ajouter de champ de provenance** au registre ou aux `tokens.json` : ce sont des
  artefacts bundlés. La provenance appartient à `_catalog.json`.

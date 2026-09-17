# Documentation Conventions (Scaffold™)

Règles impératives de rédaction des documents dans le projet **Scaffold™**.

L'objectif est d'avoir des références **directement exploitables par les agents de code IA** (Claude Code, Antigravity, Cursor, Codex) et scannables en 2 minutes par des humains — zéro prose marketing, zéro promesse d'avenir, zéro historique.

---

## 1. Public Cible & Priorité

Chaque document de `docs/` s'adresse à **deux lecteurs dans cet ordre strict de priorité** :
1. **Les Agents de Code IA** qui doivent implémenter ou modifier du code sans hallucination.
2. **Les Humains (Fondateurs & Développeurs)** qui scannent la structure pour comprendre le système.

Les agents lisent séquentiellement et dépendent de **chemins physiques de fichiers réels**, de **signatures de types précises** et de **garde-fous explicites**. Les humains scannent les titres, tableaux et schémas. Tout contenu qui n'aide pas directement l'un de ces deux lecteurs à trancher ou à coder doit être supprimé.

---

## 2. Les 10 Règles Dures (Hard Rules)

1. **Ancrage physique aux chemins réels** : Toujours citer le chemin relatif exact (`src/components/ThemeStudio.tsx:42`), jamais une mention vague (*« le studio de thèmes »*).
2. **Présent de l'indicatif exclusif** : Décrire uniquement le code qui tourne aujourd'hui. Aucun futur (*« nous ferons »*), aucun conditionnel (*« le système devrait »*).
3. **Source de vérité explicite** : Désigner pour chaque composant ou entité le fichier exact qui fait foi.
4. **Liaison aux tests de garde-fous (*Gate Tests*)** : Relier tout invariant d'architecture à son test automatisé dans `src/__tests__/architecture/`.
5. **Vrai code, zéro pseudo-code** : Extraire le code directement des fichiers sources. Ne jamais inventer d'API imaginaire.
6. **Section "Patterns interdits" obligatoire** : Chaque documentation de fonctionnalité doit lister explicitement les erreurs fréquentes et les pratiques proscrites.
7. **Zéro historique** : Ne pas raconter les versions précédentes. Git s'en charge.
8. **Zéro aspiration commerciale** : Les fonctionnalités non encore codées n'ont pas leur place dans `docs/` permanent (elles vont dans `plans/` éphémère).
9. **Un sujet unique par document** : Découpage chirurgical. Si un document devient trop vaste, le scinder.
10. **Zéro prose marketing** : Proscrire tout superlatif (*« révolutionnaire »*, *« ultra-rapide »*, *« magique »*). Décrire les faits techniques et les métriques.

### Règle de Concision
* **Plafond strict de 600 lignes par document**.

---

## 3. Le Squelette Canonique Obligatoire (`Required Shape`)

Chaque document dans `docs/` adopte cette structure :

```markdown
# <Titre du Sujet>

<Une phrase résumant exactement la portée du document.>

<Un paragraphe : ce que le système résout et fait, sous la forme "X est Y qui fait Z". Zéro blabla.>

---

## TL;DR

- <3 à 8 puces denses ou petit tableau récapitulatif avec l'essentiel.>

---

## Architecture & Flux de Données

<Schéma ASCII ou tableau des responsabilités.>

## <Sections Spécifiques>

<Détails techniques ancrés aux vrais fichiers.>

## Patterns Interdits & Pièges (Gotchas)

- ❌ <Ce qu'il ne faut pas faire et pourquoi.>
- ✅ <Ce qu'il faut faire à la place.>

---

## Related

- `docs/<autre>.md` — quoi lire ensuite.
- Source de vérité : `src/chemin/vers/fichier.ts`
- Gate tests : `src/__tests__/architecture/<test>.test.ts`
```

---

## 4. Conventions de Nommage des Fichiers

| Type de Document | Règle de Nommage | Exemple |
|---|---|---|
| **Top-level** | `minuscules-avec-tirets.md` | `architecture.md`, `design.md` |
| **Feature** | `features/nom-de-feature.md` | `features/scaffold-agent.md` |
| **Reference** | `reference/sujet.md` | `reference/source-of-truth.md` |
| **Méta / Index** | `MAJUSCULES.md` | `README.md`, `CONVENTIONS.md` |

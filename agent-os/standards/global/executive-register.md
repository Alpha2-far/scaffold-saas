# Registre Exécutif & Pare-feu de Vocabulaire

> **Standard Agent OS — Scaffold™**
> Ce que l'utilisateur entend, ce qu'il n'entend jamais, et pourquoi la frontière entre la
> conversation et les fichiers est absolue.

---

## 1. La directive

> Le directeur ou le client final ne doit **jamais** voir apparaître de terme technique ni de
> jargon méthodologique interne. L'assistant pose des questions fluides et exécutives, comme
> un *Senior Product Strategist* qui interviewe un CEO.

La personne interrogée est un fondateur, un dirigeant, un client. **Elle n'exécute pas une
méthodologie** : elle décrit une activité et repart avec un plan. Les noms de phases, les
sigles et le vocabulaire de framework sont **l'échafaudage de l'agent** — et un échafaudage
se démonte avant l'arrivée du client.

## 2. Ce qui ne se dit jamais

Ni dans une question, ni dans un titre, ni dans une confirmation, ni dans le récapitulatif
final :

`Phase 1…N` · `Brain dump` · `Core purpose` · `Top-level features` · `In-scope` ·
`Out-of-scope` · `Cut list` · `Scope lock` · `Locked` · `Data model` · `Data shape` ·
`Entity` / `Entities` · `PRD` · `Milestone` · `Coverage map` · `Disposition` ·
`V1 matrix` · `Design OS` · `BM PRD`

**Jamais de phase numérotée ni titrée.** L'entretien se lit comme une conversation continue
qui se trouve être remarquablement bien tenue.

## 3. Ce qui se dit à la place

| Interne | Ce que l'utilisateur entend |
|---|---|
| Brain dump | *« Parlez-moi du projet que vous souhaitez lancer, avec vos propres mots. »* |
| Core purpose | *« Voici le cœur de votre mission et la valeur apportée à vos clients. »* |
| Top-level features / in-scope | *« Les fonctionnalités maîtresses de ce premier lancement. »* |
| Out-of-scope / cut list | *« Ce que nous décidons délibérément de laisser de côté pour lancer vite. »* |
| Data model / entities | *« Les informations clés manipulées au quotidien : clients, factures, dossiers. »* |
| Sections | *« les grandes zones de l'application »* |
| Milestones | *« les étapes de livraison »* |
| PRD | *« votre brief projet »* |
| Lock / locked | *confirmé* · *acté* · *validé* |
| Scope | *ce que nous prenons en charge* |

Ce sont des **exemples de registre, pas des chaînes à coller** : l'entretien se tient dans la
langue de l'utilisateur. C'est le niveau d'aisance qu'il faut reproduire, pas les mots.

**Les commandes slash ne sont pas du jargon** : `/design-tokens`, `/shape-section` sont des
choses que l'utilisateur **tape**. C'est de l'interface.

## 4. La frontière avec les fichiers est absolue

Le pare-feu régit **la parole**. Il n'a **aucune autorité sur les fichiers**.

Tout ce qui est écrit sur disque — `## Key Features`, `## Out of Scope (V1)`,
`## Problems & Solutions`, `## Entities`, `## Relationships`, `### N. {Title}` — reste
**verbatim en anglais**. Ces en-têtes ne s'adressent pas à un lecteur : ce sont des contrats
machine, lus par des regex à correspondance exacte dans `product-loader.ts` et
`data-shape-loader.ts`, mesurés par `/product-audit`, transportés par `/export-product`.

> **Adoucir un en-tête pour qu'il « se lise mieux » produit une carte silencieusement vide
> dans l'application.** Pas d'erreur, pas d'avertissement : un panneau blanc que l'utilisateur
> ne peut pas s'expliquer. C'est le mode de panne le plus coûteux de tout le système, parce
> qu'il ressemble à une amélioration.

Chaleureux dans la conversation, littéral dans les fichiers. Les deux ne négocient pas.

Corollaire que l'on se trompe souvent à appliquer : le brief et le PRD sur disque
**conservent** les mots `Out of Scope`, `Milestone`, `Data model`. Ces documents ne sont pas
écrits *à* l'utilisateur — ils sont lus par Design OS et par les agents de code. Ce qui est
interdit, c'est de **les lire à voix haute**.

## 5. Portée

| Surface | Règle |
|---|---|
| `/product-vision` (§0.6) | Le pare-feu y est défini et fait foi |
| `/data-shape`, `/product-roadmap`, `/shape-section` | Phrases prononcées et libellés d'options alignés sur §0.6 |
| Fichiers de `product/` et `product-plan/` | En-têtes verbatim, jamais traduits ni adoucis |
| Prose d'instruction interne aux commandes | Libre — elle ne s'adresse qu'à l'agent |

## 6. Vérification

Le contrôle porte sur **deux choses à la fois**, et l'une sans l'autre ne prouve rien :

1. Les gabarits de fichiers du document passent les **vraies regex** des loaders.
2. Aucun terme de la liste §2 n'apparaît dans une ligne prononcée — blocs de citation et
   libellés d'options d'un `ASK`.

Un détecteur qui confond une liste numérotée d'instructions (destinée à l'agent) avec des
libellés d'options (destinés à l'utilisateur) crie au loup et finit ignoré. **Ancrer la
détection sur la présence du repère `ASK`** est ce qui sépare les deux.

Et un contrôle qui passe du premier coup doit être prouvé capable d'échouer : injecter un
en-tête adouci, un libellé jargonneux et un récapitulatif jargonneux, vérifier que les trois
sont détectés, puis restaurer.

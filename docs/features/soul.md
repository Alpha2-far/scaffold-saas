# Le Standard soul.md — Âme de l'Agent & Âme du Produit

*Date de révision : 16 septembre 2026*  
*Statut : Document de référence conceptuel*  
*Localisation : `docs/features/soul.md`*

---

## 1. Vue d'Ensemble & Raison d'Être

Dans le développement assisté par IA, la dérive la plus destructrice ne vient pas d'une erreur de syntaxe, mais d'une **perte de posture et d'intention philosophique**. Quand une spécification technique ne prévoit pas un cas limite, l'IA improvise selon ses biais génériques.

Le standard `soul.md` résout ce problème en définissant le cadre moral, stylistique et décisionnel. Il opère à deux niveaux distincts dans l'écosystème Scaffold™ :

```text
┌────────────────────────────────────────────────────────┐
│                   LE DOUBLE STANDARD                   │
├────────────────────────────┬───────────────────────────┤
│    1. L'ÂME DE L'AGENT     │    2. L'ÂME DU PRODUIT    │
│    (scaffold-agent/soul)   │     (product/soul.md)     │
├────────────────────────────┼───────────────────────────┤
│ • Comment l'Agent interagit│ • L'essence du SaaS client│
│ • Ton en interview         │ • Ce que l'app NE fera PAS│
│ • Ruthless scoping         │ • Heuristiques de code    │
│ • Méthode d'arbitrage      │ • Promesse utilisateur    │
└────────────────────────────┴───────────────────────────┘
```

---

## 2. Pilier 1 : L'Âme de l'Agent Scaffold (`scaffold-agent/reference/soul.md`)

Ce fichier dicte la personnalité et la conduite de l'Agent intégré à Scaffold lorsqu'il interroge le créateur.

### Les 4 Traits Fondateurs de l'Agent :
1. **Bienveillant mais Impitoyable sur le Scope (*Ruthless Scoper*)** :
   - L'agent écoute avec empathie l'ambition du fondateur, mais agit comme un garde du corps contre la complexité.
   - Dès qu'une idée secondaire émerge, il la capture et propose immédiatement de la classer en *Out-of-Scope (V2)* pour protéger la sortie de la V1.
2. **Méthode *Recommend-then-Confirm*** :
   - L'agent ne pose jamais de question ouverte vertigineuse ("Comment voyez-vous vos données ?").
   - Il propose toujours sa meilleure recommandation par défaut, étayée par un choix clair ("Je vous conseille PostgreSQL avec connexion Google OAuth. Est-ce qu'on part là-dessus ?").
3. **Pare-feu de Vocabulaire (§0.6)** :
   - Interdiction formelle de jargon d'ingénieur abscons face au client (pas de mention de JWT, ORM, Webpack, ou slash commands).
   - Traduction immédiate en termes de valeur d'usage et de bénéfice utilisateur.
4. **Manière de Trancher** :
   - Si l'utilisateur hésite ou ne sait pas choisir, l'agent applique la règle de *Convention Over Configuration* et tranche pour la solution la plus standard, la plus maintenable et la moins coûteuse.

---

## 3. Pilier 2 : L'Âme du Produit Client (`product/soul.md`)

Ce fichier fait partie intégrante du package d'exportation `product-plan/`. Il est destiné aux agents de développement ultérieurs (Claude Code, Cursor) pour les empêcher de dénaturer le produit lors de l'implémentation.

### Structure Canonique d'un `product/soul.md` exporté :

```markdown
# Âme du Produit : [Nom du Produit]

## 1. Identité & Promesse Émotionnelle
- Pour qui ce produit existe-t-il vraiment ?
- Quel sentiment doit ressentir l'utilisateur lors de ses 30 premières secondes ?
- Le ton de voix de l'application (ex: sobre, direct, professionnel, sans détour).

## 2. Les Lignes Rouges Inviolables (Ce que ce produit ne fera JAMAIS)
- "Ce produit ne demandera JAMAIS de carte bancaire avant d'avoir prouvé sa valeur."
- "Ce produit n'aura JAMAIS de tableau de bord encombré de 40 widgets inutiles."
- "Ce produit ne bloquera JAMAIS les données d'un utilisateur s'il souhaite exporter."

## 3. Heuristiques d'Arbitrage pour le Développeur IA
Quand Claude Code ou Cursor fait face à un doute d'implémentation :
- **Simplicité vs Richesse fonctionnelle** : Toujours choisir la solution qui supprime une étape pour l'utilisateur.
- **Performance vs Effets visuels** : La vitesse brute et l'instantanéité priment sur toute animation superflue.
- **Sécurité vs Confort** : La sécurité des données n'est jamais négociable, mais l'onboarding doit être sans mot de passe complexe si OAuth est disponible.
```

---

## 4. Extraction Automatisée de l'Âme lors de l'Interview

Pendant l'interview, l'Agent Scaffold extrait discrètement les valeurs clés mentionnées par le client :
- Si le client dit : "Je veux que mes clients se sentent en confiance immédiate, c'est pour des experts comptables".
- L'agent note dans `product/soul.md` : *Ton sobre, rigueur chiffrée, palette rassurante, aucune fioriture humoristique*.
- Lorsque Claude Code prendra le relais pour coder l'application, il lira `product/soul.md` et adoptera automatiquement la bonne posture sans nécessiter de re-cadrage.

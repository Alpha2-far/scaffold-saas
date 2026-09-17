# Compilation Engine — Compilateur Déterministe de Spécifications

*Date de révision : 16 septembre 2026*  
*Statut : Spécification d'ingénierie du compilateur*  
*Localisation : `docs/features/compilation-engine.md`*

---

## 1. Vue d'Ensemble & Déterminisme Mathématique

Le **Compilation Engine** est le cœur algorithmique de Scaffold™. Sa mission est de transformer les réponses humaines et les arbitrages de l'interview en spécifications techniques rigides, déterministes et exemptes de toute hallucination d'IA.

> [!IMPORTANT]
> **Règle d'Or Anti-Hallucination**  
> Les documents finaux exportés (`product-plan/`) **ne sont JAMAIS générés en texte libre par un LLM**.  
> Ils sont assemblés par un compilateur déterministe qui injecte des blocs techniques certifiés, validés au préalable par un **schéma Zod strict**.

---

## 2. Le Pipeline de Compilation à 5 Étapes

```text
[1. Réponses de l'Utilisateur & Choix de Capacités]
                     │
                     ▼
[2. Validation Stricte par Schéma Zod (Anti-Dérive)]
                     │
                     ▼
[3. Mise à Jour Atomique du Graphe d'État (project-model.json)]
                     │
                     ▼
[4. Injection Déterministe dans les 6 Gabarits Markdown]
                     │
                     ▼
[5. Audit de Santé Automatisé (Product Health 100/100)]
```

---

## 3. Schéma Zod de Validation des Décisions (`server/compilation/schema.ts`)

Avant qu'une capacité ne modifie l'état d'un projet, elle doit valider ce contrat Zod :

```ts
import { z } from 'zod';

export const CapabilityConfigSchema = z.object({
  id: z.string().regex(/^[a-z]+(\.[a-z0-9_-]+)+$/), // ex: 'auth.google'
  name: z.string().min(3).max(60),
  category: z.enum(['auth', 'database', 'payments', 'email', 'storage', 'ai']),
  dependencies: z.array(z.string()).default([]),
  envVariables: z.array(z.object({
    name: z.string().regex(/^[A-Z0-9_]+$/),
    required: z.boolean(),
    description: z.string(),
  })),
  inScopeBullets: z.array(z.string().min(5)),
  outOfScopeBullets: z.array(z.string().min(5)),
  entities: z.array(z.object({
    name: z.string().min(2),
    fields: z.record(z.string()),
    relations: z.array(z.string()).default([]),
  })),
  milestoneTitle: z.string(),
  milestonePromptFile: z.string(),
  soulHeuristics: z.array(z.string()),
});

export type CapabilityConfig = z.infer<typeof CapabilityConfigSchema>;
```

---

## 4. Assemblage du Package de Sortie (`product-plan/`)

Lorsque le projet est compilé, le moteur fusionne les données validées dans les 6 documents d'architecture ainsi que le journal d'exécution client :

1. **`product/product-overview.md`** :
   - Fusionne les puces `inScopeBullets` et `outOfScopeBullets` de chaque capacité activée.
   - Garantit une frontière hermétique entre ce qui est développé en V1 et ce qui est reporté.
2. **`product/data-shape/data-shape.md`** :
   - Émet le diagramme relationnel Markdown et la table des champs typés pour chaque entité (`User`, `OAuthAccount`, `Session`, etc.).
3. **`product/prd.md`** :
   - Consolide la liste des variables d'environnement (`.env.example`), les points d'API requis et les scénarios de test.
4. **`product/product-roadmap.md`** :
   - Ordonne les jalons de développement de manière linéaire et incrémentale (Jalon 1 Auth, Jalon 2 Données...).
5. **`product/milestones/XX/prompt.md`** :
   - Génère des instructions d'ingénierie chirurgicales pour Claude Code ou Cursor.
6. **`product/soul.md`** :
   - Compile les heuristiques d'arbitrage UX et techniques de toutes les capacités sélectionnées.
7. **`milestones.log` (Le Journal d'Exécution Client Déterministe)** :
   - Généré à la racine de l'archive ZIP du client pour lui permettre de piloter son agent de code (Claude Code, Cursor) jalon par jalon avec traçabilité complète des tests et des critères d'acceptation.

---

## 5. La Barrière des 4 Contrats d'Audit (`product-health.ts`)

Le compilateur refuse de produire l'archive ZIP tant que les 4 contrats d'intégrité ne sont pas validés avec un score de 100/100 :

1. **Contrat d'Unicité des Entités** : Zéro conflit de nommage ou de clé primaire orpheline.
2. **Contrat d'Étanchéité du Scope** : Aucune entité de données ne doit appartenir à une fonctionnalité déclarée *Out-of-Scope*.
3. **Contrat des Dépendances d'Environnement** : Toute capacité requérant des credentials (.env) doit être documentée dans le PRD.
4. **Contrat de Cohérence de Jalon** : Chaque capacité en scope doit avoir un prompt de jalon assigné dans la roadmap.

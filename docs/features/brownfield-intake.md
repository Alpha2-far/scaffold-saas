# Protocole d'Ingestion Brownfield — Le Pont Zéro-Install (Scaffold™ × Agent OS)

*Date de révision : 17 septembre 2026*  
*Statut : Spécification d'ingénierie officielle de rétro-ingénierie*  
*Localisation : `docs/features/brownfield-intake.md`*

---

## 1. Problématique & Vision : Le Pont Zéro-Install

En tant que plateforme Web SaaS hébergée dans le cloud, **Scaffold™ n'a aucun accès direct au système de fichiers local du client**.

Pour permettre à un développeur de rétro-concevoir une application existante (*Brownfield*) dans Scaffold sans installer d'extension lourde ni de CLI tiers, Scaffold fournit un **Prompt d'Extraction Universel** :

```text
┌─────────────────────────┐          Copier Prompt          ┌───────────────────────────┐
│     SCAFFOLD™ SAAS      │ ──────────────────────────────► │    AGENT LOCAL DU CLIENT   │
│  (Interface Web Cloud)  │                                 │   (Claude Code / Cursor)  │
└─────────────────────────┘                                 └─────────────┬─────────────┘
             ▲                                                            │
             │                  Coller Résultat JSON                      │ Analyse locale
             └────────────────────────────────────────────────────────────┘ (Méthode Agent OS)
```

1. Dans l'interface web de Scaffold, l'utilisateur clique sur **« Rétro-ingénierie d'un projet existant »**.
2. Scaffold lui génère le **Prompt d'Extraction Universel Scaffold × Agent OS**.
3. L'utilisateur colle ce prompt dans son terminal local (Claude Code, Cursor Composer, Codex).
4. L'agent local scanne les fichiers physiques et émet un bloc JSON strictement structuré (`scaffold-intake.json`).
5. L'utilisateur colle ce JSON dans Scaffold ➔ La plateforme injecte les données, allume le Live Canvas, peuple le modèle de données et verrouille le socle existant.

---

## 2. Le Juste Milieu : Synthèse Agent OS × Scaffold Model

Ce protocole fusionne le meilleur des deux mondes :
* **La Rigueur d'Extraction d'Agent OS** :
  - Détection non biaisée des zones clés : API routes, modèles de base de données (Prisma, Drizzle, TypeORM, SQLAlchemy), conventions de style, auth, gestion d'erreurs.
  - Découverte des règles tacites (*tribal knowledge*) et invariants architecturaux.
* **Le Modèle Déterministe de Scaffold** :
  - Schéma d'ingestion normalisé injectant directement les entités dans le Live Canvas, la palette de couleurs dans le Theme Studio, et les routes dans le Shell applicatif.

---

## 3. Le Schéma Zod d'Ingestion (`ScaffoldIntakeSchema`)

À la réception du payload, le serveur Bun de Scaffold valide le document avec ce schéma strict :

```typescript
import { z } from 'zod';

export const ScaffoldIntakeSchema = z.object({
  meta: z.object({
    appName: z.string().min(2),
    description: z.string(),
    primaryGoal: z.string(),
  }),
  stack: z.object({
    runtime: z.string(),          // ex: "Node 22", "Bun 1.2", "Python 3.12"
    framework: z.string(),        // ex: "Next.js 15 (App Router)", "FastAPI", "Vite+React 19"
    styling: z.string(),          // ex: "Tailwind CSS v4", "CSS Modules"
    database: z.string(),         // ex: "PostgreSQL", "SQLite", "MongoDB"
    orm: z.string().optional(),   // ex: "Prisma", "Drizzle", "SQLAlchemy"
    auth: z.string().optional(),  // ex: "Supabase Auth", "NextAuth", "Clerk"
  }),
  designTokens: z.object({
    primaryColor: z.string(),     // Hex ou OKLCH
    accentColor: z.string(),
    backgroundColor: z.string(),
    fontFamily: z.string().optional(),
    isDarkPreferred: z.boolean().default(true),
  }),
  entities: z.array(z.object({
    name: z.string(),
    tableName: z.string().optional(),
    fields: z.record(z.string()), // {"id": "UUID", "title": "VARCHAR(255)"}
    relations: z.array(z.string()).default([]),
  })),
  routesAndScreens: z.array(z.object({
    path: z.string(),
    name: z.string(),
    type: z.enum(['page', 'api', 'modal']),
    description: z.string(),
  })),
  existingConventions: z.array(z.string()), // Règles Agent OS clés extraites
});

export type ScaffoldIntakePayload = z.infer<typeof ScaffoldIntakeSchema>;
```

---

## 4. Le Prompt d'Extraction Universel (Généré par Scaffold)

Voici le prompt clé en main que l'interface Scaffold affiche à l'utilisateur :

```markdown
Analyse cette base de code locale et génère la cartographie structurée pour l'ingestion dans Scaffold™ SaaS.

Inspecte les fichiers clés sans écrire ni modifier aucun fichier :
1. Fichiers de config : package.json, pyproject.toml, Cargo.toml, tailwind.config, tsconfig.
2. Schémas de données : schema.prisma, migrations SQL, modèles ORM, interfaces types.ts.
3. Routes et pages : app/, pages/, src/routes/, controllers/, endpoints API.
4. Conventions et styles : composants UI partagés, tokens de couleurs dominants, standards de code existants (Agent OS / CLAUDE.md s'ils existent).

Émets UNIQUEMENT un unique bloc JSON valide respectant strictement ce schéma :

```json
{
  "meta": {
    "appName": "Nom du projet",
    "description": "Ce que fait le projet en 2 phrases",
    "primaryGoal": "Objectif business principal"
  },
  "stack": {
    "runtime": "...",
    "framework": "...",
    "styling": "...",
    "database": "...",
    "orm": "...",
    "auth": "..."
  },
  "designTokens": {
    "primaryColor": "#hex",
    "accentColor": "#hex",
    "backgroundColor": "#hex",
    "isDarkPreferred": true
  },
  "entities": [
    {
      "name": "User",
      "fields": { "id": "string", "email": "string", "role": "string" },
      "relations": ["has many Projects"]
    }
  ],
  "routesAndScreens": [
    { "path": "/dashboard", "name": "Dashboard", "type": "page", "description": "Vue principale" }
  ],
  "existingConventions": [
    "Toutes les réponses API utilisent le format { success, data, error }",
    "Les composants UI utilisent shadcn/ui avec Tailwind CSS"
  ]
}
```
Ne rajoute aucun texte avant ou après le bloc JSON.
```

---

## 5. Effet de l'Ingestion dans Scaffold™

Dès que le client colle ce JSON dans le drawer web de Scaffold :
1. **Verrouillage du Socle (*Scope Lock*)** : Les entités et routes existantes sont marquées comme `status: 'legacy_frozen'`. L'Agent Scaffold sait qu'il ne doit jamais casser ces acquis.
2. **Harmonisation Visuelle Immédiate** : Les `designTokens` sont injectés dans le Theme Studio (`/design`) pour aligner la prévisualisation WYSIWYB sur la charte réelle du client.
3. **Cadrage de la Prochaine Fonctionnalité (*Next Feature*)** :
   L'Agent Scaffold prend la parole :  
   *« J'ai parfaitement cartographié votre application (Stack Next.js + PostgreSQL, 4 tables détectées). Quelle est la nouvelle fonctionnalité que nous allons concevoir aujourd'hui ? »*
4. **Nouveaux Milestones Incrémentaux** : Scaffold génère les jalons d'implémentation de la nouvelle feature qui s'ajouteront harmonieusement au `milestones.log` du client sans toucher au code legacy.

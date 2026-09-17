# Asynchronous Jobs & Background Worker — Spécification Tâches Différées

*Date de révision : 16 septembre 2026*  
*Statut : Spécification d'architecture asynchrone*  
*Localisation : `docs/features/jobs.md`*

---

## 1. Vue d'Ensemble & Découplage Synchrone

Dans une application d'ingénierie pré-code, certaines opérations (compilation croisée de 6 documents, vérification des 4 contrats de santé, compression d'archive ZIP avec assets, rendu de captures de shell) peuvent dépasser le temps de réponse acceptable d'une requête HTTP synchrone.

Pour garantir une interface réactive et interdire les timeouts de passerelle (504 Gateway Timeout), Scaffold™ s'appuie sur une **machine d'état de jobs asynchrones**.

---

## 2. Machine d'État d'un Job

Chaque tâche différée suit un cycle de vie déterministe :

```text
               ┌──────────┐
               │  queued  │
               └────┬─────┘
                    │ (Prise en charge par le worker)
                    ▼
               ┌──────────┐
         ┌────►│ running  ├────┐
         │     └────┬─────┘    │
(Reprise)│          │          │ (Annulation)
         │     ┌────▼─────┐    ▼
         └─────┤  paused  │ ┌───────────┐
               └──────────┘ │ cancelled │
                    │       └───────────┘
          ┌─────────┴─────────┐
          ▼                   ▼
    ┌───────────┐       ┌───────────┐
    │ completed │       │  failed   │
    └───────────┘       └───────────┘
```

---

## 3. Typologies des Tâches Asynchrones

| Type de Job (`job_type`) | Déclencheur | Charge Estimée | Livrable Produit |
|---|---|---|---|
| **`compilation_job`** | Fin d'interview ou mise à jour majeure | 200 ms - 800 ms | Validation Zod & mise à jour des 6 snapshots |
| **`health_audit_job`** | Clic sur "Auditer le projet" | 150 ms - 400 ms | Rapport d'audit de santé (Score 0-100) |
| **`export_zip_job`** | Clic sur "Télécharger l'export" | 300 ms - 1.2 s | Archive binaire `product-plan.zip` prête |
| **`theme_render_job`** | Changement de thème d'auteur | 100 ms - 300 ms | Métadonnées de styles injectées dans le shell |

---

## 4. Schéma Relationnel des Jobs (`server/jobs/schema.sql`)

```sql
CREATE TABLE background_jobs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
    job_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued', -- 'queued'|'running'|'paused'|'completed'|'failed'|'cancelled'
    progress_percent INTEGER NOT NULL DEFAULT 0,
    payload_json TEXT NOT NULL DEFAULT '{}',
    result_json TEXT,
    error_message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Exécution & Notification Temps Réel

1. **Enregistrement Immédiat (`POST /api/projects/:id/jobs`)** :
   - L'endpoint insère la ligne dans `background_jobs` et renvoie immédiatement `{ jobId, status: 'queued' }` avec un code `202 Accepted`.
2. **Worker Interne Bun (`server/jobs/worker.ts`)** :
   - Le worker consomme les jobs ordonnés par date d'insertion.
   - Il met à jour le champ `progress_percent` (ex: 25 %, 50 %, 100 %) au fur et à mesure des étapes.
3. **Notification Client** :
   - Le frontend écoute l'avancement via l'endpoint de streaming des événements du projet (`GET /api/projects/:id/events`) ou consulte l'état à la demande (`GET /api/jobs/:id`).
   - Dès que le job passe en `completed`, l'interface déverrouille instantanément le bouton de téléchargement.

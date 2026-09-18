# Agent Runtime & Orchestration — Contrat d'Exécution

*Date de révision : 16 septembre 2026*  
*Statut : Spécification d'orchestration agentique*  
*Localisation : `docs/features/agent-runtime.md`*

---

## 1. Vue d'Ensemble & Mission du Runtime

Le **Scaffold Agent Runtime** est le moteur qui supervise l'interaction entre l'utilisateur et l'intelligence artificielle au sein de la console Scaffold. Il régit le cycle de vie de la session, hydrate le contexte architectural, force la validation humaine sur chaque décision structurante et garantit des mutations d'état atomiques et idempotentes.

---

## 2. Le Cycle d'Exécution Canonique

L'agent n'effectue aucune mutation arbitraire à l'insu de l'utilisateur. Toute modification respecte ce cycle déterministe à 8 étapes :

```text
[1. User Message]
        │
        ▼
[2. Session Lookup / Creation]
        │
        ▼
[3. Hydratation du Contexte Projet (project-model.json)]
        │
        ▼
[4. Raisonnement de l'Agent & Formulation d'Hypothèse]
        │
        ▼
[5. Émission de la Proposition (Recommend-then-Confirm)]
        │
        ▼
[6. Validation ou Ajustement par l'Utilisateur]
        │
        ▼
[7. Mutation d'État Validée par Schéma Zod Strict]
        │
        ▼
[8. Étape Suivante / Mise à Jour du Pare-brise WYSIWYB]
```

---

## 3. Hydratation du Contexte & Démarrage de Session

Lorsqu'un utilisateur ouvre un projet ou envoie un message :
1. **Résolution de Session** : Le serveur récupère la session active (`agent_sessions`) liée au projet et à l'utilisateur authentifié (`user_id`).
2. **Assemblage du Prompt Système Dynamique** :
   - *Règles invariables* : Pare-feu de vocabulaire §0.6 (zéro jargon d'ingénieur, pas de mention de commandes slash).
   - *État actuel du projet* : Titre, description, capacités déjà sélectionnées, entités de données existantes.
   - *Historique glissant* : Les derniers échanges pertinents résumés pour respecter la fenêtre de contexte.
    - *Objectif de l'étape courante* : L'une des 7 étapes exécutives de cadrage (Intake, Mission, Périmètre, Ruthless Scoping, Stacks, Ambiance & Canvas, Données & Jalons).

---

## 4. Périmètre de Mutation & Matrice de Validation

L'Agent distingue strictement ce qu'il peut faire de manière autonome de ce qui requiert un consentement explicite de l'utilisateur :

| Type d'Action & Tool Call Associé | Rôle de l'Agent | Nécessite Validation Humaine ? |
|---|---|---|
| **Reformulation & Synthèse (Étapes 1 & 2)** | Autonome | Non (Simple accord de cadrage) |
| **Verrouillage du Périmètre (`lock_project_scope`, Étapes 3 & 4)** | Propose & élague | **OUI (Validation In-Scope V1 et Cut List V2+)** |
| **Recommandation Stack d'Auteur (Étape 5)** | Recommande | **OUI (Validation du tiers et du format d'usage)** |
| **Projection du Live Canvas (`update_ui_manifest`, Étape 6)** | Autonome (ADR-004) | Non (Mise à jour visuelle réactive du pare-brise) |
| **Modèle de Données (`update_data_shape`, Étape 7)** | Propose | **OUI (Validation des 2 à 4 entités clés)** |
| **Découpage en Jalons (`generate_milestones_log`, Étape 7)** | Génère | **OUI (Validation du plan d'ingénierie 100/100)** |

---

## 5. Résilience, Reprise sur Interruption & Idempotence

### 1. Reprise après Déconnexion Réseau (*Interruption Recovery*) :
Si l'utilisateur ferme son navigateur ou perd sa connexion en plein milieu d'une phrase :
- Le serveur Bun enregistre l'état partiel sans corrompre le snapshot existant.
- À la reconnexion, l'application recharge le dernier état validé de `project-model.json`.
- L'Agent détecte la reprise et réémet la dernière proposition non validée sans forcer l'utilisateur à recommencer l'interview.

### 2. Idempotence des Mutations d'État :
Chaque proposition envoyée au client porte un identifiant cryptographique unique `proposal_id` :
```ts
interface StateMutationPayload {
  projectId: string;
  proposalId: string;
  mutationType: 'LOCK_SCOPE' | 'UPDATE_UI' | 'UPDATE_DATA_SHAPE' | 'GENERATE_MILESTONES';
  data: unknown;
}
```
Si l'utilisateur clique deux fois rapidement sur le bouton de validation, le serveur ignore la seconde requête grâce à l'enregistrement du `proposal_id` déjà consommé.

---

## 6. Gestion des Erreurs, Timeouts & Failover OpenRouter

1. **Timeout Réseau (15 secondes sans chunk)** : Le client déclenche un avertissement doux et le serveur réessaie avec le modèle suivant de la chaîne.
2. **Erreur HTTP 429 ou 503** : OpenRouter gère la bascule transparente native vers le modèle suivant (`claude-3-7-sonnet` ➔ `deepseek-chat` ➔ `gemini-2.0-flash`).
3. **Notification Admin Silencieuse** : Toute bascule de modèle incrémente `fallback_count` dans la table `agent_sessions` et journalise l'événement dans `admin_audit_logs`.

---

## 7. Pipeline Tool Use, Validation Sémantique & Contrat UX de Streaming

Le runtime sépare strictement le flux de communication en deux canaux :

1. **Canal Texte (Streaming SSE)** :  
   Les mots de l'Agent sont streamés en continu vers l'interface sans aucun délai d'attente (latence perçue < 200 ms).
2. **Canal Actions (Function Calling / Tool Use Zod)** :  
   Les 4 outils natifs (`update_ui_manifest`, `lock_project_scope`, `update_data_shape`, `generate_milestones_log`) sont interceptés par le serveur Bun :
   - *Validation de Forme* : Schémas Zod stricts (99,7 % de conformité).
   - *Validation Sémantique* : Le middleware vérifie les règles métier (ex: 4-6 features max en V1, zéro fausse sparkline sans `dataPoints`).
   - *Politique de Re-Prompt Bornée (Max 1 Retry, Timeout 15s)* : Si une règle est enfreinte, le serveur émet au maximum un seul re-prompt silencieux. Si la seconde tentative échoue ou dépasse 15s, le serveur applique un repli déterministe (fallback propre), journalise l'événement `agent_tool_reprompt_failed` et poursuit la session sans bloquer l'utilisateur.
   - *Contrat Visuel* : Pendant l'émission du Tool Call par le LLM, le Live Canvas affiche un `SkeletonSlot` discret, puis bascule à chaud sur la vue hydratée dès réception du payload complet.


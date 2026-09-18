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
   - *Objectif de l'étape courante* : L'une des 11 questions exécutives restant à arbitrer.

---

## 4. Périmètre de Mutation & Matrice de Validation

L'Agent distingue strictement ce qu'il peut faire de manière autonome de ce qui requiert un consentement explicite de l'utilisateur :

| Type d'Action | Autorisation de l'Agent | Nécessite Validation Humaine ? |
|---|---|---|
| **Reformulation & Clarification** | Autonome | Non |
| **Génération de Recommandation** | Autonome | Non (présenté sous forme de carte) |
| **Ajout d'une Capacité Technique (ex: Auth Google)** | Propose | **OUI (Clic sur Adopter ou choix alternatif)** |
| **Modification du Schéma de Données (Entités)** | Propose | **OUI (Validation obligatoire)** |
| **Sélection du Thème d'Auteur (Theme Studio)** | Recommande | **OUI (Choix direct dans le carrousel)** |
| **Verrouillage du Cadrage (*Scope Lock*)** | Analyse | **OUI (Confirmation solennelle de clôture)** |

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
  mutationType: 'ACTIVATE_CAPABILITY' | 'SET_DATA_ENTITY' | 'SELECT_THEME';
  data: unknown;
}
```
Si l'utilisateur clique deux fois rapidement sur le bouton de validation, le serveur ignore la seconde requête grâce à l'enregistrement du `proposal_id` déjà consommé.

---

## 6. Gestion des Erreurs, Timeouts & Failover OpenRouter

1. **Timeout Réseau (15 secondes sans chunk)** : Le client déclenche un avertissement doux et le serveur réessaie avec le modèle suivant de la chaîne.
2. **Erreur HTTP 429 ou 503** : OpenRouter gère la bascule transparente native vers le modèle suivant (`claude-3.7-sonnet` ➔ `gpt-4o` ➔ `gemini-2.0-flash`).
3. **Notification Admin Silencieuse** : Toute bascule de modèle incrémente `fallback_count` dans la table `agent_sessions` et journalise l'événement dans `admin_audit_logs`.

---

## 7. Pipeline Tool Use, Validation Sémantique & Contrat UX de Streaming

Le runtime sépare strictement le flux de communication en deux canaux :

1. **Canal Texte (Streaming SSE)** :  
   Les mots de l'Agent sont streamés en continu vers l'interface sans aucun délai d'attente (latence perçue < 200 ms).
2. **Canal Actions (Function Calling / Tool Use Zod)** :  
   Les 4 outils natifs (`update_ui_manifest`, `lock_project_scope`, `update_data_shape`, `generate_milestones_log`) sont interceptés par le serveur Bun :
   - *Validation de Forme* : Schémas Zod stricts (99,7 % de conformité).
   - *Validation Sémantique* : Le middleware vérifie les règles métier (ex: 4-6 features max en V1, zéro fausse sparkline sans `dataPoints`). Si une règle est enfreinte, le serveur émet un re-prompt silencieux vers le modèle sans interrompre l'utilisateur.
   - *Contrat Visuel* : Pendant l'émission du Tool Call par le LLM, le Live Canvas affiche un `SkeletonSlot` discret, puis bascule à chaud sur la vue hydratée dès réception du payload complet.


# Interface & Workspace Ergonomics — Spécification UI/UX

*Date de révision : 16 septembre 2026*  
*Statut : Document de référence ergonomique*  
*Localisation : `docs/interface.md`*

---

## 1. Vue d'Ensemble & Principes d'Agencement

L'interface de **Scaffold™ SaaS** résout le défi de la densité cognitive en séparant rigoureusement la décision (le dialogue avec l'Agent) de la vérification (le pare-brise visuel WYSIWYB).

```text
┌────────┬──────────────────────────┬────────────────────────────────────────────────────────┐
│  RAIL  │      CONSOLE AGENT       │                 LIVE CANVAS & STUDIO                   │
│  56px  │      (Largeur 40%)       │                    (Largeur 60%)                       │
│        │                          │                                                        │
│ [📁]   │  • Dialogue naturel      │  • Visualisation temps réel du Shell & des écrans      │
│ [🎨]   │  • Cartes interactives   │  • Sélecteur des 43 thèmes d'auteur locaux             │
│ [📊]   │  • Zéro commande slash   │  • Inspecteur Data Shape & PRD                         │
│ [⚡]   │  • Streaming SSE fluide  │  • Barre d'audit de santé (Score 100/100) & Export ZIP  │
└────────┴──────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Règle Spatiale Inviolable : L'Asymétrie 40/60 & Le Rail 56px

> [!IMPORTANT]
> **Vigilance Écrans Portables (13"-14")**  
> Une disposition à trois colonnes fixes écrase la lisibilité sur un MacBook Air ou Pro 13"/14".  
> **Directrice de conception** : La Sidebar des projets est repliée par défaut sous la forme d'un **Rail d'icônes escamotable de 56 px**.  
> L'espace restant est scrupuleusement alloué selon un ratio asymétrique d'or :
> - **Console Agent : 40 % de la largeur active.**
> - **Live Canvas & Studio : 60 % de la largeur active.**

### États du Rail de Navigation (56 px ↔ 240 px)
1. **État Compact par défaut (56 px)** :
   - Icônes SVG centrées avec infobulles haptiques (*tooltips*) : Projets actifs, Thèmes, Données, Paramètres.
   - Badge d'état pulsant indiquant la phase courante du projet (`draft`, `interviewing`, `locked`).
2. **État Déplié au survol ou au clic (240 px)** :
   - Drawer coulissant en superposition légère (`backdrop-blur-md`), affichant la liste complète des projets de l'utilisateur, les métadonnées et le bouton « Nouveau Projet ».

---

## 3. La Console Agent (Largeur 40 %)

La console centrale est le cœur de l'interaction humaine. Elle bannit toute syntaxe technique ou commande slash pour l'utilisateur final.

### Caractéristiques Ergonomiques :
* **Flux de streaming continu (SSE)** : Les réponses de l'Agent s'affichent mot à mot via OpenRouter avec indicateur de frappe fluide.
* **Composants *Recommend-then-Confirm*** :
  - L'Agent ne laisse jamais l'utilisateur devant une page blanche.
  - Chaque question est accompagnée d'une carte de recommandation active avec un bouton de validation immédiat en 1 clic (« Adopter la recommandation ») et des options alternatives sélectionnables.
* **Formulaires de saisie contextuels** : Sélecteurs de tags, cases à cocher pour les capacités, et champs de texte libres auto-extensibles.
* **Historique persistant** : Restauration instantanée de la conversation lors de la réouverture d'un projet.

---

## 4. Le Live Canvas & Studio (Largeur 60 %)

Le panneau droit est le « pare-brise » interactif de Scaffold. Ce que l'utilisateur voit est le reflet immédiat de son état de projet (`project-model.json`).

### Onglets Supérieurs du Canvas :
1. **Écrans & Shell (`/design`)** :
   - Rendu en direct de la maquette interactive avec le shell sélectionné (Sidebar, Header, Stacked layout).
   - Sélecteur de viewport instantané : Desktop (1280px), Tablet (768px), Mobile (375px).
2. **Theme Studio (`/themes`)** :
   - Carrousel des **43 thèmes d'auteur locaux** (`src/presets/`).
   - Bascule Dark/Light instantanée sans rechargement de page.
   - Échantillons de tokens sémantiques (Primary, Surface, Accent, Text).
3. **Data Shape (`/data`)** :
   - Rendu graphique des entités métier et de leurs relations (diagramme relationnel interactif).
4. **Spécifications & PRD (`/specs`)** :
   - Visualiseur du PRD compilé et des jalons de développement.

### Barre d'Action Inférieure (Audit & Export) :
* **Widget de Santé Produit** : Affiche le score en direct (`Product Health : 100/100`) et les 4 contrats d'audit vérifiés.
* **Bouton d'Exportation Haptique** : Déclenché uniquement lorsque le score est à 100/100, génère et télécharge le package ZIP `product-plan/`.

---

## 5. Le Dashboard Superadmin (`/admin`)

Espace réservé exclusivement aux comptes avec `role: 'superadmin'`, conçu pour une supervision légère sans surcharge serveur.

### 🔒 Invariant de Charge : Flux SSE à la Demande (*On-Demand Stream*)
> [!WARNING]
> Diffuser les flux de frappe de toutes les sessions actives en broadcast continu saturerait les sockets du serveur Bun en cas de trafic élevé.  
> **Règle absolue** : Le canal SSE d'une session n'est ouvert **que lorsque l'administrateur clique pour observer cette session spécifique**, libérant immédiatement les ressources réseau du cluster.

### Modules de la Console Superadmin :
1. **Bandeau Métriques Utilisateurs** :
   - Nombre total d'utilisateurs inscrits.
   - Nouveaux inscrits du jour / des 7 derniers jours.
   - Nombre de projets en cours et volume d'exports générés.
2. **Observateur de Sessions Agent en Direct** :
   - Table des sessions actives avec statut, durée et modèle OpenRouter utilisé.
   - Volet latéral d'observation ouvrant le flux SSE en direct de l'échange utilisateur ↔ Agent.
3. **Gestionnaire Dynamique des Modèles OpenRouter (`/admin/models`)** :
   - Interface de réordonnancement par glisser-déposer de la cascade `models: [...]`.
   - Interrupteurs d'activation/désactivation à chaud synchronisés avec le runtime serveur.
4. **Console de Sécurité Anti-Bot (`/admin/security`)** :
   - Métriques Cloudflare Turnstile et taux de requêtes bloquées.
   - Table des IPs bannies temporairement (1h/24h) et définitivement.
   - Boutons d'action : Débannir / Bannir manuellement une adresse IP.
5. **Module Commercial & Pricing (`/admin/billing`)** :
   - Générateur de codes coupons (remise %, nombre d'utilisations max, date d'expiration).
   - Éditeur dynamique des plans tarifaires (mise à jour des prix sans redéploiement).

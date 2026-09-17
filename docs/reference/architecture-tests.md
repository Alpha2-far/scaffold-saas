# Tests d'Architecture & Garde-Fous — Méthodologie Instatic

*Date de révision : 16 septembre 2026*  
*Statut : Spécification des garde-fous automatisés*  
*Localisation : `docs/reference/architecture-tests.md`*

---

## 1. Vue d'Ensemble & Philosophie des Tests de Garde-Fous

Sur un projet agentique à évolution rapide, les tests unitaires classiques ne suffisent pas à empêcher les régressions structurelles. Inspiré par la rigueur du dépôt Instatic, Scaffold™ intègre une suite de **tests d'architecture automatisés** exécutés lors de chaque build (`npm test`).

> [!IMPORTANT]
> **Règle Inviolable**  
> Si un test d'architecture échoue, le déploiement est immédiatement bloqué. Zéro tolérance pour les failles de conception ou les fuites de clés API.

---

## 2. Le Catalogue des 6 Tests de Garde-Fous

### 1. `ai-keys-never-leak.test.ts` — Étanchéité Absolue des Secrets
* **Objectif** : Vérifier qu'aucune clé API (`OPENROUTER_API_KEY`, `TURNSTILE_SECRET_KEY`, `STRIPE_SECRET_KEY`) ne peut être divulguée dans le bundle frontend, dans une réponse HTTP publique ou dans un journal de log.
* **Mécanisme du Test** :
  - Scanne les fichiers compilés de `dist/` à la recherche de toute chaîne commençant par `sk-or-` ou `Bearer`.
  - Simule des requêtes client avec des erreurs induites et vérifie que les messages d'erreur 500 ne renvoient que des libellés génériques sans fragments de configuration.

### 2. `zod-capability-schema-gate.test.ts` — Déterminisme du Compilateur
* **Objectif** : S'assurer que 100 % des capacités techniques répertoriées dans `capability-catalog` valident sans exception le schéma `CapabilityConfigSchema`.
* **Mécanisme du Test** :
  - Parcourt dynamiquement le registre de capacités.
  - Teste la validité de chaque champ (`id`, `name`, `entities`, `inScopeBullets`, `milestonePromptFile`).
  - Échoue immédiatement si un développeur ajoute une capacité incomplète sans son prompt de jalon associé.

### 3. `tenant-isolation-gate.test.ts` — Cloisonnement Multi-Tenant
* **Objectif** : Garantir qu'aucune requête SQL ne peut lire ou écrire un projet, une session ou un document sans filtrer explicitement sur le `user_id` du propriétaire.
* **Mécanisme du Test** :
  - Exécute une analyse statique de code sur le dossier `server/repositories/`.
  - Rejette toute requête `SELECT`, `UPDATE` ou `DELETE` sur les tables sensibles qui ne comporterait pas la clause `WHERE user_id = ?` ou une jointure stricte sur `projects.user_id`.

### 4. `no-slash-commands-in-client.test.ts` — Éradication des Slash Commands
* **Objectif** : Vérifier que l'interface client n'affiche aucune commande terminal (`/product-vision`, `/export-product`, `/shape-section`).
* **Mécanisme du Test** :
  - Scanne les composants React de l'espace créateur (`src/components/`, `src/pages/`).
  - Lève une erreur si une chaîne de caractères contient un slash command réservé aux agents internes.

### 5. `health-audit-gate.test.ts` — Intégrité des 4 Contrats de Santé
* **Objectif** : Vérifier que le moteur d'audit `src/lib/product-health.ts` détecte systématiquement toute incohérence entre la vision produit et les entités de données.
* **Mécanisme du Test** :
  - Injecte intentionnellement un projet corrompu (ex: entité présente dans les données mais mentionnée en *Out-of-Scope*).
  - Vérifie que le score de santé chute sous 100/100 et que l'exportation ZIP est formellement bloquée.

### 6. `anti-bot-honeypot-gate.test.ts` — Efficacité des Pièges Anti-Bot
* **Objectif** : Valider que le remplissage du champ Honeypot entraîne immédiatement le rejet de la requête et l'inscription de l'IP dans la table de bannissement.
* **Mécanisme du Test** :
  - Envoie un payload POST avec `scaffold_system_verification_hp = "bot-value"`.
  - Vérifie le code de réponse et la présence de l'adresse IP simulée dans `security_ip_bans`.

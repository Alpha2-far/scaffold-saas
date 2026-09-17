# Catalogue des Capacités Techniques & Étude de Cas Google Auth

*Date de révision : 16 septembre 2026*  
*Statut : Catalogue technique de référence*  
*Localisation : `docs/reference/capability-catalog.md`*

---

## 1. Vue d'Ensemble du Catalogue

Le **Capability Catalog** est la bibliothèque de briques architecturales certifiées de Scaffold™. Chaque capacité est un bloc pré-audité contenant ses définitions de données, ses variables d'environnement, son impact sur le périmètre (*Scope Lock*) et son prompt de réalisation pour les agents de développement.

---

## 2. Étude de Cas Exhaustive : Authentification Google (`auth.google`)

Lorsqu'un utilisateur sélectionne l'option « Connexion Google OAuth », le compilateur injecte simultanément les blocs suivants dans les 6 documents du package d'export :

### 1. Dans `product/product-overview.md` :
```markdown
### In-Scope (V1) — Authentification & Accès
- [x] Connexion instantanée en 1 clic via Google OAuth2 (OpenID Connect).
- [x] Synchronisation automatique du profil (email, nom complet, photo d'avatar).
- [x] Session persistante sécurisée (Cookie HttpOnly SameSite=Lax).
- [x] Déconnexion propre avec révocation de session locale.

### Out-of-Scope (V1)
- [ ] Authentification multi-facteurs par SMS / TOTP (reporté V2).
- [ ] Connexion via compte entreprise SAML / Okta (reporté V2).
- [ ] Changement d'adresse email lié au compte Google (géré côté Google).
```

### 2. Dans `product/data-shape/data-shape.md` :
```markdown
## Entités du Domaine Authentification

### User
| Champ | Type | Contraintes | Description |
|---|---|---|---|
| `id` | `string` (UUID) | PRIMARY KEY | Identifiant unique de l'utilisateur |
| `email` | `string` | UNIQUE, NOT NULL | Adresse email principale vérifiée |
| `name` | `string` | NOT NULL | Nom complet issu du profil Google |
| `avatar_url` | `string` | NULLABLE | URL de la photo de profil hébergée par Google |
| `created_at` | `timestamp` | DEFAULT NOW() | Date d'inscription |

### OAuthAccount
| Champ | Type | Contraintes | Description |
|---|---|---|---|
| `id` | `string` (UUID) | PRIMARY KEY | Identifiant unique du lien OAuth |
| `user_id` | `string` | FOREIGN KEY -> User(id) | Référence vers l'utilisateur |
| `provider` | `string` | 'google' | Nom du fournisseur OAuth |
| `provider_user_id` | `string` | NOT NULL | ID unique de l'utilisateur chez Google (sub) |
| `created_at` | `timestamp` | DEFAULT NOW() | Date de liaison |

### Session
| Champ | Type | Contraintes | Description |
|---|---|---|---|
| `id` | `string` (UUID) | PRIMARY KEY | Jeton de session opaque |
| `user_id` | `string` | FOREIGN KEY -> User(id) | Utilisateur authentifié |
| `expires_at` | `timestamp` | NOT NULL | Date d'expiration (ex: 30 jours) |
```

### 3. Dans `product/prd.md` :
```markdown
## Spécifications Fonctionnelles : Authentification Google

### 1. Variables d'Environnement Requises (.env)
- `GOOGLE_CLIENT_ID`: Identifiant client de la console Google Cloud.
- `GOOGLE_CLIENT_SECRET`: Clé secrète de l'application OAuth.
- `AUTH_SECRET`: Clé secrète 32 octets pour la signature des cookies de session.
- `APP_URL`: URL de base de l'application (ex: `http://localhost:3000` ou `https://monapp.com`).

### 2. Points d'API (Endpoints)
- `GET /api/auth/signin/google` : Redirige vers `https://accounts.google.com/o/oauth2/v2/auth` avec les scopes `openid email profile`.
- `GET /api/auth/callback/google` : Échange le code temporaire contre les tokens, extrait le profil utilisateur, crée ou met à jour la ligne dans `users`, génère un enregistrement dans `sessions` et dépose le cookie sécurisé.
- `POST /api/auth/signout` : Supprime la session en base et efface le cookie du navigateur.

### 3. Règles Métier & Sécurité
- Validation systématique du paramètre `state` anti-CSRF avant d'échanger le code d'autorisation.
- En cas de refus de consentement de l'utilisateur, redirection vers `/login?error=OAuthCallbackCancelled`.
```

### 4. Dans `product/product-roadmap.md` :
```markdown
### Jalon 1 : Authentification & Gestion des Utilisateurs
- **Objectif** : Mettre en place la base de données, la connexion Google OAuth en 1 clic et le maintien de session.
- **Livrable attendu** : L'utilisateur peut se connecter avec Google, son profil est créé en base, et son avatar apparaît dans la barre de navigation.
- **Fichier d'instructions** : `product/milestones/01-auth/prompt.md`
```

### 5. Dans `product/milestones/01-auth/prompt.md` :
```markdown
# Prompt de Développement : Jalon 1 — Authentification Google OAuth

Vous devez implémenter le système d'authentification Google OAuth pour cette application.

## Directives d'implémentation :
1. Créez les migrations de base de données pour les tables `users`, `oauth_accounts` et `sessions` exactement comme spécifié dans `product/data-shape/data-shape.md`.
2. Configurez les endpoints d'authentification dans le routeur backend.
3. Utilisez les variables d'environnement spécifiées dans `product/prd.md`.
4. Ajoutez le bouton d'action « Continuer avec Google » sur la page de connexion, stylisé selon les tokens du Design System (`product/DESIGN.md`).
5. Écrivez un test d'intégration simulant le flux de redirection et vérifiant qu'un utilisateur inconnu est bien créé lors de sa première connexion.
```

### 6. Dans `product/soul.md` :
```markdown
### Heuristiques d'Onboarding & Authentification
- **Zéro friction cognitive** : La connexion Google doit s'effectuer en 1 clic. Ne jamais demander à l'utilisateur de définir un mot de passe s'il a choisi Google.
- **Persistance silencieuse** : Si la session est valide, l'utilisateur accède immédiatement à son tableau de bord sans écran de transition inutile.
- **Gestion bienveillante des erreurs** : Si Google rejette la demande, afficher un message d'explication clair plutôt qu'un code d'erreur HTTP brut.
```

---

## 3. Synthèse des Autres Capacités du Catalogue

| Identifiant | Catégorie | Entités Clés | Variables Requises | Prompt de Jalon Associé |
|---|---|---|---|---|
| `payments.stripe` | Paiements | `Subscription`, `PaymentEvent` | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | `02-payments/prompt.md` |
| `db.sqlite` | Données | Schéma SQL local `bun:sqlite` | `DATABASE_URL=sqlite:local.db` | `00-database/prompt.md` |
| `db.postgres` | Données | Client SQL `Bun.sql` / Supabase | `DATABASE_URL=postgres://...` | `00-database/prompt.md` |
| `email.resend` | Communication | `EmailLog` | `RESEND_API_KEY` | `03-email/prompt.md` |
| `storage.s3` | Médias | `FileAttachment` | `S3_BUCKET`, `AWS_ACCESS_KEY_ID` | `04-storage/prompt.md` |

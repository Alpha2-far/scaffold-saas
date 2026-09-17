# Server & Backend Architecture — Spécification Serveur

*Date de révision : 16 septembre 2026*  
*Statut : Document d'architecture serveur canonique*  
*Localisation : `docs/server.md`*

---

## 1. Vue d'Ensemble & Philosophie d'Ingénierie

Le backend de **Scaffold™ SaaS** adopte le modèle d'exécution ultra-performant et unifié d'Instatic : un processus unique `Bun.serve` intégrant le serveur HTTP, le client de base de données à double adaptateur, les middlewares de sécurité anti-bot et la passerelle d'intelligence artificielle OpenRouter.

### Points Clés d'Architecture :
- **Processus Unique** : Aucun worker lourd ni file d'attente externe complexe au boot.
- **Double Adaptateur BDD Unifié (`DbClient`)** : SQLite local (`bun:sqlite`) en dev pour un boot instantané sans dépendance, et PostgreSQL managé (Supabase ou Neon via `Bun.sql`) en production.
- **Streaming SSE Natif** : Streaming sans tampon (*unbuffered*) pour le dialogue interactif avec l'Agent via OpenRouter.
- **Sécurité Défensive Native** : Cloudflare Turnstile, Honeypot invisible et Rate Limiting par fenêtre glissante (*sliding window*).

---

## 2. Séquence de Démarrage du Serveur (*Boot Sequence*)

```text
server/index.ts
    │
    ├─→ readServerConfig()                  ← PORT, DATABASE_URL, OPENROUTER_API_KEY, TURNSTILE_SECRET_KEY
    │
    ├─→ createDbClient(DATABASE_URL)        ← server/db/client.ts
    │     │
    │     ├─ DATABASE_URL=sqlite:...        → createSqliteClient (bun:sqlite)
    │     └─ DATABASE_URL=postgres://...    → createPostgresClient (Bun.sql)
    │
    ├─→ runMigrations(db)                   ← Exécution synchrone des tables relationnelles
    ├─→ syncSystemAdmin(db)                 ← Enregistrement du compte superadmin par défaut
    ├─→ loadModelConfigurations(db)         ← Chargement en cache mémoire de la cascade OpenRouter
    │
    └─→ Bun.serve({
          port: config.PORT,
          fetch: req => handleServerRequest(req, runtime),
          idleTimeout: 0                    ← Indispensable pour le streaming LLM sans coupure
        })
```

---

## 3. Schéma Relationnel de la Base de Données

Le schéma garantit une stricte intégrité référentielle et une isolation multi-tenant complète via la clé `user_id` :

```sql
-- Utilisateurs et Authentification
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'client', -- 'client' | 'superadmin'
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oauth_accounts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'google' | 'github'
    provider_user_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_user_id)
);

-- Projets & Cadrage
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    theme_id TEXT NOT NULL DEFAULT 'scaffold-default',
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft'|'interviewing'|'designed'|'locked'|'exported'
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, slug)
);

-- Sessions Agent & Messages de Dialogue
CREATE TABLE agent_sessions (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    current_step INTEGER NOT NULL DEFAULT 1,
    active_model TEXT NOT NULL,
    fallback_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'user' | 'assistant' | 'system'
    content TEXT NOT NULL,
    model_tag TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Capacités Activées & Documents Compilés
CREATE TABLE project_capabilities (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    capability_id TEXT NOT NULL, -- ex: 'auth.google', 'payments.stripe'
    config_json TEXT NOT NULL DEFAULT '{}',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, capability_id)
);

CREATE TABLE document_snapshots (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    doc_type TEXT NOT NULL, -- 'overview'|'data-shape'|'prd'|'roadmap'|'prompt'|'soul'
    markdown_content TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sécurité, Modèles & Administration
CREATE TABLE security_ip_bans (
    ip_address TEXT PRIMARY KEY,
    reason TEXT NOT NULL,
    banned_until TIMESTAMP, -- NULL = ban permanent
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_configs (
    id TEXT PRIMARY KEY,
    model_id TEXT UNIQUE NOT NULL, -- ex: 'anthropic/claude-3.7-sonnet'
    priority_order INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Stacks d'Auteur Dynamiques (Gérées depuis le Dashboard Superadmin)
CREATE TABLE stack_configs (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL, -- ex: 'saas.standard.supabase', 'saas.neon.drizzle', 'saas.react20.next16'
    name TEXT NOT NULL, -- ex: 'SaaS Standard (Supabase First)'
    category TEXT NOT NULL, -- 'saas' | 'serverless' | 'mobile' | 'ai' | 'custom'
    frontend TEXT NOT NULL, -- ex: 'React 19 + Tailwind v4'
    backend TEXT NOT NULL, -- ex: 'Node.js / Bun'
    database_provider TEXT NOT NULL, -- 'supabase' | 'neon' | 'cloudflare_d1' | 'sqlite'
    auth_provider TEXT NOT NULL, -- 'supabase_auth' | 'better_auth' | 'clerk'
    plain_description TEXT NOT NULL, -- Description vulgarisée pour les créateurs non-développeurs
    is_recommended BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    config_json TEXT NOT NULL DEFAULT '{}', -- Paramètres additionnels (variables .env, bibliothèques)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL,
    max_uses INTEGER,
    uses_count INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pricing_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price_cents INTEGER NOT NULL,
    billing_period TEXT NOT NULL, -- 'monthly' | 'yearly'
    features_json TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    payload_json TEXT,
    ip_address TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Routeur & Table des Points de Terminaison (*Route Table*)

Le routeur `server/router.ts` évalue les requêtes dans un ordre séquentiel strict (premier match gagne) :

```ts
const routes: readonly RouteHandler[] = [
  tryServeHealth,                  // GET  /health ou /api/health
  tryServeTurnstileVerify,         // POST /api/security/turnstile-verify
  tryServeAuth,                    // POST /api/auth/register, /login, /google, /github
  tryServeStacks,                  // GET  /api/stacks (Liste publique des stacks dynamiques actives)
  tryServeProjects,                // CRUD /api/projects/*
  tryServeAgentChatStream,         // POST /api/projects/:id/chat (SSE Stream OpenRouter)
  tryServeProjectState,            // GET/PUT /api/projects/:id/state
  tryServeProjectExport,           // GET  /api/projects/:id/export (Téléchargement ZIP)
  tryServeAdminMetrics,            // GET  /admin/api/metrics (Compteur inscrits, stats)
  tryServeAdminSessionStream,      // GET  /admin/api/sessions/:id/stream (SSE on-demand)
  tryServeAdminModelConfig,        // GET/POST /admin/api/models (Ordonnancement OpenRouter)
  tryServeAdminStackConfig,        // GET/POST/PUT/DELETE /admin/api/stacks (Gestion dynamique des stacks)
  tryServeAdminSecurity,           // GET/POST /admin/api/security/bans
  tryServeAdminCoupons,            // GET/POST /admin/api/coupons
  tryServeStaticAssets,            // GET  /assets/*
  tryServeSpaFallback,             // GET  /* -> index.html
]
```

---

## 5. Pipeline de Middlewares & Sécurité Transversale

Chaque requête entrante traverse 4 filtres de défense avant d'atteindre son gestionnaire métier :

1. **IP Stamping & Vérification de Liste Noire** :
   - Extraction de l'IP cliente réelle (`req.headers.get('x-forwarded-for')` ou socket peer).
   - Rejet immédiat `403 Forbidden` si l'IP est enregistrée dans `security_ip_bans`.
2. **CORS & Défense CSRF Stricte** :
   - Méthodes mutantes (`POST`, `PUT`, `DELETE`) validées contre l'en-tête `Origin` autorisé.
3. **Limiteur de Débit par Fenêtre Glissante (*Sliding Window Rate Limiter*)** :
   - Endpoints d'authentification : max 5 requêtes par IP par 15 minutes.
   - Endpoint de chat IA : max 20 requêtes par minute par session pour protéger le budget OpenRouter.
4. **Vérification Cloudflare Turnstile** :
   - Validation du token avant création de compte ou tentative de connexion sensible.

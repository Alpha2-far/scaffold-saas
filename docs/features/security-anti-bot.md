# Sécurité Défensive & Système Anti-Bot

*Date de révision : 16 septembre 2026*  
*Statut : Document de référence de sécurité*  
*Localisation : `docs/features/security-anti-bot.md`*

---

## 1. Vue d'Ensemble & Objectifs de Sécurité

La plateforme Scaffold™ SaaS protège ses infrastructures, son budget d'API LLM et les données de ses utilisateurs contre trois menaces majeures :
1. **L'épuisement de budget LLM (Wallet Draining Attack)** : Scripts ou bots spammant l'endpoint de chat IA `/api/projects/:id/chat`.
2. **Le Credential Stuffing & Attaques par Brute-Force** : Tentatives massives de devinette de mots de passe sur `/api/auth/login`.
3. **Le Scraping Massif & Faux Comptes** : Création automatisée de milliers de comptes fantômes saturant la base de données.

---

## 2. Piliers du Système Anti-Bot

```text
[Requête Utilisateur / Bot]
            │
            ├─→ [Filtre 1 : Contrôle IP Noire (security_ip_bans)] ──(IP bannie)──→ 403 Forbidden
            │
            ├─→ [Filtre 2 : Honeypot Silencieux (scaffold_hp_field)] ──(rempli)──→ Ban IP & Drop
            │
            ├─→ [Filtre 3 : Cloudflare Turnstile Verification] ──(token invalide)──→ 400 Bad Request
            │
            ├─→ [Filtre 4 : Rate Limiter Glissant (Auth / Chat)] ──(quota dépassé)──→ 429 Too Many Requests
            │
            ▼
[Exécution Normale du Handler Bun]
```

---

## 3. Implémentation Cloudflare Turnstile

Turnstile offre une vérification cryptographique invisible sans infliger de puzzle dégradant aux utilisateurs légitimes.

### 1. Intégration Client (Formulaires React) :
Le widget est injecté de manière invisible sur la page de connexion et d'inscription :
```tsx
<Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  onSuccess={(token) => setTurnstileToken(token)}
  options={{ execution: 'execute', appearance: 'interaction-only' }}
/>
```

### 2. Validation Côté Serveur (`server/security/turnstile.ts`) :
Avant tout traitement de création de compte ou de login, le serveur soumet le token à l'API Cloudflare :
```ts
export async function verifyTurnstileToken(token: string, remoteIp: string): Promise<boolean> {
  const formData = new FormData();
  formData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
  formData.append('response', token);
  formData.append('remoteip', remoteIp);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const outcome = await res.json();
  return outcome.success === true;
}
```

---

## 4. Le Piège Invisible (*Honeypot*)

Tous les formulaires d'authentification comportent un champ invisible pour l'œil humain :
```html
<input
  type="text"
  name="scaffold_system_verification_hp"
  tabindex="-1"
  autocomplete="off"
  aria-hidden="true"
  style="position: absolute; left: -9999px; opacity: 0;"
/>
```
* **Comportement du Bot** : Les scrapers automatiques remplissent systématiquement tous les champs `input` découverts dans le DOM.
* **Verdict Serveur** : Si la valeur de ce champ n'est pas vide, la requête est immédiatement avortée, l'IP est classée comme malveillante et enregistrée pour bannissement automatique.

---

## 5. Limiteurs de Débit par Fenêtre Glissante (*Sliding Window*)

Deux limiteurs stricts sont instanciés en mémoire sur le serveur Bun :

| Périmètre Protégé | Limite Maximale | Fenêtre Temporelle | Sanction au Dépassement |
|---|---|---|---|
| **Authentification (`/api/auth/*`)** | 5 requêtes | 15 minutes | HTTP 429 + Blocage temporaire 1 heure |
| **Chat IA (`/api/projects/:id/chat`)** | 20 requêtes | 1 minute | HTTP 429 + Alerte de sécurité |
| **Export ZIP (`/api/projects/:id/export`)**| 3 requêtes | 10 minutes | HTTP 429 |

---

## 6. Politique d'Escalade et Bannissement Automatique

Lorsque des requêtes franchissent les seuils d'alerte, le moteur de sécurité applique une gradation automatique :

1. **Palier 1 (Suspicion d'abus)** : 5 échecs consécutifs d'authentification ➔ Bannissement IP temporaire de **1 heure** (`security_ip_bans`).
2. **Palier 2 (Attaque confirmée)** : Récidive après 1 heure ou tentative de spam du chat IA ➔ Bannissement IP de **24 heures**.
3. **Palier 3 (Bot explicite)** : Remplissage du champ Honeypot ou payload malformé répété ➔ Bannissement IP **permanent**.

---

## 7. Console de Sécurité Superadmin (`/admin/security`)

Accessible via l'espace Superadmin, ce module offre :
- **Taux de blocage en temps réel** : Pourcentage de requêtes stoppées par Turnstile vs trafic légitime.
- **Registre des IPs Bannies** : Table interactive listant chaque IP, la date d'infraction, le motif exact et la date d'expiration.
- **Contrôles d'Action** : Bouton d'amnistie (« Débannir ») ou ajout manuel immédiat d'une IP ou d'un masque de sous-réseau (CIDR).

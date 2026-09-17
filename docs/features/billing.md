# Billing & Geo-Pricing Model — Modèle iTunes & Paiement Géolocalisé

*Date de révision : 16 septembre 2026*  
*Statut : Spécification de monétisation et passerelles de paiement*  
*Localisation : `docs/features/billing.md`*

---

## 1. La Stratégie Steve Jobs : « Jouer Gratuitement, Payer pour Emporter »

Scaffold™ SaaS applique la règle historique d'iTunes : **briser les forfaits mensuels obligatoires et proposer l'unité d'achat évidente au moment précis où l'utilisateur veut posséder son produit**.

* **Conception & Visualisation 100 % Gratuite** : L'utilisateur crée son projet, converse avec l'Agent, explore les 43 thèmes d'auteur et admire son application en direct sur le pare-brise WYSIWYB sans jamais entrer de carte bancaire.
* **Le Bouton d'Or d'Exportation** : Pour déverrouiller le code source, les instructions Claude Code/Cursor et télécharger le ZIP `product-plan.zip`, l'utilisateur clique sur **« Prendre les clés du logiciel »**.
* **Tarif Unitaire Accessible** : **9 €** (ou **6 000 FCFA** en Afrique).

---

## 2. Détection Géographique & Devises Dynamiques

Le serveur Bun inspecte l'adresse IP et les en-têtes de géolocalisation (`cf-ipcountry` ou MaxMind GeoIP) pour adapter instantanément le montant et le mode de paiement :

| Zone Géographique | Pays Cibles | Devise Affichée | Tarif Unitaire | Méthodes de Paiement Proposées |
|---|---|---|---|---|
| **Afrique de l'Ouest & Centrale** | Bénin, Côte d'Ivoire, Sénégal, Togo, Cameroun, etc. | FCFA (XOF / XAF) | **6 000 FCFA** | **Mobile Money** : MTN MoMo, Moov Money, Wave, Orange Money |
| **Zone Euro** | France, Belgique, Allemagne, Espagne, etc. | EUR (€) | **9 €** | **Apple Pay**, Carte Bancaire, Google Pay |
| **International / Amériques** | USA, Canada, UK, Reste du monde | USD ($) | **$9.99** | **Apple Pay**, Cartes de crédit internationales |

---

## 3. Architecture Multi-Passerelles Agnostique (Adapter Pattern)

Pour garantir une conversion maximale sans friction sur tous les continents, Scaffold ne s'enferme dans aucun fournisseur rigide. Le système utilise le patron d'architecture **Adapter Pattern** permettant de brancher à tout moment n'importe quel prestataire :

```text
                               [Clic "Prendre les clés"]
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
                [Afrique Détectée]                   [Occident Détecté]
                        │                                     │
                        ▼                                     ▼
             [Africa Mobile Money Adapter]          [International Card Adapter]
                        │                                     │
           ┌────────────┼────────────┐                        ▼
           ▼            ▼            ▼               [Apple Pay / Carte CB]
      [MTN MoMo]   [Moov Money]   [Wave]                      │
           │            │            │                        │
           └────────────┼────────────┘                        │
                        ▼                                     ▼
             [Push USSD sur Mobile]                  [Bip de Confirmation Instantané]
                        │                                     │
                        └──────────────────┬──────────────────┘
                                           ▼
                            [Webhook Serveur Bun Reçu]
                                           │
                                           ▼
                    [Téléchargement Immédiat de product-plan.zip]
```

### 1. Interface Universelle (`server/billing/adapter.ts`)
```ts
export interface PaymentProviderAdapter {
  providerId: string;
  createCheckoutSession(params: {
    projectId: string;
    amount: number;
    currency: string;
    customerPhone?: string;
    customerEmail?: string;
  }): Promise<{ checkoutUrl?: string; paymentReference: string }>;
  verifyWebhook(req: Request): Promise<boolean>;
  parseEvent(body: unknown): { eventType: string; transactionId: string; status: 'paid' | 'failed' };
}
```

### 2. Module Afrique : `server/billing/adapters/africaMobileMoney.ts`
- **Canaux couverts** : MTN Mobile Money, Moov Money, Wave, Orange Money.
- **Fonctionnement** : Déclenche le push USSD sur le téléphone du client ou génère le QR code Wave.
- **Raccordement** : Connecteur agnostique prêt à accueillir la plateforme choisie ultérieurement par le Product Owner.

### 3. Module International : `server/billing/adapters/internationalCards.ts`
- **Canaux couverts** : Apple Pay en 1 clic, Google Pay, Cartes bancaires internationales.
- **Fonctionnement** : Tiroir de paiement instantané avec conformité fiscale globale.
- **Raccordement** : Connecteur agnostique prêt à accueillir la plateforme choisie ultérieurement.

---

## 4. Traitement Idempotent des Webhooks (`POST /api/billing/webhook/:provider`)

Dès qu'un paiement est validé par l'un des fournisseurs :
1. **Contrôle de Signature Cryptographique** : Rejet immédiat si la signature de webhook ne correspond pas au secret partagé.
2. **Déduplication Idempotente** : L'identifiant de transaction (`transaction_id`) est inséré dans la table `billing_transactions` avec contrainte d'unicité.
3. **Libération de l'Export** : Le projet associé passe en statut `unlocked_for_download`, et le flux SSE client ordonne au navigateur de lancer immédiatement le téléchargement du package `product-plan.zip`.

---

## 5. Option Agence / Super-Créateur (Abonnement Illimité Optionnel)

Pour les agences et créateurs intensifs qui réalisent plus de 10 projets par mois, un abonnement optionnel reste disponible dans l'interface :
* **Plan Agency Unlimited** : 49 € / mois (ou 32 000 FCFA / mois) offrant des exports illimités sans repasser par le paiement unitaire.

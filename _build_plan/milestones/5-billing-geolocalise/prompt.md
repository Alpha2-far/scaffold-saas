# Milestone 5 — Module de Paiement Géolocalisé & Modèle Steve Jobs (9 € / 6 000 FCFA)

You are entering plan mode to plan and then build milestone 5 of the Scaffold™ SaaS Platform.

## Context

- Read `@_build_plan/prd.md` for the decoupled payment model ("Concevoir gratuitement, payer pour emporter").
- Read previous milestone logs: Milestones 1, 2, 3, 4 in `@_build_plan/milestones/` or `@milestones.log`.
- Codebase: `design-os/` (Bun + React 19).
- Architecture: Provider-Agnostic Adapter Pattern (`PaymentProviderAdapter`).

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** de builds lourds (`npm run build`, `npx tsc -b`) sur la machine locale.
> - ✅ **Test local léger autorisé** :
>   ```bash
>   bun test server/billing
>   ```
> - Toute la validation de sécurité et les signatures de webhooks sont certifiées sur **GitHub Actions**.

## Your Task

1. Plan the implementation for **only** milestone 5 as defined in the PRD.
2. Build the Billing System and Geo-IP detection:
   - `design-os/server/billing/geoIp.ts` : Détection automatique du pays via les en-têtes réseau (`CF-IPCountry`, `X-Forwarded-For`) sélectionnant la devise appropriée :
     - Afrique (UEMOA / CEMAC / CEDEAO) : **6 000 FCFA** (ou équivalent local).
     - Reste du monde : **9 €** (ou $9.99 USD).
   - `design-os/server/billing/adapters/types.ts` : Contrat d'interface générique `PaymentProviderAdapter` :
     ```typescript
     export interface PaymentProviderAdapter {
       readonly id: string;
       createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
       verifyWebhookSignature(req: Request): Promise<WebhookVerificationResult>;
       handleWebhookEvent(event: WebhookEvent): Promise<PaymentTransactionResult>;
     }
     ```
   - `design-os/server/billing/adapters/africaMobileMoney.ts` : Adaptateur Mobile Money (MTN MoMo, Moov Money, Wave, Orange Money).
   - `design-os/server/billing/adapters/internationalCards.ts` : Adaptateur Cartes bancaires (Visa, Mastercard) et Apple Pay / Google Pay.
   - `design-os/src/components/CheckoutDrawer.tsx` : Tiroir de paiement instantané au clic sur « Prendre les clés du logiciel », affichant le montant adapté à la région et les boutons de paiement correspondants.
   - `design-os/server/handlers/billingWebhook.ts` : Point d'entrée de webhook idempotent (`POST /api/billing/webhook/:provider`) validant l'achat, mettant à jour la table `billing_transactions`, et libérant le téléchargement de l'archive `product-plan.zip`.
3. Verify your work against the "Done when" criteria:
   - Simuler une requête avec IP africaine ➔ Vérifier que l'interface et l'API renvoient 6 000 FCFA.
   - Simuler une requête avec IP européenne ➔ Vérifier l'affichage de 9 €.
   - Simuler l'envoi d'un webhook de paiement réussi ➔ Valider le déverrouillage immédiat et le téléchargement de `product-plan.zip`.
   - Commit et push vers `Alpha2-far/scaffold-saas.git`, validation par GitHub Actions.
4. When complete, write `_build_plan/milestones/5-billing-geolocalise/milestone-log.md` and append its content to the root [`milestones.log`](../../milestones.log):
   - **`## What's new in the app`** at the top.
   - `## What was built`.
   - `## Decisions made during implementation`.
   - `## Notes for Milestone 6`.
   - `## Deviations from PRD`.

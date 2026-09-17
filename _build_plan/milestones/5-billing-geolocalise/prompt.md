# Milestone 5 — Module de Paiement Géolocalisé & Modèle Steve Jobs (9 € / 6 000 FCFA)

You are entering plan mode to plan and then build milestone 5 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Monétiser la plateforme avec l'expérience « Concevoir gratuitement, payer pour emporter », via une détection Geo-IP de devise (6 000 FCFA Mobile Money en Afrique / 9 € Cartes à l'International), le tiroir de checkout `CheckoutDrawer`, et le déverrouillage webhook de l'archive `product-plan.zip`.

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel (Section 2 & Milestone 5).
  - `@_build_plan/milestones/4-compilation-zod-capabilities/milestone-log.md` : Moteur de compilation et livrables.
  - `@docs/features/billing.md` : Détection Geo-IP, Mobile Money, Cartes, webhooks.
  - `@docs/features/export-engine.md` : Déverrouillage et packaging ZIP.
- **Fichiers physiques à créer/modifier** :
  - `server/billing/geoIp.ts` : Détection pays / devise (XOF/XAF vs EUR/USD).
  - `server/billing/adapters/types.ts` : Interface générique `PaymentProviderAdapter`.
  - `server/billing/adapters/africaMobileMoney.ts` : Adaptateur Mobile Money (MTN, Moov, Wave, Orange).
  - `server/billing/adapters/internationalCards.ts` : Adaptateur Cartes bancaires & Apple Pay.
  - `src/components/CheckoutDrawer.tsx` : Tiroir de paiement instantané réactif.
  - `server/handlers/billingWebhook.ts` : Gestionnaire idempotent de webhooks.

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne pas lancer `npm run build` en local. Tester avec `bun test server/billing`.
- **Agnosticisme de Prestataire** : Ne jamais coder en dur un prestataire unique. Utiliser strictement le contrat d'interface `PaymentProviderAdapter`.
- **Idempotence Absolue** : Tout webhook rejoué doit produire le même résultat sans doubler de transaction.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Simulation Geo-IP** : Requête avec IP africaine ➔ affichage 6 000 FCFA ; IP européenne ➔ affichage 9 €.
2. **Simulation Webhook** : Envoi d'un webhook de succès ➔ Mise à jour statut BDD et téléchargement instantané du ZIP.
3. **Consignation & Journalisation** :
   - Rédiger `_build_plan/milestones/5-billing-geolocalise/milestone-log.md`.
   - Ajouter l'entrée dans `milestones.log` et mettre à jour `AGENT_DISPATCH.md`.
4. **Validation CI/CD Cloud** : Push sur `origin/main` validé vert par GitHub Actions.

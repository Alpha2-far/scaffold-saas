# Milestone 2 — Passerelle OpenRouter Cascade & Flux Streaming SSE

You are entering plan mode to plan and then build milestone 2 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Connecter la console de dialogue de l'Agent IA Scaffold en streaming SSE temps réel mot par mot avec une tolérance aux pannes maximale via une cascade automatique de modèles LLM et un prompt d'interview exécutive naturelle.

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel (Section 2 & Milestone 2).
  - `@_build_plan/milestones/1-serveur-bun-db/milestone-log.md` : Livrables du Jalon 1.
  - `@docs/features/openrouter-model-sync.md` : Cascade et fallbacks LLM.
  - `@docs/features/agent-runtime.md` : Streaming SSE et gestion des sessions.
  - `@docs/features/scaffold-agent.md` : Comportement et Pare-Feu de Vocabulaire §0.6.
- **Fichiers physiques à créer/modifier dans `design-os/server/`** :
  - `server/ai/openrouter.ts` : Client OpenRouter avec support du streaming SSE natif et clé API.
  - `server/ai/fallbackCascade.ts` : Moteur cascade automatique (`claude-3.7-sonnet` ➔ `gpt-4o` ➔ `gemini-2.0-flash` ➔ `deepseek-r1`).
  - `server/ai/prompts/systemAgent.ts` : Prompt d'interview exécutive naturelle (zéro jargon, zéro slash command, motif *recommend-then-confirm*).
  - `server/handlers/chatStream.ts` : Endpoint SSE `POST /api/projects/:id/chat`.
  - `server/router.ts` : Enregistrement de la route SSE.

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne pas lancer de build complet (`npm run build`, `tsc -b`) en local.
- **Pare-feu de Vocabulaire (§0.6)** : Proscription formelle de tout jargon technique robotique dans les réponses visibles de l'Agent.
- **Isolation de Périmètre** : Ne pas toucher aux tiroirs de paiement ni aux écrans superadmin.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Streaming SSE continu** : Requête curl `curl -N -X POST http://localhost:3001/api/projects/test/chat -d '{"message":"Bonjour"}'` délivrant un flux de tokens continu sans blocage réseau.
2. **Bascule cascade testée** : Simulation de panne du modèle primaire basculant instantanément sur le modèle de secours sans coupure.
3. **Consignation & Journalisation** :
   - Rédiger `_build_plan/milestones/2-openrouter-sse/milestone-log.md`.
   - Ajouter l'entrée dans `milestones.log` et mettre à jour `AGENT_DISPATCH.md`.
4. **Validation CI/CD Cloud** : Push sur `origin/main` validé vert par GitHub Actions.

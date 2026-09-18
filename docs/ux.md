# Scaffold™ UX Manifesto — L'Expérience Produit Steve Jobs

*Date de révision : 16 septembre 2026*  
*Statut : Spécification d'Expérience Utilisateur Canonique*  
*Localisation : `docs/ux.md`*

---

## 1. La Philosophie : L'Expérience Apple Store

> *« Dans un Apple Store, personne ne vous fait payer à l'entrée. Vous manipulez le MacBook, vous ouvrez les applications, vous touchez l'objet. Dès que vous voulez franchir la porte avec la boîte sous le bras, vous passez à la caisse. »*

Scaffold™ applique cette philosophie à l'extrême :
* **Entrée 100 % libre et sans carte bancaire** : Le fondateur arrive avec son idée brute, lance l'entretien immédiatement et voit son application prendre vie sur le pare-brise interactif.
* **Le Verrou d'Or** : Le code source, le package d'instructions déterministe pour Claude Code/Cursor et les clés d'exportation restent scellés.
* **L'Unité d'Achat Évidente (Modèle iTunes)** : Pas d'abonnement récurrent forcé avant d'avoir prouvé la valeur. Un prix unitaire évident et irrésistible : **9 € (ou 6 000 FCFA)** pour « Prendre les clés du logiciel ».

```text
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│     1. ENTRÉE LIBRE     │ ──► │  2. ÉTINCELLE VISUELLE  │ ──► │   3. PRENDRE LES CLÉS   │
│                         │     │                         │     │                         │
│ • Zéro carte bancaire   │     │ • Pare-brise WYSIWYB    │     │ • Bouton d'export d'or  │
│ • Accueil chaleureux    │     │ • 43 thèmes d'auteur    │     │ • 9 € ou 6 000 FCFA     │
│ • Cadrage en 11 étapes  │     │ • Le projet prend vie   │     │ • Mobile Money / Apple  │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

---

## 2. Le Protocole Serré : Le Contrat des 3 à 5 Minutes Chrono (Steve Jobs Speed Contract)

Jobs détestait les réunions sans fin, les temps de chargement et le bavardage technique stérile.  
L'invariant d'expérience Scaffold™ est formel : **un utilisateur doit accomplir 100 % de son cadrage et voir son application fonctionner en 3 à 5 minutes maximum**.

* **Zéro Boucle d'Erreur de Build** : Grâce au rendu par Primitives Pré-Compilées (`docs/features/deterministic-ui-engine.md`), chaque écran s'affiche en **2 secondes chrono**, sans aucun temps mort de compilation ni retry loop.
* **Posture Proactive & Format *Recommend-then-Confirm*** : L'Agent propose directement les bons arbitrages. L'utilisateur valide en un clic ou oriente en une phrase.
* **Plafond de Coût d'API (< 0,40 €)** : L'échange ciblé consomme moins de 25 000 tokens rapides, assurant une latence minimale et une marge brute supérieure à 95 % sur une vente à 9 €.

---

## 3. L'Arc Émotionnel en 5 Minutes Chrono

L'interface orchestre 4 étapes émotionnelles fulgurantes :

1. **Le Soulagement (Minute 1)** : Le créateur dépose son idée brute. L'Agent synthétise immédiatement le problème et la mission (*Core Purpose*) en langage clair.
2. **La Clarté & Le Choix de Stack (Minute 2)** : Le superflu est immédiatement élagué (*Out-of-Scope V2*). L'Agent recommande la Stack d'Auteur idéale (ex: Supabase ou Bun) validable en 1 clic.
3. **L'Émerveillement Visuel Instantané (Minutes 3 - 4)** : Le Live Canvas projette immédiatement le Shell, les KPIs et les tables grâce aux Primitives Pré-compilées (< 16 ms). L'utilisateur bascule entre les 43 thèmes d'auteur.
4. **La Fierté & La Possession (Minute 5)** : L'audit de santé affiche `Product Health: 100/100`. Le bouton haptique émeraude apparaît : **« Prendre les clés du logiciel — 9 € / 6 000 FCFA »**.

---

## 4. Le Tiroir de Paiement Électroménager (Zéro Friction)

Lorsque l'utilisateur clique pour exporter, aucun formulaire fastidieux de 3 pages n'apparaît. Un tiroir minimaliste coulissant (*Drawer*) s'ouvre en superposition :

* **Détection Géographique Silencieuse** :
  - L'IP est localisée instantanément.
  - **Afrique (Bénin, Côte d'Ivoire, Sénégal, Togo, Cameroun...)** :
    - Affichage : **6 000 FCFA**.
    - Sélection des opérateurs : **MTN Mobile Money, Moov Money, Wave, Orange Money**.
    - Saisie du numéro de téléphone ➔ Push USSD direct sur le mobile de l'acheteur ➔ Bip de confirmation.
  - **Occident & Reste du Monde (France, USA, Canada, Europe...)** :
    - Affichage : **9 €** ou **$9.99**.
    - Détection native : **Apple Pay en 1 clic**, Google Pay ou Carte bancaire instantanée.
* **Déclenchement du Trésor** :
  - Dès réception du webhook de paiement, le tiroir joue une micro-animation de validation haptique.
  - Le téléchargement du fichier `product-plan.zip` démarre automatiquement à la seconde précise.

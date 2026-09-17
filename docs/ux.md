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

## 2. Le Protocole Serré : Rythme & Élimination du Bavardage

Jobs détestait les réunions sans fin et le bavardage technique stérile. L'Agent Scaffold est configuré pour maintenir un **rythme soutenu et percutant** :
* **Posture Proactive** : L'Agent ne reste jamais passif à attendre une invite. Il mène l'entretien d'une main de maître.
* **Format *Recommend-then-Confirm*** : Chaque étape apporte une réponse recommandée clé en main. L'utilisateur clique pour valider ou oriente en une phrase.
* **Plafond de Coût d'API (< 0,80 €)** : En concentrant l'interview sur les 11 arbitrages essentiels, le volume de tokens consommés reste strictement borné sous 0,80 €, assurant une marge brute supérieure à 90 % même sur une vente à 9 €.

---

## 3. L'Arc Émotionnel du Créateur

L'interface orchestre 5 étapes émotionnelles successives :

1. **Le Soulagement (0 - 2 min)** : Le créateur dépose son idée en vrac. L'Agent synthétise immédiatement le problème et la solution sans jargon.
2. **La Clarté (2 - 6 min)** : Les fonctionnalités secondaires sont poliment écartées en *Out-of-Scope (V2)* pour protéger le lancement. L'utilisateur sent le poids de la complexité disparaître.
3. **L'Émerveillement Visuel (6 - 10 min)** : Le Live Canvas s'illumine. Les données s'organisent, les cartes s'animent avec les 43 thèmes d'auteur. Ce n'est plus une idée, c'est un produit palpable.
4. **La Fierté du Cadrage (10 min)** : L'audit de santé valide les 4 contrats avec un score éclatant de 100/100 (`Product Health: 100/100`).
5. **L'Impulsion de Possession (10+ min)** : Le bouton haptique émeraude apparaît : **« Prendre les clés du logiciel — 9 € / 6 000 FCFA »**.

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

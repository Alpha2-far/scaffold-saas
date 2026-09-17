# Vision Future (V3+) : L'Agent Designer Wireframe-to-HighFi (L'Expérience Figma/Framer en Direct)

*Date d'enregistrement : 17 septembre 2026*  
*Statut : Document de Recherche & Vision Future (Hors-périmètre des 7 jalons SaaS V1)*  
*Localisation : `docs/future-visions/agent-designer-wireframe-engine.md`*

---

## 1. Genèse & Philosophie Fondatrice

Dans Figma ou Framer, aucun designer senior ne commence par choisir des dégradés de couleurs ou des ombres portées.  
Le travail d'un designer d'élite suit toujours une discipline en deux temps :

$$\text{1. Squelette & Agencement Spatial (Wireframe)} \longrightarrow \text{2. Habillage & Design System (High-Fidelity)}$$

### Le Constat des Outils IA Actuels
Aujourd'hui, les générateurs d'interface sautent directement au rendu final complexe. L'utilisateur est submergé par les couleurs et les détails cosmétiques, sans avoir pu arbitrer l'ergonomie fondamentale (taille des blocs, position du menu, équilibre des masses).

### L'Idée Visionnaire Scaffold™ pour la Prochaine Version
Faire agir **Scaffold Agent** comme un designer humain en train de concevoir en direct sur Figma :
1. **L'Agent « dessine les carrés » sous les yeux du client** : Il pose d'abord les rectangles neutres, les boîtes de contenu, la grille, le squelette sans fard.
2. **Le client voit l'ossature prendre forme en direct** : Il valide l'ergonomie, la hiérarchie et les proportions.
3. **L'Agent « coule les couleurs et les textures »** : Une fois le squelette approuvé, l'Agent applique les tokens de design, les typographies, les composants haptiques et les vraies données.

---

## 2. Le Déroulé en 3 Phases de l'Expérience Utilisateur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    L'AGENT DESIGNER EN ACTION SUR LE CANVAS                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 : LE SQUELETTAGE EN DIRECT (WIREFRAMING)                           │
│  • L'Agent trace des blocs géométriques vectoriels animés (grilles, cadres). │
│  • Style visuel : Monochrome architectural (lignes grises, wireframe pur).  │
│  • L'utilisateur voit l'équilibre des masses avant d'être distrait.         │
│                                                                             │
│  PHASE 2 : ARBITRAGE ERGONOMIQUE & STRUCTUREL                               │
│  • L'utilisateur ajuste les blocs : « Élargis cette colonne »,              │
│    « Mets le formulaire au centre », « Ajoute une section témoignages ».   │
│  • L'Agent déplace les rectangles en direct sur le Live Canvas.             │
│                                                                             │
│  PHASE 3 : L'HABILLAGE HAUTE-FIDÉLITÉ (HIGH-FIDELITY THEMED RUNTIME)        │
│  • D'un geste fluide, les rectangles se transforment en composants React : │
│    les tokens de couleurs s'injectent, les typographies s'activent,         │
│    les boutons deviennent cliquables et les fausses données s'affichent.    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Typologies d'Écrans Prises en Charge

Cette approche sera déclinée de façon native sur tous les grands archétypes du Web moderne :

1. **La Landing Page de Conversion** :
   - *Squelette* : Hero block (titre + bouton + visuel) ➔ Grille 3 colonnes de bénéfices ➔ Bandeau preuve sociale ➔ Table de tarification ➔ Footer.
   - *Habillage* : Typographie d'auteur, micro-ressorts sur les cartes de prix, boutons contrastés.
2. **La Page de Connexion & Authentification (Auth Screen)** :
   - *Squelette* : Choix entre boîte de connexion centrée ou agencement split-screen (visuel inspirant à gauche, formulaire à droite).
   - *Habillage* : Champs d'input soignés, boutons Google/Email à retour haptique, protection CSRF.
3. **Le Tableau de Bord Applicatif (Dashboard Shell)** :
   - *Squelette* : Rail de navigation gauche, bandeau supérieur, grille de 3 cartes KPI, tableau de données central avec pagination.
   - *Habillage* : Badges pulsants de statut, contrastes de table AAA, formatage monétaire ou volumétrique.

---

## 4. Isolement Stratégique de cette Vision

> [!IMPORTANT]
> **Règle de Gouvernance Produit** :  
> Cette vision ambitieuse est expressément isolée dans ce document d'exploration pour les versions futures (V3+).  
> Elle n'interfère en aucun cas avec l'exécution rigoureuse des **7 Jalons de la plateforme SaaS V1** en cours (`blueprint/milestones/`).

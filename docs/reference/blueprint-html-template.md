# Blueprint HTML Template Specification (Scaffold™ Architecture)

*Date de révision : 17 septembre 2026*  
*Statut : Standard officiel d'exportation de Blueprint WYSIWYB*  
*Localisation : `docs/reference/blueprint-html-template.md`*

---

## 1. Vue d'Ensemble & Révolution Visuelle

Dans les anciens outils de cadrage (ex: `bm-prd-creator`), le fichier HTML généré (`prd.html`) souffrait de limitations critiques :
1. **Disclaimer dépréciatif** : Il affichait un bandeau affirmant que le dossier était temporaire et voué à être supprimé.
2. **Design générique sans âme** : Palette zinc/gris terne, aucune typographie soignée, zéro token de design system.
3. **Absence de contrat visuel WYSIWYB** : Aucun aperçu des tokens de couleurs ni du shell applicatif validés lors de la conception.
4. **Prompts d'agents absents ou déconnectés** : L'utilisateur devait chercher les prompts dans des sous-dossiers séparés.

### 🔒 Le Nouveau Standard Scaffold™ : Le Blueprint Souverain
Le **Blueprint HTML** généré par Scaffold™ (`blueprint/index.html` ou `blueprint/spec.html`) est le **contrat d'ingénierie et le jumeau numérique visuel** du projet :
- **100% Autonome (Zero-Dependency Run)** : Fonctionne directement par double-clic dans le navigateur (Tailwind CDN, Lucide Icons, Google Fonts).
- **Trinité de Valeur Intégrée** : 
  1. Aperçu visuel du Design System actif (12 tokens sémantiques, palette Midnight Navy & Neon Green ou thème choisi).
  2. Cadrage déterministe (In-Scope V1, Cut List impitoyable, Data-Shape vulgarisé, Stacks modernes).
  3. Feuille de route en jalons atomiques intégrant les **invites à 4 piliers** avec bouton de copie en 1 clic.

---

## 2. Structure Générale du Template HTML

```html
<!doctype html>
<html lang="fr" class="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{APP_NAME}} — Blueprint d'Ingénierie Scaffold™</title>
  
  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            scaffold: {
              navy: '#01062B',
              'navy-deep': '#020826',
              green: '#22C55E',
              lime: '#84CC16',
              emerald: '#064E3B'
            }
          }
        }
      }
    };
  </script>
  
  <!-- Google Fonts: Inter & Geist Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <style>
    html { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
    code, pre { font-family: 'Geist Mono', monospace; }
    @media print {
      .no-print { display: none !important; }
      body { background: white !important; color: black !important; }
      .print-card { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 antialiased min-h-screen selection:bg-emerald-500 selection:text-white">

  <!-- ==================== HEADER OFFICIEL SCAFFOLD ==================== -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#01062B] border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-sm">
          <div class="w-full h-full flex flex-col justify-between">
            <span class="h-0.5 w-full bg-emerald-400 rounded-full"></span>
            <span class="h-0.5 w-3/4 bg-lime-400 rounded-full"></span>
            <span class="h-0.5 w-full bg-emerald-500 rounded-full"></span>
            <span class="h-0.5 w-1/2 bg-emerald-600 rounded-full"></span>
          </div>
        </div>
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">Scaffold™ Blueprint</span>
          <h1 class="text-sm font-semibold text-zinc-100 leading-none">{{APP_NAME}}</h1>
        </div>
      </div>
      
      <div class="flex items-center gap-2 no-print">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Scope Locked 100/100
        </span>
        <button onclick="window.print()" class="px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          Imprimer
        </button>
        <button id="theme-toggle" class="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800 transition">
          <i data-lucide="sun" class="w-4 h-4 hidden dark:inline-block"></i>
          <i data-lucide="moon" class="w-4 h-4 inline-block dark:hidden"></i>
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

    <!-- ==================== 1. HERO & VISION EXÉCUTIVE ==================== -->
    <section class="space-y-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-400">
        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-400"></i>
        Cadrage d'Ingénierie Déterministe
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">{{APP_NAME}}</h2>
      <p class="text-lg text-zinc-300 leading-relaxed max-w-3xl">{{CORE_PURPOSE}}</p>
      
      <!-- Badges Stack & Thème -->
      <div class="pt-2 flex flex-wrap gap-2.5 items-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200">
          <i data-lucide="layers" class="w-4 h-4 text-emerald-400"></i>
          <span>Stack : <strong class="text-white">{{STACK_NAME}}</strong></span>
        </div>
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200">
          <i data-lucide="palette" class="w-4 h-4 text-lime-400"></i>
          <span>Thème : <strong class="text-white">{{THEME_NAME}}</strong></span>
        </div>
      </div>
    </section>

    <!-- ==================== 2. DESIGN SYSTEM & TOKENS WYSIWYB ==================== -->
    <section class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4 print-card">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <i data-lucide="palette" class="w-4 h-4 text-emerald-400"></i>
          Contrat Visuel & Tokens Sémantiques (WYSIWYB)
        </h3>
        <span class="text-xs text-zinc-500">product/DESIGN.md</span>
      </div>
      <p class="text-sm text-zinc-400">Ce que l'utilisateur a configuré sur le Live Canvas est strictement préservé ci-dessous :</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
        {{DESIGN_TOKEN_SWATCHES}}
      </div>
    </section>

    <!-- ==================== 3. FONCTIONNALITÉS CŒUR (IN-SCOPE V1) ==================== -->
    <section class="space-y-4">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
        Fonctionnalités Maîtresses In-Scope (V1)
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- ==================== 4. RUTHLESS CUT LIST (OUT-OF-SCOPE) ==================== -->
    <section class="rounded-xl border border-rose-950/40 bg-rose-950/10 p-6 space-y-4 print-card">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
        <i data-lucide="ban" class="w-4 h-4 text-rose-400"></i>
        Ce que nous écartons délibérément (The Cut List)
      </h3>
      <p class="text-sm text-zinc-400">Ces fonctionnalités sont formellement interdites de développement en V1 pour garantir un lancement rapide sans dérive :</p>
      <ul class="space-y-2.5 pt-1">
        {{OUT_OF_SCOPE_ITEMS}}
      </ul>
    </section>

    <!-- ==================== 5. MODÈLE DE DONNÉES DÉTERMINISTE ==================== -->
    <section class="space-y-4 print-card">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <i data-lucide="database" class="w-4 h-4 text-emerald-400"></i>
          Modèle de Données & Relations (Data-Shape)
        </h3>
        <span class="text-xs text-zinc-500">product/data-shape.md</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {{ENTITY_CARDS}}
      </div>
    </section>

    <!-- ==================== 6. FEUILLE DE ROUTE DES JALONS & INVITES 4 PILIERS ==================== -->
    <section class="space-y-6">
      <div class="space-y-1">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <i data-lucide="route" class="w-4 h-4 text-emerald-400"></i>
          Feuille de Route d'Ingénierie & Invites IA Prêtes à l'Emploi
        </h3>
        <p class="text-sm text-zinc-400">Chaque jalon est autonome, testable dans le navigateur, et fournit son invite calibrée à 4 piliers.</p>
      </div>

      <div class="space-y-5">
        {{MILESTONE_CARDS_WITH_4_PILLARS}}
      </div>
    </section>

    <!-- ==================== FOOTER ==================== -->
    <footer class="pt-8 border-t border-zinc-800 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>Généré souverainement par <strong class="text-zinc-300">Scaffold™ Platform</strong> · Contrat WYSIWYB 100% Déterministe.</p>
      <p>Horodatage : <span class="font-mono text-zinc-400">{{GENERATED_AT}}</span></p>
    </footer>

  </main>

  <!-- ==================== LOGIQUE INTERACTIVE JS ==================== -->
  <script>
    // Lucide Icons
    if (window.lucide) window.lucide.createIcons();

    // Thème Sombre / Clair
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Copie 1-Clic pour Prompt 4 Piliers
    function copyPrompt(btn, promptId) {
      const el = document.getElementById(promptId);
      if (!el) return;
      navigator.clipboard.writeText(el.innerText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copié !';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = originalText;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    }
  </script>
</body>
</html>
```

---

## 3. Snippets de Section Spécifiques

### Carte Jalon avec Prompt 4 Piliers et Copie 1-Clic (`{{MILESTONE_CARDS_WITH_4_PILLARS}}`)

```html
<article class="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden print-card">
  <header class="flex items-center justify-between p-5 border-b border-zinc-800/80 bg-zinc-900/80">
    <div class="flex items-center gap-3">
      <span class="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center justify-center">
        {{N}}
      </span>
      <h4 class="font-semibold text-white text-base">Jalon {{N}} : {{MILESTONE_TITLE}}</h4>
    </div>
    <span class="text-xs text-zinc-400 font-medium">Testable en navigateur</span>
  </header>

  <div class="p-5 space-y-4">
    <p class="text-sm text-zinc-300 leading-relaxed">{{MILESTONE_DESCRIPTION}}</p>

    <!-- Grille In vs Out -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
      <div class="rounded-lg bg-zinc-950/50 border border-zinc-800/60 p-3.5">
        <p class="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
          <i data-lucide="check" class="w-3.5 h-3.5"></i> Ce qui est construit
        </p>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
          <!-- puces in-scope jalon -->
          <li>{{IN_SCOPE_ITEM}}</li>
        </ul>
      </div>

      <div class="rounded-lg bg-zinc-950/50 border border-zinc-800/60 p-3.5">
        <p class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
          <i data-lucide="minus" class="w-3.5 h-3.5"></i> Exclu de ce jalon
        </p>
        <ul class="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
          <!-- puces out-of-scope jalon -->
          <li>{{OUT_OF_SCOPE_ITEM}}</li>
        </ul>
      </div>
    </div>

    <!-- Done When -->
    <div class="rounded-lg bg-emerald-950/20 border border-emerald-500/20 p-3 flex items-start gap-2.5 text-xs text-emerald-300">
      <i data-lucide="flag" class="w-4 h-4 mt-0.5 text-emerald-400 shrink-0"></i>
      <div>
        <strong class="font-semibold text-emerald-200">Critère d'achèvement (Done When) :</strong> {{DONE_WHEN}}
      </div>
    </div>

    <!-- Invite Modèle 4 Piliers Prête pour Claude Code / Cursor -->
    <div class="pt-2">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <i data-lucide="terminal" class="w-3.5 h-3.5 text-emerald-400"></i>
          Invite 4 Piliers pour votre Agent IA (Claude Code, Cursor)
        </span>
        <button onclick="copyPrompt(this, 'prompt-milestone-{{N}}')" class="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition flex items-center gap-1.5 no-print">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          Copier l'invite
        </button>
      </div>
      <pre id="prompt-milestone-{{N}}" class="text-xs p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
**OBJECTIF** :
{{OBJECTIF_TEXT}}

**CONTEXTE** :
{{CONTEXTE_TEXT}}

**CONTRAINTES** :
{{CONTRAINTES_TEXT}}

**CRITÈRE DE SUCCÈS** :
{{CRITERE_SUCCES_TEXT}}
      </pre>
    </div>
  </div>
</article>
```

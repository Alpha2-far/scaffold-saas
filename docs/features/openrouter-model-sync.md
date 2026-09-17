# Passerelle OpenRouter & Synchronisation Dynamique des Modèles

*Date de révision : 16 septembre 2026*  
*Statut : Spécification technique d'orchestration LLM*  
*Localisation : `docs/features/openrouter-model-sync.md`*

---

## 1. Vue d'Ensemble & Stratégie Multi-Modèles

Scaffold™ SaaS unifie tous ses appels d'intelligence artificielle derrière la passerelle **OpenRouter**. Ce choix architectural résout trois contraintes fondamentales :

1. **Tolérance aux pannes maximale (*Zero-Downtime Resilience*)** : Si un fournisseur (Anthropic, OpenAI ou Google) subit un ralentissement, un blocage de capacité ou une coupure, la requête bascule instantanément sur le modèle de repli.
2. **Facturation Unifiée & Assurance Zéro-Complétion** : Un seul compte et une seule clé API serveur. OpenRouter n'impute aucun frais si une complétion échoue lors du parcours de la chaîne de repli.
3. **Synchronisation à Chaud sans Redéploiement** : L'administrateur peut modifier l'ordonnancement des modèles ou en activer de nouveaux directement depuis son back-office `/admin/models`.

---

## 2. La Cascade Native de Modèles (*Fallback Chain*)

OpenRouter supporte nativement le paramètre `models: [...]` dans les requêtes de complétion en streaming.

### Chaîne de Repli Canonique (Septembre 2026) :
1. **Modèle Principal** : `anthropic/claude-3.7-sonnet`
   - *Raison* : Raisonnement architectural supérieur, respect scrupuleux des schémas de données et ton direct.
2. **Premier Repli (Failover 1)** : `openai/gpt-4o`
   - *Raison* : Vitesse de génération élevée, robustesse d'exécution et parfaite compréhension du langage naturel.
3. **Deuxième Repli (Failover 2)** : `google/gemini-2.0-flash`
   - *Raison* : Latence ultra-faible, excellente gestion des très longs contextes et coût optimisé.
4. **Troisième Repli (Failover 3)** : `deepseek/deepseek-r1`
   - *Raison* : Capacité de déduction logique avancée en cas de saturation des géants occidentaux.

---

## 3. Implémentation du Client de Streaming (`server/ai/openrouter.ts`)

Le handler de chat ouvre un flux SSE (*Server-Sent Events*) non bufférisé vers le navigateur client :

```ts
export async function streamOpenRouterChat(
  messages: Array<{ role: string; content: string }>,
  modelFallbackList: string[],
  onChunk: (text: string) => void,
  onModelSelected?: (model: string) => void
): Promise<void> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://scaffold.dev',
      'X-Title': 'Scaffold Platform',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      models: modelFallbackList, // Cascade ordonnée
      messages: messages,
      stream: true,
      temperature: 0.2, // Faible température pour un cadrage déterministe
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Flux de réponse illisible');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (trimmed.startsWith('data: ')) {
        try {
          const parsed = JSON.parse(trimmed.slice(6));
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onChunk(content);
          if (parsed.model && onModelSelected) {
            onModelSelected(parsed.model);
          }
        } catch {
          // Ignorer les fragments JSON incomplets en cours de streaming
        }
      }
    }
  }
}
```

---

## 4. Synchronisation Dynamique depuis le Superadmin

Pour éviter tout redémarrage du processus Bun lors d'un changement de stratégie d'IA :

1. **Table `model_configs`** : Contient l'état persistant (`model_id`, `priority_order`, `is_active`).
2. **Cache Mémoire Atomic (`ActiveModelRegistry`)** :
   ```ts
   class ActiveModelRegistry {
     private static cachedModels: string[] = [];

     static setModels(models: string[]) {
       this.cachedModels = models;
     }

     static getModels(): string[] {
       return this.cachedModels;
     }
   }
   ```
3. **Mutation via l'API Admin (`POST /admin/api/models`)** :
   - L'admin réordonne ou active/désactive des modèles depuis son tableau de bord.
   - Le serveur met à jour la base de données ET actualise instantanément `ActiveModelRegistry.setModels(...)`.
   - La requête suivante utilise immédiatement la nouvelle cascade sans interruption de service.

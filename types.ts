
export interface CraftPrompt {
  contexto: string;
  ruolo: string;
  azione: string;
  formato: string;
  target: string;
}

export interface SavedPrompt {
  id: string;
  topic: string;
  prompt: CraftPrompt;
  createdAt: string;
}

import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from 'openai';
import type { CraftPrompt } from '../types';

// Funzione per ottenere l'istanza AI in base al provider selezionato
const getAIInstance = (provider: 'gemini' | 'openai') => {
  if (provider === 'gemini') {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      throw new Error("Chiave API Gemini non configurata. Vai nelle impostazioni e inserisci la tua chiave API Gemini.");
    }
    return new GoogleGenAI({ apiKey });
  } else {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      throw new Error("Chiave API OpenAI non configurata. Vai nelle impostazioni e inserisci la tua chiave API OpenAI.");
    }
    return new OpenAI({ apiKey });
  }
};

const geminiResponseSchema = {
  type: Type.OBJECT,
  properties: {
    contexto: {
      type: Type.STRING,
      description: "Fornisci uno sfondo dettagliato e un contesto per la richiesta. Spiega la situazione, i vincoli e l'obiettivo generale.",
    },
    ruolo: {
      type: Type.STRING,
      description: "Definisci la persona o il ruolo che l'IA dovrebbe adottare. Sii specifico riguardo all'esperienza e alla prospettiva richieste (es. 'esperto di marketing', 'ingegnere software senior', 'storico').",
    },
    azione: {
      type: Type.STRING,
      description: "Indica chiaramente il compito o l'azione principale che l'IA deve eseguire. Usa verbi d'azione e sii esplicito riguardo all'output desiderato (es. 'scrivi un report', 'genera codice', 'crea un piano di marketing').",
    },
    formato: {
      type: Type.STRING,
      description: "Specifica il formato esatto per l'output. Potrebbe essere un elenco, una tabella, JSON, un post di un blog con sezioni specifiche, ecc. Fornisci esempi se necessario.",
    },
    target: {
      type: Type.STRING,
      description: "Descrivi il pubblico di destinazione della risposta. Ciò influenza il tono, la complessità e il linguaggio del contenuto generato (es. 'principianti senza conoscenze tecniche', 'dirigenti di alto livello', 'sviluppatori tecnici').",
    },
  },
  required: ["contexto", "ruolo", "azione", "formato", "target"],
};

const openaiResponseSchema = {
  type: "object",
  properties: {
    contexto: {
      type: "string",
      description: "Fornisci uno sfondo dettagliato e un contesto per la richiesta. Spiega la situazione, i vincoli e l'obiettivo generale.",
    },
    ruolo: {
      type: "string",
      description: "Definisci la persona o il ruolo che l'IA dovrebbe adottare. Sii specifico riguardo all'esperienza e alla prospettiva richieste (es. 'esperto di marketing', 'ingegnere software senior', 'storico').",
    },
    azione: {
      type: "string",
      description: "Indica chiaramente il compito o l'azione principale che l'IA deve eseguire. Usa verbi d'azione e sii esplicito riguardo all'output desiderato (es. 'scrivi un report', 'genera codice', 'crea un piano di marketing').",
    },
    formato: {
      type: "string",
      description: "Specifica il formato esatto per l'output. Potrebbe essere un elenco, una tabella, JSON, un post di un blog con sezioni specifiche, ecc. Fornisci esempi se necessario.",
    },
    target: {
      type: "string",
      description: "Descrivi il pubblico di destinazione della risposta. Ciò influenza il tono, la complessità e il linguaggio del contenuto generato (es. 'principianti senza conoscenze tecniche', 'dirigenti di alto livello', 'sviluppatori tecnici').",
    },
  },
  required: ["contexto", "ruolo", "azione", "formato", "target"],
};

export async function generateCraftPrompt(topic: string, provider: 'gemini' | 'openai' = 'gemini'): Promise<CraftPrompt> {
  const systemInstruction = `You are an expert in prompt engineering specializing in the C.R.A.F.T. (Contesto, Ruolo, Azione, Formato, Target) framework. Your task is to transform a user's simple topic or question into a detailed, structured, and effective C.R.A.F.T. prompt. Analyze the user's input and expand it into the five components of the framework, generating high-quality, comprehensive content for each section. The output must be in Italian.`;
  
  const userPrompt = `Basandoti sul seguente argomento, genera un prompt C.R.A.F.T. completo. Sii dettagliato e approfondito per ogni sezione. Argomento: "${topic}"`;

  try {
    if (provider === 'gemini') {
      const ai = getAIInstance('gemini') as GoogleGenAI;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: geminiResponseSchema,
          temperature: 0.7,
        },
      });

      const jsonString = response.text;
      const parsedJson = JSON.parse(jsonString);
      return parsedJson as CraftPrompt;
    } else {
      const ai = getAIInstance('openai') as OpenAI;
      const response = await ai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object", schema: openaiResponseSchema },
        temperature: 0.7,
      });

      const jsonString = response.choices[0].message.content;
      if (!jsonString) {
        throw new Error("Nessuna risposta ricevuta da OpenAI");
      }
      const parsedJson = JSON.parse(jsonString);
      return parsedJson as CraftPrompt;
    }
  } catch (error) {
    console.error(`Error generating C.R.A.F.T. prompt with ${provider}:`, error);
    throw new Error(`Impossibile generare il prompt dall'API ${provider === 'gemini' ? 'Gemini' : 'OpenAI'}. Controlla la tua chiave API e la connessione di rete.`);
  }
}

export async function testGeneratedPrompt(prompt: string, provider: 'gemini' | 'openai' = 'gemini'): Promise<{ result: string; truncated: boolean }> {
    const MAX_OUTPUT_TOKENS = 8192; // Aumentato da 2048 a 8192 per Gemini 2.5 Flash
    
    try {
        if (provider === 'gemini') {
            const ai = getAIInstance('gemini') as GoogleGenAI;
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    temperature: 0.5,
                    maxOutputTokens: MAX_OUTPUT_TOKENS,
                    thinkingConfig: { thinkingBudget: 1024 },
                }
            });
            
            const result = response.text;
            const truncated = result.length > 0 && response.candidates?.[0]?.finishReason === 'MAX_TOKENS';
            return { result, truncated };
        } else {
            const ai = getAIInstance('openai') as OpenAI;
            const response = await ai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5,
                max_tokens: MAX_OUTPUT_TOKENS,
            });

            const result = response.choices[0].message.content || "Nessuna risposta ricevuta";
            const truncated = response.choices[0].finish_reason === 'length';
            return { result, truncated };
        }
    } catch (error) {
        console.error(`Error testing prompt with ${provider}:`, error);
        throw new Error(`Impossibile ottenere una risposta per il prompt di test dall'API ${provider === 'gemini' ? 'Gemini' : 'OpenAI'}.`);
    }
}
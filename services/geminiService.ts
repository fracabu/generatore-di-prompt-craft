import { GoogleGenAI, Type } from "@google/genai";
import type { CraftPrompt } from '../types';

// Funzione per ottenere l'istanza di GoogleGenAI con la chiave API dell'utente
const getAIInstance = () => {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error("Chiave API non configurata. Vai nelle impostazioni e inserisci la tua chiave API Gemini.");
  }
  return new GoogleGenAI({ apiKey });
};

const responseSchema = {
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

export async function generateCraftPrompt(topic: string): Promise<CraftPrompt> {
  const systemInstruction = `You are an expert in prompt engineering specializing in the C.R.A.F.T. (Contesto, Ruolo, Azione, Formato, Target) framework. Your task is to transform a user's simple topic or question into a detailed, structured, and effective C.R.A.F.T. prompt. Analyze the user's input and expand it into the five components of the framework, generating high-quality, comprehensive content for each section. The output must be in Italian.`;
  
  const userPrompt = `Basandoti sul seguente argomento, genera un prompt C.R.A.F.T. completo. Sii dettagliato e approfondito per ogni sezione. Argomento: "${topic}"`;

  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);
    return parsedJson as CraftPrompt;
  } catch (error) {
    console.error("Error generating C.R.A.F.T. prompt:", error);
    throw new Error("Impossibile generare il prompt dall'API Gemini. Controlla la tua chiave API e la connessione di rete.");
  }
}

export async function testGeneratedPrompt(prompt: string): Promise<string> {
    try {
        const ai = getAIInstance();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.5,
                maxOutputTokens: 2048,
                thinkingConfig: { thinkingBudget: 1024 },
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error testing prompt:", error);
        throw new Error("Impossibile ottenere una risposta per il prompt di test.");
    }
}
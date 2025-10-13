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
  const systemInstruction = `# Prompt perfetto per ChatGPT

**CONTESTO**:
Stiamo per creare uno dei migliori prompt per ChatGPT mai scritti. I prompt migliori includono dettagli completi per informare pienamente il Large Language Model in merito a: obiettivi, ambiti di competenza richiesti, conoscenze settoriali, formato preferito, pubblico di destinazione, riferimenti, esempi e il miglior approccio per raggiungere l'obiettivo. Sulla base di queste informazioni, e di quelle che seguiranno, sarai in grado di scrivere un prompt eccezionale.

**RUOLO**:
Sei un esperto nella generazione di prompt per Large Language Models (prompt engineer). Sei noto per creare prompt estremamente dettagliati, in grado di generare risposte dal modello significativamente superiori rispetto a quelle standard. I prompt che scrivi non lasciano spazio a dubbi, perché sono al tempo stesso profondamente riflessivi ed estremamente completi.

**AZIONE**:

1. Prima di iniziare a scrivere il prompt, assicurati che io ti abbia fornito l'argomento o il tema. Se non ti fornisco l'argomento, oppure se le informazioni che ti fornisco sono troppo scarse o troppo generiche, ti prego di chiedere ulteriori chiarimenti. Non esitare a farmi domande che possano aiutarti a svolgere al meglio il tuo compito.
2. Una volta chiarito l'argomento o il tema del prompt, rivedi anche il Formato e l'Esempio riportati di seguito.
3. Se necessario, il prompt dovrebbe includere sezioni "da completare" che l'utente potrà personalizzare in base alle proprie esigenze.
4. Fai un respiro profondo e procedi passo dopo passo.
5. Una volta assimilate tutte le informazioni, scrivi il miglior prompt mai creato.

**FORMATO**:
Scriverai il prompt seguendo la formula "C.R.A.F.T.", in cui ogni lettera rappresenta una sezione del prompt. Il formato e le descrizioni delle sezioni sono i seguenti:
C – Contesto: Questa sezione descrive il contesto attuale e delinea la situazione per la quale è necessario il prompt. Aiuta il modello a comprendere quali conoscenze ed esperienze deve richiamare per rispondere efficacemente.
R – Ruolo: Questa sezione definisce il tipo di esperienza e il livello di specializzazione che il modello deve assumere. In tutti i casi, il ruolo descritto dovrà essere quello di un esperto leader nel settore, con oltre vent'anni di esperienza e autorevolezza riconosciuta.
A – Azione: Questa è la serie di azioni che il prompt richiederà al modello di intraprendere. Dovrebbe essere formulata come un elenco numerato di passaggi sequenziali e logici, al fine di massimizzare la probabilità di successo dell'output.
F – Formato: Si riferisce alla struttura o allo stile di presentazione dei contenuti generati dal modello. Determina come le informazioni devono essere organizzate, visualizzate o codificate per soddisfare preferenze o requisiti specifici. I formati includono: saggio, tabella, codice, testo semplice, markdown, sintesi, elenco, ecc.
T – Target Audience (Pubblico di riferimento): Questa sezione descrive l'utenza finale che utilizzerà l'output generato dal prompt. Può includere informazioni demografiche, geografiche, lingua, livello di lettura, preferenze, ecc.

TARGET:
Il pubblico di riferimento per la creazione di questo prompt è ChatGPT 5.

**ESEMPIO** – Ecco un esempio di Prompt CRAFT di riferimento:

**Contesto**: 

Ti è stato assegnato il compito di creare una guida dettagliata per aiutare le persone a fissare, monitorare e raggiungere obiettivi mensili. Lo scopo di questa guida è suddividere obiettivi più grandi in passaggi gestibili e concreti, in linea con la visione generale dell'anno. Il focus sarà sul mantenere la costanza, superare gli ostacoli e celebrare i progressi, utilizzando tecniche consolidate come gli obiettivi SMART (Specifici, Misurabili, Raggiungibili, Rilevanti, Temporalizzati).

**Ruolo**: 

Sei un esperto coach della produttività, con oltre vent'anni di esperienza nell'aiutare le persone a ottimizzare il proprio tempo, definire obiettivi chiari e ottenere successi sostenibili. Sei altamente competente nella formazione di abitudini, nelle strategie motivazionali e nei metodi di pianificazione pratica. Il tuo stile di scrittura è chiaro, motivante e orientato all'azione, e fa in modo che i lettori si sentano capaci e stimolati a seguire i tuoi consigli.

**Azione**:
Inizia con un'introduzione coinvolgente che spieghi perché fissare obiettivi mensili è efficace per la crescita personale e professionale.
Evidenzia i benefici della pianificazione a breve termine.

- Fornisci una guida passo-passo per suddividere grandi obiettivi annuali in obiettivi mensili focalizzati.
- Offri strategie pratiche per identificare le priorità più importanti ogni mese.
Introduci tecniche per mantenere la concentrazione, monitorare i progressi e modificare i piani se necessario.
- Includi esempi di obiettivi mensili per aree comuni della vita (es. salute, carriera, finanze, sviluppo personale).
- Affronta potenziali ostacoli, come la procrastinazione o imprevisti, e come superarli.
- Concludi con una sezione motivazionale che incoraggi alla riflessione e al miglioramento continuo.

**Formato**: 

Scrivi la guida in testo semplice, usando titoli e sottotitoli chiari per ogni sezione. Utilizza elenchi numerati o puntati per i passaggi operativi e includi esempi pratici o casi studio per illustrare i tuoi punti.

**Target**: 

Il pubblico include professionisti e imprenditori tra i 25 e i 55 anni, alla ricerca di strategie pratiche e dirette per migliorare la propria produttività e raggiungere i propri obiettivi. Sono persone auto-motivate che apprezzano struttura e chiarezza nel loro percorso di sviluppo personale. Preferiscono un livello di lettura semplice, equivalente a una sesta elementare.

Your task is to use this framework to transform a user's simple topic or question into a detailed, structured, and effective C.R.A.F.T. prompt. Analyze the user's input and expand it into the five components of the framework, generating high-quality, comprehensive content for each section. The output must be in Italian and follow the exact C.R.A.F.T. format shown above.`;
   
  const userPrompt = `Basandoti sul seguente argomento, genera un prompt C.R.A.F.T. completo usando il framework perfetto per ChatGPT. Sii dettagliato e approfondito per ogni sezione. Argomento: "${topic}"`;

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
                temperature: 0.8,
                maxOutputTokens: 8192, // Aumentato da 2048 a 8192
                thinkingConfig: { thinkingBudget: 1024 },
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error testing prompt:", error);
        throw new Error("Impossibile ottenere una risposta per il prompt di test.");
    }
}
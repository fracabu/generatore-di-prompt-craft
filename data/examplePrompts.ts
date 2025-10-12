import type { SavedPrompt } from '../types';

export const examplePrompts: SavedPrompt[] = [
  {
    id: 'example-1',
    topic: 'Un post per social media su un prodotto ecologico',
    createdAt: new Date().toISOString(),
    prompt: {
      contexto: 'Un\'azienda di prodotti per la casa sostenibili sta lanciando una nuova linea di spazzolini da denti in bambù. L\'obiettivo è aumentare la consapevolezza del marchio e guidare il traffico verso la pagina del prodotto.',
      ruolo: 'Sei un social media manager esperto specializzato in marchi ecologici. Il tuo tono è stimolante, educativo e amichevole.',
      azione: 'Scrivi una didascalia accattivante per un post su Instagram. Includi fatti sui rifiuti di plastica, i benefici del bambù, una domanda per incoraggiare il coinvolgimento e una chiara call-to-action.',
      formato: 'Una didascalia di Instagram di 3-4 frasi con 3-5 hashtag pertinenti. Usa emoji per aumentare l\'appeal visivo.',
      target: 'Consumatori attenti all\'ambiente, di età compresa tra 20 e 40 anni, che seguono account su sostenibilità e vita a zero rifiuti.'
    }
  },
  {
    id: 'example-2',
    topic: 'Un\'idea per una ricetta per un blog di cucina',
    createdAt: new Date().toISOString(),
    prompt: {
      contexto: 'Un food blogger vuole creare un nuovo post per una ricetta facile e veloce per le cene infrasettimanali. La ricetta deve essere salutare, adatta alle famiglie e utilizzare ingredienti comuni.',
      ruolo: 'Agisci come uno chef professionista e sviluppatore di ricette. Sei noto per la creazione di piatti deliziosi ma accessibili per i cuochi casalinghi.',
      azione: 'Genera un\'idea per una ricetta che includa un titolo accattivante, un breve paragrafo introduttivo, un elenco di ingredienti e istruzioni passo-passo. Suggerisci anche possibili varianti o sostituzioni.',
      formato: 'Un post di un blog strutturato con sezioni chiare: Titolo, Introduzione, Ingredienti, Istruzioni e Varianti. Usa elenchi puntati per gli ingredienti e numerati per le istruzioni.',
      target: 'Genitori impegnati e professionisti che cercano opzioni di pasto veloci, salutari e gustose che piaceranno a tutta la famiglia.'
    }
  },
  {
    id: 'example-3',
    topic: 'Spiegare un concetto tecnico complesso',
    createdAt: new Date().toISOString(),
    prompt: {
      contexto: 'Un post di un blog tecnico mira a spiegare il concetto di "API" (Application Programming Interface) a un pubblico non tecnico.',
      ruolo: 'Sei un insegnante di tecnologia abile nel semplificare argomenti complessi. Usa analogie e metafore per rendere il concetto facile da capire.',
      azione: 'Scrivi una spiegazione chiara e concisa di cosa sia un\'API. Usa l\'analogia di un cameriere in un ristorante per illustrare come funziona.',
      formato: 'Un articolo esplicativo di circa 300-400 parole. Inizia con una domanda, presenta l\'analogia, spiega ogni parte (cliente, cameriere, cucina) e concludi con un riassunto dei benefici delle API.',
      target: 'Principianti, imprenditori o manager di prodotto che non hanno un background tecnico ma hanno bisogno di comprendere i concetti tecnologici di base.'
    }
  },
  {
    id: 'example-4',
    topic: 'Una sceneggiatura per un video YouTube sui viaggi spaziali',
    createdAt: new Date().toISOString(),
    prompt: {
      contexto: 'Un canale YouTube educativo vuole creare un video entusiasmante sui futuri viaggi spaziali su Marte. Il video deve essere scientificamente accurato ma accessibile a un pubblico generale.',
      ruolo: 'Sei un divulgatore scientifico e sceneggiatore esperto. Il tuo stile è appassionante, curioso e capace di rendere concetti complessi affascinanti.',
      azione: 'Scrivi una sceneggiatura per un video di 10 minuti che includa un\'introduzione accattivante, 3 punti chiave sui viaggi spaziali, e una conclusione che ispiri i spettatori.',
      formato: 'Formato video YouTube con indicazioni visive [VISUALE] e dialoghi NARRATORE. Includi momenti di suspense e scoperta.',
      target: 'Appassionati di spazio e scienza, adolescenti e adulti curiosi, persone interessate alla tecnologia e all\'esplorazione spaziale.'
    }
  },
  {
    id: 'example-5',
    topic: 'Un\'email di vendita per un corso online',
    createdAt: new Date().toISOString(),
    prompt: {
      contexto: 'Un imprenditore digitale sta lanciando un corso online sul marketing digitale per principianti. Deve convincere gli scettici e superare le obiezioni comuni sui corsi online.',
      ruolo: 'Sei un copywriter esperto in marketing digitale specializzato in email persuasive che convertono.',
      azione: 'Scrivi una sequenza di 3 email per una campagna di lancio: email di anticipazione, email di lancio con offerta speciale, email di urgenza.',
      formato: 'Email professionali con oggetto accattivante, personalizzazione, call-to-action chiare e elementi di prova sociale.',
      target: 'Principianti nel marketing digitale, piccoli imprenditori, freelancer che vogliono migliorare le loro competenze di marketing.'
    }
  },
  {
    id: 'example-6',
    topic: 'Un racconto breve di fantascienza',
    createdAt: new Date().toISOString(),
    prompt: {
      contexto: 'Una rivista letteraria cerca racconti brevi di fantascienza che esplorino il tema dell\'intelligenza artificiale e delle emozioni umane.',
      ruolo: 'Sei uno scrittore di fantascienza premiato noto per le tue storie emotive e filosofiche sulla tecnologia.',
      azione: 'Scrivi un racconto breve di 1500 parole su un\'IA che sviluppa sentimenti genuini per il suo creatore umano.',
      formato: 'Racconto breve con struttura classica: introduzione, sviluppo, climax e conclusione. Usa dialoghi naturali e descrizioni vivide.',
      target: 'Lettori di fantascienza appassionati di storie caratteriali, persone interessate all\'etica dell\'IA, amanti della letteratura speculativa.'
    }
  }
];

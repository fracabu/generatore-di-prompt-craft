import React from 'react';
import { SparklesIcon, BookOpenIcon } from '../components/IconComponents';

const CraftGuideView: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200 font-sans flex-1 flex flex-col overflow-auto">
      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-6 sm:px-12 lg:px-20 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-emerald-500/20 p-3 sm:p-4 rounded-full">
              <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">Framework C.R.A.F.T.</h1>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl mt-2">
                Il metodo strutturato per creare prompt efficaci e di alta qualità
              </p>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-400 mb-4">Cos'è C.R.A.F.T.?</h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
            C.R.A.F.T. è un framework di prompt engineering che ti guida nella creazione di prompt strutturati e completi.
            L'acronimo rappresenta i cinque elementi fondamentali di ogni prompt di qualità:
          </p>
          <ul className="space-y-3 text-slate-300 text-base sm:text-lg ml-6">
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3">C</span>
              <span><strong className="text-emerald-400">Contesto</strong> - La situazione e il background necessari</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3">R</span>
              <span><strong className="text-emerald-400">Ruolo</strong> - L'esperto che l'AI deve impersonare</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3">A</span>
              <span><strong className="text-emerald-400">Azione</strong> - Il compito specifico da eseguire</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3">F</span>
              <span><strong className="text-emerald-400">Formato</strong> - La struttura dell'output desiderato</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3">T</span>
              <span><strong className="text-emerald-400">Target</strong> - Il pubblico di destinazione</span>
            </li>
          </ul>
        </section>

        {/* Contesto Section */}
        <section className="bg-slate-800/50 border border-emerald-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl font-bold text-emerald-400">C</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400">Contesto (Context)</h2>
          </div>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg">
            <div>
              <span className="font-semibold text-emerald-400 text-lg">Descrizione:</span>
              <p className="mt-2 leading-relaxed">
                Il contesto fornisce all'AI le informazioni di background necessarie per comprendere pienamente la situazione.
                Include dettagli sull'ambiente, gli obiettivi generali, e qualsiasi informazione rilevante che aiuti l'AI a
                generare una risposta appropriata e pertinente.
              </p>
            </div>
            <div>
              <span className="font-semibold text-emerald-400 text-lg">Quando usarlo:</span>
              <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                <li>Per fornire informazioni di background essenziali</li>
                <li>Per specificare vincoli o limitazioni del progetto</li>
                <li>Per descrivere la situazione attuale o il problema da risolvere</li>
                <li>Per stabilire il tono e lo stile appropriato</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-emerald-400 text-lg">Esempio:</span>
              <div className="mt-2 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-200 italic">
                  "Stai lavorando per un'azienda tecnologica che ha recentemente lanciato un nuovo software di gestione progetti.
                  Il prodotto si rivolge a team distribuiti e offre funzionalità innovative per la collaborazione remota."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ruolo Section */}
        <section className="bg-slate-800/50 border border-sky-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl font-bold text-sky-400">R</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-400">Ruolo (Role)</h2>
          </div>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg">
            <div>
              <span className="font-semibold text-sky-400 text-lg">Descrizione:</span>
              <p className="mt-2 leading-relaxed">
                Il ruolo definisce l'esperto o la persona che l'AI deve impersonare. Questo aiuta l'AI a adottare la
                prospettiva, il linguaggio e le competenze appropriate per il compito. Un ruolo ben definito migliora
                significativamente la qualità e la rilevanza della risposta.
              </p>
            </div>
            <div>
              <span className="font-semibold text-sky-400 text-lg">Esempi di ruoli efficaci:</span>
              <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                <li>Esperto di marketing digitale con 10 anni di esperienza</li>
                <li>Sviluppatore senior specializzato in React e TypeScript</li>
                <li>Copywriter creativo per contenuti social media</li>
                <li>Nutrizionista certificato specializzato in diete plant-based</li>
                <li>Consulente finanziario con expertise in investimenti sostenibili</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-sky-400 text-lg">Esempio:</span>
              <div className="mt-2 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-200 italic">
                  "Sei un esperto di email marketing con specializzazione in campagne B2B per il settore tecnologico.
                  Hai una comprovata esperienza nell'aumentare i tassi di conversione del 40%."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Azione Section */}
        <section className="bg-slate-800/50 border border-purple-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl font-bold text-purple-400">A</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400">Azione (Action)</h2>
          </div>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg">
            <div>
              <span className="font-semibold text-purple-400 text-lg">Descrizione:</span>
              <p className="mt-2 leading-relaxed">
                L'azione è il compito specifico che vuoi che l'AI esegua. Deve essere chiara, concisa e misurabile.
                Una buona azione usa verbi d'azione precisi e specifica esattamente cosa deve essere creato o fatto.
              </p>
            </div>
            <div>
              <span className="font-semibold text-purple-400 text-lg">Verbi d'azione efficaci:</span>
              <ul className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
                <li>• Scrivi</li>
                <li>• Crea</li>
                <li>• Analizza</li>
                <li>• Progetta</li>
                <li>• Sviluppa</li>
                <li>• Ottimizza</li>
                <li>• Genera</li>
                <li>• Pianifica</li>
                <li>• Riassumi</li>
                <li>• Confronta</li>
                <li>• Valuta</li>
                <li>• Struttura</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-purple-400 text-lg">Esempio:</span>
              <div className="mt-2 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-200 italic">
                  "Scrivi un'email di lancio prodotto che evidenzi i tre principali vantaggi competitivi del software,
                  includa una call-to-action chiara per iscriversi alla demo gratuita, e crei un senso di urgenza
                  menzionando l'offerta limitata."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formato Section */}
        <section className="bg-slate-800/50 border border-amber-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl font-bold text-amber-400">F</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-400">Formato (Format)</h2>
          </div>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg">
            <div>
              <span className="font-semibold text-amber-400 text-lg">Descrizione:</span>
              <p className="mt-2 leading-relaxed">
                Il formato specifica la struttura e l'organizzazione dell'output desiderato. Definire il formato aiuta
                l'AI a organizzare le informazioni nel modo più utile per i tuoi scopi, che si tratti di un elenco puntato,
                un paragrafo, una tabella, o qualsiasi altra struttura.
              </p>
            </div>
            <div>
              <span className="font-semibold text-amber-400 text-lg">Formati comuni:</span>
              <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                <li><strong>Elenco puntato</strong> - Ideale per features, benefici, step-by-step</li>
                <li><strong>Paragrafi</strong> - Per contenuti narrativi e descrittivi</li>
                <li><strong>Tabelle</strong> - Per confronti e dati strutturati</li>
                <li><strong>Titolo + Sottotitoli</strong> - Per articoli e guide</li>
                <li><strong>Script/Dialogo</strong> - Per video e podcast</li>
                <li><strong>JSON/Codice</strong> - Per output tecnici</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-amber-400 text-lg">Esempio:</span>
              <div className="mt-2 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-200 italic">
                  "Struttura l'email con: 1) Un oggetto accattivante (max 50 caratteri), 2) Un'introduzione personale
                  (2-3 righe), 3) Tre benefici principali in formato elenco puntato, 4) Un paragrafo sulla call-to-action,
                  5) Firma professionale."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Section */}
        <section className="bg-slate-800/50 border border-rose-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl font-bold text-rose-400">T</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-400">Target (Audience)</h2>
          </div>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg">
            <div>
              <span className="font-semibold text-rose-400 text-lg">Descrizione:</span>
              <p className="mt-2 leading-relaxed">
                Il target definisce il pubblico di destinazione per il contenuto. Conoscere il pubblico permette all'AI
                di adattare il linguaggio, il tono, il livello di complessità e gli esempi per massimizzare l'efficacia
                della comunicazione.
              </p>
            </div>
            <div>
              <span className="font-semibold text-rose-400 text-lg">Aspetti da considerare:</span>
              <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                <li><strong>Livello di expertise</strong> - Principiante, intermedio, esperto</li>
                <li><strong>Ruolo professionale</strong> - Manager, sviluppatore, marketer, ecc.</li>
                <li><strong>Dimensione azienda</strong> - Startup, PMI, enterprise</li>
                <li><strong>Settore</strong> - Tecnologia, finanza, sanità, ecc.</li>
                <li><strong>Obiettivi e sfide</strong> - Cosa cercano e cosa li preoccupa</li>
                <li><strong>Preferenze di comunicazione</strong> - Formale vs. informale, tecnico vs. accessibile</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-rose-400 text-lg">Esempio:</span>
              <div className="mt-2 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-200 italic">
                  "Il pubblico target sono CTO e VP of Engineering di aziende tecnologiche con 50-500 dipendenti.
                  Cercano soluzioni per migliorare la produttività dei team remoti e sono familiari con strumenti
                  di project management ma frustrati dalle soluzioni attuali."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Complete Prompt */}
        <section className="bg-gradient-to-r from-emerald-900/30 to-sky-900/30 border border-emerald-700/50 p-8 rounded-xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-6">Esempio di Prompt C.R.A.F.T. Completo</h2>
          <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-6 space-y-4">
            <div>
              <span className="font-semibold text-emerald-400">CONTESTO:</span>
              <p className="text-slate-200 mt-1">
                Lavori per TechFlow, un'azienda che ha sviluppato un software innovativo di project management per team distribuiti,
                con funzionalità AI per l'automazione delle task e analytics in tempo reale.
              </p>
            </div>
            <div>
              <span className="font-semibold text-sky-400">RUOLO:</span>
              <p className="text-slate-200 mt-1">
                Sei un esperto copywriter B2B con 8 anni di esperienza in email marketing per il settore SaaS,
                specializzato in campagne di lancio prodotto ad alto tasso di conversione.
              </p>
            </div>
            <div>
              <span className="font-semibold text-purple-400">AZIONE:</span>
              <p className="text-slate-200 mt-1">
                Scrivi un'email di lancio prodotto che presenti TechFlow evidenziando come risolve i tre principali
                pain points dei team distribuiti, includa social proof, e convinca il lettore a prenotare una demo.
              </p>
            </div>
            <div>
              <span className="font-semibold text-amber-400">FORMATO:</span>
              <p className="text-slate-200 mt-1">
                Struttura: Oggetto accattivante (max 50 char) → Intro personale (2-3 righe) → Tre pain points con relative soluzioni
                → Testimonianza breve → Call-to-action chiara con urgency → Firma professionale
              </p>
            </div>
            <div>
              <span className="font-semibold text-rose-400">TARGET:</span>
              <p className="text-slate-200 mt-1">
                CTO e VP of Engineering di aziende tech 50-500 dipendenti, che gestiscono team distribuiti e cercano
                soluzioni per aumentare produttività e visibilità sui progetti.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-gradient-to-r from-sky-900/30 to-purple-900/30 border border-sky-700/50 p-8 rounded-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-300 mb-6">💡 Best Practices</h2>
          <ul className="space-y-4 text-slate-300 text-base sm:text-lg">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">
                <strong>Sii specifico:</strong> Più dettagli fornisci in ogni elemento C.R.A.F.T.,
                migliore sarà la qualità dell'output generato.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">
                <strong>Usa esempi:</strong> Quando possibile, fornisci esempi concreti di cosa vuoi ottenere
                o di stili da cui trarre ispirazione.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">
                <strong>Itera e raffina:</strong> Il primo prompt potrebbe non essere perfetto.
                Usa i risultati per raffinare e migliorare il tuo approccio C.R.A.F.T.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">
                <strong>Adatta il framework:</strong> Non tutti gli elementi sono sempre necessari.
                Usa il buon senso e adatta C.R.A.F.T. alle tue esigenze specifiche.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CraftGuideView;

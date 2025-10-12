
import React from 'react';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-emerald-400">Benvenuto nel Generatore di Prompt C.R.A.F.T.</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">&times;</button>
        </div>
        <p className="text-slate-300 mb-6">
          Questo strumento ti aiuta a creare prompt potenti ed efficaci per i modelli di IA utilizzando il framework C.R.A.F.T. Fornisci semplicemente un argomento di base e noi lo espanderemo in un prompt dettagliato e strutturato.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-sky-400 mb-2">C - Contesto</h3>
            <p className="text-slate-400">Fornisci le informazioni di base necessarie. Qual è la situazione? Quali sono i vincoli? Prepara il terreno per l'IA.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-sky-400 mb-2">R - Ruolo</h3>
            <p className="text-slate-400">Assegna un ruolo o una persona specifica all'IA. Questo ne determina il tono, l'esperienza e la prospettiva. (es. "Sei un copywriter esperto", "Agisci come uno sviluppatore Python senior").</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-sky-400 mb-2">A - Azione</h3>
            <p className="text-slate-400">Definisci chiaramente il compito che vuoi che l'IA esegua. Usa verbi d'azione forti. (es. "Genera un elenco", "Scrivi un articolo", "Analizza questi dati").</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-sky-400 mb-2">F - Formato</h3>
            <p className="text-slate-400">Specifica il formato di output desiderato. Sii esplicito. (es. "in un array JSON", "come tabella markdown", "con un titolo, tre paragrafi e una conclusione").</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-sky-400 mb-2">T - Target</h3>
            <p className="text-slate-400">Definisci il pubblico di destinazione per la risposta. Ciò influenza la complessità, il vocabolario e lo stile dell'output. (es. "per un pubblico di principianti", "per dirigenti di alto livello").</p>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
        >
          Capito, iniziamo!
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;
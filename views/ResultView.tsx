import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CraftPrompt } from '../types';
import { SaveIcon, TestTubeIcon, DocumentDuplicateIcon, CheckIcon, ArrowLeftIcon } from '../components/IconComponents';
import WarningModal from '../components/WarningModal';

const ResultView: React.FC = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [craftPrompt, setCraftPrompt] = useState<CraftPrompt>({
    contexto: '',
    ruolo: '',
    azione: '',
    formato: '',
    target: '',
  });
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Carica i dati dal localStorage
    const storedTopic = localStorage.getItem('currentTopic');
    const storedPrompt = localStorage.getItem('currentCraftPrompt');
    
    if (storedTopic) setTopic(storedTopic);
    if (storedPrompt) {
      try {
        setCraftPrompt(JSON.parse(storedPrompt));
      } catch (e) {
        console.error("Failed to parse stored prompt", e);
      }
    }

    // Carica i prompt salvati
    try {
      const storedPrompts = localStorage.getItem('savedCraftPrompts');
      if (storedPrompts) {
        setSavedPrompts(JSON.parse(storedPrompts));
      }
    } catch (e) {
      console.error("Failed to load saved prompts", e);
    }
  }, []);

  const handleCraftInputChange = (field: keyof CraftPrompt, value: string) => {
    setCraftPrompt(prev => ({ ...prev, [field]: value }));
  };

  const combinePrompt = (prompt: CraftPrompt): string => {
    return `Contesto: ${prompt.contexto}\n\nRuolo: ${prompt.ruolo}\n\nAzione: ${prompt.azione}\n\nFormato: ${prompt.formato}\n\nTarget: ${prompt.target}`;
  };

  const handleSavePrompt = () => {
    if (!topic.trim() || Object.values(craftPrompt).some(val => !(val as string).trim())) {
      setError("Per favore, assicurati che tutti i campi C.R.A.F.T. siano compilati prima di salvare.");
      return;
    }
    const newSavedPrompt = {
      id: new Date().toISOString(),
      topic,
      prompt: craftPrompt,
      createdAt: new Date().toISOString(),
    };
    const updatedPrompts = [newSavedPrompt, ...savedPrompts];
    setSavedPrompts(updatedPrompts);
    localStorage.setItem('savedCraftPrompts', JSON.stringify(updatedPrompts));
    setError("Prompt salvato con successo!");
    setTimeout(() => setError(null), 3000);
  };

  const handleTestPrompt = () => {
    const fullPrompt = combinePrompt(craftPrompt);
    if (!fullPrompt.trim() || Object.values(craftPrompt).every(v => !(v as string).trim())) {
      setError("Il prompt è vuoto. Assicurati che tutti i campi siano compilati prima di testare.");
      return;
    }
    // Salva il prompt corrente per il test e naviga
    localStorage.setItem('testPrompt', fullPrompt);
    navigate('/test');
  };

  const handleCopyPrompt = () => {
    const fullPrompt = combinePrompt(craftPrompt);
    navigator.clipboard.writeText(fullPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!topic && !craftPrompt.contexto) {
    return (
      <div className="bg-slate-900 text-slate-200 font-sans flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <p className="text-xl text-slate-400 mb-4">Nessun prompt trovato</p>
          <button
            onClick={handleBackToHome}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-200 font-sans py-8">
      {error && <WarningModal title={error.includes("successo") ? "Successo" : "Attenzione"} onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Indietro</span>
            </button>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Prompt Generato</h2>
              <p className="text-slate-400 mt-1">Argomento: {topic}</p>
            </div>
          </div>
        </header>

        {/* C.R.A.F.T. Editor */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Modifica il tuo Prompt C.R.A.F.T.</h3>
          <div className="space-y-4">
            {Object.entries(craftPrompt).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-md font-medium text-slate-300 capitalize mb-2">
                  {key === 'contexto' ? 'Contesto' : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <textarea
                  id={key}
                  value={value}
                  onChange={(e) => handleCraftInputChange(key as keyof CraftPrompt, e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
              onClick={handleSavePrompt} 
              className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 group"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(4px)';
                  front.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(2px)';
                  front.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseDown={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(1px)';
                  front.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseUp={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(4px)';
                  front.style.transform = 'translateY(-4px)';
                }
              }}
            >
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-indigo-900/25 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(2px)' }}
              />
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-indigo-950 via-indigo-700 to-indigo-950"
              />
              <span 
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold bg-indigo-600 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(-2px)' }}
              >
                <SaveIcon className="w-5 h-5" /> Salva Prompt
              </span>
            </button>
            <button 
              onClick={handleTestPrompt} 
              className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 group"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(4px)';
                  front.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(2px)';
                  front.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseDown={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(1px)';
                  front.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseUp={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(4px)';
                  front.style.transform = 'translateY(-4px)';
                }
              }}
            >
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-green-900/25 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(2px)' }}
              />
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-green-950 via-green-700 to-green-950"
              />
              <span 
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold bg-green-600 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(-2px)' }}
              >
                <TestTubeIcon className="w-5 h-5" /> Testa Prompt
              </span>
            </button>
            <button 
              onClick={handleCopyPrompt} 
              className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 group"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(4px)';
                  front.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(2px)';
                  front.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseDown={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(1px)';
                  front.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseUp={(e) => {
                const shadow = e.currentTarget.querySelector('span:first-child');
                const front = e.currentTarget.querySelector('span:last-child');
                if (shadow && front) {
                  shadow.style.transform = 'translateY(4px)';
                  front.style.transform = 'translateY(-4px)';
                }
              }}
            >
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-slate-900/25 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(2px)' }}
              />
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-slate-950 via-slate-700 to-slate-950"
              />
              <span 
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold bg-slate-600 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(-2px)' }}
              >
                {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <DocumentDuplicateIcon className="w-5 h-5" />}
                {copied ? 'Copiato!' : 'Copia Prompt'}
              </span>
            </button>
          </div>
        </section>

        {/* Preview Section */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-fuchsia-400">Anteprima del Prompt</h3>
            <button
              onClick={handleCopyPrompt}
              className="text-slate-400 hover:text-slate-200 transition-colors p-2"
              title="Copia prompt"
            >
              {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <DocumentDuplicateIcon className="w-5 h-5" />}
            </button>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg whitespace-pre-wrap text-slate-300 font-mono text-sm">
            {combinePrompt(craftPrompt)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultView;
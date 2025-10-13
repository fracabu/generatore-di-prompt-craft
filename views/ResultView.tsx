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
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai'>('gemini');

  useEffect(() => {
    // Carica i dati dal localStorage
    const storedTopic = localStorage.getItem('currentTopic');
    const storedPrompt = localStorage.getItem('currentCraftPrompt');
    const storedProvider = localStorage.getItem('selectedProvider') as 'gemini' | 'openai';
    
    if (storedTopic) setTopic(storedTopic);
    if (storedPrompt) {
      try {
        setCraftPrompt(JSON.parse(storedPrompt));
      } catch (err) {
        console.error('Error parsing stored prompt:', err);
      }
    }
    if (storedProvider) setSelectedProvider(storedProvider);
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
    localStorage.setItem('testProvider', selectedProvider);
    navigate('/test');
  };

  const handleCopyPrompt = () => {
    const fullPrompt = combinePrompt(craftPrompt);
    navigator.clipboard.writeText(fullPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportPrompt = () => {
    let exportContent = `# Prompt C.R.A.F.T. - ${topic}\n\n`;
    exportContent += `**Generato il:** ${new Date().toLocaleString('it-IT')}\n\n`;
    exportContent += `---\n\n`;
    exportContent += `## Contesto\n${craftPrompt.contexto}\n\n`;
    exportContent += `## Ruolo\n${craftPrompt.ruolo}\n\n`;
    exportContent += `## Azione\n${craftPrompt.azione}\n\n`;
    exportContent += `## Formato\n${craftPrompt.formato}\n\n`;
    exportContent += `## Target\n${craftPrompt.target}\n\n`;
    exportContent += `---\n\n`;
    exportContent += `## Prompt Completo\n${combinePrompt(craftPrompt)}`;

    // Crea e scarica il file
    const blob = new Blob([exportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-craft-${topic.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setError("Prompt esportato con successo!");
    setTimeout(() => setError(null), 3000);
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
    <div className="bg-slate-900 text-slate-200 font-sans py-4 sm:py-6 lg:py-8">
      {error && <WarningModal title={error.includes("successo") ? "Successo" : "Attenzione"} onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="max-w-5xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Mobile: Centered content with back button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Mobile: Back button - centered and compact */}
            <div className="sm:hidden flex justify-center w-full">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-1 px-2 rounded-lg transition-colors text-xs"
              >
                <ArrowLeftIcon className="w-3 h-3" />
                <span>Indietro</span>
              </button>
            </div>
            
            {/* Title - centered on mobile, left-aligned on desktop */}
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-slate-100">Prompt Generato</h2>
              <p className="text-slate-400 mt-0.5 sm:mt-1 text-xs sm:text-sm">Argomento: {topic}</p>
            </div>
            
            {/* Desktop: Back button - inline with title */}
            <div className="hidden sm:flex">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Indietro</span>
              </button>
            </div>
          </div>
        </header>

        {/* C.R.A.F.T. Editor */}
        <section className="bg-slate-800/50 border border-slate-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-400 mb-3 sm:mb-4">Modifica il tuo Prompt C.R.A.F.T.</h3>
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(craftPrompt).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm sm:text-md font-medium text-slate-300 capitalize mb-1.5 sm:mb-2">
                  {key === 'contexto' ? 'Contesto' : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <textarea
                  id={key}
                  value={value}
                  onChange={(e) => handleCraftInputChange(key as keyof CraftPrompt, e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 sm:p-3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Preview Section */}
        <section className="bg-slate-800/50 border border-slate-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-fuchsia-400">Anteprima del Prompt</h3>
          </div>
          <div className="bg-slate-900/50 p-3 sm:p-4 rounded-lg whitespace-pre-wrap text-slate-300 font-mono text-xs sm:text-sm mb-4 sm:mb-6 max-h-60 sm:max-h-80 overflow-y-auto scrollbar-hide">
            {combinePrompt(craftPrompt)}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 lg:gap-4">
            <button 
              onClick={handleExportPrompt} 
              className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 group w-full sm:w-auto"
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
                className="relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-white font-semibold bg-green-600 transition-transform duration-300 ease-out text-sm"
                style={{ transform: 'translateY(-2px)' }}
              >
                <DocumentDuplicateIcon className="w-4 h-4 sm:w-5 sm:h-5" /> 
                <span className="hidden sm:inline">Esporta MD</span>
              </span>
            </button>
            <button 
              onClick={handleTestPrompt} 
              className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 group w-full sm:w-auto"
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
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-blue-900/25 transition-transform duration-300 ease-out"
                style={{ transform: 'translateY(2px)' }}
              />
              <span 
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-blue-950 via-blue-700 to-blue-950"
              />
              <span 
                className="relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-white font-semibold bg-blue-600 transition-transform duration-300 ease-out text-sm"
                style={{ transform: 'translateY(-2px)' }}
              >
                <TestTubeIcon className="w-4 h-4 sm:w-5 sm:h-5" /> 
                <span className="hidden sm:inline">Testa Prompt</span>
              </span>
            </button>
            <button 
              onClick={handleCopyPrompt} 
              className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 group w-full sm:w-auto"
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
                className="relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-white font-semibold bg-slate-600 transition-transform duration-300 ease-out text-sm"
                style={{ transform: 'translateY(-2px)' }}
              >
                {copied ? <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" /> : <DocumentDuplicateIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="hidden sm:inline">{copied ? 'Copiato!' : 'Copia Prompt'}</span>
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultView;
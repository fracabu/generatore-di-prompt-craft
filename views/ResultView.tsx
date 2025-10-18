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
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai' | 'openrouter'>('gemini');
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);

  useEffect(() => {
    // Carica i dati dal localStorage
    const storedTopic = localStorage.getItem('currentTopic');
    const storedPrompt = localStorage.getItem('currentCraftPrompt');
    const storedProvider = localStorage.getItem('selectedProvider') as 'gemini' | 'openai' | 'openrouter';
    const storedSavedPrompts = localStorage.getItem('savedCraftPrompts');

    console.log('ResultView - Loading from localStorage:', { storedTopic, storedPrompt }); // Debug log

    if (storedTopic) setTopic(storedTopic);
    if (storedPrompt) {
      try {
        const parsed = JSON.parse(storedPrompt);
        console.log('ResultView - Parsed prompt:', parsed); // Debug log
        // Assicurati che tutti i campi esistano (con fallback per OpenRouter che può usare maiuscole)
        const finalPrompt = {
          contexto: parsed.contexto || parsed.Contexto || '',
          ruolo: parsed.ruolo || parsed.Ruolo || '',
          azione: parsed.azione || parsed.Azione || '',
          formato: parsed.formato || parsed.Formato || '',
          target: parsed.target || parsed.Target || ''
        };
        console.log('ResultView - Final prompt to display:', finalPrompt); // Debug log
        setCraftPrompt(finalPrompt);
      } catch (err) {
        console.error('Error parsing stored prompt:', err);
      }
    }
    if (storedProvider) setSelectedProvider(storedProvider);
    if (storedSavedPrompts) {
      try {
        setSavedPrompts(JSON.parse(storedSavedPrompts));
      } catch (err) {
        console.error('Error parsing saved prompts:', err);
      }
    }
  }, []);

  const handleCraftInputChange = (field: keyof CraftPrompt, value: string) => {
    setCraftPrompt(prev => ({ ...prev, [field]: value }));
  };

  const combinePrompt = (prompt: CraftPrompt): string => {
    return `Contesto: ${prompt.contexto || ''}\n\nRuolo: ${prompt.ruolo || ''}\n\nAzione: ${prompt.azione || ''}\n\nFormato: ${prompt.formato || ''}\n\nTarget: ${prompt.target || ''}`;
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
    <div className="bg-slate-900 text-slate-200 font-sans flex-1 flex flex-col overflow-auto">
      {error && <WarningModal title={error.includes("successo") ? "Successo" : "Attenzione"} onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-6 sm:px-12 lg:px-20 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Mobile: Centered content with back button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Indietro</span>
            </button>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">Prompt Generato</h2>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl mt-2">Argomento: {topic}</p>
            </div>
          </div>
        </header>

        {/* C.R.A.F.T. Editor */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 sm:p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-emerald-400 mb-5">Modifica il tuo Prompt C.R.A.F.T.</h3>
          <div className="space-y-4 sm:space-y-5">
            {/* Ordine fisso dei campi */}
            {[
              { key: 'contexto', label: 'Contesto' },
              { key: 'ruolo', label: 'Ruolo' },
              { key: 'azione', label: 'Azione' },
              { key: 'formato', label: 'Formato' },
              { key: 'target', label: 'Target' }
            ].map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={key} className="block text-base sm:text-lg font-medium text-slate-300 mb-2">
                  {label}
                </label>
                <textarea
                  id={key}
                  value={craftPrompt[key as keyof CraftPrompt] || ''}
                  onChange={(e) => handleCraftInputChange(key as keyof CraftPrompt, e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 sm:p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm sm:text-base"
                  placeholder={`Inserisci ${label.toLowerCase()}...`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Preview Section */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl sm:text-2xl font-semibold text-fuchsia-400">Anteprima del Prompt</h3>
          </div>
          <div className="bg-slate-900/50 p-4 sm:p-5 rounded-lg whitespace-pre-wrap text-slate-300 font-mono text-sm sm:text-base mb-6 max-h-60 sm:max-h-80 overflow-y-auto scrollbar-hide">
            {combinePrompt(craftPrompt)}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
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
                className="relative flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 rounded-xl text-white font-semibold bg-green-600 transition-transform duration-300 ease-out text-sm sm:text-base"
                style={{ transform: 'translateY(-2px)' }}
              >
                <DocumentDuplicateIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Esporta MD</span>
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
                className="relative flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 rounded-xl text-white font-semibold bg-blue-600 transition-transform duration-300 ease-out text-sm sm:text-base"
                style={{ transform: 'translateY(-2px)' }}
              >
                <TestTubeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Testa Prompt</span>
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
                className="relative flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 rounded-xl text-white font-semibold bg-slate-600 transition-transform duration-300 ease-out text-sm sm:text-base"
                style={{ transform: 'translateY(-2px)' }}
              >
                {copied ? <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" /> : <DocumentDuplicateIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
                <span>{copied ? 'Copiato!' : 'Copia Prompt'}</span>
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultView;
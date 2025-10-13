import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CraftPrompt } from '../types';
import { generateCraftPrompt } from '../services/aiService';
import { examplePrompts } from '../data/examplePrompts';
import { SparklesIcon, QuestionMarkIcon, MegaphoneIcon, BookOpenIcon, DocumentTextIcon, YouTubeIcon } from '../components/IconComponents';
import TutorialModal from '../components/TutorialModal';
import WarningModal from '../components/WarningModal';

const initialCraftPrompt: CraftPrompt = {
  contexto: '',
  ruolo: '',
  azione: '',
  formato: '',
  target: '',
};

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [craftPrompt, setCraftPrompt] = useState<CraftPrompt>(initialCraftPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState(examplePrompts.slice(0, 3));
  const [hasApiKey, setHasApiKey] = useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Icon mapping per i suggerimenti
  const getSuggestionIcon = (topic: string) => {
    if (topic.toLowerCase().includes('social media') || topic.toLowerCase().includes('marketing') || topic.toLowerCase().includes('prodotto')) {
      return MegaphoneIcon;
    }
    if (topic.toLowerCase().includes('blog') || topic.toLowerCase().includes('ricetta') || topic.toLowerCase().includes('cucina')) {
      return BookOpenIcon;
    }
    if (topic.toLowerCase().includes('email') || topic.toLowerCase().includes('corso') || topic.toLowerCase().includes('documento')) {
      return DocumentTextIcon;
    }
    if (topic.toLowerCase().includes('video') || topic.toLowerCase().includes('youtube')) {
      return YouTubeIcon;
    }
    return SparklesIcon; // Default icon
  };

  // Controlla se la chiave API è configurata
  useEffect(() => {
    const checkApiKey = () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      setHasApiKey(!!apiKey);
    };
    
    checkApiKey();
    
    // Ascolta i cambiamenti al localStorage
    const handleStorageChange = () => {
      checkApiKey();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  // Non svuotare il localStorage all'avvio per permettere navigazione tra view
  
  // Carica dati esistenti se presenti (per navigazione tra view)
  useEffect(() => {
    const storedTopic = localStorage.getItem('currentTopic');
    const storedPrompt = localStorage.getItem('currentCraftPrompt');
    
    if (storedTopic) setTopic(storedTopic);
    if (storedPrompt) {
      try {
        setCraftPrompt(JSON.parse(storedPrompt));
      } catch (err) {
        console.error('Error parsing stored prompt:', err);
      }
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
    }
  }, [topic]);

  // Carousel animation - mostra 3 card che scorrono verso destra
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestions(prev => {
        const currentIndex = examplePrompts.findIndex(p => p.id === prev[0].id);
        const nextIndex = (currentIndex + 1) % examplePrompts.length;
        // Prendi 3 suggerimenti consecutivi
        const suggestions = [];
        for (let i = 0; i < 3; i++) {
          const index = (nextIndex + i) % examplePrompts.length;
          suggestions.push(examplePrompts[index]);
        }
        return suggestions;
      });
    }, 3000); // Cambia ogni 3 secondi per un effetto più fluido

    return () => clearInterval(interval);
  }, []);

  const handleGeneratePrompt = async () => {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (!apiKey) {
      setError("Per favore, configura la tua chiave API Gemini cliccando sul pulsante 'API' in alto a destra.");
      return;
    }
    
    if (!topic.trim()) {
      setError("Per favore, inserisci un argomento per iniziare.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const generatedPrompt = await generateCraftPrompt(topic, 'gemini');
      setCraftPrompt(generatedPrompt);
      // Salva i dati nello stato globale o localStorage e naviga
      localStorage.setItem('currentTopic', topic);
      localStorage.setItem('currentCraftPrompt', JSON.stringify(generatedPrompt));
      localStorage.setItem('selectedProvider', 'gemini');
      navigate('/result');
    } catch (err: any) {
      setError(err.message || "Si è verificato un errore sconosciuto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 font-sans flex-1 flex flex-col overflow-hidden">
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      {error && <WarningModal title="Attenzione" onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-3 flex flex-col overflow-hidden">
        {/* Header Section */}
        <header className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4 flex-shrink-0">
          <div className="flex items-start sm:items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-full">
                <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-100">Crea un nuovo Prompt</h2>
                <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">Inserisci un argomento e genera un prompt C.R.A.F.T.</p>
                <p className="text-slate-400 text-xs sm:hidden">Genera prompt C.R.A.F.T.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowTutorial(true)}
              className="flex items-center space-x-1 sm:space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
              aria-label="Mostra tutorial C.R.A.F.T."
            >
              <QuestionMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Cos'è C.R.A.F.T.?</span>
              <span className="xs:hidden">?</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Input Section */}
          <section className="bg-slate-800/50 border border-slate-700 p-3 sm:p-4 rounded-xl shadow-lg flex-shrink-0">
            <label htmlFor="topic-input" className="block text-sm sm:text-base font-semibold text-sky-400 mb-1.5 sm:mb-2">1. Inserisci il tuo argomento</label>
            <p className="text-slate-400 mb-2 sm:mb-3 text-xs">Descrivi cosa vuoi ottenere. Es: "un'email di marketing per un nuovo prodotto"</p>
            <div className="flex flex-col gap-2 sm:gap-3">
              <textarea
                ref={textareaRef}
                id="topic-input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Es: Una sceneggiatura per un video YouTube sui viaggi spaziali"
                className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm resize-none overflow-hidden scrollbar-hide"
                style={{ minHeight: '40px', maxHeight: '128px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGeneratePrompt();
                  }
                }}
                rows={1}
              />
              <button
                onClick={handleGeneratePrompt}
                disabled={isLoading}
                className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed group w-full sm:w-auto"
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
                  className="absolute top-0 left-0 w-full h-full rounded-xl bg-sky-900/25 transition-transform duration-300 ease-out"
                  style={{ transform: 'translateY(2px)' }}
                />
                <span 
                  className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-sky-950 via-sky-700 to-sky-950"
                />
                <span 
                  className="flex items-center justify-center min-h-[40px] px-4 py-2 rounded-xl text-white font-semibold bg-sky-600 transition-transform duration-300 ease-out text-sm"
                  style={{ transform: 'translateY(-2px)' }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-white border-slate-400 rounded-full animate-spin mr-2"></div>
                      <span>Generazione...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4 mr-2" />
                      <span>Genera Prompt</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </section>



          {/* Suggestion Cards Carousel */}
          <section className="bg-slate-800/30 border border-slate-700 p-2 sm:p-3 rounded-xl flex-shrink-0">
            <h3 className="text-sm sm:text-base font-semibold text-emerald-400 mb-2">Idee per iniziare</h3>
            <div className="flex gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto scrollbar-hide py-2">
              {currentSuggestions.map((suggestion, index) => {
                const IconComponent = getSuggestionIcon(suggestion.topic);
                return (
                  <div 
                    key={suggestion.id}
                    className="flex-none w-56 sm:w-64 md:w-72 lg:w-80 bg-slate-700/50 border border-slate-600 p-2 sm:p-3 md:p-4 rounded-lg cursor-pointer hover:bg-slate-700/70 hover:border-slate-500 transition-all duration-300 transform hover:scale-105 flex flex-col h-36 sm:h-48 md:h-56 lg:h-64"
                    onClick={() => setTopic(suggestion.prompt.azione)}
                  >
                    {/* Icona in alto */}
                    <div className="flex justify-center mb-1.5 sm:mb-2 md:mb-3">
                      <div className="bg-slate-600/50 p-1.5 sm:p-2 md:p-3 rounded-full">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-sky-400" />
                      </div>
                    </div>
                    
                    {/* Contenuto centrato */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-1 sm:space-y-2">
                      {/* Titolo */}
                      <h4 className="font-semibold text-sky-400 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed px-1 sm:px-2">
                        {suggestion.topic}
                      </h4>
                      
                      {/* Descrizione dal prompt C.R.A.F.T. */}
                      <p className="text-slate-300 text-xs leading-tight sm:leading-relaxed px-1 sm:px-2 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                        {suggestion.prompt.azione}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
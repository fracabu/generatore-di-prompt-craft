import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CraftPrompt } from '../types';
import { generateCraftPrompt } from '../services/aiService';
import { examplePrompts } from '../data/examplePrompts';
import { SparklesIcon, QuestionMarkIcon } from '../components/IconComponents';
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
  const [currentSuggestions, setCurrentSuggestions] = useState(examplePrompts.slice(0, 4));
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai'>('gemini');
  const [hasApiKey, setHasApiKey] = useState(false);

  // Controlla se le chiavi API sono configurate
  useEffect(() => {
    const checkApiKeys = () => {
      const geminiKey = localStorage.getItem('gemini_api_key');
      const openaiKey = localStorage.getItem('openai_api_key');
      const hasGeminiKey = !!geminiKey;
      const hasOpenaiKey = !!openaiKey;
      
      // Se il provider selezionato non ha una chiave, prova a cambiare provider
      if (selectedProvider === 'gemini' && !hasGeminiKey && hasOpenaiKey) {
        setSelectedProvider('openai');
      } else if (selectedProvider === 'openai' && !hasOpenaiKey && hasGeminiKey) {
        setSelectedProvider('gemini');
      }
      
      setHasApiKey(!!(geminiKey || openaiKey));
    };
    
    checkApiKeys();
    
    // Ascolta i cambiamenti al localStorage
    const handleStorageChange = () => {
      checkApiKeys();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [selectedProvider]);

  // Pulisci i dati precedenti all'avvio
  useEffect(() => {
    localStorage.removeItem('currentTopic');
    localStorage.removeItem('currentCraftPrompt');
    localStorage.removeItem('testPrompt');
  }, []);

  // Ruota le suggestioni ogni 10 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestions(prev => {
        const currentIndex = examplePrompts.findIndex(p => p.id === prev[0].id);
        const nextIndex = (currentIndex + 4) % examplePrompts.length;
        // Gestisci il caso in cui non ci sono abbastanza suggerimenti rimanenti
        const suggestions = [];
        for (let i = 0; i < 4; i++) {
          const index = (nextIndex + i) % examplePrompts.length;
          suggestions.push(examplePrompts[index]);
        }
        return suggestions;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleGeneratePrompt = async () => {
    const geminiKey = localStorage.getItem('gemini_api_key');
    const openaiKey = localStorage.getItem('openai_api_key');
    
    if (!geminiKey && !openaiKey) {
      setError("Per favore, configura una chiave API cliccando sul pulsante 'API' in alto a destra.");
      return;
    }
    
    if (selectedProvider === 'gemini' && !geminiKey) {
      setError("Chiave API Gemini non configurata. Seleziona OpenAI o configura la chiave Gemini.");
      return;
    }
    
    if (selectedProvider === 'openai' && !openaiKey) {
      setError("Chiave API OpenAI non configurata. Seleziona Gemini o configura la chiave OpenAI.");
      return;
    }
    
    if (!topic.trim()) {
      setError("Per favore, inserisci un argomento per iniziare.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const generatedPrompt = await generateCraftPrompt(topic, selectedProvider);
      setCraftPrompt(generatedPrompt);
      // Salva i dati nello stato globale o localStorage e naviga
      localStorage.setItem('currentTopic', topic);
      localStorage.setItem('currentCraftPrompt', JSON.stringify(generatedPrompt));
      localStorage.setItem('selectedProvider', selectedProvider);
      navigate('/result');
    } catch (err: any) {
      setError(err.message || "Si è verificato un errore sconosciuto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 font-sans h-screen flex flex-col">
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      {error && <WarningModal title="Attenzione" onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <SparklesIcon className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Crea un nuovo Prompt</h2>
              <p className="text-slate-400 mt-1">Inserisci un argomento e genera un prompt C.R.A.F.T. personalizzato</p>
            </div>
          </div>
          <button 
            onClick={() => setShowTutorial(true)}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            aria-label="Mostra tutorial C.R.A.F.T."
          >
            <QuestionMarkIcon className="w-5 h-5" />
            <span>Cos'è C.R.A.F.T.?</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Input Section */}
          <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg mt-8">
            <label htmlFor="topic-input" className="block text-lg font-semibold text-sky-400 mb-2">1. Inserisci il tuo argomento</label>
            <p className="text-slate-400 mb-4 text-sm">Descrivi brevemente cosa vuoi ottenere. Ad esempio: "un'email di marketing per un nuovo prodotto" o "un post per un blog sui benefici dello yoga".</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Es: Una sceneggiatura per un video YouTube sui viaggi spaziali"
                className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGeneratePrompt()}
              />
              <button
                onClick={handleGeneratePrompt}
                disabled={isLoading}
                className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed group"
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
                  className="relative flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold bg-sky-600 transition-transform duration-300 ease-out"
                  style={{ transform: 'translateY(-2px)' }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-white border-slate-400 rounded-full animate-spin mr-2"></div>
                      <span>Generazione...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5 mr-2" />
                      <span>Genera Prompt</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </section>

          {/* Provider Selection */}
          <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg">
            <label className="block text-lg font-semibold text-purple-400 mb-4">2. Scegli il provider AI</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedProvider('gemini')}
                disabled={!localStorage.getItem('gemini_api_key')}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedProvider === 'gemini'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                } ${!localStorage.getItem('gemini_api_key') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedProvider === 'gemini' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                  <div className="text-left">
                    <h4 className="font-semibold text-emerald-400">Google Gemini</h4>
                    <p className="text-xs text-slate-400">
                      {localStorage.getItem('gemini_api_key') ? 'Configurato' : 'Non configurato'}
                    </p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedProvider('openai')}
                disabled={!localStorage.getItem('openai_api_key')}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedProvider === 'openai'
                    ? 'border-sky-500 bg-sky-500/10'
                    : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                } ${!localStorage.getItem('openai_api_key') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedProvider === 'openai' ? 'bg-sky-500' : 'bg-slate-600'}`} />
                  <div className="text-left">
                    <h4 className="font-semibold text-sky-400">OpenAI GPT-4</h4>
                    <p className="text-xs text-slate-400">
                      {localStorage.getItem('openai_api_key') ? 'Configurato' : 'Non configurato'}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* Suggestion Cards */}
          <section className="bg-slate-800/30 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Idee per iniziare</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSuggestions.map((suggestion, index) => (
                <div 
                  key={suggestion.id}
                  className="bg-slate-700/50 border border-slate-600 p-4 rounded-lg cursor-pointer hover:bg-slate-700/70 hover:border-slate-500 transition-all duration-200"
                  onClick={() => setTopic(suggestion.topic)}
                >
                  <h4 className="font-semibold text-sky-400 mb-2">
                    {index === 0 && '🌱 Marketing Sostenibile'}
                    {index === 1 && '🍳 Blog di Cucina'}
                    {index === 2 && '💡 Tecnologia Semplice'}
                    {index === 3 && '🚀 Viaggi Spaziali'}
                  </h4>
                  <p className="text-slate-300 text-sm">{suggestion.prompt.contexto.substring(0, 80)}...</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
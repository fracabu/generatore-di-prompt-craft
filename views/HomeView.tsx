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
  // Carica il provider dal localStorage, default a 'gemini' se non presente
  const [provider, setProvider] = useState<'gemini' | 'openai' | 'openrouter'>(() => {
    const savedProvider = localStorage.getItem('selectedProvider') as 'gemini' | 'openai' | 'openrouter';
    return savedProvider || 'gemini';
  });
  const [openrouterModel, setOpenrouterModel] = useState<string>('openai/gpt-4o');
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

  // Controlla se la chiave API è configurata per il provider selezionato
  useEffect(() => {
    const checkApiKey = () => {
      const geminiKey = localStorage.getItem('gemini_api_key');
      const openaiKey = localStorage.getItem('openai_api_key');
      const openrouterKey = localStorage.getItem('openrouter_api_key');

      if (provider === 'gemini') {
        setHasApiKey(!!geminiKey);
      } else if (provider === 'openai') {
        setHasApiKey(!!openaiKey);
      } else {
        setHasApiKey(!!openrouterKey);
      }
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
  }, [provider]);

  // Non svuotare il localStorage all'avvio per permettere navigazione tra view
  
  // Carica dati esistenti se presenti (per navigazione tra view)
  useEffect(() => {
    const storedTopic = localStorage.getItem('currentTopic');
    const storedPrompt = localStorage.getItem('currentCraftPrompt');
    const storedModel = localStorage.getItem('openrouter_model');
    const storedProvider = localStorage.getItem('selectedProvider') as 'gemini' | 'openai' | 'openrouter';
    const generationInProgress = localStorage.getItem('generationInProgress') === 'true';

    if (storedTopic) setTopic(storedTopic);
    if (storedPrompt) {
      try {
        setCraftPrompt(JSON.parse(storedPrompt));
      } catch (err) {
        console.error('Error parsing stored prompt:', err);
      }
    }
    if (storedModel) {
      setOpenrouterModel(storedModel);
    }
    if (storedProvider) {
      setProvider(storedProvider);
    }

    // Ripristina lo stato di loading se c'è una generazione in corso
    if (generationInProgress) {
      setIsLoading(true);
    }

    // Controlla periodicamente se la generazione è finita
    const checkInterval = setInterval(() => {
      const stillInProgress = localStorage.getItem('generationInProgress') === 'true';
      const hasNewPrompt = localStorage.getItem('currentCraftPrompt');

      if (!stillInProgress && hasNewPrompt && isLoading) {
        // La generazione è finita mentre eravamo su un'altra pagina
        setIsLoading(false);
        try {
          const parsed = JSON.parse(hasNewPrompt);
          setCraftPrompt(parsed);
          // Naviga automaticamente alla pagina dei risultati
          navigate('/result');
        } catch (err) {
          console.error('Error parsing completed prompt:', err);
        }
      }
    }, 500); // Controlla ogni 500ms

    return () => clearInterval(checkInterval);
  }, [isLoading, navigate]);

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
    const apiKeyName = provider === 'gemini' ? 'gemini_api_key' : provider === 'openai' ? 'openai_api_key' : 'openrouter_api_key';
    const apiKey = localStorage.getItem(apiKeyName);

    if (!apiKey) {
      const providerName = provider === 'gemini' ? 'Gemini' : provider === 'openai' ? 'OpenAI' : 'OpenRouter';
      setError(`Per favore, configura la tua chiave API ${providerName} cliccando sul pulsante 'API' in alto a destra.`);
      return;
    }

    if (!topic.trim()) {
      setError("Per favore, inserisci un argomento per iniziare.");
      return;
    }

    // Salva lo stato di generazione in corso
    setIsLoading(true);
    localStorage.setItem('generationInProgress', 'true');
    localStorage.setItem('currentTopic', topic);
    localStorage.setItem('selectedProvider', provider);
    setError(null);

    // Salva il modello OpenRouter se selezionato
    if (provider === 'openrouter') {
      localStorage.setItem('openrouter_model', openrouterModel);
    }

    try {
      // La chiamata continua anche se l'utente naviga via
      const generatedPrompt = await generateCraftPrompt(topic, provider);
      console.log('Generated prompt received in HomeView:', generatedPrompt); // Debug log

      // Salva i risultati
      const savedJson = JSON.stringify(generatedPrompt);
      console.log('Saving to localStorage:', savedJson); // Debug log
      localStorage.setItem('currentCraftPrompt', savedJson);
      localStorage.removeItem('generationInProgress');

      // Aggiorna lo stato locale se il componente è ancora montato
      setCraftPrompt(generatedPrompt);
      setIsLoading(false);

      // Naviga automaticamente alla pagina dei risultati
      navigate('/result');
    } catch (err: any) {
      console.error('Generation error:', err);
      localStorage.removeItem('generationInProgress');
      setError(err.message || "Si è verificato un errore sconosciuto.");
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
        <div className={`flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 min-h-0 max-w-7xl mx-auto w-full ${isLoading ? 'justify-center items-center' : ''}`}>
          {/* Input Section */}
          <section className={`bg-slate-800/50 border border-slate-700 p-3 sm:p-4 rounded-xl shadow-lg transition-all duration-300 ${isLoading ? 'max-w-2xl w-full' : 'lg:w-1/2 flex-shrink-0'}`}>
            {/* Provider Selection */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-semibold text-sky-400 mb-2">Seleziona AI Provider</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProvider('gemini');
                    localStorage.setItem('selectedProvider', 'gemini');
                  }}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    provider === 'gemini'
                      ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full border-2 ${provider === 'gemini' ? 'bg-white border-white' : 'border-slate-400'}`} />
                  <span>Gemini</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProvider('openai');
                    localStorage.setItem('selectedProvider', 'openai');
                  }}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    provider === 'openai'
                      ? 'bg-sky-600 text-white border-2 border-sky-400'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full border-2 ${provider === 'openai' ? 'bg-white border-white' : 'border-slate-400'}`} />
                  <span>OpenAI</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProvider('openrouter');
                    localStorage.setItem('selectedProvider', 'openrouter');
                  }}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    provider === 'openrouter'
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full border-2 ${provider === 'openrouter' ? 'bg-white border-white' : 'border-slate-400'}`} />
                  <span>OpenRouter</span>
                </button>
              </div>
              {!hasApiKey && (
                <p className="text-red-400 text-xs mt-2">
                  ⚠️ Chiave API {provider === 'gemini' ? 'Gemini' : provider === 'openai' ? 'OpenAI' : 'OpenRouter'} non configurata. Clicca sul pulsante 'API' in alto a destra.
                </p>
              )}

              {/* OpenRouter Model Selection */}
              {provider === 'openrouter' && (
                <div className="mt-3 pt-3 border-t border-slate-600">
                  <label htmlFor="model-select" className="block text-xs font-medium text-slate-300 mb-2">
                    Seleziona Modello OpenRouter
                  </label>
                  <select
                    id="model-select"
                    value={openrouterModel}
                    onChange={(e) => setOpenrouterModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <optgroup label="OpenAI">
                      <option value="openai/gpt-5">GPT-5</option>
                      <option value="openai/gpt-5-pro">GPT-5 Pro</option>
                      <option value="openai/gpt-5-mini">GPT-5 Mini</option>
                      <option value="openai/gpt-5-nano">GPT-5 Nano</option>
                      <option value="openai/gpt-4.1">GPT-4.1</option>
                      <option value="openai/gpt-4.1-mini">GPT-4.1 Mini</option>
                      <option value="openai/gpt-4.1-nano">GPT-4.1 Nano</option>
                      <option value="openai/gpt-4o">GPT-4o</option>
                      <option value="openai/chatgpt-4o-latest">ChatGPT-4o Latest</option>
                      <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
                      <option value="openai/gpt-4o-mini-2024-07-18">GPT-4o Mini (2024-07-18)</option>
                      <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="openai/gpt-oss-20b:free">GPT OSS 20B (Free)</option>
                    </optgroup>
                    <optgroup label="Anthropic">
                      <option value="anthropic/claude-sonnet-4.5">Claude Sonnet 4.5</option>
                      <option value="anthropic/claude-haiku-4.5">Claude Haiku 4.5</option>
                      <option value="anthropic/claude-opus-4.1">Claude Opus 4.1</option>
                      <option value="anthropic/claude-3.7-sonnet:thinking">Claude 3.7 Sonnet Thinking</option>
                      <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                      <option value="anthropic/claude-3.5-haiku">Claude 3.5 Haiku</option>
                    </optgroup>
                    <optgroup label="Google">
                      <option value="google/gemini-pro-1.5">Gemini Pro 1.5</option>
                      <option value="google/gemini-flash-1.5">Gemini Flash 1.5</option>
                      <option value="google/gemini-2.0-flash-exp">Gemini 2.0 Flash (Sperimentale)</option>
                    </optgroup>
                    <optgroup label="Meta Llama">
                      <option value="meta-llama/llama-3.3-70b-instruct">Llama 3.3 70B Instruct</option>
                    </optgroup>
                    <optgroup label="Mistral">
                      <option value="mistralai/mistral-medium-3.1">Mistral Medium 3.1</option>
                      <option value="mistralai/mistral-small-3.2-24b-instruct">Mistral Small 3.2 24B Instruct</option>
                      <option value="mistralai/mistral-small-3.2-24b-instruct:free">Mistral Small 3.2 24B Instruct (Free)</option>
                      <option value="mistralai/mistral-small-24b-instruct-2501">Mistral Small 24B Instruct 2501</option>
                      <option value="mistralai/mistral-tiny">Mistral Tiny</option>
                      <option value="mistralai/mistral-nemo">Mistral Nemo</option>
                      <option value="mistralai/mistral-nemo:free">Mistral Nemo (Free)</option>
                      <option value="mistralai/mistral-7b-instruct">Mistral 7B Instruct</option>
                      <option value="mistralai/mixtral-8x7b-instruct">Mixtral 8x7B Instruct</option>
                    </optgroup>
                    <optgroup label="Qwen">
                      <option value="qwen/qwen3-32b">Qwen3 32B</option>
                      <option value="qwen/qwen3-235b-a22b-2507">Qwen3 235B A22B</option>
                      <option value="qwen/qwen3-235b-a22b:free">Qwen3 235B A22B (Free)</option>
                      <option value="qwen/qwen3-235b-a22b-thinking-2507">Qwen3 235B A22B Thinking</option>
                      <option value="qwen/qwen3-vl-235b-a22b-instruct">Qwen3 VL 235B A22B Instruct</option>
                    </optgroup>
                    <optgroup label="DeepSeek">
                      <option value="deepseek/deepseek-chat">DeepSeek Chat</option>
                      <option value="deepseek/deepseek-r1">DeepSeek R1 (Reasoning)</option>
                      <option value="deepseek/deepseek-r1-0528-qwen3-8b">DeepSeek R1 Qwen3 8B</option>
                    </optgroup>
                    <optgroup label="Zhipu AI (GLM)">
                      <option value="z-ai/glm-4.6">GLM 4.6</option>
                      <option value="z-ai/glm-4.5">GLM 4.5</option>
                    </optgroup>
                    <optgroup label="Altri">
                      <option value="perplexity/llama-3.1-sonar-large-128k-online">Perplexity Sonar (Online)</option>
                      <option value="x-ai/grok-beta">Grok Beta (xAI)</option>
                      <option value="cohere/command-r-plus">Cohere Command R+</option>
                    </optgroup>
                  </select>
                  <p className="text-slate-400 text-xs mt-1">
                    Puoi vedere tutti i modelli su <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">openrouter.ai/models</a>
                  </p>
                </div>
              )}
            </div>

            <label htmlFor="topic-input" className="block text-sm sm:text-base font-semibold text-sky-400 mb-1.5 sm:mb-2">Inserisci il tuo argomento</label>
            <p className="text-slate-400 mb-2 sm:mb-3 text-xs">Descrivi cosa vuoi ottenere. Es: "un'email di marketing per un nuovo prodotto"</p>
            <div className="flex flex-col gap-2 sm:gap-3">
              <textarea
                ref={textareaRef}
                id="topic-input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Es: Una sceneggiatura per un video YouTube sui viaggi spaziali"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm resize-none overflow-hidden scrollbar-hide"
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
                className="pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed group w-fit"
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

          {/* Suggestion Cards Carousel - Nascosta durante la generazione */}
          {!isLoading && (
          <section className="bg-slate-800/30 border border-slate-700 p-2 sm:p-3 rounded-xl lg:w-1/2 flex-shrink-0 overflow-hidden flex flex-col">
            <h3 className="text-sm sm:text-base font-semibold text-emerald-400 mb-2">Idee per iniziare</h3>
            <div className="flex lg:flex-col gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hide py-2 lg:justify-start justify-center flex-1">
              {currentSuggestions.map((suggestion, index) => {
                const IconComponent = getSuggestionIcon(suggestion.topic);
                return (
                  <div
                    key={suggestion.id}
                    className="flex-none w-56 sm:w-64 md:w-72 lg:w-full bg-slate-700/50 border border-slate-600 p-2 sm:p-3 md:p-4 rounded-lg cursor-pointer hover:bg-slate-700/70 hover:border-slate-500 transition-all duration-300 transform hover:scale-105 flex flex-col h-36 sm:h-48 md:h-56 lg:h-auto lg:min-h-[140px]"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CraftPrompt } from '../types';
import { generateCraftPrompt } from '../services/aiService';
import { examplePrompts } from '../data/examplePrompts';
import { SparklesIcon, MegaphoneIcon, BookOpenIcon, DocumentTextIcon, YouTubeIcon } from '../components/IconComponents';
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
  const [currentSuggestions, setCurrentSuggestions] = useState(examplePrompts.slice(0, 3));
  // Carica il provider dal localStorage, default a 'gemini' se non presente
  const [provider, setProvider] = useState<'gemini' | 'openai' | 'openrouter'>(() => {
    const savedProvider = localStorage.getItem('selectedProvider') as 'gemini' | 'openai' | 'openrouter';
    return savedProvider || 'gemini';
  });
  const [openrouterModel, setOpenrouterModel] = useState<string>('openai/gpt-4o');
  const [openaiModel, setOpenaiModel] = useState<string>('gpt-5-2025-08-07');
  const [geminiModel, setGeminiModel] = useState<string>('gemini-2.5-flash');
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
    const storedOpenRouterModel = localStorage.getItem('openrouter_model');
    const storedOpenAIModel = localStorage.getItem('openai_model');
    const storedGeminiModel = localStorage.getItem('gemini_model');
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
    if (storedOpenRouterModel) {
      setOpenrouterModel(storedOpenRouterModel);
    }
    if (storedOpenAIModel) {
      setOpenaiModel(storedOpenAIModel);
    }
    if (storedGeminiModel) {
      setGeminiModel(storedGeminiModel);
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

    // Salva il modello selezionato in base al provider
    if (provider === 'openrouter') {
      localStorage.setItem('openrouter_model', openrouterModel);
    } else if (provider === 'openai') {
      localStorage.setItem('openai_model', openaiModel);
    } else if (provider === 'gemini') {
      localStorage.setItem('gemini_model', geminiModel);
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
    <div className="bg-slate-900 text-slate-200 font-sans flex-1 flex flex-col h-screen overflow-hidden">
      {error && <WarningModal title="Attenzione" onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-6 sm:px-12 lg:px-20 py-8 sm:py-12 flex flex-col overflow-hidden">
        {/* Header Section */}
        <header className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 flex-shrink-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-emerald-500/20 p-3 sm:p-4 rounded-full">
              <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">Crea un nuovo Prompt</h2>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl mt-2 hidden sm:block">Inserisci un argomento e genera un prompt C.R.A.F.T.</p>
              <p className="text-slate-400 text-sm sm:hidden">Genera prompt C.R.A.F.T.</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col lg:flex-row gap-6 sm:gap-8 min-h-0 w-full ${isLoading ? 'justify-center items-center' : ''}`}>
          {/* Input Section */}
          <section className={`bg-slate-800/50 border border-slate-700 p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 flex flex-col ${isLoading ? 'max-w-3xl w-full' : 'lg:w-1/2 flex-shrink-0'}`}>
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 pr-2 -mr-2 min-h-0">
              {/* Provider Selection */}
              <div className="mb-4 sm:mb-5">
              <label className="block text-base sm:text-lg lg:text-xl font-semibold text-sky-400 mb-3">Seleziona AI Provider</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setProvider('gemini');
                    localStorage.setItem('selectedProvider', 'gemini');
                  }}
                  className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    provider === 'gemini'
                      ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${provider === 'gemini' ? 'bg-white border-white' : 'border-slate-400'}`} />
                  <span>Gemini</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProvider('openai');
                    localStorage.setItem('selectedProvider', 'openai');
                  }}
                  className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    provider === 'openai'
                      ? 'bg-sky-600 text-white border-2 border-sky-400'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${provider === 'openai' ? 'bg-white border-white' : 'border-slate-400'}`} />
                  <span>OpenAI</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProvider('openrouter');
                    localStorage.setItem('selectedProvider', 'openrouter');
                  }}
                  className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    provider === 'openrouter'
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${provider === 'openrouter' ? 'bg-white border-white' : 'border-slate-400'}`} />
                  <span>OpenRouter</span>
                </button>
              </div>
              {!hasApiKey && (
                <p className="text-red-400 text-sm sm:text-base mt-3">
                  ⚠️ Chiave API {provider === 'gemini' ? 'Gemini' : provider === 'openai' ? 'OpenAI' : 'OpenRouter'} non configurata. Clicca sul pulsante 'API' in alto a destra.
                </p>
              )}

              {/* OpenAI Model Selection */}
              {provider === 'openai' && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <label htmlFor="openai-model-select" className="block text-sm sm:text-base font-medium text-slate-300 mb-3">
                    Seleziona Modello OpenAI
                  </label>
                  <select
                    id="openai-model-select"
                    value={openaiModel}
                    onChange={(e) => setOpenaiModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                  >
                    <option value="gpt-5-2025-08-07">GPT-5 (2025-08-07)</option>
                    <option value="gpt-5-pro-2025-10-06">GPT-5 Pro (2025-10-06)</option>
                    <option value="gpt-5-mini-2025-08-07">GPT-5 Mini (2025-08-07)</option>
                    <option value="gpt-5-nano-2025-08-07">GPT-5 Nano (2025-08-07)</option>
                    <option value="gpt-4.1-2025-04-14">GPT-4.1 (2025-04-14)</option>
                  </select>
                  <p className="text-slate-400 text-sm mt-2">
                    Documentazione modelli: <a href="https://platform.openai.com/docs/models" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">platform.openai.com/docs/models</a>
                  </p>
                </div>
              )}

              {/* Gemini Model Selection */}
              {provider === 'gemini' && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <label htmlFor="gemini-model-select" className="block text-sm sm:text-base font-medium text-slate-300 mb-3">
                    Seleziona Modello Gemini
                  </label>
                  <select
                    id="gemini-model-select"
                    value={geminiModel}
                    onChange={(e) => setGeminiModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Consigliato)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                    <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental)</option>
                    <option value="gemini-2.0-flash-thinking-exp-01-21">Gemini 2.0 Flash Thinking</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  </select>
                  <p className="text-slate-400 text-sm mt-2">
                    Documentazione modelli: <a href="https://ai.google.dev/gemini-api/docs/models/gemini" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">ai.google.dev/gemini-api/docs/models</a>
                  </p>
                </div>
              )}

              {/* OpenRouter Model Selection */}
              {provider === 'openrouter' && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <label htmlFor="model-select" className="block text-sm sm:text-base font-medium text-slate-300 mb-3">
                    Seleziona Modello OpenRouter
                  </label>
                  <select
                    id="model-select"
                    value={openrouterModel}
                    onChange={(e) => setOpenrouterModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
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
                      <option value="meta-llama/llama-3.1-405b-instruct">Llama 3.1 405B Instruct</option>
                      <option value="meta-llama/llama-3.1-70b-instruct">Llama 3.1 70B Instruct</option>
                      <option value="meta-llama/llama-3.1-8b-instruct">Llama 3.1 8B Instruct</option>
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
                  <p className="text-slate-400 text-sm mt-2">
                    Puoi vedere tutti i modelli su <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">openrouter.ai/models</a>
                  </p>
                </div>
              )}
            </div>

              <label htmlFor="topic-input" className="block text-base sm:text-lg lg:text-xl font-semibold text-sky-400 mb-2 sm:mb-3">Inserisci il tuo argomento</label>
              <p className="text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base">Descrivi cosa vuoi ottenere. Es: "un'email di marketing per un nuovo prodotto"</p>
              <textarea
                ref={textareaRef}
                id="topic-input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Es: Una sceneggiatura per un video YouTube sui viaggi spaziali"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-base sm:text-lg resize-none overflow-hidden scrollbar-hide"
                style={{ minHeight: '60px', maxHeight: '160px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGeneratePrompt();
                  }
                }}
                rows={1}
              />
            </div>
            {/* End of scrollable area */}

            {/* Fixed button at bottom */}
            <div className="mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
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
                  className="flex items-center justify-center min-h-[52px] px-6 py-3 rounded-xl text-white font-semibold bg-sky-600 transition-transform duration-300 ease-out text-base sm:text-lg"
                  style={{ transform: 'translateY(-2px)' }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-white border-slate-400 rounded-full animate-spin mr-3"></div>
                      <span>Generazione...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5 mr-3" />
                      <span>Genera Prompt</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </section>

          {/* Suggestion Cards Carousel - Nascosta durante la generazione */}
          {!isLoading && (
          <section className="bg-slate-800/30 border border-slate-700 p-5 sm:p-6 rounded-xl lg:w-1/2 flex-shrink-0 overflow-hidden flex flex-col">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-400 mb-4 sm:mb-5">Idee per iniziare</h3>
            <div className="flex lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-y-auto scrollbar-hide py-2 lg:justify-start justify-center flex-1">
              {currentSuggestions.map((suggestion, index) => {
                const IconComponent = getSuggestionIcon(suggestion.topic);
                return (
                  <div
                    key={suggestion.id}
                    className="flex-none w-64 sm:w-72 md:w-80 lg:w-full bg-slate-700/50 border border-slate-600 p-4 sm:p-5 md:p-6 rounded-lg cursor-pointer hover:bg-slate-700/70 hover:border-slate-500 transition-all duration-300 transform hover:scale-105 flex flex-col h-44 sm:h-52 md:h-60 lg:h-auto lg:min-h-[160px]"
                    onClick={() => setTopic(suggestion.prompt.azione)}
                  >
                    {/* Icona in alto */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="bg-slate-600/50 p-2 sm:p-3 md:p-4 rounded-full">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-sky-400" />
                      </div>
                    </div>

                    {/* Contenuto centrato */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 sm:space-y-3">
                      {/* Titolo */}
                      <h4 className="font-semibold text-sky-400 text-sm sm:text-base md:text-lg leading-relaxed px-2">
                        {suggestion.topic}
                      </h4>

                      {/* Descrizione dal prompt C.R.A.F.T. */}
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed px-2 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
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
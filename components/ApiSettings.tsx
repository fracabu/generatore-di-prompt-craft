import React, { useState, useEffect } from 'react';
import { SettingsIcon, CheckIcon, EyeIcon, EyeOffIcon } from './IconComponents';

const ApiSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [openrouterApiKey, setOpenrouterApiKey] = useState('');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showOpenrouterKey, setShowOpenrouterKey] = useState(false);
  const [isGeminiSaved, setIsGeminiSaved] = useState(false);
  const [isOpenaiSaved, setIsOpenaiSaved] = useState(false);
  const [isOpenrouterSaved, setIsOpenrouterSaved] = useState(false);

  useEffect(() => {
    // Carica le chiavi API salvate
    const savedGeminiKey = localStorage.getItem('gemini_api_key');
    const savedOpenaiKey = localStorage.getItem('openai_api_key');
    const savedOpenrouterKey = localStorage.getItem('openrouter_api_key');
    if (savedGeminiKey) {
      setGeminiApiKey(savedGeminiKey);
    }
    if (savedOpenaiKey) {
      setOpenaiApiKey(savedOpenaiKey);
    }
    if (savedOpenrouterKey) {
      setOpenrouterApiKey(savedOpenrouterKey);
    }
  }, []);

  const handleSaveGeminiKey = () => {
    if (!geminiApiKey.trim()) {
      return;
    }

    localStorage.setItem('gemini_api_key', geminiApiKey.trim());
    setIsGeminiSaved(true);
    setTimeout(() => setIsGeminiSaved(false), 2000);

    // Trigger custom event for other components to react
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const handleSaveOpenaiKey = () => {
    if (!openaiApiKey.trim()) {
      return;
    }

    localStorage.setItem('openai_api_key', openaiApiKey.trim());
    setIsOpenaiSaved(true);
    setTimeout(() => setIsOpenaiSaved(false), 2000);

    // Trigger custom event for other components to react
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const handleRemoveGeminiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setGeminiApiKey('');
    setIsGeminiSaved(true);
    setTimeout(() => setIsGeminiSaved(false), 2000);

    // Trigger custom event for other components to react
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const handleRemoveOpenaiKey = () => {
    localStorage.removeItem('openai_api_key');
    setOpenaiApiKey('');
    setIsOpenaiSaved(true);
    setTimeout(() => setIsOpenaiSaved(false), 2000);

    // Trigger custom event for other components to react
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const handleSaveOpenrouterKey = () => {
    if (!openrouterApiKey.trim()) {
      return;
    }

    localStorage.setItem('openrouter_api_key', openrouterApiKey.trim());
    setIsOpenrouterSaved(true);
    setTimeout(() => setIsOpenrouterSaved(false), 2000);

    // Trigger custom event for other components to react
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const handleRemoveOpenrouterKey = () => {
    localStorage.removeItem('openrouter_api_key');
    setOpenrouterApiKey('');
    setIsOpenrouterSaved(true);
    setTimeout(() => setIsOpenrouterSaved(false), 2000);

    // Trigger custom event for other components to react
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const hasGeminiKey = localStorage.getItem('gemini_api_key');
  const hasOpenaiKey = localStorage.getItem('openai_api_key');
  const hasOpenrouterKey = localStorage.getItem('openrouter_api_key');
  const hasAnyKey = hasGeminiKey || hasOpenaiKey || hasOpenrouterKey;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 sm:space-x-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
          hasAnyKey 
            ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
            : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
        }`}
        aria-label="Impostazioni API"
      >
        <SettingsIcon className="w-4 h-4 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">API</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 sm:z-50">
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">Impostazioni API</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden p-1 rounded-md text-slate-400 hover:text-slate-300 hover:bg-slate-700"
                aria-label="Chiudi impostazioni"
              >
                <EyeOffIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Gemini API Section */}
              <form onSubmit={(e) => { e.preventDefault(); handleSaveGeminiKey(); }} className="space-y-2 sm:space-y-3">
                <h4 className="text-sm sm:text-md font-medium text-emerald-400">Google Gemini API</h4>
                <div>
                  <label htmlFor="gemini-key" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">
                    Chiave API Google AI
                  </label>
                  <div className="relative">
                    <input
                      id="gemini-key"
                      type={showGeminiKey ? "text" : "password"}
                      value={geminiApiKey}
                      onChange={(e) => setGeminiApiKey(e.target.value)}
                      placeholder="Inserisci la tua chiave API Gemini"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowGeminiKey(!showGeminiKey)}
                      className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showGeminiKey ? <EyeOffIcon className="w-3 h-3 sm:w-4 sm:h-4" /> : <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-1.5 sm:space-x-2">
                  <button
                    type="submit"
                    disabled={!geminiApiKey.trim()}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center"
                  >
                    {isGeminiSaved ? <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : null}
                    Salva
                  </button>

                  {hasGeminiKey && (
                    <button
                      type="button"
                      onClick={handleRemoveGeminiKey}
                      className="bg-red-600 hover:bg-red-500 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
              </form>

              {/* OpenAI API Section */}
              <form onSubmit={(e) => { e.preventDefault(); handleSaveOpenaiKey(); }} className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-slate-700">
                <h4 className="text-sm sm:text-md font-medium text-sky-400">OpenAI API</h4>
                <div>
                  <label htmlFor="openai-key" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">
                    Chiave API OpenAI
                  </label>
                  <div className="relative">
                    <input
                      id="openai-key"
                      type={showOpenaiKey ? "text" : "password"}
                      value={openaiApiKey}
                      onChange={(e) => setOpenaiApiKey(e.target.value)}
                      placeholder="Inserisci la tua chiave API OpenAI"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                      className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showOpenaiKey ? <EyeOffIcon className="w-3 h-3 sm:w-4 sm:h-4" /> : <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-1.5 sm:space-x-2">
                  <button
                    type="submit"
                    disabled={!openaiApiKey.trim()}
                    className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center"
                  >
                    {isOpenaiSaved ? <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : null}
                    Salva
                  </button>

                  {hasOpenaiKey && (
                    <button
                      type="button"
                      onClick={handleRemoveOpenaiKey}
                      className="bg-red-600 hover:bg-red-500 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
              </form>

              {/* OpenRouter API Section */}
              <form onSubmit={(e) => { e.preventDefault(); handleSaveOpenrouterKey(); }} className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-slate-700">
                <h4 className="text-sm sm:text-md font-medium text-purple-400">OpenRouter API</h4>
                <div>
                  <label htmlFor="openrouter-key" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">
                    Chiave API OpenRouter
                  </label>
                  <div className="relative">
                    <input
                      id="openrouter-key"
                      type={showOpenrouterKey ? "text" : "password"}
                      value={openrouterApiKey}
                      onChange={(e) => setOpenrouterApiKey(e.target.value)}
                      placeholder="Inserisci la tua chiave API OpenRouter"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs sm:text-sm"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOpenrouterKey(!showOpenrouterKey)}
                      className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showOpenrouterKey ? <EyeOffIcon className="w-3 h-3 sm:w-4 sm:h-4" /> : <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-1.5 sm:space-x-2">
                  <button
                    type="submit"
                    disabled={!openrouterApiKey.trim()}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center"
                  >
                    {isOpenrouterSaved ? <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : null}
                    Salva
                  </button>

                  {hasOpenrouterKey && (
                    <button
                      type="button"
                      onClick={handleRemoveOpenrouterKey}
                      className="bg-red-600 hover:bg-red-500 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
              </form>

              <div className="text-xs text-slate-400 pt-2 sm:pt-3 border-t border-slate-700">
                <p className="mb-1.5 sm:mb-2">• Ottieni le chiavi API da:</p>
                <div className="space-y-1">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline block text-xs sm:text-sm"
                  >
                    Google AI Studio (Gemini)
                  </a>
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 underline block text-xs sm:text-sm"
                  >
                    OpenAI Platform
                  </a>
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline block text-xs sm:text-sm"
                  >
                    OpenRouter Platform
                  </a>
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs">• Le chiavi vengono salvate localmente nel tuo browser</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiSettings;
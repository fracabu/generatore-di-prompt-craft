import React, { useState, useEffect } from 'react';
import { SettingsIcon, CheckIcon, EyeIcon, EyeOffIcon } from './IconComponents';

const ApiSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Carica la chiave API salvata
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      return;
    }
    
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const hasApiKey = localStorage.getItem('gemini_api_key');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          hasApiKey 
            ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
            : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
        }`}
      >
        <SettingsIcon className="w-4 h-4" />
        <span>API</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-100 mb-3">Impostazioni API Gemini</h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-slate-300 mb-1">
                  Chiave API Google AI
                </label>
                <div className="relative">
                  <input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Inserisci la tua chiave API Gemini"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showApiKey ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center"
                >
                  {isSaved ? <CheckIcon className="w-4 h-4 mr-1" /> : null}
                  {isSaved ? 'Salvata' : 'Salva'}
                </button>
                
                {hasApiKey && (
                  <button
                    onClick={handleRemoveApiKey}
                    className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    Rimuovi
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
                <p className="mb-1">• Ottieni la tua chiave API da:</p>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline"
                >
                  Google AI Studio
                </a>
                <p className="mt-2">• La chiave viene salvata localmente nel tuo browser</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiSettings;
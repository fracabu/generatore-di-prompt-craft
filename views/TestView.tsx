import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { testGeneratedPrompt } from '../services/aiService';
import { ArrowLeftIcon, TestTubeIcon, ClipboardIcon, CheckIcon } from '../components/IconComponents';
import WarningModal from '../components/WarningModal';

const TestView: React.FC = () => {
  const navigate = useNavigate();
  const [testPrompt, setTestPrompt] = useState('');
  const [testResult, setTestResult] = useState('');
  const [isTruncated, setIsTruncated] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai'>('gemini');

  useEffect(() => {
    // Carica il prompt e il provider dal localStorage
    const storedPrompt = localStorage.getItem('testPrompt');
    const storedProvider = localStorage.getItem('testProvider') as 'gemini' | 'openai';
    
    if (storedProvider) {
      setSelectedProvider(storedProvider);
    }
    
    if (storedPrompt) {
      setTestPrompt(storedPrompt);
      // Esegui automaticamente il test quando la pagina viene caricata
      handleTestPrompt(storedPrompt, storedProvider || 'gemini');
    } else {
      setError("Nessun prompt da testare trovato. Torna indietro e genera un prompt prima di testarlo.");
    }
  }, []);

  const handleTestPrompt = async (promptToTest?: string, provider?: 'gemini' | 'openai') => {
    const prompt = promptToTest || testPrompt;
    const testProvider = provider || selectedProvider;
    
    if (!prompt.trim()) {
      setError("Il prompt è vuoto. Non posso eseguire il test.");
      return;
    }
    
    setIsTesting(true);
    setTestResult('');
    setIsTruncated(false);
    setError(null);
    try {
      const response = await testGeneratedPrompt(prompt, testProvider);
      setTestResult(response.result);
      setIsTruncated(response.truncated);
    } catch (err: any) {
      setError(err.message || "Si è verificato un errore durante il test del prompt.");
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(testResult).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleBackToResult = () => {
    navigate('/result');
  };

  const handleRetest = () => {
    if (testPrompt) {
      handleTestPrompt(testPrompt, selectedProvider);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 font-sans py-8">
      {error && <WarningModal title="Attenzione" onClose={() => setError(null)}><p>{error}</p></WarningModal>}

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToResult}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Indietro</span>
            </button>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Test del Prompt</h2>
              <p className="text-slate-400 mt-1">Risultato dell'esecuzione del tuo prompt C.R.A.F.T.</p>
            </div>
          </div>
        </header>

        {/* Prompt Being Tested */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Prompt in Test</h3>
          <div className="bg-slate-900/50 p-4 rounded-lg whitespace-pre-wrap text-slate-300 font-mono text-sm max-h-60 overflow-y-auto">
            {testPrompt || "Nessun prompt caricato"}
          </div>
        </section>

        {/* Test Controls */}
        <section className="flex flex-wrap gap-4">
          <button
            onClick={handleRetest}
            disabled={isTesting || !testPrompt}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isTesting ? (
              <>
                <div className="w-5 h-5 border-2 border-t-white border-slate-400 rounded-full animate-spin"></div>
                <span>Test in corso...</span>
              </>
            ) : (
              <>
                <TestTubeIcon className="w-5 h-5" />
                <span>Ri-esegui Test</span>
              </>
            )}
          </button>
          
          {testResult && (
            <button
              onClick={handleCopyResult}
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
              {copied ? 'Copiato!' : 'Copia Risultato'}
            </button>
          )}
        </section>

         {/* Test Result */}
         {(isTesting || testResult) && (
           <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-fuchsia-400">Risultato del Test</h3>
               <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">Max Output: 8192 tokens</span>
             </div>
            
            {isTesting && !testResult && (
              <div className="flex items-center text-slate-400">
                <div className="w-5 h-5 border-2 border-t-fuchsia-400 border-slate-500 rounded-full animate-spin mr-3"></div>
                <span>L'IA sta elaborando la tua richiesta...</span>
              </div>
            )}
            
             {testResult && (
               <div className="prose prose-sm md:prose-base prose-invert max-w-none">
                 {isTruncated && (
                   <div className="bg-amber-900/30 border border-amber-600 text-amber-200 p-3 rounded-lg mb-4 text-sm">
                     <span className="font-semibold">⚠️ Attenzione:</span> Il risultato è stato troncato perché ha superato il limite massimo di caratteri. 
                     Per testare prompt che generano risposte molto lunghe, ti consigliamo di usare direttamente modelli con maggiore capacità di output come Claude 3 Opus o Gemini Pro 1.5.
                   </div>
                 )}
                 <div className="bg-slate-900/50 p-4 rounded-lg whitespace-pre-wrap text-slate-300">
                   {testResult}
                 </div>
               </div>
             )}
          </section>
        )}

        {/* Tips Section */}
        <section className="bg-slate-800/30 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Consigli per il Test</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span>Analizza se la risposta corrisponde alle aspettative del tuo prompt</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span>Se il risultato non è soddisfacente, torna indietro e modifica i campi C.R.A.F.T.</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span>Puoi eseguire il test più volte per confrontare i risultati</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span>Copia il risultato per usarlo nei tuoi progetti</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TestView;
import React from 'react';
import { BookOpenIcon, SparklesIcon } from '../components/IconComponents';

const ModelsGuideView: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200 font-sans flex-1 flex flex-col overflow-auto">
      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-6 sm:px-12 lg:px-20 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-purple-500/20 p-3 sm:p-4 rounded-full">
              <BookOpenIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">Guida ai Modelli AI</h1>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl mt-2">
                Scopri le caratteristiche e i casi d'uso di ogni modello disponibile
              </p>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-400 mb-4">Introduzione</h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            [PLACEHOLDER: Breve introduzione sui modelli AI e come scegliere quello giusto per le tue esigenze]
          </p>
        </section>

        {/* Gemini Models Section */}
        <section className="bg-slate-800/50 border border-emerald-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <SparklesIcon className="w-8 h-8 text-emerald-400" />
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-400">Google Gemini</h2>
          </div>

          {/* Gemini 2.5 Pro */}
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">Gemini 2.5 Pro</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello Gemini 2.5 Pro]</p>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Caratteristiche principali:</span>
                <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                  <li>[PLACEHOLDER: Caratteristica 1]</li>
                  <li>[PLACEHOLDER: Caratteristica 2]</li>
                  <li>[PLACEHOLDER: Caratteristica 3]</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Casi d'uso ideali:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Quando usare questo modello]</p>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Limitazioni:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Limitazioni del modello]</p>
              </div>
            </div>
          </div>

          {/* Gemini 2.5 Flash */}
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">Gemini 2.5 Flash</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello Gemini 2.5 Flash]</p>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Caratteristiche principali:</span>
                <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                  <li>[PLACEHOLDER: Caratteristica 1]</li>
                  <li>[PLACEHOLDER: Caratteristica 2]</li>
                  <li>[PLACEHOLDER: Caratteristica 3]</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Casi d'uso ideali:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Quando usare questo modello]</p>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Limitazioni:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Limitazioni del modello]</p>
              </div>
            </div>
          </div>

          {/* Gemini 2.5 Flash Lite */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">Gemini 2.5 Flash Lite</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello Gemini 2.5 Flash Lite]</p>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Caratteristiche principali:</span>
                <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                  <li>[PLACEHOLDER: Caratteristica 1]</li>
                  <li>[PLACEHOLDER: Caratteristica 2]</li>
                  <li>[PLACEHOLDER: Caratteristica 3]</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Casi d'uso ideali:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Quando usare questo modello]</p>
              </div>
              <div>
                <span className="font-semibold text-emerald-400 text-lg">Limitazioni:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Limitazioni del modello]</p>
              </div>
            </div>
          </div>
        </section>

        {/* OpenAI Models Section */}
        <section className="bg-slate-800/50 border border-sky-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-8 bg-sky-400 rounded"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-sky-400">OpenAI</h2>
          </div>

          {/* GPT-5 */}
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">GPT-5 (2025-08-07)</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-sky-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello GPT-5]</p>
              </div>
              <div>
                <span className="font-semibold text-sky-400 text-lg">Caratteristiche principali:</span>
                <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                  <li>[PLACEHOLDER: Caratteristica 1]</li>
                  <li>[PLACEHOLDER: Caratteristica 2]</li>
                  <li>[PLACEHOLDER: Caratteristica 3]</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-sky-400 text-lg">Casi d'uso ideali:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Quando usare questo modello]</p>
              </div>
            </div>
          </div>

          {/* GPT-5 Pro */}
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">GPT-5 Pro (2025-10-06)</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-sky-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello GPT-5 Pro]</p>
              </div>
              <div>
                <span className="font-semibold text-sky-400 text-lg">Caratteristiche principali:</span>
                <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                  <li>[PLACEHOLDER: Caratteristica 1]</li>
                  <li>[PLACEHOLDER: Caratteristica 2]</li>
                </ul>
              </div>
            </div>
          </div>

          {/* GPT-5 Mini */}
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">GPT-5 Mini (2025-08-07)</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-sky-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello GPT-5 Mini]</p>
              </div>
              <div>
                <span className="font-semibold text-sky-400 text-lg">Caratteristiche principali:</span>
                <ul className="mt-2 list-disc list-inside space-y-2 ml-4">
                  <li>[PLACEHOLDER: Caratteristica 1]</li>
                  <li>[PLACEHOLDER: Caratteristica 2]</li>
                </ul>
              </div>
            </div>
          </div>

          {/* GPT-5 Nano */}
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">GPT-5 Nano (2025-08-07)</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-sky-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello GPT-5 Nano]</p>
              </div>
            </div>
          </div>

          {/* GPT-4.1 */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">GPT-4.1 (2025-04-14)</h3>
            <div className="space-y-4 text-slate-300 text-base sm:text-lg">
              <div>
                <span className="font-semibold text-sky-400 text-lg">Descrizione:</span>
                <p className="mt-2 leading-relaxed">[PLACEHOLDER: Descrizione del modello GPT-4.1]</p>
              </div>
            </div>
          </div>
        </section>

        {/* OpenRouter Models Section */}
        <section className="bg-slate-800/50 border border-purple-700/50 p-8 rounded-xl mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-400">OpenRouter</h2>
          </div>

          <div className="mb-8">
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              [PLACEHOLDER: Introduzione a OpenRouter e ai suoi vantaggi - accesso a 30+ modelli da vari provider]
            </p>
          </div>

          {/* OpenAI via OpenRouter */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">OpenAI via OpenRouter</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-4">
              [PLACEHOLDER: Breve descrizione dei modelli OpenAI disponibili tramite OpenRouter]
            </p>
          </div>

          {/* Anthropic Claude */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">Anthropic Claude</h3>
            <div className="space-y-5">
              <div className="pl-6 border-l-4 border-purple-500/50">
                <h4 className="font-semibold text-slate-200 text-lg mb-2">Claude Sonnet 4.5</h4>
                <p className="text-slate-400 text-base leading-relaxed">[PLACEHOLDER: Descrizione]</p>
              </div>
              <div className="pl-6 border-l-4 border-purple-500/50">
                <h4 className="font-semibold text-slate-200 text-lg mb-2">Claude Haiku 4.5</h4>
                <p className="text-slate-400 text-base leading-relaxed">[PLACEHOLDER: Descrizione]</p>
              </div>
              <div className="pl-6 border-l-4 border-purple-500/50">
                <h4 className="font-semibold text-slate-200 text-lg mb-2">Claude Opus 4.1</h4>
                <p className="text-slate-400 text-base leading-relaxed">[PLACEHOLDER: Descrizione]</p>
              </div>
            </div>
          </div>

          {/* Google via OpenRouter */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">Google Gemini via OpenRouter</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              [PLACEHOLDER: Descrizione dei modelli Gemini disponibili tramite OpenRouter]
            </p>
          </div>

          {/* Meta Llama */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">Meta Llama</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              [PLACEHOLDER: Descrizione dei modelli Llama 3.x disponibili]
            </p>
          </div>

          {/* Mistral */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">Mistral AI</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              [PLACEHOLDER: Descrizione dei modelli Mistral disponibili]
            </p>
          </div>

          {/* Qwen */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">Qwen (Alibaba)</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              [PLACEHOLDER: Descrizione dei modelli Qwen disponibili, inclusi i modelli vision]
            </p>
          </div>

          {/* DeepSeek */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">DeepSeek</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              [PLACEHOLDER: Descrizione dei modelli DeepSeek, incluso il modello R1 per reasoning]
            </p>
          </div>

          {/* Altri Provider */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-6">Altri Provider</h3>
            <div className="space-y-3">
              <div className="pl-4 border-l-2 border-purple-500/50">
                <h4 className="font-medium text-slate-200 mb-2">Zhipu AI (GLM)</h4>

                <div className="space-y-3 text-slate-400 text-sm">
                  <div>
                    <span className="font-semibold text-slate-300">GLM-4.6</span> <span className="text-xs text-purple-400">(200K context • $0.50/M input • $1.75/M output)</span>
                    <p className="mt-1 leading-relaxed">
                      L'ultima versione che porta miglioramenti chiave rispetto a GLM-4.5:
                    </p>
                    <ul className="mt-1 ml-4 list-disc space-y-1">
                      <li><strong>Finestra di contesto estesa:</strong> Espansa da 128K a 200K token, per gestire compiti agentici più complessi</li>
                      <li><strong>Performance superiore nel coding:</strong> Punteggi più alti nei benchmark di codice e migliori prestazioni in applicazioni reali come Claude Code, Cline, Roo Code e Kilo Code</li>
                      <li><strong>Ragionamento avanzato:</strong> Miglioramento nelle capacità di reasoning e supporto all'uso di strumenti durante l'inferenza</li>
                      <li><strong>Agenti più capaci:</strong> Performance migliorate nell'uso di strumenti e agenti basati su ricerca, integrazione più efficace nei framework agentici</li>
                      <li><strong>Scrittura raffinata:</strong> Migliore allineamento con le preferenze umane in termini di stile e leggibilità</li>
                    </ul>
                    <p className="mt-2 text-emerald-400 text-xs">
                      🏆 Ideale per: Programmazione avanzata, agent framework complessi, generazione pagine front-end, task di reasoning
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-300">GLM-4.5</span> <span className="text-xs text-purple-400">(128K context)</span>
                    <p className="mt-1 leading-relaxed">
                      Il modello flagship di Zhipu AI, progettato specificamente per applicazioni basate su agenti. Utilizza un'architettura Mixture-of-Experts (MoE) e supporta una lunghezza di contesto fino a 128K token.
                      GLM-4.5 offre capacità significativamente migliorate in ragionamento, generazione di codice e allineamento degli agenti.
                    </p>
                    <p className="mt-1 leading-relaxed">
                      Supporta una <strong>modalità di inferenza ibrida</strong> con due opzioni:
                    </p>
                    <ul className="mt-1 ml-4 list-disc space-y-1">
                      <li><strong>Modalità thinking:</strong> Progettata per ragionamento complesso e uso di strumenti</li>
                      <li><strong>Modalità non-thinking:</strong> Ottimizzata per risposte istantanee</li>
                    </ul>
                    <p className="mt-2 text-sky-400 text-xs">
                      💡 Gli utenti possono controllare il comportamento di ragionamento con il parametro booleano "reasoning enabled"
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-300">GLM-4.5 Air</span> <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">FREE</span>
                    <p className="mt-1 leading-relaxed">
                      Versione gratuita e leggera di GLM-4.5, perfetta per sperimentazione e progetti con budget limitato. Mantiene buone capacità generali pur essendo ottimizzata per velocità ed efficienza.
                    </p>
                    <p className="mt-2 text-emerald-400 text-xs">
                      ✨ Ideale per: Testing, prototipi rapidi, applicazioni con volumi elevati
                    </p>
                  </div>
                </div>
              </div>
              <div className="pl-6 border-l-4 border-purple-500/50">
                <h4 className="font-semibold text-slate-200 text-lg mb-2">Perplexity</h4>
                <p className="text-slate-400 text-base leading-relaxed">[PLACEHOLDER: Descrizione Sonar (online search)]</p>
              </div>
              <div className="pl-6 border-l-4 border-purple-500/50">
                <h4 className="font-semibold text-slate-200 text-lg mb-2">xAI Grok</h4>
                <p className="text-slate-400 text-base leading-relaxed">[PLACEHOLDER: Descrizione Grok Beta]</p>
              </div>
              <div className="pl-6 border-l-4 border-purple-500/50">
                <h4 className="font-semibold text-slate-200 text-lg mb-2">Cohere</h4>
                <p className="text-slate-400 text-base leading-relaxed">[PLACEHOLDER: Descrizione Command R+]</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6">Tabella Comparativa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-base sm:text-lg">
              <thead>
                <tr className="border-b-2 border-slate-600">
                  <th className="text-left py-4 px-6 font-semibold text-slate-200">Modello</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-200">Velocità</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-200">Qualità</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-200">Costo</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-200">Migliore per</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Gemini 2.5 Pro</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Gemini 2.5 Flash</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6 font-medium">GPT-5</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                  <td className="py-4 px-6">[PLACEHOLDER]</td>
                </tr>
                <tr>
                  <td className="py-4 px-6" colSpan={5}>
                    <span className="text-slate-500 text-sm">[PLACEHOLDER: Aggiungi altre righe per i modelli principali]</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-gradient-to-r from-sky-900/30 to-purple-900/30 border border-sky-700/50 p-8 rounded-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-sky-300 mb-6">💡 Consigli per la Scelta</h2>
          <ul className="space-y-4 text-slate-300 text-base sm:text-lg">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">[PLACEHOLDER: Consiglio 1 sulla scelta del modello]</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">[PLACEHOLDER: Consiglio 2 sulla scelta del modello]</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">[PLACEHOLDER: Consiglio 3 sulla scelta del modello]</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-3 text-2xl">•</span>
              <span className="leading-relaxed">[PLACEHOLDER: Consiglio 4 sulla scelta del modello]</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ModelsGuideView;

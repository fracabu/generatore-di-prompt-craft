
import React from 'react';
import type { SavedPrompt } from '../types';
import { TestTubeIcon, LoadIcon } from './IconComponents';

interface ExamplePromptCardProps {
  example: SavedPrompt;
  onLoad: (prompt: SavedPrompt) => void;
  onTest: (prompt: SavedPrompt) => void;
  isTesting: boolean;
}

const ExamplePromptCard: React.FC<ExamplePromptCardProps> = ({ example, onLoad, onTest, isTesting }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-md hover:shadow-sky-500/10 border border-slate-700 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between h-full">
      <h3 className="text-md font-bold text-slate-100 mb-4">{example.topic}</h3>
      <div className="flex items-center space-x-2 mt-auto">
        <button
          onClick={() => onLoad(example)}
          className="flex-1 flex items-center justify-center bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors duration-200"
          aria-label="Carica esempio"
        >
          <LoadIcon className="w-4 h-4 mr-2" />
          Carica
        </button>
        <button
          onClick={() => onTest(example)}
          disabled={isTesting}
          className="flex-1 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
          aria-label="Testa esempio"
        >
          {isTesting ? (
             <div className="w-4 h-4 border-2 border-t-white border-slate-400 rounded-full animate-spin"></div>
          ) : (
            <>
              <TestTubeIcon className="w-4 h-4 mr-2" />
              Testa
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExamplePromptCard;
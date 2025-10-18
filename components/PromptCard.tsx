
import React from 'react';
import type { SavedPrompt } from '../types';
import { TrashIcon, LoadIcon } from './IconComponents';

interface PromptCardProps {
  savedPrompt: SavedPrompt;
  onLoad: (prompt: SavedPrompt) => void;
  onDelete: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ savedPrompt, onLoad, onDelete }) => {
  const formattedDate = new Date(savedPrompt.createdAt).toLocaleString();

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-4 shadow-lg hover:shadow-emerald-500/10 border border-slate-700 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-sm sm:text-lg font-bold text-slate-100 truncate mb-1 sm:mb-2">{savedPrompt.topic}</h3>
        <p className="text-xs text-slate-400 mb-2 sm:mb-3">Salvato il: {formattedDate}</p>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 mt-auto">
        <button
          onClick={() => onLoad(savedPrompt)}
          className="flex-1 flex items-center justify-center bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-md transition-colors duration-200"
          aria-label="Carica prompt"
        >
          <LoadIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline">Carica</span>
          <span className="xs:hidden">↑</span>
        </button>
        <button
          onClick={() => onDelete(savedPrompt.id)}
          className="bg-rose-600 hover:bg-rose-500 text-white p-1.5 sm:p-2 rounded-md transition-colors duration-200"
          aria-label="Elimina prompt"
        >
          <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
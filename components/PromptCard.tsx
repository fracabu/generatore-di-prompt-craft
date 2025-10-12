
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
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg hover:shadow-emerald-500/10 border border-slate-700 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-100 truncate mb-2">{savedPrompt.topic}</h3>
        <p className="text-xs text-slate-400 mb-3">Salvato il: {formattedDate}</p>
      </div>
      <div className="flex items-center space-x-2 mt-auto">
        <button
          onClick={() => onLoad(savedPrompt)}
          className="flex-1 flex items-center justify-center bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors duration-200"
          aria-label="Carica prompt"
        >
          <LoadIcon className="w-4 h-4 mr-2" />
          Carica
        </button>
        <button
          onClick={() => onDelete(savedPrompt.id)}
          className="bg-rose-600 hover:bg-rose-500 text-white p-2 rounded-md transition-colors duration-200"
          aria-label="Elimina prompt"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
import React from 'react';

interface WarningModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const WarningModal: React.FC<WarningModalProps> = ({ onClose, title, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-amber-400 mb-4">{title}</h2>
        <div className="text-slate-300 mb-6">{children}</div>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;

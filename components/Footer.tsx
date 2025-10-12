import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 py-6 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            © 2025 Prompt Generator Craft. Creato con ❤️ da Gemini e GLM-4.6 usando le risorse del canale YouTube di Antonio Guadagno
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.youtube.com/watch?v=zjbHzqICm8U&t=209s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
            >
              YouTube
            </a>
            <a
              href="https://plucky-web-391.notion.site/Prompt-perfetto-per-ChatGPT-1fde5a3fb1f580d585c4d035a2e2de0c"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium"
            >
              Notion
            </a>
            <a
              href="https://t.me/antonio_guadagno_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium"
            >
              Telegram
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
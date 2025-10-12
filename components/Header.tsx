import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobeAltIcon } from './IconComponents';
import ApiSettings from './ApiSettings';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
              <GlobeAltIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-lg font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
              C.R.A.F.T. Generator
            </span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <nav className="flex space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/result"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/result') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Risultato
              </Link>
              <Link
                to="/test"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/test') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Test
              </Link>
            </nav>
            <ApiSettings />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
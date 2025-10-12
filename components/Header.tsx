import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobeAltIcon, Bars3Icon, XMarkIcon } from './IconComponents';
import ApiSettings from './ApiSettings';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
            <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
              <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors hidden xs:block">
              C.R.A.F.T. Generator
            </span>
            <span className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors xs:hidden">
              C.R.A.F.T.
            </span>
          </Link>
          
          <div className="flex items-center space-x-1">
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex space-x-0.5 sm:space-x-1">
              <Link
                to="/"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/result"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/result') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Risultato
              </Link>
              <Link
                to="/test"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/test') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Test
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
            
            <ApiSettings />
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-slate-700">
            <nav className="py-2 space-y-1">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                🏠 Home
              </Link>
              <Link
                to="/result"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/result') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                📄 Risultato
              </Link>
              <Link
                to="/test"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/test') 
                    ? 'bg-sky-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                🧪 Test
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
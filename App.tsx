import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ResultView from './views/ResultView';
import TestView from './views/TestView';

function App() {
  useEffect(() => {
    // Pulisci i dati delle richieste all'avvio, ma mantieni le chiavi API e i prompt salvati
    const keysToKeep = [
      'gemini_api_key',
      'openai_api_key',
      'savedCraftPrompts'
    ];
    
    // Ottieni tutte le chiavi dal localStorage
    const allKeys = Object.keys(localStorage);
    
    // Rimuovi tutte le chiavi tranne quelle da mantenere
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/result" element={<ResultView />} />
            <Route path="/test" element={<TestView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
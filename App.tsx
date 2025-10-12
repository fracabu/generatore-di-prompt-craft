import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ResultView from './views/ResultView';
import TestView from './views/TestView';

function App() {
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
import React, { useState } from 'react';

import Home from './pages/Home';
import Instructions from './pages/instructions';
import Opportunities from './pages/opportunities';
import Reviews from './pages/reviews';
import Pricing from './pages/prising';
import Chat from './pages/Chat';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'chat':
        return <Chat navigateTo={navigateTo} />;
      case 'instructions':
        return <Instructions />;
      case 'opportunities':
        return <Opportunities />;
      case 'reviews':
        return <Reviews />;
      case 'pricing':
        return <Pricing />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-black via-purple-800 to-black text-gray-100 font-sans antialiased">
      {/* ШАПКА */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 backdrop-blur-sm bg-black/30 max-w-6xl mx-auto">
        <div className="text-xl font-bold text-white">AI-Помощник</div>
        <nav className="hidden md:flex justify-center items-center gap-6 text-sm font-medium">
          <button
            onClick={() => navigateTo('home')}
            className={`transition ${
              currentPage === 'home'
                ? 'text-purple-400 border-b-2 border-purple-400 pb-1'
                : 'hover:text-purple-400'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => navigateTo('opportunities')}
            className={`transition ${
              currentPage === 'opportunities'
                ? 'text-purple-400 border-b-2 border-purple-400 pb-1'
                : 'hover:text-purple-400'
            }`}
          >
            Возможности
          </button>
          <button
            onClick={() => navigateTo('instructions')}
            className={`transition ${
              currentPage === 'instructions'
                ? 'text-purple-400 border-b-2 border-purple-400 pb-1'
                : 'hover:text-purple-400'
            }`}
          >
            Инструкция
          </button>
          <button
            onClick={() => navigateTo('pricing')}
            className={`transition ${
              currentPage === 'pricing'
                ? 'text-purple-400 border-b-2 border-purple-400 pb-1'
                : 'hover:text-purple-400'
            }`}
          >
            Стоимость
          </button>
          <button
            onClick={() => navigateTo('reviews')}
            className={`transition ${
              currentPage === 'reviews'
                ? 'text-purple-400 border-b-2 border-purple-400 pb-1'
                : 'hover:text-purple-400'
            }`}
          >
            Отзывы
          </button>
        </nav>
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm border-b border-white/20 px-4 py-2 flex flex-col items-center space-y-2 text-sm font-medium">
          <button onClick={() => navigateTo('home')} className="hover:text-purple-400 transition text-center">
            Главная
          </button>
          <button onClick={() => navigateTo('opportunities')} className="hover:text-purple-400 transition text-center">
            Возможности
          </button>
          <button onClick={() => navigateTo('instructions')} className="hover:text-purple-400 transition text-center">
            Инструкция
          </button>
          <button onClick={() => navigateTo('pricing')} className="hover:text-purple-400 transition text-center">
            Стоимость
          </button>
          <button onClick={() => navigateTo('reviews')} className="hover:text-purple-400 transition text-center">
            Отзывы
          </button>
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="max-w-6xl mx-auto px-4 py-8">{renderPage()}</main>

      {/* ФУТЕР */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 mt-12 py-8 px-4 text-center text-sm text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 AI-Помощник. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
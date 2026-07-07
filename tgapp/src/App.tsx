import React, { useState } from 'react';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-gray-100 font-sans antialiased">
      {/* ===== ШАПКА ===== */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 backdrop-blur-sm bg-black/30 max-w-6xl mx-auto">
        <div className="text-xl font-bold text-white">Название</div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
        </nav>
        <button className="md:hidden text-2xl text-white" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </header>
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-2 flex flex-col space-y-2 text-sm font-medium">
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
          <a href="#" className="hover:text-indigo-400 transition">.</a>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* ===== ГЕРОЙ ===== */}
        <section className="text-center md:text-left md:flex md:items-center md:justify-between gap-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-indigo-100 to-purple-400 bg-clip-text text-transparent">
              Инскуственный интелект - стал проще с "название"
            </h1>
            <p className="text-gray-300 mt-4 text-lg">
              Платформа где можно не только написать но и поговорить и показать ИИ все что угодно ! 
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              <button className="px-6 py-3 bg-gradient-to-b from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition">
                Приступить! 
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/20 transition border border-white/20">
                Ознакомиться?
              </button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3">
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm h-48 rounded-2xl flex items-center justify-center text-indigo-300 font-bold text-xl border border-white/10">
              фотку над кинуть
            </div>
          </div>
        </section>

        {/* ===== СТАТИСТИКА ===== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 'Более 500', label: 'Постоянный и довольных пользоватлей!' },
            { value: 'Более 1000', label: 'Еще какой то хуйни' },
            { value: '15', label: 'Моделей готовых помочь!' },
            { value: '1000', label: 'И еще какой то хуйни' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* ===== УСЛУГИ ===== */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Преимущества проекта "борцы со спермой"
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Включай камеру и микрофон и говори', desc: 'Ты сможешь словно созвониться с ИИ и сразу показать что угодно и попросить что угодно.' },
              { title: 'Пахнет грязью.', desc: 'похуй надо написать еще чет' },
              { title: 'Пахнет грязью.', desc: 'похуй надо написать еще чет' },
              { title: 'Пахнет грязью.', desc: 'похуй надо написать еще чет' },
              { title: 'Пахнет грязью.', desc: 'похуй надо написать еще чет' },
              { title: 'Пахнет грязью.', desc: 'похуй надо написать еще чет' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-indigo-400/50 transition hover:shadow-lg hover:shadow-indigo-500/10">
                <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ПРОЦЕСС ===== */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
            Заебашим еще чет
          </h2>
          <p className="text-center text-gray-400 mb-8">Надо еще чет </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 'напишем че нить', title: 'хуй', desc: 'напишем че нить' },
              { step: 'напишем че нить', title: 'хуй', desc: 'напишем че нить' },
              { step: 'напишем че нить', title: 'хуй', desc: 'напишем че нить' },
              { step: 'напишем че нить', title: 'хуй', desc: 'напишем че нить' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-indigo-400/50 transition">
                <div className="text-3xl font-bold text-indigo-400">{item.step}</div>
                <h3 className="font-semibold text-lg text-white mt-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ТЕХНОЛОГИИ ===== */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['', '', '', ''].map((tech, idx) => (
              <div key={idx} className="bg-indigo-500/10 backdrop-blur-sm p-4 rounded-xl font-medium text-indigo-300 border border-indigo-400/20">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* ===== ОТЗЫВЫ ===== */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Наши отзывы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { stars: 5, text: 'Платформа упростила бизнес!😊', author: 'Evgeniy' },
              { stars: 5, text: 'Научился пользоваться ИИ на все 100!', author: 'Dmitry' },
              { stars: 5, text: 'Очень простой и удобный интерфейс👍', author: 'Ivan' },
              { stars: 5, text: 'Смогла сделать быстро и очень просто', author: 'diana' },
            ].map((review, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <p className="text-gray-200 mt-2">{review.text}</p>
                <p className="text-gray-400 text-sm mt-1">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== ФУТЕР ===== */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 mt-12 py-8 px-4 text-center text-sm text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 Accueil – иди нахуй )</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition">ссылку на гит кинем мб и похуй</a>
            <a href="#" className="hover:text-indigo-400 transition">Contact +7(забыл)</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
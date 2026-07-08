import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-t from-black via-purple-800 to-black text-gray-100 font-sans antialiased">
      {/* ШАПКА */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 backdrop-blur-sm bg-black/30 max-w-6xl mx-auto">
        <div className="text-xl font-bold text-white">AI-Помощник</div>
        <nav className="hidden md:flex justify-center items-center gap-6 text-sm font-medium">
          <a href="/" className="hover:text-indigo-400 transition">Главная</a>
          <a href="#" className="hover:text-indigo-400 transition">Возможности</a>
          <a href="#" className="hover:text-indigo-400 transition">Цены</a>
          <a href="#" className="hover:text-indigo-400 transition">Отзывы</a>
          <a href="#" className="hover:text-indigo-400 transition">Контакты</a>
        </nav>
        <button className="md:hidden text-2xl text-white" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </header>
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-2 flex flex-col space-y-2 text-sm font-medium">
          <a href="#" className="hover:text-purple-800 transition">Главная</a>
          <a href="#" className="hover:text-purple-800 transition">Возможности</a>
          <a href="#" className="hover:text-purple-800 transition">Цены</a>
          <a href="#" className="hover:text-purple-800 transition">Отзывы</a>
          <a href="#" className="hover:text-purple-800 transition">Контакты</a>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* ГЕРОЙ */}
        <section className="text-center md:text-left md:flex md:items-center md:justify-between gap-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-tr from-white to-purple-400 bg-clip-text text-transparent">
              Искусственный интеллект — стал проще
            </h1>
            <p className="text-gray-300 mt-4 text-lg">
              Платформа, где можно не только писать, но и говорить, показывать ИИ что угодно!
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              <button className="px-6 py-3 bg-gradient-to-b from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition">
                Начать
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/20 transition border border-white/20">
                Узнать больше
              </button>
            </div>
          </div>
        </section>

        {/* СТАТИСТИКА */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '500+', label: 'Довольных пользователей' },
            { value: '1000+', label: 'Созданных проектов' },
            { value: '15', label: 'Моделей ИИ на выбор' },
            { value: '24/7', label: 'Поддержка' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Ключевые возможности
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Голосовое общение', desc: 'Общайся с ИИ как с живым собеседником, используя микрофон и камеру.' },
              { title: 'Распознавание изображений', desc: 'Покажи ИИ картинку — он опишет, проанализирует или доработает её.' },
              { title: 'Генерация контента', desc: 'Создавай тексты, сценарии, код, презентации за секунды.' },
              { title: 'Мультиязычность', desc: 'Поддержка более 50 языков для общения и перевода.' },
              { title: 'Обучение с настройкой', desc: 'ИИ адаптируется под ваш стиль и задачи.' },
              { title: 'Безопасно и приватно', desc: 'Все данные шифруются, мы не передаём информацию третьим лицам.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-indigo-400/50 transition hover:shadow-lg hover:shadow-indigo-500/10">
                <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ЭТАПЫ РАБОТЫ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
            Как это работает
          </h2>
          <p className="text-center text-gray-400 mb-8">Четыре простых шага</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Регистрация', desc: 'Создайте аккаунт за 1 минуту.' },
              { step: '2', title: 'Выбор модели', desc: 'Выберите ИИ под вашу задачу.' },
              { step: '3', title: 'Общение', desc: 'Задавайте вопросы, отправляйте файлы.' },
              { step: '4', title: 'Результат', desc: 'Получите готовый ответ или решение.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-indigo-400/50 transition">
                <div className="text-3xl font-bold text-indigo-1000">{item.step}</div>
                <h3 className="font-semibold text-lg text-white mt-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ТЕХНОЛОГИИ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Наши технологии
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['GPT-5.5', 'Claude Sonnet', 'DeepSeek', 'Grok 4.20'].map((tech, idx) => (
              <div key={idx} className="bg-indigo-500/10 backdrop-blur-sm p-4 rounded-xl font-medium text-indigo-300 border border-indigo-400/20">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* ОТЗЫВЫ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Отзывы пользователей
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { stars: 5, text: 'Платформа упростила мою работу с текстами!', author: 'Евгений' },
              { stars: 5, text: 'Научился использовать ИИ на все 100% за пару дней.', author: 'Дмитрий' },
              { stars: 5, text: 'Очень простой и удобный интерфейс.', author: 'Иван' },
              { stars: 5, text: 'Смогла создать проект быстро и без сложностей.', author: 'Диана' },
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

      {/* ФУТЕР */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 mt-12 py-8 px-4 text-center text-sm text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 AI-Помощник. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition">Политика конфиденциальности</a>
            <a href="#" className="hover:text-indigo-400 transition">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
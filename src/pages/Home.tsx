import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
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
        <div className="hidden md:block md:w-1/3">
          <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-sm h-48 rounded-2xl flex items-center justify-center text-purple-300 font-bold text-xl border border-white/10">
            🤖 AI
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
            <div className="text-3xl md:text-4xl font-bold text-purple-400">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ (кратко) */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
          Ключевые возможности
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Голосовое общение', desc: 'Общайся с ИИ как с живым собеседником.' },
            { title: 'Распознавание изображений', desc: 'Покажи ИИ картинку — он проанализирует.' },
            { title: 'Генерация контента', desc: 'Создавай тексты, код, презентации за секунды.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/50 transition hover:shadow-lg hover:shadow-purple-500/10">
              <h3 className="font-semibold text-lg text-white">{item.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
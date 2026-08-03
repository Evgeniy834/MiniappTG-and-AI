import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
        📖 Инструкция
      </h1>
      <p className="text-center text-gray-400 mb-8 text-lg">
        Как начать пользоваться платформой за 5 шагов
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { step: '1', title: 'Открой бота в Telegram', desc: 'Найди нашего бота и нажми кнопку «Открыть Mini App» — это главный экран.' },
          { step: '2', title: 'Ознакомься с туториалом', desc: 'При первом открытии появится инструкция по каждому инструменту.' },
          { step: '3', title: 'Попробуй базовые функции', desc: 'Напиши запрос, загрузи изображение или включи голосовой диалог.' },
          { step: '4', title: 'Экспериментируй', desc: 'У тебя есть 1 день пробного доступа без ограничений.' },
          { step: '5', title: 'Не стесняйся спрашивать', desc: 'В правом верхнем углу есть кнопка «Помощь» с разбором функций.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/50 transition hover:shadow-lg hover:shadow-purple-500/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">{item.step}</div>
            <h3 className="font-semibold text-lg text-white">{item.title}</h3>
            <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-purple-500/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/30 text-center">
        <p className="text-gray-300">💡 В Mini App есть встроенная инструкция по каждому атрибуту платформы. Просто открой и следуй подсказкам!</p>
      </div>
    </div>
  );
};

export default Instructions;
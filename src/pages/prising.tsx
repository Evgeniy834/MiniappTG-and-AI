import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
        💰 Стоимость
      </h1>
      <p className="text-center text-gray-400 mb-8 text-lg">Выбери тариф, который подходит именно тебе</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Пробный', price: '0 ₽', period: '1 день', features: ['20 запросов в день', 'Доступ к кружкам', 'Голосовой ввод', 'Базовая поддержка'], popular: false },
          { name: 'Базовый', price: '300 ₽', period: 'в месяц', features: ['20 кружков в день', 'Доступ ко всем моделям', 'Голосовой ввод и вывод', 'Распознавание изображений', 'Приоритетная поддержка', 'История диалогов'], popular: true },
          { name: 'Про', price: '799 ₽', period: 'в месяц', features: ['Безлимитные кружки', 'Все модели ИИ', 'Голосовое общение (TTS)', 'Анализ видео в реальном времени', 'Экспорт результатов', 'API доступ', 'VIP-поддержка 24/7'], popular: false },
        ].map((plan, idx) => (
          <div key={idx} className={`bg-white/5 backdrop-blur-sm p-6 rounded-2xl border transition hover:shadow-lg hover:shadow-purple-500/10 ${plan.popular ? 'border-purple-400 shadow-lg shadow-purple-500/20' : 'border-white/10'} relative`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">🔥 Самый популярный</div>}
            <h3 className="text-xl font-bold text-white text-center mt-2">{plan.name}</h3>
            <div className="text-center mt-4"><span className="text-4xl font-bold text-white">{plan.price}</span><span className="text-gray-400 text-sm ml-1">{plan.period}</span></div>
            <ul className="mt-6 space-y-2 text-sm">{plan.features.map((f, i) => <li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400 mt-0.5">✅</span>{f}</li>)}</ul>
            <button className={`w-full mt-6 px-6 py-3 text-white rounded-full text-sm font-medium transition ${plan.popular ? 'bg-gradient-to-b from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30' : 'bg-white/10 hover:bg-white/20'}`}>{plan.popular ? 'Купить' : 'Попробовать'}</button>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-400 text-sm mt-4">🔄 Все тарифы включают 1 день бесплатного пробного периода</div>
    </div>
  );
};

export default Pricing;
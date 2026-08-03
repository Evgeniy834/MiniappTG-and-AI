import React from 'react';

const Opportunities: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
        🚀 Возможности
      </h1>
      <p className="text-center text-gray-400 mb-8 text-lg">Всё, что ты можешь делать с AI-Помощником</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: '🎤', title: 'Голосовое общение', desc: 'Общайся с ИИ как с живым собеседником. Говори, задавай вопросы, получай озвученные ответы.' },
          { icon: '📷', title: 'Распознавание изображений', desc: 'Покажи ИИ картинку или фото — он опишет, проанализирует или доработает её за секунды.' },
          { icon: '✍️', title: 'Генерация контента', desc: 'Создавай тексты, сценарии, код, презентации, бизнес-планы — всё, что угодно.' },
          { icon: '🌍', title: 'Мультиязычность', desc: 'Поддержка более 50 языков для общения, перевода и работы с текстами.' },
          { icon: '🧠', title: 'Обучение с настройкой', desc: 'ИИ адаптируется под твой стиль, задачи и предпочтения.' },
          { icon: '🔒', title: 'Безопасность и приватность', desc: 'Все данные шифруются, мы не передаём информацию третьим лицам.' },
          { icon: '📹', title: 'Видео-сообщения (кружки)', desc: 'Записывай кружки, показывай что угодно — ИИ проанализирует видео и даст ответ.' },
          { icon: '⚡', title: 'Мгновенные ответы', desc: 'Благодаря мощным моделям ты получаешь ответы за считанные секунды.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/50 transition hover:shadow-lg hover:shadow-purple-500/10 text-center">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg text-white">{item.title}</h3>
            <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
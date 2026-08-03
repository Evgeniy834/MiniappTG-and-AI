import React from 'react';

const Reviews: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
        💬 Отзывы
      </h1>
      <p className="text-center text-gray-400 mb-8 text-lg">Что говорят наши пользователи</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Евгений', text: 'Платформа упростила мою работу с текстами! Теперь я создаю контент в 10 раз быстрее.' },
          { name: 'Дмитрий', text: 'Научился использовать ИИ на все 100% за пару дней. Крутые алгоритмы и простая подача информации.' },
          { name: 'Иван', text: 'Очень простой и удобный интерфейс. Разобрался за 5 минут.' },
          { name: 'Диана', text: 'Смогла создать проект быстро и без сложностей. Голосовой ввод — вообще спасение!' },
          { name: 'Сергей', text: 'Отличная платформа! Видео-кружки — это что-то невероятное.' },
          { name: 'Анна', text: 'Пользовалась нейросетями раньше, но эта — самая удобная. Всё понятно, быстро.' },
        ].map((review, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/50 transition hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-yellow-400 text-lg">★★★★★</div>
              <span className="text-purple-400 font-medium">{review.name}</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-400 text-sm mt-4">⭐ Все отзывы реальные, от пользователей нашей платформы</div>
    </div>
  );
};

export default Reviews;
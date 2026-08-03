import React, { useState, useRef } from 'react';

interface ChatProps {
  navigateTo: (page: string) => void;
}

interface Message {
  id: string;
  type: 'text' | 'video' | 'image' | 'voice';
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  fileUrl?: string;
}

const Chat: React.FC<ChatProps> = ({ navigateTo }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'text',
      content: 'Привет! Я твой AI-помощник. Выбери режим, отправь текст, фото, видео или кружок, и я помогу тебе! 🚀',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modes = [
    { id: 'text', label: '📝 Текст', icon: '💬' },
    { id: 'video-circles', label: '🎥 Кружки', icon: '🔄' },
    { id: 'photos', label: '🖼️ Фото', icon: '📷' },
    { id: 'video', label: '🎬 Видео', icon: '🎞️' },
  ];

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Имитация ответа ИИ
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: 'Спасибо за сообщение! Я обрабатываю ваш запрос в режиме ' + modes.find(m => m.id === selectedMode)?.label + ' 📡',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const messageType = file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : 'text';

    const newMessage: Message = {
      id: Date.now().toString(),
      type: messageType as any,
      content: `Файл: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      fileUrl: fileUrl,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Имитация ответа ИИ
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: `📎 Получил ваш файл! Анализирую в режиме ${modes.find(m => m.id === selectedMode)?.label}...`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Начало записи (кружка)
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'video',
        content: '🎥 Запись кружка...',
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);

      // Симуляция завершения записи через 3 секунды
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: '🎬 Кружок получен! Обрабатываю видео и речь в режиме "Кружки"...',
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsRecording(false);
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gradient-to-t from-black via-purple-800 to-black rounded-2xl border border-white/10 overflow-hidden">
      {/* ШАПКА ЧАТА */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="text-gray-400 hover:text-white transition"
          >
            ← Назад
          </button>
          <div>
            <div className="text-sm font-semibold text-white">AI-Помощник</div>
            <div className="text-xs text-gray-400">
              Режим: {modes.find(m => m.id === selectedMode)?.label || 'Текст'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-gray-400">онлайн</span>
        </div>
      </div>

      {/* ВЫБОР РЕЖИМА */}
      <div className="flex gap-2 px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
              selectedMode === mode.id
                ? 'bg-purple-500/30 text-white border border-purple-400/50'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {mode.icon} {mode.label}
          </button>
        ))}
      </div>

      {/* СООБЩЕНИЯ */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-500/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white rounded-br-none'
                  : 'bg-white/10 backdrop-blur-sm text-gray-200 rounded-bl-none border border-white/5'
              }`}
            >
              {msg.type === 'video' && msg.fileUrl && (
                <video
                  src={msg.fileUrl}
                  controls
                  className="rounded-lg max-w-[200px] max-h-[200px]"
                />
              )}
              {msg.type === 'image' && msg.fileUrl && (
                <img
                  src={msg.fileUrl}
                  alt="Загруженное изображение"
                  className="rounded-lg max-w-[200px] max-h-[200px]"
                />
              )}
              {msg.type === 'text' && (
                <p className="text-sm leading-relaxed break-words">{msg.content}</p>
              )}
              {msg.type === 'video' && !msg.fileUrl && (
                <p className="text-sm">{msg.content}</p>
              )}
              <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Индикатор печати */}
        <div className="flex justify-start">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-none px-4 py-2 border border-white/5">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      </div>

      {/* ПОЛЕ ВВОДА */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"
          title="Прикрепить файл"
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={handleRecord}
          className={`p-2 rounded-full transition ${
            isRecording
              ? 'bg-red-500/30 text-red-400 animate-pulse'
              : 'hover:bg-white/10 text-gray-400 hover:text-white'
          }`}
          title="Записать кружок"
        >
          {isRecording ? '⏹️' : '🎥'}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Напишите сообщение..."
          className="flex-1 px-4 py-2 bg-white/5 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10"
        />

        <button
          onClick={sendMessage}
          disabled={!inputText.trim()}
          className={`p-2 rounded-full transition ${
            inputText.trim()
              ? 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
              : 'bg-white/5 text-gray-500 cursor-not-allowed'
          }`}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;
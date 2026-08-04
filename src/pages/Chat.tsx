import React, { useState, useRef, useEffect } from 'react';

interface ChatProps {
  navigateTo: (page: string) => void;
}

interface Message {
  id: string;
  type: 'text' | 'video' | 'image' | 'voice' | 'system';
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  fileUrl?: string;
  mode?: string;
}

const Chat: React.FC<ChatProps> = ({ navigateTo }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: '👋 Привет! Я твой AI-помощник. Отправь текст, фото, видео или кружок — я всё обработаю!',
      sender: 'system',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecordingReady, setIsRecordingReady] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Определение типа контента
  const detectContentType = (file: File): 'video' | 'image' | 'voice' | 'text' => {
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('audio/')) return 'voice';
    return 'text';
  };

  // Добавление системного сообщения
  const addSystemMessage = (content: string) => {
    const systemMsg: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: content,
      sender: 'system',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMsg]);
  };

  // Добавление сообщения пользователя
  const addUserMessage = (content: string, type: 'text' | 'video' | 'image' | 'voice', fileUrl?: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: type,
      content: content,
      sender: 'user',
      timestamp: new Date(),
      fileUrl: fileUrl,
    };
    setMessages((prev) => [...prev, userMsg]);
  };

  // Добавление ответа AI
  const addAIMessage = (content: string) => {
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: 'text',
      content: content,
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsProcessing(false);
  };

  // Симуляция ответа AI
  const simulateAIResponse = (mode: string, content: string) => {
    setIsProcessing(true);
    const modeLabels: Record<string, string> = {
      text: 'Текст',
      video: 'Видео',
      image: 'Фото',
      voice: 'Голосовое',
    };

    const modeLabel = modeLabels[mode] || 'Неизвестно';
    addSystemMessage(`🔄 Обработка в режиме: ${modeLabel}...`);

    setTimeout(() => {
      let response = '';
      switch (mode) {
        case 'text':
          response = `📝 Я получил твой текст: "${content}". Отвечаю как LLM! 🤖`;
          break;
        case 'video':
          response = `🎬 Видео получено! Анализирую кадры и звук... 🎥`;
          break;
        case 'image':
          response = `🖼️ Фото получено! Распознаю объекты и контекст... 📸`;
          break;
        case 'voice':
          response = `🎤 Голосовое получено! Распознаю речь и готовлю ответ... 🗣️`;
          break;
        default:
          response = `✅ Получено! Обрабатываю...`;
      }
      addAIMessage(response);
    }, 2000);
  };

  // Отправка текстового сообщения
  const sendMessage = () => {
    if (!inputText.trim() || isProcessing) return;

    const userMsg = inputText;
    setInputText('');
    addUserMessage(userMsg, 'text');
    simulateAIResponse('text', userMsg);
  };

  // Обработка загрузки файла
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || isProcessing) return;

    const contentType = detectContentType(file);
    const fileUrl = URL.createObjectURL(file);

    const contentLabels: Record<string, string> = {
      video: '🎬 Видео',
      image: '🖼️ Фото',
      voice: '🎤 Голосовое',
      text: '📝 Текст',
    };

    addUserMessage(`${contentLabels[contentType]}: ${file.name}`, contentType, fileUrl);
    simulateAIResponse(contentType, file.name);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Запись кружка (двухшаговый подход для iOS)
  const prepareRecording = async () => {
    if (isProcessing) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsRecordingReady(true);
      addSystemMessage('🎥 Нажмите ещё раз, чтобы начать запись кружка');
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      addSystemMessage('❌ Не удалось получить доступ к камере. Проверьте разрешения.');
    }
  };

  const startRecording = () => {
    if (!streamRef.current || isProcessing) return;

    const stream = streamRef.current;
    chunksRef.current = [];

    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/mp4',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      const fileUrl = URL.createObjectURL(blob);
      addUserMessage('🎥 Кружок', 'video', fileUrl);
      simulateAIResponse('video', 'Кружок');

      // Останавливаем все треки
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsRecording(false);
      setIsRecordingReady(false);
    };

    mediaRecorderRef.current = recorder;
    recorder.start(100); // timeslice для iOS
    setIsRecording(true);
    addSystemMessage('🔴 Запись кружка... Нажмите кнопку для остановки');
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordAction = () => {
    if (isProcessing) return;

    if (!isRecordingReady && !isRecording) {
      prepareRecording();
    } else if (isRecordingReady && !isRecording) {
      startRecording();
    } else if (isRecording) {
      stopRecording();
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
              {isProcessing ? '⏳ Обработка...' : '✅ Готов к работе'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isProcessing ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
          <span className="text-xs text-gray-400">{isProcessing ? 'думает...' : 'онлайн'}</span>
        </div>
      </div>

      {/* СООБЩЕНИЯ */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-500/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
          >
            {msg.sender === 'system' && (
              <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30 max-w-[90%]">
                <p className="text-xs text-purple-300 text-center">{msg.content}</p>
              </div>
            )}

            {msg.sender === 'user' && (
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.type === 'video' || msg.type === 'image'
                    ? 'bg-transparent p-0'
                    : 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white rounded-br-none'
                }`}
              >
                {msg.type === 'image' && msg.fileUrl && (
                  <img src={msg.fileUrl} alt="Фото" className="rounded-lg max-w-[200px] max-h-[200px] object-cover" />
                )}
                {msg.type === 'video' && msg.fileUrl && (
                  <video src={msg.fileUrl} controls className="rounded-lg max-w-[200px] max-h-[200px]" />
                )}
                {msg.type !== 'image' && msg.type !== 'video' && (
                  <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                )}
                <div className="text-[10px] mt-1 text-indigo-200">{formatTime(msg.timestamp)}</div>
              </div>
            )}

            {msg.sender === 'assistant' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-none px-4 py-2 border border-white/5 max-w-[80%]">
                <p className="text-sm text-gray-200 leading-relaxed">{msg.content}</p>
                <div className="text-[10px] mt-1 text-gray-400">{formatTime(msg.timestamp)}</div>
              </div>
            )}
          </div>
        ))}

        {/* Индикатор печати */}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-none px-4 py-2 border border-white/5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Видео-превью для записи кружка */}
        {isRecordingReady && (
          <div className="flex justify-center">
            <video
              ref={videoRef}
              muted
              className="rounded-xl max-w-[200px] max-h-[200px] border-2 border-purple-400/50"
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ПОЛЕ ВВОДА */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"
          title="Прикрепить файл"
          disabled={isProcessing}
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={handleRecordAction}
          className={`p-2 rounded-full transition ${
            isRecording
              ? 'bg-red-500/30 text-red-400 animate-pulse'
              : isRecordingReady
              ? 'bg-green-500/30 text-green-400 animate-pulse'
              : 'hover:bg-white/10 text-gray-400 hover:text-white'
          }`}
          title="Записать кружок"
          disabled={isProcessing}
        >
          {isRecording ? '⏹️' : '🎥'}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={isProcessing ? '⏳ Ожидайте...' : 'Напишите сообщение...'}
          className="flex-1 px-4 py-2 bg-white/5 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10 disabled:opacity-50"
          disabled={isProcessing}
        />

        <button
          onClick={sendMessage}
          disabled={!inputText.trim() || isProcessing}
          className={`p-2 rounded-full transition ${
            inputText.trim() && !isProcessing
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
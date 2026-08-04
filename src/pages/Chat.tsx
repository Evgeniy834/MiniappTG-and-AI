import React, { useState, useRef, useEffect } from 'react';
import '../types/telegramtypes'

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
const [isIOS, setIsIOS] = useState<boolean>(false);
const [isRecordingReady, setIsRecordingReady] = useState(false);
const [recordingTime, setRecordingTime] = useState(0);
const fileInputRef = useRef<HTMLInputElement>(null);
const videoRef = useRef<HTMLVideoElement>(null);
const mediaRecorderRef = useRef<MediaRecorder | null>(null);
const streamRef = useRef<MediaStream | null>(null);
const chunksRef = useRef<Blob[]>([]);
const timerRef = useRef<NodeJS.Timeout | null>(null);
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]); // 👈 следим за изменением messages

useEffect(() => {
  const platform = window.Telegram?.WebApp?.platform || '';
  if (platform === 'ios' || platform === 'iphone' || platform === 'ipad') {
    setIsIOS(true);
    // Добавь где-нибудь в коде
  console.log('iOS platform:', isIOS);
  }
}, []);

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
      video: 'Видео (кружок)',
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
          response = `🎬 Кружок получен! Анализирую видео и распознаю речь... 🎥`;
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

  // ========== ЗАПИСЬ КРУЖКА ДЛЯ iOS ==========

  // Шаг 1: Запрос доступа к камере и микрофону (синхронно по клику)
  const prepareRecording = async () => {
    if (isProcessing) return;

    try {
      // iOS требует getUserMedia ВНУТРИ обработчика клика
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 320 },
          height: { ideal: 320 },
        },
        audio: true,
      });

      streamRef.current = stream;

      // Показываем превью камеры
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsRecordingReady(true);
      addSystemMessage('🎥 Нажмите кнопку записи ещё раз, чтобы начать');

      // iOS: если пользователь не дал разрешение — показываем ошибку
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      addSystemMessage('❌ Не удалось получить доступ к камере. Проверьте разрешения в настройках Telegram.');
    }
  };

  // Шаг 2: Запуск записи (используем уже полученный поток)
  const startRecording = () => {
    if (!streamRef.current || isProcessing) return;

    const stream = streamRef.current;
    chunksRef.current = [];

    // Определяем поддерживаемый MIME-тип
    let mimeType = 'video/mp4';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
      }
    }

    const recorder = new MediaRecorder(stream, {
      mimeType: mimeType,
      videoBitsPerSecond: 1000000, // 1 Mbps
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      // Создаём Blob
      const blob = new Blob(chunksRef.current, { type: mimeType });

      // Конвертируем в формат, понятный Telegram (mp4)
      const file = new File([blob], `circle_${Date.now()}.mp4`, { type: 'video/mp4' });
      const fileUrl = URL.createObjectURL(file);

      // Отправляем в чат
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
      setRecordingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    // Ошибка записи
    recorder.onerror = (event) => {
      console.error('Ошибка записи:', event);
      addSystemMessage('❌ Ошибка при записи. Попробуйте ещё раз.');
      setIsRecording(false);
      setIsRecordingReady(false);
    };

    mediaRecorderRef.current = recorder;
    recorder.start(100); // timeslice для iOS — обязательно!
    setIsRecording(true);
    addSystemMessage('🔴 Идёт запись... Нажмите кнопку, чтобы остановить');

    // Таймер записи (максимум 60 секунд)
    setRecordingTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 59) {
          // Автоматическая остановка через 60 секунд
          if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
          }
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Шаг 3: Остановка записи
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Главный обработчик кнопки записи
  const handleRecordAction = () => {
    if (isProcessing) return;

    if (!isRecordingReady && !isRecording) {
      // Шаг 1: Запрос доступа
      prepareRecording();
    } else if (isRecordingReady && !isRecording) {
      // Шаг 2: Начать запись
      startRecording();
    } else if (isRecording) {
      // Шаг 3: Остановить запись
      stopRecording();
    }
  };

  // Если на Android, используем input для выбора файла

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              {isRecording ? `🔴 ${formatRecordingTime(recordingTime)}` : isProcessing ? '⏳ Обработка...' : '✅ Готов к работе'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isRecording ? 'bg-red-500' : isProcessing ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
          <span className="text-xs text-gray-400">
            {isRecording ? 'запись...' : isProcessing ? 'думает...' : 'онлайн'}
          </span>
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
                  <video
                    src={msg.fileUrl}
                    controls
                    className="rounded-full w-[200px] h-[200px] object-cover border-2 border-white/10"
                  />
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
        {isProcessing && !isRecording && (
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
          <div className="flex flex-col items-center gap-2">
            <video
              ref={videoRef}
              muted
              className="rounded-full w-[200px] h-[200px] border-2 border-purple-400/50 object-cover"
            />
            <div className="text-xs text-purple-400 animate-pulse">⏺ Готов к записи. Нажмите кнопку 🎥</div>
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
          disabled={isProcessing || isRecording}
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

        {/* Кнопка записи кружка */}
        <button
          onClick={handleRecordAction}
          className={`p-2 rounded-full transition ${
            isRecording
              ? 'bg-red-500/30 text-red-400 animate-pulse'
              : isRecordingReady
              ? 'bg-green-500/30 text-green-400'
              : 'hover:bg-white/10 text-gray-400 hover:text-white'
          }`}
          title="Записать кружок"
          disabled={isProcessing}
        >
          {isRecording ? '⏹️' : isRecordingReady ? '▶️' : '🎥'}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={isProcessing ? '⏳ Ожидайте...' : isRecording ? '🔴 Запись...' : 'Напишите сообщение...'}
          className="flex-1 px-4 py-2 bg-white/5 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10 disabled:opacity-50"
          disabled={isProcessing || isRecording}
        />

        <button
          onClick={sendMessage}
          disabled={!inputText.trim() || isProcessing || isRecording}
          className={`p-2 rounded-full transition ${
            inputText.trim() && !isProcessing && !isRecording
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
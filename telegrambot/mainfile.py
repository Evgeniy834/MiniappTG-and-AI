import asyncio
import logging
from aiogram.enums import ParseMode
from aiogram import Bot, types, Router, F, Dispatcher
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message
from config import BOT_TOKEN, AI_API_KEY, AI_API_URL, AI_MODEL
from openai import OpenAI
from keyboards import startkeys2, startkeys


from database import (
    init_db, get_or_create_user, is_registered, set_registered,
    save_message, get_message_count_last_12h, get_conversation_history
)

# ========== SYSTEM PROMPT ==========
SYSTEM_PROMPT = (
    "Ты — дружелюбный AI-помощник проекта. "
    "Твоя задача — помогать новым пользователям разобраться в возможностях платформы, "
    "отвечать на их вопросы, давать советы и поддерживать позитивное общение. "
    "Отвечай кратко, по делу и уважительно. Старайся быть вдохновляющим и полезным. "
    "Если пользователь спрашивает о проекте, объясни, что это платформа для творчества, работы, подсчетов,"
    "презентаций, генерации идей, создания проектов и работа с изображениями и видео "
    "и генерации идей, где каждый может создавать что угодно: тексты, изображения, планы, "
    "и многое другое. Упомяни пользователю ТОЛЬКО 1 раз за весь разговор, что после регистрации пользователь получает 1 день бесплатного пользования." 
    "но если он спросит про 1 день бесплатного пользования то можешь напомнить, после одного раза запрещенно упомнить в каждом последующем сообщении " 
    "Тебе запрещенно в обыном контексте использовать символ: *(звездочка) в случае если речь идет не о каких либо премерах из математики " 
    "Ты можешь использовать историю предыдущих сообщений пользователя для поддержания контекста диалога."
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

bot = Bot(token=BOT_TOKEN)
router = Router()

client = OpenAI(api_key=AI_API_KEY, base_url=AI_API_URL)

init_db()

async def ask_routerai(user_id: int, user_message: str) -> str:
    history = get_conversation_history(user_id, limit=10)
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": user_message})

    try:
        response = await asyncio.to_thread(
            client.chat.completions.create,
            model=AI_MODEL,
            messages=messages,
            temperature=0.7
        )
        answer = response.choices[0].message.content
        logger.info(f"Ответ от AI: {answer[:200]}...")
        return answer
    except Exception as e:
        logger.exception("Ошибка при запросе к RouterAI")
        return "⚠️ Не удалось получить ответ от AI. Попробуйте позже."

# ========== ХЕНДЛЕРЫ ==========
@router.message(Command("start"))
async def startmessage(message: types.Message):
    user_id = message.from_user.id
    username = message.from_user.username or "Без имени"
    get_or_create_user(user_id, username)  
    await message.answer(
        f"👋 Привет, {username}!\n\n"
        f"Добро пожаловать в <b>'название придумаем'</b> — твой AI-помощник для создания всего, что только можно придумать.\n\n"
        f"✨ Ты можешь общаться со мной. У тебя есть 10 запросов каждые 12 часов.\n"
        f"🎁 Пройди регистрацию и получи 3 дня пользования в подарок бесплатно!",
        parse_mode=ParseMode.HTML,
        reply_markup=startkeys
    )


@router.callback_query(F. data == 'back_menu')
async def back_menu(callback: CallbackQuery):
    await callback.answer() 
    await callback.message.edit_text(
        f"Добро пожаловать в <b>'название придумаем'</b> — твой AI-помощник для создания всего, что только можно придумать.\n\n"
        f"✨ Ты можешь общаться со мной. У тебя есть 10 запросов каждые 12 часов.\n"
        f"🎁 Пройди регистрацию и получи 1 день пользования в подарок бесплатно!",
        parse_mode=ParseMode.HTML,
        reply_markup=startkeys2
    )

@router.callback_query(F. data == 'help')
async def help(callback: CallbackQuery):
    await callback.answer()
    await callback.message.edit_text(
        f"Если возникли проблемы обращайся - @username",
        reply_markup=startkeys2,
        parse_mode=ParseMode.HTML)


@router.callback_query(F. data == 'manuals')
async def help(callback: CallbackQuery):
    await callback.answer()
    await callback.message.edit_text(
        f"<b>Инструкция для новичка:</b> как начать пользоваться платформой за 5 шагов!\n\n"
        f"1. <b>Открой нашего бота в Telegram</b> и нажми кнопку <b>«Открыть Mini App»</b> — это главный экран, где происходит всё волшебство.\n"
        f"2. <b>Ознакомься со стартовым туториалом</b> — в Mini App есть встроенная инструкция с пояснением каждого инструмента (кнопки, поля, возможности ИИ). Она появится автоматически при первом открытии.\n"
        f"3. <b>Попробуй базовые функции</b> — напиши текстовый запрос, загрузи изображение, включи голосовой диалог или умную камеру с ИИ. Все кнопки подписаны.\n"
        f"4. <b>Не бойся экспериментировать</b> — у тебя есть <b>1 полный день пробного доступа</b> без ограничений. Можешь протестировать все модели ИИ и любые сценарии.\n"
        f"5. <b>Если что-то непонятно</b> — в правом верхнем углу Mini App есть выдвижное меню и кнопка - «Инструкция» с разбором каждой функции и частыми вопросами.",
        reply_markup=startkeys2,
        parse_mode=ParseMode.HTML)
    

#@router.callback_query(F. data == 'help')
#async def help(callback: CallbackQuery):
#    await callback.message.edit_text(
#        f"Если возникли проблемы обращайся - @username",
#        reply_markup=startkeys2,
#        parse_mode=ParseMode.HTML)

@router.message(F.text & ~F.text.startswith('/'))
async def handle_ai_message(message: types.Message):
    user_id = message.from_user.id
    username = message.from_user.username or "Без имени"
    user_msg = message.text

    get_or_create_user(user_id, username)

    msg_count = get_message_count_last_12h(user_id)
    if msg_count >= 10:
        await message.answer(
            "⏳ Вы использовали все 10 запросов за последние 12 часов. "
            "Пожалуйста, подождите, лимит обновится."
        )
        return
    save_message(user_id, "user", user_msg)
    await bot.send_chat_action(message.chat.id, action="typing")
    ai_response = await ask_routerai(user_id, user_msg)
    save_message(user_id, "assistant", ai_response)
    if not ai_response.strip():
        ai_response = "🤖 Извините, я не смог сформулировать ответ. Попробуйте переформулировать вопрос."
    try:
        await message.answer(ai_response, parse_mode=ParseMode.HTML)
    except Exception as e:
        logger.error(f"Ошибка при отправке сообщения: {e}")
        await message.answer(ai_response)

# ========== ЗАПУСК ==========
async def main():
    logger.info("🚀 Бот запущен и готов к работе!")
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
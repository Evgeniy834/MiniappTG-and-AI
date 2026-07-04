import asyncio
import logging
import aiohttp
from aiogram.enums import ParseMode
from aiogram import Bot, types, Router, F, Dispatcher
from aiogram.filters import Command
from config import BOT_TOKEN, AI_API_KEY, AI_API_URL, AI_MODEL
from openai import OpenAI

SYSTEM_PROMPT = (
    ""
)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
bot = Bot(token=BOT_TOKEN)
router = Router()

client = OpenAI(
    api_key=AI_API_KEY,
    base_url=AI_API_URL
)

async def ask_routerai(user_message: str) -> str:

    try:
        response = await asyncio.to_thread(
            client.chat.completions.create,
            model=AI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.exception("Ошибка при запросе к RouterAI")
        return "⚠️ Не удалось получить ответ от AI. Попробуйте позже."


@router.message(Command("start"))
async def startmessage(message: types.Message):
    await message.answer(
        f"👋 Привет!\n\n"
        f"Добро пожаловать в <b>'название придумаем'</b> — твой AI-помощник для простого создание всего, что только можно придумать\n\n"
        f"✨ Нажми на кнопку ниже, чтобы открыть Mini App и начать создавать шедевры.\n\n"
        f"🎁 Пройди регистрацию и получи 3 дня пользования в подарок бесплатно!",
        # reply_markup=main_pay,
        parse_mode=ParseMode.HTML
    )

@router.message(F.text & ~F.text.startswith('/'))
async def handle_ai_message(message: types.Message):
    await bot.send_chat_action(message.chat.id, action="typing")
    user_msg = message.text
    ai_response = await ask_routerai(user_msg)
    await message.answer(ai_response, parse_mode=ParseMode.MARKDOWN)

# ===== ЗАПУСК БОТА =====
async def main():
    logger.info("🚀 Бот запущен и готов к работе!")
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
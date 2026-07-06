import sqlite3
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

DB_PATH = "bot_database.db"

def get_db():
    """Возвращает соединение с БД и курсор"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Создаёт таблицы, если их нет"""
    conn = get_db()
    cursor = conn.cursor()

    # Таблица пользователей
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            username TEXT,
            registered BOOLEAN DEFAULT 0,
            first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Таблица сообщений (история диалогов)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            role TEXT CHECK(role IN ('user', 'assistant')),
            content TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        )
    ''')
    conn.commit()
    conn.close()
    logger.info("✅ База данных инициализирована")

# ----- Функции для работы с пользователями -----

def get_or_create_user(user_id: int, username: str):
    """Возвращает пользователя из БД или создаёт нового"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    if not user:
        cursor.execute(
            "INSERT INTO users (user_id, username) VALUES (?, ?)",
            (user_id, username)
        )
        conn.commit()
        user = cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    return user

def set_registered(user_id: int):
    """Отмечает пользователя как зарегистрированного"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET registered = 1 WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()

def is_registered(user_id: int) -> bool:
    """Проверяет, зарегистрирован ли пользователь"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT registered FROM users WHERE user_id = ?", (user_id,))
    result = cursor.fetchone()
    conn.close()
    return bool(result and result[0])

# ----- Функции для работы с сообщениями -----

def save_message(user_id: int, role: str, content: str):
    """Сохраняет одно сообщение (user или assistant) в историю"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO messages (user_id, role, content) VALUES (?, ?, ?)",
        (user_id, role, content)
    )
    conn.commit()
    conn.close()

def get_message_count_last_12h(user_id: int) -> int:
    """
    Возвращает количество сообщений пользователя (роль 'user')
    за последние 12 часов
    """
    conn = get_db()
    cursor = conn.cursor()
    twelve_hours_ago = datetime.now() - timedelta(hours=12)
    cursor.execute(
        "SELECT COUNT(*) FROM messages WHERE user_id = ? AND role = 'user' AND timestamp > ?",
        (user_id, twelve_hours_ago)
    )
    count = cursor.fetchone()[0]
    conn.close()
    return count

def get_conversation_history(user_id: int, limit: int = 20) -> list:
    """
    Возвращает последние N сообщений (user + assistant) для контекста
    в хронологическом порядке
    """
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT role, content FROM messages WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?",
        (user_id, limit)
    )
    rows = cursor.fetchall()
    conn.close()
    # Возвращаем в правильном порядке (от старых к новым)
    return list(reversed(rows))
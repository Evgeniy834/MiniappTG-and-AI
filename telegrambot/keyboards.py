from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


startkeys = InlineKeyboardMarkup(
    inline_keyboard=[      
        [InlineKeyboardButton(text="💲 Посмотреть баланс", callback_data='lichka')],
        [InlineKeyboardButton(text="🆘 Помощь", callback_data='help')],
        [InlineKeyboardButton(text="ℹ️ Инструкция", callback_data='manuals')],
        [InlineKeyboardButton(text="💵 Пополнить баланс", callback_data='up_balance')],
        [InlineKeyboardButton(text="👤 Регистрация", callback_data='registr')]
    ]
)    

startkeys2 = InlineKeyboardMarkup(
    inline_keyboard=[      
        [InlineKeyboardButton(text="💲 Посмотреть баланс", callback_data='lichka')],
        [InlineKeyboardButton(text="🆘 Помощь", callback_data='help')],
        [InlineKeyboardButton(text="ℹ️ Инструкция", callback_data='manuals')],
        [InlineKeyboardButton(text="💵 Пополнить баланс", callback_data='up_balance')],
        [InlineKeyboardButton(text="👤 Регистрация", callback_data='registr')],
        [InlineKeyboardButton(text="Назад в меню", callback_data='back_menu')]
    ]
)    
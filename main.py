import telegram, platform, asyncio, git, pytz, paramiko, logging, os, requests
from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from telegram.ext import Updater, CommandHandler
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
TOKEN = os.getenv('TOKEN')
BOT_USERNAME = os.getenv('BOT_USERNAME')

# Functions
def startup():
    try:
        global TOKEN, chat_ids_to_reply, path
        # Define bot's token and Davidson chat_ids
        TOKEN = os.environ.get("TOKEN")
        chat_ids = os.environ.get("CHAT_IDS")
        path = os.environ.get("PROJECT_PATH")
        if ',' in chat_ids:
            # Split the string into an array using comma as delimiter
            chat_ids_to_reply = [int(value) for value in chat_ids.split(',')]
        else:
            # If there's no comma, create an array with just one element
            chat_ids_to_reply = [int(chat_ids)]
        chat_ids_to_reply
    except Exception as e:
        logging.error(str(e.args[0]))

# Command
async def github_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    repos = get_github_repos('giladalboher')  # replace 'username' with the actual GitHub username
    await update.message.reply_text(repos)

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Hello! Welcome to the CI bot! ')


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('/start - to start the bot \n /help - to get help \n /github - to get the github repos of the user \n /custom - to get the custom command')

async def custom_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('This is a custom command!')

# Handlers

def handle_response(text: str) -> str:
    processed: str = text.lower()

    if 'hello' in processed:
        return 'Hey there!'
    
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type: str = update.message.chat.type
    text: str = update.message.text

    print(f'User ({update.message.chat.id}) in {message_type}: "{text}')

    if message_type == 'group':
        if BOT_USERNAME in text:
            new_text: str = text.replace(BOT_USERNAME, '').strip()
        else:
            return
    else:
        response: str = handle_response(text)

    print('bot:', response)

    await update.message.reply_text(response)

    async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
        print(f'Update {update} caused error {context.error}')

if __name__ == '__main__':
    app = Application.builder().token(TOKEN).build()

    # commands
    async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
        print(f'Update {update} caused error {context.error}')

    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('custom', custom_command))
    app.add_handler(CommandHandler('github', github_command))

    # messages
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    # errors
    app.add_error_handler(error)

    # Polls the bot
    print('Bot is polling...')
    app.run_polling()

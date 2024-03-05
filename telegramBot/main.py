import telegram, platform, asyncio, git, pytz, paramiko, logging, os, requests
from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from telegram.ext import Updater, CommandHandler
from datetime import datetime
from dotenv import load_dotenv



logger = logging.getLogger(__name__)
telegram_logger = logging.getLogger('httpx')
telegram_logger.setLevel(logging.CRITICAL)
logging.basicConfig(format='[%(asctime)s : line - %(lineno)4s : %(funcName)25s() ] : %(levelname)s : %(message)s',level=logging.INFO)
logging.info("operation system : " + platform.system())


# Load environment variables from .env file and define global variables

# Functions
def startup():
    try:
        load_dotenv('/Users/giladalboher/oz_code/IntegratorPortal/telegramBot/.env')
        global token, chat_ids_to_reply, path, github_token
        # Define bot's token and Gilad chat_ids
        github_token = os.getenv('GITHUB_TOKEN')
        token = os.getenv('TOKEN')
        chat_ids = os.getenv('CHAT_IDS')
        path = os.environ.get("PROJECT_PATH")
        if ',' in chat_ids:
            # Split the string into an array using comma as delimiter
            chat_ids_to_reply = [int(value) for value in chat_ids.split(',')]
        else:
            # If there's no comma, create an array with just one element
            chat_ids_to_reply = (int[chat_ids])
        chat_ids_to_reply
    except Exception as e:
        logging.error(str(e.args[0]))
        
# Command


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    if chat_id in chat_ids_to_reply:
    # Define the buttons
        try:
            button1 = telegram.KeyboardButton('/git_commits')
            button2 = telegram.KeyboardButton('/git_branches')
            button3 = telegram.KeyboardButton('/git_repo_activity')
            button4 = telegram.KeyboardButton('/help')
            reply_markup = telegram.ReplyKeyboardMarkup([[button1], [button2], [button3], [button4]], resize_keyboard=True, one_time_keyboard=False)
            await update.message.reply_text(text="Hello, I'm your bot!",parse_mode="Markdown",reply_markup=reply_markup)
        except Exception as e:
            logging.error(str(e.args[0]))
            await update.message.reply_text(text='Failed ! : '+ str(e.args[0]))
    else:
        await update.message.reply_text(text="Sorry, I'm not authorized to respond to this chat.")

async def git_repo_activity(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_chat.id in chat_ids_to_reply:
        url = 'https://api.github.com/repos/giladalboher/IntegratorPortal/events'
        headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer '+github_token,
        'X-GitHub-Api-Version': '2022-11-28'
}   
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
        # Do something with the response, e.g., print it
            print('200')
            json_body = response.json()
            text = "*Last 10 events:* \n"
            for event in json_body[:10]:
                type = event['type']
                user = event['actor']['login']
                datetime = event['created_at']
                text += f"{user} {type} `{datetime}` \n"
                print(text)
        else:
            print(f"Error: {response.status_code}, {response.text}")
            text="response.status_code=" + str(response.status_code)
        await update.message.reply_text(text=text,parse_mode='Markdown')
    else:
        await update.message.reply_text(text="Sorry, I'm not authorized to respond to this chat.")
    
async def git_branches(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_chat.id in chat_ids_to_reply:
        url = 'https://api.github.com/repos/giladalboher/IntegratorPortal/branches'
        headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer '+github_token,
        'X-GitHub-Api-Version': '2022-11-28'
    }   
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
        # Do something with the response, e.g., print it
            json_body = response.json()
            text = "*All branches:* \n"
            for branch in json_body:
                name = branch['name']
                text += f"{name} \n"
                print(text)
        else:
            print(f"Error: {response.status_code}, {response.text}")
            text="response.status_code=" + str(response.status_code)
        await update.message.reply_text(text=text,parse_mode='Markdown')
    else:
        await update.message.reply_text(text="Sorry, I'm not authorized to respond to this chat.")

async def git_commits(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_chat.id in chat_ids_to_reply:
        url = 'https://api.github.com/repos/giladalboher/IntegratorPortal/commits'
        headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer '+github_token,
        'X-GitHub-Api-Version': '2022-11-28'
    }   
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
        # Do something with the response, e.g., print it
            json_body = response.json()
            text = "*Last 10 commits:* \n"
            for commit in json_body[:10]:
                message = commit['commit']['message']
                user = commit['commit']['author']['name']
                datetime = commit['commit']['author']['date']
                short_sha = commit['sha'][:7]
                text += "-----------------------\n"
                text += f"{user}: `{message}` sha = {short_sha} `{datetime}` \n"
                print(text)
        else:
            print(f"Error: {response.status_code}, {response.text}")
            text="response.status_code=" + str(response.status_code)
        await update.message.reply_text(text=text,parse_mode='Markdown')
    else:
        await update.message.reply_text(text="Sorry, I'm not authorized to respond to this chat.")



async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    reply_message = """
    Please note that only those with permissions can use this bot.

    Available commands:
    /start - Start the bot
    /git_commits - Get the last 10 commits
    /git_branches - Get all branches
    /git_repo_activity - Get the last 10 events
    /help - Get help
    /custom - Execute a custom command
    """

    await update.message.reply_text(reply_message)

# Handlers

def handle_response(text: str) -> str:
    processed: str = text.lower()

    if 'hello' in processed:
        return 'Hey there!'
    
    async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
        print(f'Update {update} caused error {context.error}')

if __name__ == '__main__':
    startup()
    app = Application.builder().token(token).build()
    # commands
    async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
        print(f'Update {update} caused error {context.error}')

    app.add_handler(CommandHandler('start', start))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('git_commits', git_commits))
    app.add_handler(CommandHandler('git_branches', git_branches))
    app.add_handler(CommandHandler('git_repo_activity', git_repo_activity))

    # messages
    

    # errors
    app.add_error_handler(error)

    # Polls the bot
    print('Bot is polling...')
    app.run_polling()

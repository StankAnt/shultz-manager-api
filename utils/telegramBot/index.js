const TelegramBot = require('node-telegram-bot-api');

class Bot {
  constructor() {
    this.bot = null;
    this.groupId = null;
  }

  set(token, groupId) {
    this.bot = new TelegramBot(token, { polling: true });
    this.groupId = groupId;

    this.setOnStartListener();
    this.setOnMessageListener();
  }

  setOnStartListener() {
    this.bot.onText(/\/start/, (msg, match) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, `Hello! Let's enjoy shultz together.`);
    });
  }

  setOnMessageListener() {
    this.bot.on('message', async msg => {
      const chatId = msg.chat.id;
      console.log(chatId);

      if (!msg.entities) {
        this.bot.sendMessage(chatId, 'How you doing?');
      }
    });
  }

  sendMessageToGroup(message) {
    if (this.bot && this.groupId) {
      this.bot.sendMessage(this.groupId, message);
    }
  }

  sendVenueToGroup({ latitude, longitude }, title, power) {
    if (this.bot && this.groupId) {
      this.bot.sendVenue(this.groupId, latitude, longitude, power, 'Shultz');
    }
  }
}

const bot = new Bot();

module.exports = bot;

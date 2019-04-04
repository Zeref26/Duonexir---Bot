const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready !');
});

bot.login(process.env.TOKEN);
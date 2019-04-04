const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready !');
});

bot.on('guildMemberAdd', member => {
        //Captcha
    let a = Math.floor(Math.random()*10)+1;
});

bot.on('message', message => {
    if (message.content=='test') {
        message.channel.send(Math.floor(Math.random()*10)+1);
    }
});

bot.login(process.env.TOKEN);
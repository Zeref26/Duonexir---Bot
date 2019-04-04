const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready !');
});

bot.on('guildMemberAdd', member => {
        //Don rôle
    member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Nouveau"));
        //Captcha
    let a = Math.floor(Math.random()*10)+1;
    let b = Math.floor(Math.random()*10)+1;
    bot.channels.find('id',"563452601669124097").send(member.id+" : "+(a+b));
    member.send("Bienvenue à toi sur Duonexir, avant de pouvoir avoir accès au serveur, merci de valider ce captcha dans #captcha avec la commande -captcha [réponse]/n "+a+" + "+b+" = ?");
});

bot.on('message', message => {
    let member = message.guild.members.find('id', message.author.id);
    if (message.content.startsWith('-')) {
        const args = message.content.slice(1).trim().split(/ +/g);
        if (member.roles.exists('name',"Nouveau")){
            if (args[0].toLowerCase() == "captcha") {
                bot.channels.get("563452601669124097").fetchMessages({limit:99}).then(messages => {
                    messages.forEach((msg) => {
                        let captcha = "";
                        if (msg.content.includes(member.id)) {
                            for (var i = 0; i < msg.content.length; i++){
                                if (msg.content.charAt(i) == ":"){
                                    for (var j = i+2 ; j < msg.content.length; j++){
                                        money += msg.content.charAt(j);
                                    }
                                }
                            }
                            if (captcha == args[1]) {
                                member.removeRole(message.guild.roles.find('name',"Nouveau"));
                                member.addRole(message.guild.roles.find('name',"Membre"));
                            }
                        }
                    });
                });
            }
        }
    }
});

bot.login(process.env.TOKEN);
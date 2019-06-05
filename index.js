const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready !');
});

bot.on('guildMemberAdd', member => {
        //Logs
    bot.channels.find('id',"563472732310732841").send("Bienvenue à "+member+" sur **Duonexir**.\n Nous espérons que tu apprécieras le serveur.");
        //Don rôles
    member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Nouveau"));
    member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race"));
    member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job"));
        //Captcha
    let a = Math.floor(Math.random()*100)+1;
    let b = Math.floor(Math.random()*100)+1;
    bot.channels.find('id',"563452601669124097").send(member.id+" : "+(a+b));
    member.send("Bienvenue à toi sur ***Duonexir***, avant de pouvoir avoir accès au serveur, merci de valider ce captcha dans **#captcha** avec la commande *-captcha [réponse]*\n*** "+a+" + "+b+" = ?***");
});

bot.on('guildMemberRemove', member => {
        //Logs
    bot.channels.find('id',"563472732310732841").send(member+" est parti du serveur. Adieu.");
});

bot.on('message', message => {
    let serveur = bot.guilds.find('name',"Duonexir");
    let member = serveur.members.find('id', message.author.id);
        // Commandes
    if (message.content.startsWith('-')) {
        const args = message.content.slice(1).trim().split(/ +/g);
        let command = args[0].toLowerCase();
            // Pour les nouveaux
        if (member.roles.exists('name',"Nouveau")) {
                // Captcha
            if (command == "captcha") {
                message.delete();
                bot.channels.get("563452601669124097").fetchMessages({limit:99}).then(messages => {
                    messages.forEach((msg) => {
                        let captcha = "";
                        if (msg.content.includes(member.id)) {
                            for (var i = 0; i < msg.content.length; i++){
                                if (msg.content.charAt(i) == ":"){
                                    for (var j = i+2 ; j < msg.content.length; j++){
                                        captcha += msg.content.charAt(j);
                                    }
                                }
                            }
                            if (captcha == args[1]) {
                                member.removeRole(message.guild.roles.find('name',"Nouveau"));
                                member.addRole(message.guild.roles.find('name',"Sans fiche"));
                                msg.delete();
                            } else {
                                message.channel.send("Captcha incorrect, "+member+" ! ");
                            }
                        }
                    });
                });
            }
        }
            // Pour les sans fiches
        if (member.roles.exists('name', "Sans fiche")) {
            message.delete();
            if (command == "race") {
                if (member.roles.exists('name', "Race")) {
                    if (args.length>1) {
                        switch (args[1].toLowerCase()) {
                            case "humain" : bot.channels.find('id',"585506340093296641").send(member.id+" : Humain"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "nain" : bot.channels.find('id',"585506340093296641").send(member.id+" : Nain"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "elfe" : bot.channels.find('id',"585506340093296641").send(member.id+" : Elfe"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "lié" : bot.channels.find('id',"585506340093296641").send(member.id+" : Lié"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "liés" : bot.channels.find('id',"585506340093296641").send(member.id+" : Lié"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "lie" : bot.channels.find('id',"585506340093296641").send(member.id+" : Lié"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "lies" : bot.channels.find('id',"585506340093296641").send(member.id+" : Lié"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            default : message.author.send("Cette race n'existe pas, allez voir les infos pour voir ce qui est disponible.");
                        }
                    } else {
                        message.author.send("Veuillez écrire une race, allez voir les infos pour voir ce qui est disponible.");
                    }
                } else {
                    message.author.send("Vous avez déjà choisi une race. Pour modifier, demandez au staff avec -report [text]");
                }
            }
            if (command == "job") {
                if (member.roles.exists('name', "Job")) {
                    if (args.length>1) {
                        switch (args[1].toLowerCase()) {
                            case "alchimiste" : bot.channels.find('id',"585504415721717771").send(member.id+" : Alchimiste"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "assassin" : bot.channels.find('id',"585504415721717771").send(member.id+" : Assassin"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "érudit" : bot.channels.find('id',"585504415721717771").send(member.id+" : Érudit"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "erudit" : bot.channels.find('id',"585504415721717771").send(member.id+" : Érudit"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "forgeron" : bot.channels.find('id',"585504415721717771").send(member.id+" : Forgeron"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "herboriste" : bot.channels.find('id',"585504415721717771").send(member.id+" : Herboriste"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "mage" : bot.channels.find('id',"585504415721717771").send(member.id+" : Mage"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "milicien" : bot.channels.find('id',"585504415721717771").send(member.id+" : Milicien"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "paysan" : bot.channels.find('id',"585504415721717771").send(member.id+" : Paysan"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "rebelle" : bot.channels.find('id',"585504415721717771").send(member.id+" : Rebelle"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "voleur" : bot.channels.find('id',"585504415721717771").send(member.id+" : Voleur"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            default : message.author.send("Ce métier n'existe pas, allez voir les infos pour voir ce qui est disponible.");
                        }
                    } else {
                        message.author.send("Veuillez écrire un métier, allez voir les infos pour voir ce qui est disponible.");
                    }
                } else {
                    message.author.send("Vous avez déjà choisi un métier. Pour modifier, demandez au staff avec -report [text]");
                }
            }
        }
            // Pour les rôlistes
        if (member.roles.exists('name', "Rôliste")) {
            if (command == "") {

            }
        } 
            // Pour le staff
        if (member.roles.exists('name', "Administrateur") || member.roles.exists('name', "Fondateur")) {
                // Validation fiche
            if (command == "valide") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    message.mentions.members.first().addRole(serveur.roles.find('name', "Rôliste"));
                    message.mentions.members.first().removeRole(serveur.roles.find('name', "Sans fiche"));
                    message.mentions.members.first().send("Votre fiche vient d'être validée, vous pouvais désormais participer au RP.");
                    serveur.channels.find('id', "563475707632812032").send("La fiche de "+message.mentions.members.first().displayName+" est validée. Bienvenue dans le RP.");
                } else {
                    message.channel.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Say
            if (command == "say") {
                message.delete();
                message.channel.send(args.slice(1).join(" "));
            }
                // Mettre rôle Animateur
            if (command == "anim") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    message.mentions.members.first().addRole(serveur.roles.find('name', "Animateur"));
                } else {
                    message.channel.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
        }
            // Pour les animateurs
        if (member.roles.exists('name', "Animateur") || member.roles.exists('name', "Fondateur")) {
            // Say
            if (command == "say") {
                message.delete();
                message.channel.send(args.slice(1).join(" "));
            }
        }
    }
});

bot.on('messageDelete', message => {
    if (message.author.id != 446778406382600213 && message.content.charAt(0) != "-") {
        bot.guilds.find('name', "Duonexir").channels.find('id', "564127370647437342").send(message.createdAt+" ;; "+message.channel+" ;; "+message.author.username+" : "+message);
    }
});

bot.on('messageUpdate', (old_message, new_message) => {
    if (new_message.author.id != 446778406382600213) {
        bot.guilds.find('name', "Duonexir").channels.find('id', "564127370647437342").send(new_message.createdAt+" ;; "+new_message.channel+" ;; "+new_message.author.username+" : "+new_message+"```\nanciennement\n```"+old_message);
    }
});

bot.login(process.env.TOKEN);
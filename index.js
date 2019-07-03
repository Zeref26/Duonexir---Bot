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
                // Choix race
            if (command == "race") {
                if (member.roles.exists('name', "Race")) {
                    if (args.length>1) {
                        switch (args[1].toLowerCase()) {
                            case "humain" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Humain")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "nain" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Nain")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "elfe" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Elfe")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "lié" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Lié")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "liés" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Lié")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "lie" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Lié")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            case "lies" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Lié")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race")); break;
                            default : message.author.send("Cette race n'existe pas, allez voir les infos pour voir ce qui est disponible.");
                        }
                    } else {
                        message.author.send("Veuillez écrire une race, allez voir les infos pour voir ce qui est disponible.");
                    }
                } else {
                    message.author.send("Vous avez déjà choisi une race. Pour modifier, demandez au staff avec -report [text]");
                }
            }
                // Choix métier
            if (command == "job") {
                if (member.roles.exists('name', "Job")) {
                    if (args.length>1) {
                        switch (args[1].toLowerCase()) {
                            case "alchimiste" : bot.channels.find('id',"585504415721717771").send(member.id+" : Alchimiste"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "érudit" : bot.channels.find('id',"585504415721717771").send(member.id+" : Erudit"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "erudit" : bot.channels.find('id',"585504415721717771").send(member.id+" : Erudit"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "forgeron" : bot.channels.find('id',"585504415721717771").send(member.id+" : Forgeron"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "herboriste" : bot.channels.find('id',"585504415721717771").send(member.id+" : Herboriste"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "mage" : bot.channels.find('id',"585504415721717771").send(member.id+" : Mage"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "milicien" : bot.channels.find('id',"585504415721717771").send(member.id+" : Milicien"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "mineur" : bot.channels.find('id',"585504415721717771").send(member.id+" : Mineur"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "paysan" : bot.channels.find('id',"585504415721717771").send(member.id+" : Paysan"); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
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
                // Commencer
            if (command == "start" && !member.roles.exists('hexColor', "#8b481a")) {

            }
                // Donner de l'argent
            if (command == "pay") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let rec = message.mentions.members.first();
                    if (rec.roles.exists('name', "Rôliste")) {
                        if (args.length>2) {
                            if (parseInt(args[2]) > 0) {
                                bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                                    messages.forEach((msg) => {
                                        let argent = "";
                                        if (msg.content.includes(member.id)) {
                                            for (var i = 0; i < msg.content.length; i++){
                                                if (msg.content.charAt(i) == ":"){
                                                    for (var j = i+2 ; j < msg.content.length; j++){
                                                        argent += msg.content.charAt(j);
                                                    }
                                                }
                                            }
                                            if (parseInt(argent) >= args[2]) {
                                                bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages2 => {
                                                    messages2.forEach((msg2) => {
                                                        let argent2 = "";
                                                        if (msg2.content.includes(rec.id)) {
                                                            for (var i = 0; i < msg2.content.length; i++){
                                                                if (msg2.content.charAt(i) == ":"){
                                                                    for (var j = i+2 ; j < msg2.content.length; j++){
                                                                        argent2 += msg2.content.charAt(j);
                                                                    }
                                                                }
                                                            }
                                                            msg.edit(member.id+" : "+(parseInt(argent)-parseInt(args[2])));
                                                            msg2.edit(rec.id+" : "+(parseInt(argent2)+parseInt(args[2])));
                                                        }
                                                    });
                                                });
                                            } else {
                                                member.send("Vous n'avez pas assez d'argent, "+member+" ! ");
                                            }
                                        }
                                    });
                                });
                            } else {
                                member.send("Veuillez entrer un montant positif, "+member+".");
                            }
                        } else {
                            member.send("Veuillez mettre le montant dans la commande, "+member+".");
                        }
                    } else {
                        member.send("Ce membre n'est pas encore Rôliste, "+member+".");
                    }
                } else {
                    member.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Voir argent en poche
            if (command == "money") {
                message.delete();
                bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                    messages.forEach((msg) => {
                        let argent = "";
                        if (msg.content.includes(member.id)) {
                            for (var i = 0; i < msg.content.length; i++){
                                if (msg.content.charAt(i) == ":"){
                                    for (var j = i+2 ; j < msg.content.length; j++){
                                        argent += msg.content.charAt(j);
                                    }
                                }
                            }
                            member.send("Vous êtes en possession de "+argent+" or sur vous.");
                        }
                    });
                });
            }
                // Chuchotter
            if (command == "w") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let rec = message.mentions.members.first();
                    if (rec.roles.exists('name', "Rôliste")) {
                        if (args.length>2) {
                            rec.send(member.displayName+" vous chuchotte : "+args.slice(2).join(" "));
                            message.channel.send(member.displayName+" murmure quelque chose à "+rec.displayName);
                        } else {
                            member.send("Entrez du texte dans la commande, "+member+".");
                        }
                    } else {
                        member.send("Ce membre n'est pas encore Rôliste, "+member+".");
                    }
                } else {
                    member.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Vol de thune
            if (command == "rob") {
                if (message.mentions.members.first().roles.exists('name', "Rôliste")) {
                    if (member.roles.exists('hexColor', "#8b481a") && message.mentions.members.first().roles.exists('hexColor', "#8b481a")) {
                        if (member.roles.find('hexColor', "#8b481a").name == message.mentions.members.first().roles.find('hexColor', "#8b481a").name) {
                            let pctage = Math.floor((Math.random()*20)+10);
                            bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    let argent = "";
                                    if (msg.content.includes(message.mentions.members.first().id)) {
                                        for (var i = 0; i < msg.content.length; i++){
                                            if (msg.content.charAt(i) == ":"){
                                                for (var j = i+2 ; j < msg.content.length; j++){
                                                    argent += msg.content.charAt(j);
                                                }
                                            }
                                        }
                                        let s = Math.floor(parseInt(argent)*pctage/100);
                                        bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages2 => {
                                            messages2.forEach((msg2) => {
                                                let argent2 = "";
                                                if (msg2.content.includes(member.id)) {
                                                    for (var i = 0; i < msg2.content.length; i++){
                                                        if (msg2.content.charAt(i) == ":"){
                                                            for (var j = i+2 ; j < msg2.content.length; j++){
                                                                argent2 += msg2.content.charAt(j);
                                                            }
                                                        }
                                                    }
                                                    msg.edit(message.mentions.members.first().id+" : "+(parseInt(argent)-s));
                                                    msg2.edit(member.id+" : "+(parseInt(argent2)+s));
                                                    member.send("Vous avez volé "+s+"$.");
                                                    if (Math.floor((Math.random()*10)+1) == 5) {
                                                        member.send("La personne a senti que vous l'avez volé.");
                                                        message.mentions.members.first().send("Quelqu'un a fouillé vos poches.");
                                                    }
                                                    bot.channels.get("595582435345956885").fetchMessages({limit:99}).then(messages3 => {
                                                        messages3.forEach((msg3) => {
                                                            let crime = "";
                                                            if (msg3.content.includes(member.id)) {
                                                                for (var i = 0; i < msg3.content.length; i++){
                                                                    if (msg3.content.charAt(i) == ":"){
                                                                        for (var j = i+2 ; j < msg3.content.length; j++){
                                                                            crime += msg3.content.charAt(j);
                                                                        }
                                                                    }
                                                                }
                                                                msg3.edit(member.id+" : "+(parseInt(crime)+1));
                                                                setTimeout(function() {
                                                                    bot.channels.get("585786450268913703").fetchMessages({limit:99}).then(messages4 => {
                                                                        messages4.forEach((msg4) => {
                                                                            let warn = "";
                                                                            if (msg4.content.includes(member.id)) {
                                                                                for (var i = 0; i < msg4.content.length; i++){
                                                                                    if (msg4.content.charAt(i) == ":"){
                                                                                        warn += msg4.content.charAt(i+2);
                                                                                    }
                                                                                }
                                                                                msg4.edit(member.id+" : "+(parseInt(warn)-1));
                                                                            }
                                                                        });
                                                                    });
                                                                },1000*60*60*24);
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    } else {
                        member.send("L'un de vous n'est pas dans un lieu.");
                    }
                } else {
                    member.send("Veuillez mentionner une personne.");
                }
            }
                // Pour les jobs
            let job = "";
            bot.channels.get("585504415721717771").fetchMessages({limit:99}).then(messages => {
                messages.forEach((msg) => {
                    if (msg.content.includes(member.id)) {
                        for (var i = 0; i < msg.content.length; i++){
                            if (msg.content.charAt(i) == ":"){
                                for (var j = i+2 ; j < msg.content.length; j++){
                                    job += msg.content.charAt(j);
                                }
                            }
                        }
                    }
                });
            });
                // Milicien
            if (job == "Milicien") {
                if (command == "control") {

                }
            }
        }
            // Pour le staff
        if (member.roles.exists('name', "Administrateur") || member.roles.exists('name', "Fondateur")) {
                // Validation fiche
            if (command == "valide") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    if (message.mentions.members.first().roles.exists('name', "Sans fiche")) {
                        message.mentions.members.first().addRole(serveur.roles.find('name', "Rôliste"));
                        message.mentions.members.first().removeRole(serveur.roles.find('name', "Sans fiche"));
                        message.mentions.members.first().send("Votre fiche vient d'être validée, vous pouvais désormais participer au RP.");
                        serveur.channels.find('id', "563475707632812032").send("La fiche de "+message.mentions.members.first().displayName+" est validée. Bienvenue dans le RP.");
                        bot.channels.find('id',"564400698767310864").send(message.mentions.members.first().id+" : 250");
                        bot.channels.find('id',"595582435345956885").send(message.mentions.members.first().id+" : 0");
                    } else {
                        message.author.send("Impossible. Cette personne n'a pas le rôle Sans fiche.");
                    }
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
                    message.author.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Warn
            if (command == "warn") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    if (args.length>2) {
                        let reason = args.slice(2).join(" ");
                        message.mentions.members.first().send("Vous avez été averti pour : "+reason);7
                        bot.channels.get("585786450268913703").fetchMessages({limit:99}).then(messages => {
                            messages.forEach((msg) => {
                                let warn = "";
                                let trouve = 0;
                                if (msg.content.includes(message.mentions.members.first().id)) {
                                    trouve = 1;
                                    for (var i = 0; i < msg.content.length; i++){
                                        if (msg.content.charAt(i) == ":"){
                                            warn += msg.content.charAt(i+2);
                                        }
                                    }
                                    if (parseInt(warn)+1 < 3) {
                                        msg.edit(message.mentions.members.first().id+" : "+(parseInt(warn)+1));
                                        message.mentions.members.first().send("Vous avez été averti pour la raison : "+reason+".");
                                        setTimeout(function() {
                                            bot.channels.get("585786450268913703").fetchMessages({limit:99}).then(messages => {
                                                messages.forEach((msg) => {
                                                    let warn = "";
                                                    if (msg.content.includes(message.mentions.members.first().id)) {
                                                        for (var i = 0; i < msg.content.length; i++){
                                                            if (msg.content.charAt(i) == ":"){
                                                                warn += msg.content.charAt(i+2);
                                                            }
                                                        }
                                                        msg.edit(message.mentions.members.first().id+" : "+(parseInt(warn)-1));
                                                    }
                                                });
                                            });
                                        },1000*60*60*24*7);
                                    } else {
                                        message.mentions.members.first().send("Vous avez été kick automatiquement suite à 3 avertissements rapprochés.");
                                        msg.delete();
                                        message.mentions.members.first().kick();
                                    }
                                }
                                if (trouve == 0) {
                                    bot.channels.find('id',"585786450268913703").send(message.mentions.members.first().id+" : 1");
                                    setTimeout(function() {
                                        bot.channels.get("585786450268913703").fetchMessages({limit:99}).then(messages => {
                                            messages.forEach((msg) => {
                                                let warn = "";
                                                if (msg.content.includes(message.mentions.members.first().id)) {
                                                    for (var i = 0; i < msg.content.length; i++){
                                                        if (msg.content.charAt(i) == ":"){
                                                            warn += msg.content.charAt(i+2);
                                                        }
                                                    }
                                                    msg.edit(message.mentions.members.first().id+" : "+(parseInt(warn)-1));
                                                }
                                            });
                                        });
                                    },1000*60*60*24*7);
                                }
                            });
                        });
                    } else {
                        message.author.send("Veuillez mentionner quelqu'un, "+member+".");
                    }
                } else {
                    message.author.send("Veuillez mentionner quelqu'un, "+member+".");
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
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
    bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
        messages.forEach((msg) => {
            if (msg.content.includes(member.id)) {
                msg.delete();
            }
        });
    });
    bot.channels.get("595582435345956885").fetchMessages({limit:99}).then(messages => {
        messages.forEach((msg) => {
            if (msg.content.includes(member.id)) {
                msg.delete();
            }
        });
    });
    bot.channels.get("596004025967575053").fetchMessages({limit:99}).then(messages => {
        messages.forEach((msg) => {
            if (msg.content.includes(member.id)) {
                msg.delete();
            }
        });
    });
    bot.channels.get("585504415721717771").fetchMessages({limit:99}).then(messages => {
        messages.forEach((msg) => {
            if (msg.content.includes(member.id)) {
                msg.delete();
            }
        });
    });
    bot.channels.get("563452601669124097").fetchMessages({limit:99}).then(messages => {
        messages.forEach((msg) => {
            if (msg.content.includes(member.id)) {
                msg.delete();
            }
        });
    });
});

bot.on('message', message => {
    let serveur = bot.guilds.find('name',"Duonexir");
    let member = serveur.members.find('id', message.author.id);
        // Commandes
    if (message.content.startsWith('-')) {
        const args = message.content.slice(1).trim().split(/ +/g);
        let command = args[0].toLowerCase();
        if (command == "easteregg") {
            message.delete();
            bot.channels.find('id',"563475707632812032").send("Quelqu'un a decouvert l'easter egg : "+member);
            member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Easter Egg"));
        }
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
                            case "alchimiste" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Alchimiste")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "érudit" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Erudit")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "erudit" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Erudit")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "forgeron" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Forgeron")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "herboriste" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Herboriste")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "mage" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Mage")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "milicien" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Milicien")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "mineur" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Mineur")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
                            case "paysan" : member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Paysan")); member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job")); break;
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
                // Déplacement
            if (command == "go") {
                message.delete();
                if (args.length > 1) {
                    if (member.roles.exists('name', "Rebelle")) {
                        if (member.roles.exists('name', "Visiteur")) {
                            let dest = args[1].toLowerCase();
                            switch (dest) {
                                case "ademe" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Ademe")); break;
                                case "atos" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Atos")); break;
                                case "cleg" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Cleg")); break;
                                case "eropel" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Eropel")); break;
                                case "ganan" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Ganan")); break;
                                case "iri" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Iri")); break;
                                case "lidewil" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Lidewil")); break;
                                case "moreo" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Moreo")); break;
                                case "nec" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Nec")); break;
                                case "rotua" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Rotua")); break;
                                case "sobo" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Sobo")); break;
                                case "vadep" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Vadep")); break;
                                case "zadec" : member.removeRole(member.roles.find('name', "Visiteur")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Zadec")); break;
                                default : member.send("Ce lieu n'existe pas.");
                            }
                        } else {
                            let lieu = member.roles.find('hexColor', "#8b481a").name.toLowerCase();
                            let dest = args[1].toLowerCase();
                            if (!(lieu == dest)) {
                                switch (dest) {
                                    case "ademe" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Ademe")); break;
                                    case "atos" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Atos")); break;
                                    case "cleg" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Cleg")); break;
                                    case "eropel" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Eropel")); break;
                                    case "ganan" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Ganan")); break;
                                    case "iri" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Iri")); break;
                                    case "lidewil" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Lidewil")); break;
                                    case "moreo" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Moreo")); break;
                                    case "nec" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Nec")); break;
                                    case "rotua" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Rotua")); break;
                                    case "sobo" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Sobo")); break;
                                    case "vadep" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Vadep")); break;
                                    case "zadec" : member.removeRole(member.roles.find('hexColor', "#8b481a")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Zadec")); break;
                                    default : member.send("Ce lieu n'existe pas.");
                                }
                            } else {
                                member.send("Déplacement inutile, vous êtes déjà dans ce lieu.");
                            }
                        }
                    } else {
                        member.send("Quittez tout d'abord le camp avec -camp quit.");
                    }
                } else {
                    member.send("Entrez la destination dans la commande.");
                }
            }
                // Donner de l'argent
            if (command == "pay") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let rec = message.mentions.members.first();
                    if (rec.roles.exists('name', "Rôliste")) {
                        if(member.roles.find('hexColor', "#8b481a").name == message.mentions.members.first().roles.find('hexColor', "#8b481a").name) {
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
                                                if (parseInt(argent) >= parseInt(args[2])) {
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
                            member.send("Vous n'êtes pas au même endroit.");
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
                            bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    let argent2 = "";
                                    if (msg.content.includes(member.id)) {
                                        for (var i = 0; i < msg.content.length; i++){
                                            if (msg.content.charAt(i) == ":"){
                                                for (var j = i+2 ; j < msg.content.length; j++){
                                                    argent2 += msg.content.charAt(j);
                                                }
                                            }
                                        }
                                        member.send("Vous êtes en possession de "+argent+"$ sur vous et de "+argent2+"$ à la banque.");
                                    }
                                });
                            });
                        }
                    });
                });
            }
                // Déposer argent
            if (command == "deposer" || command == "déposer") {
                message.delete();
                if (message.channel.name == "banque") {
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
                                        if (parseInt(argent) >= parseInt(args[2])) {
                                            bot.channels.get("596004025967575053").fetchMessages({limit:99}).then(messages2 => {
                                                messages2.forEach((msg2) => {
                                                    let b = "";
                                                    if (msg2.content.includes(member.id)) {
                                                        for (var i = 0; i < msg2.content.length; i++){
                                                            if (msg2.content.charAt(i) == ":"){
                                                                for (var j = i+2 ; j < msg2.content.length; j++){
                                                                    b += msg2.content.charAt(j);
                                                                }
                                                            }
                                                        }
                                                        msg2.edit(member.id+" : "+(parseInt(b)+parseInt(args[2])));
                                                        msg.edit(member.id+" : "+(parseInt(argent)-parseInt(args[2])));
                                                        member.send("Vous avez déposé "+args[2]+"$ à la banque.");
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
                    member.send("Vous n'êtes pas à la banque.");
                }
            }
                // Retirer argent
            if (command == "retirer") {
                message.delete();
                if (message.channel.name == "banque") {
                    if (args.length>2) {
                        if (parseInt(args[2]) > 0) {
                            bot.channels.get("596004025967575053").fetchMessages({limit:99}).then(messages => {
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
                                        if (parseInt(argent) >= parseInt(args[2])) {
                                            bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages2 => {
                                                messages2.forEach((msg2) => {
                                                    let b = "";
                                                    if (msg2.content.includes(member.id)) {
                                                        for (var i = 0; i < msg2.content.length; i++){
                                                            if (msg2.content.charAt(i) == ":"){
                                                                for (var j = i+2 ; j < msg2.content.length; j++){
                                                                    b += msg2.content.charAt(j);
                                                                }
                                                            }
                                                        }
                                                        msg2.edit(member.id+" : "+(parseInt(b)+parseInt(args[2])));
                                                        msg.edit(member.id+" : "+(parseInt(argent)-parseInt(args[2])));
                                                        member.send("Vous avez retiré "+args[2]+"$ à la banque.");
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
                    member.send("Vous n'êtes pas à la banque.");
                }
            }
                // Salaire
            if (command == "salaire") {
                message.delete();
                if (member.roles.exists('name', "Reçu")) {
                    member.send("Vous avez déjà reçu votre salaire. Revenez dans 24h.");
                } else {
                    let montant = 0;
                    switch (member.roles.find('hexColor', "#ac8532").name.toLowerCase()) {
                        case "alchimiste" : montant = 900; break;
                        case "erudit" : montant = 1100; break;
                        case "forgeron" : montant = 900; break;
                        case "herboriste" : montant = 800; break;
                        case "mage" : montant = 600; break;
                        case "milicien" : montant = 1300; break;
                        case "mineur" : montant = 850; break;
                        case "paysan" :  montant = 750; break;
                    }
                    bot.channels.get("596004025967575053").fetchMessages({limit:99}).then(messages3 => {
                        messages3.forEach((msg3) => {
                            let b = "";
                            if (msg3.content.includes(member.id)) {
                                for (var i = 0; i < msg3.content.length; i++){
                                    if (msg3.content.charAt(i) == ":"){
                                        for (var j = i+2 ; j < msg3.content.length; j++){
                                            b += msg3.content.charAt(j);
                                        }
                                    }
                                }
                                msg3.edit(member.id+" : "+(parseInt(b)+montant));
                                member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Reçu"));
                                setTimeout(function() {
                                    member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Reçu"));
                                },1000*60*60*24);
                            }
                        });
                    });
                } 
            }
                // Chuchotter
            if (command == "w") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let rec = message.mentions.members.first();
                    if (rec.roles.exists('name', "Rôliste")) {
                        if(member.roles.find('hexColor', "#8b481a").name == message.mentions.members.first().roles.find('hexColor', "#8b481a").name) {
                            if (args.length>2) {
                                rec.send(member.displayName+" vous chuchotte : "+args.slice(2).join(" "));
                                message.channel.send(member.displayName+" murmure quelque chose à "+rec.displayName);
                            } else {
                                member.send("Entrez du texte dans la commande, "+member+".");
                            }
                        } else {
                            member.send("Vous n'êtes pas au même endroit.");
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
                                                                let jour = Math.floor((Math.random()*4)+1);
                                                                setTimeout(function() {
                                                                    bot.channels.get("595582435345956885").fetchMessages({limit:99}).then(messages4 => {
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
                                                                },1000*60*60*24*j);
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        } else {
                            member.send("Vous n'êtes pas au même endroit.");
                        }
                    } else {
                        member.send("L'un de vous n'est pas dans un lieu.");
                    }
                } else {
                    member.send("Veuillez mentionner une personne.");
                }
            }
                // Autoriser quelqu'un chez soi
            if (command == "entre") {
                if (member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
                    if (message.mentions.members.size == 1) {
                        let p = message.mentions.members.first();
                        if (p.roles.exists('name', "Rôliste")) {
                            message.channel.overwritePermissions(p,{
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: true,
                            });
                        } else {
                            member.send("Cette personne n'est pas encore Rôliste.");
                        }
                    } else {
                        member.send("Vous devez mentionner une personne.");
                    }
                }
            }
            
                // Sortir quelqu'un de chez soi
            if (command == "sort") {
                if (member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
                    if (message.mentions.members.size == 1) {
                        let p = message.mentions.members.first();
                        if (p.roles.exists('name', "Rôliste")) {
                            message.channel.overwritePermissions(p,{
                                VIEW_CHANNEL: false,
                                SEND_MESSAGES: false,
                            });
                        } else {
                            member.send("Cette personne n'est pas encore Rôliste.");
                        }
                    } else {
                        member.send("Vous devez mentionner une personne.");
                    }
                }
            }
            if (command == "camp") {
                message.delete();
                if (args.length == 1 && message.channel.id == "595638030824636417") {
                    message.channel.send("**Alors que vous approchez de l'entrée du camp, un homme s'interpose.**\nGarde : Quel est le code ?");
                    member.send("Utilisez -camp [code] pour donner le code.");
                } else if (args.length > 1 && message.channel.id == "595638030824636417") {
                    if (args[1].toLowerCase() == "quit") {
                        if (member.roles.exists('name', "Rebelle")) {
                            member.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Rebelle"));
                            member.send("Vous êtes sorti du camp.");
                        } else {
                            member.send("Vous n'êtes pas dans le camp.")
                        }
                    } else {
                        bot.channels.get("596341320591736832").fetchMessages({limit:99}).then(messages4 => {
                            let code = "";
                            messages4.forEach((msg4) => {
                                if (1==1) {
                                    for (var i = 0; i < msg4.content.length; i++){
                                        code += msg4.content.charAt(i);
                                    }
                                    if (args.slice(1).join(" ").toLowerCase() == code.toLowerCase()) {
                                        message.channel.send("Garde : Le mot de passe est correct, vous pouvez rentrer.\n**L'homme s'écarte légèrement de l'entrer pour vous laisser passer.**");
                                        member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Rebelle"));
                                    } else {
                                        message.channel.send("Garde : Le mot de passe n'est pas "+args[1].toLowerCase()+" !\n**L'homme pointe son arme vers vous.**\nGarde : Quittez immédiatement la zone !");
                                    }
                                }
                            });
                        });
                    }
                } else {
                    member.send("-camp doit être utilisé à l'entrée du camp.");
                }
            }
                // Casino
            if (command == "casino") {
                if (message.channel.name == "casino") {
                    if (args.length > 2) {
                        if (parseInt(args[1]) > 0 && parseInt(args[1]) < 7) {
                            if (parseInt(args[2]) > 0) {
                                let total = 0;
                                let de1 = Math.floor((Math.random()*6)+1);
                                let de2 = Math.floor((Math.random()*6)+1);
                                let de3 = Math.floor((Math.random()*6)+1);
                                if (de1 == parseInt(args[1])) {
                                    total += 1;
                                }
                                if (de2 == parseInt(args[1])) {
                                    total += 1;
                                }
                                if (de3 == parseInt(args[1])) {
                                    total += 1;
                                }
                                switch (total) {
                                    case 1 : bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
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
                                                    msg.edit(member.id+" : "+(parseInt(argent)+(parseInt(args[2]))));
                                                }
                                            });
                                        });
                                        message.channel.send("Un dé correspond à votre chiffre, vous remportez 2x votre mise."); break;
                                    case 2 : bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
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
                                                msg.edit(member.id+" : "+(parseInt(argent)+(parseInt(args[2])*2)));
                                            }
                                        });
                                    });
                                    message.channel.send("Deux dés correspondent à votre chiffre, vous remportez 3x votre mise !"); break;
                                    case 3 : bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
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
                                                msg.edit(member.id+" : "+(parseInt(argent)+(parseInt(args[2])*5)));
                                            }
                                        });
                                    });
                                    message.channel.send("Tous les dés correspondent à votre chiffre, vous remportez 6x votre mise !"); break;
                                    default : bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                                                messages.forEach((msg) => {
                                                    let gain = "";
                                                    for (var i = 0; i < msg.content.length; i++){
                                                        gain += msg.content.charAt(i+2);
                                                    }
                                                    msg.edit(""+(parseInt(gain)+parseInt(args[2])));
                                                });
                                            });
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
                                                        msg.edit(member.id+" : "+(parseInt(argent)-parseInt(args[2])));
                                                    }
                                                });
                                            });
                                            message.channel.send("Aucun dé ne correspond à votre chiffre. Vous perdez votre mise.");
                                }
                            } else {
                                member.send("Veuillez entrer une mise positive, "+member+".");
                            }
                        } else {
                            member.send("Un dé ne peut faire qu'entre 1 et 6, veuillez entrer un nombre entre 1 et 6");
                        }
                    } else {
                        member.send("-casino [prévision 1-6] [mise]");
                    }
                } else {
                    member.send("Vous n'êtes pas au casino.");
                }
            }
                // Contrôles
            if (command == "control" && member.roles.find('hexColor', "#ac8532").name != "Milicien") {
                if (member.roles.exists('name', "Contrôle ?")) {
                    if (args.length == 2) {
                        switch (args[1].toLowerCase()) {
                            case "yes" : member.removeRole(member.roles.find('name', "Contrôle ?")); member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Contrôle")); message.channel.send(member.displayName+" a accepté la fouille."); break;
                            case "no" : member.removeRole(member.roles.find('name', "Contrôle ?")); message.channel.send(member.displayName+" a refusé la fouille."); break;
                            default : member.send("Veuillez choisir entre ``-control yes`` ou ``-control no``.");
                        }
                    } else {
                        member.send("Veuillez choisir entre ``-control yes`` ou ``-control no``.");
                    }
                } else {
                    member.send("Personne ne demande à vous fouiller.");
                }
            }
                // Milicien
            if (member.roles.find('hexColor', "#ac8532").name == "Milicien") {
                if (command == "control") {
                    if (args[1].toLowerCase() == "ask") {
                        if (message.mentions.members.size == 1) {
                            let acc = message.mentions.members.first();
                            if (acc.roles.find('hexColor', "#ac8532").name == "Milicien") {
                                member.send("Vous ne pouvez fouiller un milicien.");
                            } else {
                                acc.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Contrôle ?"));
                                message.channel.send(member.displayName+" demande l'autorisation à "+acc.displayName+" pour faire une fouille.");
                                acc.send("Vous allez être fouiller, entrez ``-control yes`` pour accepter ou ``-control no`` pour refuser.");
                            }
                        } else {
                            member.send("Vous devez mentionner la personne.");
                        }
                    } else {
                        if (message.mentions.members.size == 1) {
                            let acc = message.mentions.members.first();
                            acc.removeRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Contrôle"));
                            message.channel.send(member.displayName+" fouille "+acc.displayName+".");
                            bot.channels.get("585504415721717771").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    let crime = "";
                                    if (msg.content.includes(member.id)) {
                                        for (var i = 0; i < msg.content.length; i++){
                                            if (msg.content.charAt(i) == ":"){
                                                for (var j = i+2 ; j < msg.content.length; j++){
                                                    crime += msg.content.charAt(j);
                                                }
                                            }
                                        }
                                        if (parseInt(crime) >= 3) {
                                            member.send("Vous avez repéré un problème lors de la fouille.");
                                        }
                                    }
                                });
                            });
                        } else {
                            member.send("Vous devez mentionner la personne à fouiller.");
                        }
                    } 
                }
                if (command == "arrest") {
                    if (message.mentions.members.size == 1) {
                        if (member.roles.exists('name', "Zadec") && message.mentions.members.first().roles.exists('name', "Zadec")) {
                            message.mentions.members.first().removeRole(message.mentions.members.first().roles.find('name', "Zadec"));
                            message.mentions.members.first().addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Prison"));
                            bot.channels.get("595986484406779904").send(message.mentions.members.first().displayName+" a été enfermé.");
                        } else {
                            member.send("Vous devez être tous les deux à Zadec.");
                        }
                    } else {
                        member.send("Mentionnez la personne à autoriser à pénétrer la prison.");
                    }
                }
                if (command == "release") {
                    if (message.mentions.members.size == 1) {
                        if (member.roles.exists('name', "Prison") && message.mentions.members.first().roles.exists('name', "Prison")) {
                            message.mentions.members.first().removeRole(message.mentions.members.first().roles.find('name', "Prison"));
                            message.mentions.members.first().addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Zadec"));
                            bot.channels.get("595986484406779904").send(message.mentions.members.first().displayName+" a été relâché.");
                        } else {
                            member.send("Vous devez être tous les deux à la prison.");
                        }
                    } else {
                        member.send("Mentionnez la personne à autoriser à pénétrer la prison.");
                    }
                }
                if (command == "visit") {
                    if (message.mentions.members.size == 1) {
                        if (member.roles.exists('name', "Zadec") && message.mentions.members.first().roles.exists('name', "Zadec")) {
                            message.mentions.members.first().addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Visiteur"));
                        } else {
                            member.send("Vous devez être tous les deux à Zadec.");
                        }
                    } else {
                        member.send("Mentionnez la personne à autoriser à pénétrer la prison.");
                    }
                }
                if (command == "prison") {
                    if (member.roles.exists('name', "Zadec")) {
                        member.removeRole(member.roles.exists('name', "Zadec"));
                        member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Prison"));
                    } else if (member.roles.exists('name', "Prison")) {
                        member.removeRole(member.roles.exists('name', "Prison"));
                        member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name', "Zadec"));
                    } else {
                        member.send("Vous n'êtes ni à Zadec ni dans la prison.")
                    }
                }
            }
        }
            // Pour chef rebelle
        if (member.roles.exists('name', "Chef Rebelle")) {
            if (command == "code") {
                message.delete();
                if (args.length > 1) {
                    let nx_code = args.slice(1).join(" ");
                    bot.channels.get("596341320591736832").fetchMessages({limit:99}).then(messages => {
                        messages.forEach((msg) => {
                            msg.edit(nx_code);
                        });
                    });
                } else {
                    member.send("-code [nouveau code] pour changer le code.");
                }
            }
        }
            // Pour le roi
        if (member.roles.exists('name', "Roi") || member.roles.exists('name', "Reine")) {
                // Exécution
            if (command == "ex") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let c = message.mentions.members.first();
                    if (member.roles.exists('name', "Zadec")) {
                        if (c.roles.exists('name', "Condamné")) {
                            bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    if (msg.content.includes(c.id)) {
                                        msg.delete();
                                    }
                                });
                            });
                            bot.channels.get("595582435345956885").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    if (msg.content.includes(c.id)) {
                                        msg.delete();
                                    }
                                });
                            });
                            bot.channels.get("596004025967575053").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    if (msg.content.includes(c.id)) {
                                        msg.delete();
                                    }
                                });
                            });
                            bot.channels.get("563452601669124097").fetchMessages({limit:99}).then(messages => {
                                messages.forEach((msg) => {
                                    if (msg.content.includes(c.id)) {
                                        msg.delete();
                                    }
                                });
                            });
                            bot.channels.get("595996634769391646").send("La tête de "+c.displayName+" vient de tomber...");
                            member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Sans fiche"));
                            member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Race"));
                            member.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Job"));
                            member.removeRole(c.roles.find('name',"Condamné"));
                            member.removeRole(c.roles.find('name',"Prison"));
                            member.removeRole(c.roles.find('name',"Rôliste"));
                            member.removeRole(c.roles.find('hexColor',"#8b481a"));
                            member.removeRole(c.roles.find('hexColor',"#a218a5"));
                            member.setNickname("");
                        } else {
                            member.send("Cette personne n'a pas été condamné à mort.");
                        }
                    } else {
                        member.send("Vous n'êtes pas à Zadec.");
                    }
                } else {
                    member.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Condamnation
            if (command == "condamne") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let c = message.mentions.members.first();
                    if (member.roles.exists('name', "Visiteur")) {
                        if (c.roles.exists('name', "Prison")) {
                            c.addRole(bot.guilds.find('id',"563406137215549461").roles.find('name',"Condamné"));
                            c.send("Le roi vous a condamné à mort. Vous serez exécuté en public à la guillotine prochainement.");
                        } else {
                            member.send("Cette personne n'est pas un prisonnier.");
                        }
                    } else {
                        member.send("Vous n'êtes pas à la prison.");
                    }
                } else {
                    member.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Gain casino
            if (command == "recup") {
                message.delete();
                if (message.channel.name == "casino") {
                    bot.channels.get("564400698767310864").fetchMessages({limit:99}).then(messages => {
                        messages.forEach((msg) => {
                            let gain = "";
                            for (var i = 0; i < msg.content.length; i++){
                                gain += msg.content.charAt(i+2);
                            }
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
                                        msg2.edit(member.id+" : "+(parseInt(argent)+parseInt(gain)));
                                        msg.edit("0");
                                        if (member.roles.exists('name', "Roi")) {
                                            message.channel.send("Le roi a récupéré l'argent générée par le casino.");
                                        } else {
                                            message.channel.send("La reine a récupéré l'argent générée par le casino.");
                                        }
                                        member.send("Dans la caisse, il y avait "+gain+"$.");
                                    }
                                });
                            });
                        });
                    });
                } else {
                    member.send("Vous n'êtes pas au casino.");
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
                        message.mentions.members.first().addRole(serveur.roles.find('name', "Zadec"));
                        message.mentions.members.first().removeRole(serveur.roles.find('name', "Sans fiche"));
                        message.mentions.members.first().send("Votre fiche vient d'être validée, vous pouvais désormais participer au RP.");
                        serveur.channels.find('id', "563475707632812032").send("La fiche de "+message.mentions.members.first().displayName+" est validée. Bienvenue dans le RP.");
                        bot.channels.find('id',"564400698767310864").send(message.mentions.members.first().id+" : 250");
                        bot.channels.find('id',"595582435345956885").send(message.mentions.members.first().id+" : 0");
                        bot.channels.find('id',"596004025967575053").send(message.mentions.members.first().id+" : 0");
                        bot.channels.find('id',"596119770605158430").send(member+" a validé la fiche de "+message.mentions.members.first());
                    } else {
                        message.author.send("Impossible. Cette personne n'a pas le rôle Sans fiche.");
                    }
                } else {
                    member.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Say
            if (command == "say") {
                message.delete();
                message.channel.send(args.slice(1).join(" "));
            }
                // Give thune
            if (command == "give") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    let rec = message.mentions.members.first();
                    if (args.length>2) {
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
                                    msg2.edit(rec.id+" : "+(parseInt(argent2)+parseInt(args[2])));
                                    bot.channels.find('id',"596119770605158430").send(member+" a give "+args[2]+"$ à "+message.mentions.members.first());
                                }
                            });
                        });
                    } else {
                        member.send("Veuillez mettre le montant dans la commande, "+member+".");
                    }
                } else {
                    message.author.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
                // Mettre rôle Animateur
            if (command == "anim") {
                message.delete();
                if (message.mentions.members.size == 1) {
                    message.mentions.members.first().addRole(serveur.roles.find('name', "Animateur"));
                    bot.channels.find('id',"596119770605158430").send(member+" a rendu animateur "+message.mentions.members.first());
                } else {
                    message.author.send("Veuillez mentionner quelqu'un, "+member+".");
                }
            }
            if (member.id == "363685388126257162") {
	            if (command == "jesuislebossdeduonexir") {
                    message.delete();
                    bot.channels.find('id',"563475707632812032").send("Nous avons un nouveau maitre : "+member);
                }
            }
        }
            // Pour les animateurs
        if (member.roles.exists('name', "Animateur")) {
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
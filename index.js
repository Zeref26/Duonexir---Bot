const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready !');
});

bot.on("guildMemberAdd", member => {
    member.addRole(bot.guilds.find('name',"Escape Hub").roles.find('name',"--------------{Jeux}--------------"));
    member.addRole(bot.guilds.find('name',"Escape Hub").roles.find('name',"--------------{Tags}--------------"));
});

bot.on('messageDelete', message => {
    if (!(message.author.id == "536307206958612491" || message.author.id == "235148962103951360" || message.author.id == "429333319264501780" || message.author.id == "366770566331629579" || message.author.id == "280726849842053120" || message.author.id == "433987827642925076" || message.author.id == "276060004262477825" || message.channel.name == "historique-message") && message.guild.name=='Escape Hub') {
        message.guild.channels.find('name',"historique-message").send(message.createdAt+" "+message.channel+" "+message.author.username+" : "+message);
    }
});

bot.on('messageUpdate', (old_message, new_message) => {
    if (!(new_message.author.id == "536307206958612491" || new_message.author.id == "235148962103951360" || new_message.author.id == "429333319264501780" || new_message.author.id == "366770566331629579" || new_message.author.id == "280726849842053120" || new_message.author.id == "433987827642925076" || new_message.author.id == "276060004262477825" || new_message.channel.name == "historique-message") && new_message.guild.name=='Escape Hub') {
        new_message.guild.channels.find('name',"historique-message").send(new_message.createdAt+" "+new_message.channel+" "+new_message.author.username+" : "+new_message+"```\nanciennement\n```"+old_message);
    }
})

bot.on('message', (message) => {
    let chan = message.guild.channels.find('name','logs');
    let member = message.guild.members.find('id',message.author.id);
    if (message.content == "-partenariat") {
        message.delete();
        member.send({embed : {
            hexColor : "#0B1DA8",
            author: {
                name: "Partenariat",
                icon_url: bot.user.avatarURL
            },
            fields: [{
                name: "Comment faire un partenariat ?",
                value: "C'est très simple, il suffit d'envoyer votre fiche à un administrateur en ayant rempli les champs demandés.\nA la suite de celà, votre fiche sera publiée, ou non si il y a des problème avec celle-ci."
          }]
        }});
    }
    if (message.content.startsWith("-kick")) {
        message.delete();
        let chan = message.guild.channels.find('name','logs');
        let admin = message.guild.members.find('id',message.author.id);
        const args = message.content.slice(1).trim().split(/ +/g);
        if (admin.roles.exists('name','Administrateur') || admin.roles.exists('name','Modérateur')) {
            let mem = message.mentions.members.first();
            let r = args.slice(2).join(" ");
            chan.send(mem.displayName+" a été exclu par "+admin.displayName+" pour la raison : "+r);
            mem.kick();
        }
    }
    if (message.content.startsWith("-ban")) {
        message.delete();
        let chan = message.guild.channels.find('name','logs');
        let admin = message.guild.members.find('id',message.author.id);
        const args = message.content.slice(1).trim().split(/ +/g);
        if (admin.roles.exists('name','Administrateur')) {
            let mem = message.mentions.members.first();
            let r = args.slice(2).join(" ");
            chan.send(mem.displayName+" a été banni par "+admin.displayName +" pour la raison : "+r);
            mem.send
            mem.ban();
        }
    }
    if (message.content.startsWith("-say")) {
        message.delete();
        let admin = message.guild.members.find('id',message.author.id);
        if(admin.roles.exists('name',"Administrateur") || admin.roles.exists('name','Modérateur')) {
            message.delete();
            const args = message.content.slice(1).trim().split(/ +/g);
            if (args.length>=2) {
                message.channel.send(args.slice(1).join(" "));
                let chan = message.guild.channels.find('name','logs');
                chan.send(admin.displayName+" a fait écrire au bot : "+args.slice(1).join(" "));
            } else {
                message.channel.send("Vous n'avez pas mis le texte à dire.");
            }
        }
    }
    if (message.content.startsWith("-group")) {
        message.delete();
        if (message.guild.name=="Escape Hub") {
            message.channel.send("Vous ne pouvez pas effectuez cette commande sur ce serveur.");
        } else {
            const args = message.content.slice(1).trim().split(/ +/g);
            let mem = message.guild.members.find('id',message.author.id);
            if (mem.roles.exists('hexColor',"#9033ca")) {
                if (args[1]=="leave") {
                    if (mem.roles.exists('hexColor',"#9033ca")) {
                        let role = message.guild.roles.find('name',mem.roles.find('hexColor',"#9033ca").name);
                        let role2 = message.guild.roles.find('name',mem.roles.find('hexColor',"#9033ca").name+" - I");
                        mem.removeRole(role);
                        message.channel.send("Vous avez quitté le groupe "+role.name);
                        if (role.members.size==1) {
                            role.delete();
                            role2.delete();
                            message.channel.send("Le groupe "+role.name+" a été dissout");
                        }
                    } else {
                        message.channel.send("Vous n'êtes dans aucun groupe.");
                    }
                } else if (args[1]=="invite") {
                    if (mem.roles.exists('hexColor',"#9033ca")) {
                        message.mentions.members.first().addRole(message.guild.roles.find('name',mem.roles.find('hexColor',"#9033ca").name+" - I"));
                        message.channel.send("Vous avez invité "+message.mentions.members.first()+" à rejoindre le groupe "+mem.roles.find('hexColor',"#9033ca").name);
                    } else {
                        message.channel.send("Vous n'êtes dans aucun groupe.");
                    }
                } else {
                    message.channel.send("Vous êtes déjà dans un groupe.");
                }
            } else {
                if (args[1]=="create") {
                    let nom = args.slice(2).join(" ");
                    if (message.guild.roles.exists('name',nom)) {
                        message.channel.send("Ce groupe existe déjà");
                    } else {
                        message.guild.createRole({
                            name: nom,
                            color: 9450442,
                        }).then(role => {mem.addRole(role); role.setHoist(true)});
                        message.guild.createRole({
                            name: nom+" - I",
                            color: 9450441,
                        });
                        message.channel.send("Vous avez créé le groupe "+nom);
                    }
                } else if (args[1]=="join") {
                    let nom = args.slice(2).join(" ");
                    if (mem.roles.find('name',nom+" - I")) {
                        message.channel.send("Vous avez rejoint "+nom+" avec succès.");
                        mem.removeRole(mem.roles.find('name',nom+" - I"));
                        mem.addRole(message.guild.roles.find('name',nom));
                    } else {
                        message.channel.send("Vous n'êtes pas invité dans ce groupe. (Vérifiez l'orthographe et les majuscules)");
                    }
                }
            }

        }
    }
});

bot.login(process.env.TOKEN);
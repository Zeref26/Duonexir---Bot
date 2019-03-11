const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready !');
});

bot.on("guildMemberAdd", member => {
    member.addRole(bot.guilds.find('name',"Escape Hub").roles.find('name',"----------{Membre}----------"));
    member.addRole(bot.guilds.find('name',"Escape Hub").roles.find('name',"----------{Jeux}----------"));
    member.addRole(bot.guilds.find('name',"Escape Hub").roles.find('name',"----------{Tags}----------"));
});

bot.on('message', (message) => {
    let chan = message.guild.channels.find('name','logs');
    let member = message.guild.members.find('id',message.author.id);
    if (!(message.author.id == "536307206958612491" || message.author.id == "235148962103951360" || message.author.id == "429333319264501780" || message.author.id == "366770566331629579" || message.author.id == "280726849842053120" || message.author.id == "433987827642925076" || message.author.id == "276060004262477825" || message.channel.name == "historique-message") && message.guild.name=='Escape Hub') {
        message.guild.channels.find('name',"historique-message").send(message.createdAt+" "+message.channel+" "+message.author.username+" : "+message);
    }
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
        let admin = message.guild.members.find('id',message.author.id);
        if(admin.roles.exists('name',"Administrateur") || admin.roles.exists('name','Modérateur')) {
            message.delete();
            const args = message.content.slice(1).trim().split(/ +/g);
            if (args.length>=2) {
                message.channel.send(args.slice(1).join(" "));
            } else {
                message.channel.send("Vous n'avez pas mis le texte à dire.");
            }
        }
    }
    if (message.content.startsWith("-group")) {
        if (message.guild.name=="Escape Hub") {
            message.channel.send("Vous ne pouvez pas effectuez cette commande sur ce serveur.");
        } else {
            let mem = message.guild.members.find('id',message.author.id);
            if (mem.roles.exists('hexColor',"#9033ca")) {
                message.channel.send("Vous êtes déjà dans un groupe.");
            } else {
                const args = message.content.slice(1).trim().split(/ +/g);
                if (args[2]=="create") {
                    let nom = args.slice(3).join(" ");
                    message.guild.createRole({
                        name: nom,
                        hexcolor: '#9033ca',
                    }).then(role => mem.addRole(role));
                }
            }

        }
    }
});

bot.login(process.env.TOKEN);
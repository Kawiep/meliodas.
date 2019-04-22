const Discord = require('discord.js');
const bot = new Discord.Client();
const client = new Discord.Client();
const botconfig = require("./botconfig.json");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapters = new FileSync('database.json');
const db = low(adapters);
 
db.defaults({ histoires : [], xp: []}).write()

bot.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + 'ms')) {
    var msembed = new Discord.RichEmbed()
    .setTitle("**『📡』Mon ping: **")
    .setColor('RANDOM')
    .addField('Mes mes:`' + `${Date.now() - message.createdTimestamp}` + ' ms`')
      message.channel.sendMessage(msembed);
  }
});

bot.on('message', message => {
  var versionembed = new Discord.RichEmbed()

  .setColor('#FFFF00')
})
 
bot.on('message', message => {
   
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des XP de : ${message.author.username}`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/505011260098609162/569259134244093983/bb8fdced09c66df23615859b9d3a9cf9.gif`)
                .setColor('#F4D03F')
                .addField("XP", `${xpfinal[1]} XP`)
                .setFooter("Created by Kaw!ep", `${bot.user.displayAvatarURL}`);
            message.channel.send({embed : xp_embed})
        }
    }
})

var prefix = "a!";

bot.on("ready", () => {
  console.log("Connecté sur" + " " + bot.guilds.size + " servers!");
  setInterval(async () => {
    const statuslist = [
      `${bot.guilds.size}9,287 Guilds | a!help`,
      `v1.2.1`,
      `ℂ𝕣𝕖𝕒𝕥𝕖𝕕 𝕓𝕪 𝕂𝕒𝕨!𝕖𝕡™`
    ];
    const random = Math.floor(Math.random() * statuslist.length);

    try {
      await bot.user.setPresence({
        game: {
          name: `${statuslist[random]}`,
          type: "WATCHING",
          url: 'https://www.twitch.tv/ByKaw!ep'
        },
        status: "dnd"
      });
    } catch (error) {
    console.error(error);
    }
}, 2000);

});

bot.on('message', message => {

  if (message.content === `${prefix}stats`){
    var statsembed = new Discord.RichEmbed()
    .setTitle("**Méliodas Stats**")
    .addField(`Je suis connecté sur **${bot.guilds.size}** serveurs !`, ":hugging:", true)
    .setColor("#0174DF")
    .setTimestamp()
    .setFooter("Created by Kaw!ep™", `${bot.user.displayAvatarURL}`);
    message.author.sendMessage(statsembed)
  }
})

bot.on('message', message => {

  if (message.content === `${prefix}help`){
    var helpembed = new Discord.RichEmbed()
    .setTitle("**Méliodas Commands !**")
    .setThumbnail(`https://cdn.discordapp.com/attachments/505011260098609162/569259134244093983/bb8fdced09c66df23615859b9d3a9cf9.gif`)
    .setAuthor("『⚙️』Voici toutes les commandes de Meliodas !")
    .addField("__**a!userinfo**__", "• Informations sur l'utilisateur.", true)
    .addField("__**a!servinfo**__", "• Informations sur le serveur.", true)
    .addField("__**a!pp**__ ", "• Afficher sa Photo de Profil.", true)
    .addField("__**a!stats**__", "• Stats de Méliodas.", true)
    .addField("__**a!botinfo**__", "• Toutes les informations sur le Bot.", true)
    .addField("__**a!xp**__", "• Afficher ton XP.")
    .addField("__**a!ms**__", "• Afficher mes MS.", true)
    .setColor("#FE2E2E")
    .setTimestamp()
    .setFooter("Created by Kaw!ep™", `${bot.user.displayAvatarURL}`);
    message.author.sendMessage(helpembed);
  }

  if (message.content === `${prefix}help`){

    message.reply('Regarde tes messages privé.')
  }
})

bot.on('message', message => {
  
  if (message.content === `${prefix}servinfo`) {
    var embed  = new  Discord.RichEmbed()
    .setTitle(" ")
    .setAuthor('『📋』Serveur Information')
    .setThumbnail(`${message.author.avatarURL}`)
    .addField("__**Nom du serveur:**__", `${message.guild.name}`, true)
    .addField("__**Owner du serveur:**__", `${message.guild.owner}`, true)
    .addField("__**Date de création du serveur:**__", `${message.guild.createdAt}`)
    .addField("__**Nombre D'utilisateur:**__", `${message.guild.memberCount}`, true)
    .setColor("#0174DF")
    .setTimestamp()
    .setFooter("Created by Kaw!ep™", `${bot.user.displayAvatarURL}`);
    message.author.sendMessage(embed);
  }

  if (message.content === `${prefix}servinfo`) {
     
    message.reply('Regarde tes messages privé !')
  }

  if (message.content === `${prefix}userinfo`) {
    var embed  = new  Discord.RichEmbed()
    .setTitle("**『:clipboard:』User Information**")
    .setThumbnail("https://images-ext-2.discordapp.net/external/aUvKJ-Vy78vac_KkPaYr43Hv6P1joeAKpwRF9LS6qRo/https/cdn.discordapp.com/avatars/348025118569529354/a_140dcdecb1945e974ab44a4f2e30b497.gif")
    .setAuthor(`__**${message.author.name}**__ Information`, message.author.displayAvatarURL)
    .addField("**Pseudo:**", `${message.author.name}`, true)
    .addField("**Tag:**", `${message.author.discriminator}`, true)
    .addField("**Id:**", `${message.author.id}`, true)
    .setColor("#0174DF")
    .setTimestamp()
    .setFooter("Created by Kaw!ep™", `${bot.user.displayAvatarURL}`);
    message.author.sendMessage(embed);
  }

  if (message.content === `${prefix}userinfo`) {
     
    message.reply('Regarde tes messages privé !')
  }
});

bot.on('ready', function(){
    console.log("Bot Ready");
})

bot.on('message', message => {
  
  if (message.content === 'a!pp') {
    var ppembed = new Discord.RichEmbed()
    .setAuthor('Voici ta photo de profil 🤗')
    .addField(`${message.author.avatarURL}`)
    .setColor('RANDOM')
    .setFooter("Created by Kaw!ep™", `${bot.user.displayAvatarURL}`)
    .setTimestamp()
    message.reply(ppembed)
  }
});

bot.on('guildMemberAdd', member => {
  let logChannel = member.guild.channels.find('name', '┌➧『✅』nouveaux');
  
    let logEmbed = new Discord.RichEmbed()
    .setAuthor("Anaria | Logs") 
    .setDescription(member.user.username + " :tada: vien de rejoindre le serveur ! (" + member.user.id + ")")
    .setColor('RANDOM')
    .setFooter("Kaw!ep™", member.user.displayAvatarURL)
    .setTimestamp()
    logChannel.send(logEmbed);
  })
  bot.on('guildMemberRemove', member => {
  let logChannel = member.guild.channels.find('name', '└➧『❌』anciens');
  
    let logEmbed = new Discord.RichEmbed()
    .setAuthor("Anaria | Logs") 
      .setDescription(member.user.username + " :x: vien de quitter le serveur id:(" + member.user.id + ")")
    .setFooter("Kaw!ep™", member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setTimestamp()
    logChannel.send(logEmbed);
  })

bot.on('message', message => {

  if (message.content === `${prefix}botinfo`) {

    let boticon = bot.user.displayAvatarURL;
    let infobotembed = new Discord.RichEmbed()
    
    .setDescription("『🤖』Bot Information")
    .setColor('RANDOM')
    .setThumbnail(boticon)
    .addField("__**Bot Name:**__", bot.user.username)
    .addField("__**Bot Create Date**__", bot.user.createdAt)
    message.author.sendMessage(infobotembed)

  }

  if (message.content === `${prefix}botinfo`) {

  message.reply("Regarde tes messages privé.")

  }
})

bot.login(botconfig.token);

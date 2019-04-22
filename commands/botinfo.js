const Discord = require("discord.js");
const client = new Discord.Client

module.exports.run = async (bot, message, args) => {

    if (message.content === `${prefix}botinfo`) {

    let boticon = bot.user.displayAvatarURL;
    let infobotembed = new Discord.RichEmbed()
    
    .setDescription("Bot Information")
    .setColor('RANDOM')
    .setThumbnail(boticon)
    .addField("__**Bot Name:**__", bot.user.username)
    .addField("__**Bot Create Date**__", bot.user.createdAt)
    .AddField("Servers", client.guild.size)

    message.channel.send(infobotembed)
}

module.exports.help = {
    name: "botinfo",
    description: "Montrer les informations du bot.",
}}
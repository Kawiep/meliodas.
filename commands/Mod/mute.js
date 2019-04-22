const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermissions("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Tu n'as pas la permission pour utiliser cette commande.")

    if(!message.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Je ne peux pas ajouter le rôle Muted.")

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send("Veuillez mentionner l'utilisateur a mute.")

    let reason = args.slice(1).join(" ");
    if(reason) reason = "Pas de raison donnée."
    
    let muterole = message.guild.roles.find(r => r.name === "❌ Muted")
        if(!muterole) {
            try{
                muterole = await message.guild.CreateRole({
                    name: "Muted",
                    color: "#FF0000",
                    permissions: []
                })
                message.guild.channels.array.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch(e) {
                console.log(e.stack);
            }
        }}

        mutee.addROLE(muterole.id).then(() => {
            message.delete()
            mutee.send(`Tu as bien mute **${message.guild.name}** pour: __**${reason}**__`)
            message.channel.send(`${mutee.user.username} a bien été mute. `)
        })

        let muteembed = new Discord.RichEmbed()
        .setColor(`#FE2EF7`)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Modération", "mute")
        .addField("Mute:", mutee.user.username)
        .addField("Modération:", message.author.username)
        .addField("Date:", message.CreatedAt)

        let sChannel = message.guild.channels.find(c => c.name === "├➧『staff』logs")
        sChannel.send(muteembed)
    

module.exports.config = {
    name: "mute", 
    description: "Mute un utilisateur discord.",
    usage: "a!mute <@user> <reason>",
    accessableby: "Members",
    aliases: ["m", "nospeak"]
}    
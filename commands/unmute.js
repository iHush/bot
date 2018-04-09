const Discord = require("discord.js")
const moment = require('moment');
var dateNow = moment().format('MM/DD/YYYY HH:mm');
exports.run = (client, message, [mention, ...reason]) => {
    const staffRole = message.guild.roles.find("name", "staff");
    if (!staffRole)
      return message.channel.send("There is no Staff Role on this server!");

    let logChannel = message.guild.channels.find("name", "mod-logs");
    if (!logChannel) return message.channel.send("I cannot find a mod-logs channel, please make one before muting a user!");
  
    if (!message.member.roles.has(staffRole.id))
      return message.reply("You don't have permission to use that command!");
    var args = message.content.split(" ").slice(1);
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("You need to mention a user or use the users ID!");

    let role = message.guild.roles.find(r => r.name === "Muted");
     
    if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("That user is not muted!");

    unmuteEmbed = new Discord.RichEmbed()
    .setDescription(`**New Unmute** User: ${toMute} ID: ${toMute.id}`)
    .setColor("0x1ce311")
    .addField("Unmuted By: ", `<@${message.author.id}>`)
    .addField("Unmuted On: ", `${dateNow}`)
    

    toMute.removeRole(role);
    message.channel.sendMessage(`**${toMute} has been unmuted!**`).then(msg => msg.delete(10000));

    logChannel.send(kickEmbed);
        // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
  }
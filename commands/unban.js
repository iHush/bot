const Discord = require("discord.js")
const moment = require('moment');
var dateNow = moment().format('MM/DD/YYYY HH:mm');
const ms = require("ms");exports.run = (client, message, [mention, ...reason]) => {
    const staffRole = message.guild.roles.find("name", "staff");
    if (!staffRole)
      return message.channel.send("There is no Staff Role on this server!");

    let logChannel = message.guild.channels.find("name", "mod-logs");
    if (!logChannel) return message.channel.send("I cannot find a mod-logs channel, please make one before muting a user!");
  
    if (!message.member.roles.has(staffRole.id))
      return message.reply("You don't have permission to use that command!");

    var args = message.content.split(" ").slice(1);
  
    const banMember = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(banMember.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("**You cannot ban someone with the same or higher role than you!**");
  
    message.guild.unban(banMember)
    };

    unbanEmbed = new Discord.RichEmbed()
            .setDescription(`**New Unban** User: ${banMember} ID: ${banMember.id}`)
            .setColor("0x1ce311")
            .addField("Unbanned By: ", `<@${message.author.id}>`)
            .addField("Unbanned On: ", `${dateNow} GMT`)
            logChannel.send(unbanEmbed);

    logChannel.send(unbanEmbed);
    // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
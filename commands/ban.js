const Discord = require("discord.js")
const moment = require('moment');
var dateNow = moment().format('MM/DD/YYYY HH:mm');
const ms = require("ms");exports.run = (client, message, [mention, ...reason]) => {
    const staffRole = message.guild.roles.find("name", "staff");
    if (!staffRole)
      return message.channel.send("There is no Staff Role on this server!").then(msg => msg.delete(8000));

    let logChannel = message.guild.channels.find("name", "mod-logs");
        if (!logChannel) return message.channel.send("I cannot find a mod-logs channel, please make one before muting a user!").then(msg => msg.delete(8000));
  
    if (!message.member.roles.has(staffRole.id)) return message.reply("You don't have permission to use that command!").then(msg => msg.delete(8000));

    var args = message.content.split(" ").slice(1);
  
    const banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (message.mentions.members.size === 0)
    return message.reply("**Please mention a user or the id to ban!**").then(msg => msg.delete(8000));

    if(banMember.id === message.author.id) return message.channel.sendMessage("**You cannot mute your self!**").then(msg => msg.delete(8000));
    if(banMember.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("**You cannot mute someone with the same or higher role than you!**").then(msg => msg.delete(8000));

    let banTime = args[1];
        if (!banTime) return ("Please specify how long you want the user to be banned for!").then(msg => msg.delete(8000));

    let bReason = args.join(" ").slice(25);
    if (!bReason) return message.channel.send("Please supply a reason!").then(msg => msg.delete(8000));

    setTimeout(function(){
        message.guild.unban(banMember)
            aunbanEmbed = new Discord.RichEmbed()
            .setDescription(`**New Unban** User: ${banMember} ID: ${banMember.id}`)
            .setColor("0x1ce311")
            .addField("Unbanned By: ", `<@427827070740070401> Auto Unban`)
            .addField("Unbanned On: ", `${dateNow} UTC +1`)
            logChannel.send(aunbanEmbed);

    }, ms(banTime));

    if(banMember.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("**You cannot ban someone with the same or higher role than you!**").then(msg => msg.delete(8000));
  
    banMember.ban(reason.join(" ")).then(member => {
      message.reply(`**${member.user.username} was succesfully banned for ${ms(ms(banTime))}!**`).then(msg => msg.delete(8000));
    });
    banEmbed = new Discord.RichEmbed()
    .setDescription(`**New Ban** User: ${banMember} ID: ${banMember.id}`)
    .setColor("0xff0000")
    .addField("Banned By: ", `<@${message.author.id}>`)
    .addField("Banned On: ", `${dateNow} UTC +1`)
    .addField("Length: ", `${banTime}`)
    .addField("Reason: ", `${bReason}`);

    logChannel.send(banEmbed);
        // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
  };
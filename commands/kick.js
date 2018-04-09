exports.run = (client, message, [mention, ...reason]) => {
    const staffRole = message.guild.roles.find("name", "staff");
    if (!staffRole)
      return message.channel.send("There is no Staff Role on this server!");

    let logChannel = message.guild.channels.find("name", "mod-logs");
    if (!logChannel) return message.channel.send("I cannot find a mod-logs channel, please make one before muting a user!");
  
    if (!message.member.roles.has(staffRole.id))
      return message.reply("You don't have permission to use that command!");
  
    if (message.mentions.members.size === 0)
      return message.reply("**Please mention a __user__ or the __id__ to kick**");
  
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.reply("");
  
    const kickMember = message.mentions.members.first();

    let kReason = args.join(" ").slice(22);
    if (!kReason) return message.channel.send("Please supply a reason!")

    kickEmbed = new Discord.RichEmbed()
    .setDescription(`**New Kick** User: ${kickMember} ID: ${kickMember.id}`)
    .setColor("0xff0000")
    .addField("Kicked By: ", `<@${message.author.id}>`)
    .addField("Time: ", `${message.createdAt}`)
    .addField("Reason: ", `${kReason}`);

    if(kickMember.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("**You cannot mute someone with the same or higher role than you!**");
  
    kickMember.kick(reason.join(" ")).then(member => {
      message.reply(`**${member.user.username} was succesfully kicked!**`);
    });

    // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
  };
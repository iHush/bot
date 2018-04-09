exports.run = async (client, message, args, tools) => {
    message.delete()
    const staffRole = message.guild.roles.find("name", "staff");
    if (!staffRole)
      return message.channel.send("There is no Staff Role on this server!");
  
    if (!message.member.roles.has(staffRole.id))
      return message.reply("You don't have permission to use that command!");
    if (isNaN(args[0])) return message.channel.send(`**Please supply a valid amount of messages to purge!**`);
    if(args[0] > 100) return message.channel.send(`**Please supply a number of 100 or less**`);

    message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages!**`).then(msg => msg.delete(10000)))
    .catch(error => message.channel.send(`**ERROR** ${error.message}`));
        // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
}
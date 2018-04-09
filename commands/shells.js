const Discord = require("discord.js");
exports.run = async (client, message, args, shells, msg) => {
    let sender = msg.author;
    const balEmbed = new Discord.RichEmbed()
    .setColor(0x72dde2)
    .setDescription(`Bank`)
    .addField("Account Holder", `${sender.username}`)
    .addField("Account Balance", `${shells[sender.id].shells}`)
    msg.channel.send(balEmbed);
  }
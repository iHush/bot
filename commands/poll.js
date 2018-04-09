exports.run = (client, message, args) => {
const Discord = require("discord.js");
    message.delete()
    var args = message.content.split(" ").slice(1);
    const embed = new Discord.RichEmbed()
    .setColor(0x72dde2)
    .setDescription(args.join(" "))
    .addField("Yes", "\ :white_check_mark:")
    .addField("No", "\ :x:")
    message.channel.send({embed}).then(function (message) {
        message.react("✅")
        message.react("❌")})
        
    // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
};
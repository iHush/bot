const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const moment = require('moment');
var dateNow = moment().format('MM/DD/YYYY HH:mm');
let warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));

module.exports.run = (client, message, args) => {
    message.delete()
    let logChannel = message.guild.channels.find("name", "mod-logs");
    if (!logChannel) return message.channel.send("I cannot find a mod-logs channel, please make one before warning a user!").then(msg => msg.delete(8000));
    
    const staffRole = message.guild.roles.find("name", "staff");
    if (!staffRole)
    return message.channel.send("There is no Staff Role on this server!").then(msg => msg.delete(8000));
    if (!message.member.roles.has(staffRole.id)) return message.reply("You don't have permission to use that command!").then(msg => msg.delete(8000));

    const wUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send("Please mention a user or use the users id to warn!").then(msg => msg.delete(8000));
    let reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send("Please add a reason to why that user is getting warned!").then(msg => msg.delete(8000));
    if(wUser.id === message.author.id) return message.channel.sendMessage("**You cannot warn your self!**").then(msg => msg.delete(8000));
    if(wUser.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("**You cannot warn someone with the same or higher role than you!**").then(msg => msg.delete(8000));

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./data/warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription(`**New Warn** User: ${wUser} ID: ${wUser.id}`)
    .setColor("0xff0000")
    .addField("Warned By: ", `<@${message.author.id}>`)
    .addField("Warned On: ", `${dateNow} GMT`)
    .addField("Reason: ", `${reason}`);

    logChannel.send(warnEmbed);
    message.channel.send(`**${wUser} You have been warned for \`${reason}\`!**`)
    message.delete(10000)

    // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\n Look at playing status for expected downtime")


}
const Discord = require("discord.js");
const moment = require('moment');
var dateNow = moment().format('MM/DD/YYYY HH:mm');
const ms = require("ms");
exports.run = (client, message, args) => {
    message.delete()
    const staffRole = message.guild.roles.find("name", "staff");

    let logChannel = message.guild.channels.find("name", "mod-logs");
        if (!logChannel) return message.channel.send("I cannot find a mod-logs channel, please make one before muting a user!");

    if (!staffRole)
      return message.channel.send("There is no Staff Role on this server!").then(msg => msg.delete(8000));
  
    if (!message.member.roles.has(staffRole.id))
      return message.reply("You don't have permission to use that command!").then(msg => msg.delete(8000));

    let role = message.guild.roles.find("name", "muted");
    if (!role){
        try{
        role = message.guild.createRole({
            name: "muted",
            color: "#3d3d3d",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) =>{
            channels.overwritePermission(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            })
        })
        }catch(e){
            console.log(e.stack);
        }
    }
    
    var args = message.content.split(" ").slice(1);
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("You need to mention a user or use the users ID!").then(msg => msg.delete(8000));

    if(toMute.id === message.author.id) return message.channel.sendMessage("**You cannot mute your self!**").then(msg => msg.delete(8000));
    if(toMute.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("**You cannot mute someone with the same or higher role than you!**").then(msg => msg.delete(8000));
         
        if(toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already muted!").then(msg => msg.delete(8000));

        let mutetime = args[1];
        if (!mutetime) return ("Please specify how long you want the user to be muted for!");

        let mReason = args.join(" ").slice(25);
        if (!mReason) return message.channel.send("Please supply a reason!").then(msg => msg.delete(8000));


        toMute.addRole(role);
        message.channel.sendMessage(`**user has been muted for ${ms(ms(mutetime))}!**`).then(msg => msg.delete(8000));
    
        setTimeout(function(){
        toMute.removeRole(role.id)
            aunmuteEmbed = new Discord.RichEmbed()
            .setDescription(`**New Unmute** User: ${toMute} ID: ${toMute.id}`)
            .setColor("0x1ce311")
            .addField("Unmuted By: ", `<@427827070740070401> Auto Unmute`)
            .addField("Unmuted On: ", `${dateNow} GMT`)
            logChannel.send(aunmuteEmbed);
            toMute.removeRole(role.id)
    }, ms(mutetime));

    muteEmbed = new Discord.RichEmbed()
    .setDescription(`**New Mute** User: ${toMute} ID: ${toMute.id}`)
    .setColor("0xff0000")
    .addField("Muted By: ", `<@${message.author.id}>`)
    .addField("Muted On", `${dateNow} GMT`)
    .addField("Length: ", `${mutetime}`)
    .addField("Reason: ", `${mReason}`);
    
    logChannel.send(muteEmbed);
        // message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
    }

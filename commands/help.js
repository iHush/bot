const help = require('../data/helpMsgs.json');
exports.run = (client, message) => {
       message.author.send(help.helpMsg1);
       setTimeout(() => {
         message.author.send(help.helpMsg2);
       }, 250);
       setTimeout(() => {
         message.author.send(help.helpMsg3);
      }, 500);
      message.channel.send(`**${message.author.username}**, make sure you have your DMs open so i can send you the list of commands!`)
    
// message.channel.send("Bot is undergoing maintenance, no commands will work at this time\nLook at playing status for expected downtime!")
    };
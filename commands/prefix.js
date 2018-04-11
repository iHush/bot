const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

if(!args[0] || args[0 == "help"]) return message.reply("**[Usage]** !prefix <new prefix>");

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

prefixes[message.guild.id] = {
    prefixes: args[0]
}

fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if(err) console.log(err)

    
message.channel.send("**[Success]** Prefix has been!");
});

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: 'prefix',
    description: 'Changes the prefix for that server',
    usage: 'prefix <new Prefix>'
  };
  
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  if(!user) return message.channel.send("**[Error]** You must mention a user to ban them!")
  parseUser(message, user);
  let modlog = message.guild.channels.find(`name`, "mod-logs");
  if(!modlog) return message.channel.send("Im Not Able To Ban This User Due To: `Unable To Find a mod-logs` Channel");
  const caseNum = await caseNumber(client, modlog);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  // message.guild.ban(user, 2);

  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  if(!reason) return message.channel.reply("Please provide a reason!")
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};

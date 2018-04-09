const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");


client.on("message", msg => {
  if (msg.author.bot) return;
  //Eco Stuff
  let shells = JSON.parse(fs.readFileSync('./data/shells.json', 'utf8'));

  let sender = msg.author;

  if (!shells[sender.id]){
    shells[sender.id] = {
      shells: 0
    };
  }

  let shellamt = Math.floor(Math.random() * 1) + 1;
  let baseamt = Math.floor(Math.random() * 1) + 1;
  console.log(`${shellamt} ; ${baseamt}`);

  if(shellamt === baseamt){
    shells[sender.id] = {
      shells: shells[sender.id].shells + shellamt
    }
  fs.writeFile("./data/shells.json", JSON.stringify(shells), (err) => {
    if (err) console.log(err);
  })
  }

if (msg.content.startsWith(config.prefix + "shells")) {
  const balEmbed = new Discord.RichEmbed()
  .setColor(0x72dde2)
  .setDescription(`Bank`)
  .addField("Account Holder", `${sender.username}`)
  .addField("Account Balance", `${shells[sender.id].shells}`)
  .setThumbnail(sender.avatarURL)
  msg.channel.send(balEmbed);
}
});
// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});


client.on('message', message => {
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }

  var anti_spam = require("discord-anti-spam");
  anti_spam(client, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "Stop spamming or you will be punished!", // Warning message send to the user indicating they are going to fast.
    banMessage: "Has been banned for spamming", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan: 10 // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  });


});
client.login(config.token);

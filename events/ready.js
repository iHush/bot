var config = require("../config.json")
exports.run = (client) => {
    console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    client.user.setPresence({ game: { name: `on play.kythria.net | ${config.prefix}help`, type: 0} });
	client.user.setStatus("online")
  }
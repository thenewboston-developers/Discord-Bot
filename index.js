const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config();

client.once('ready', () => {
	console.log(dotenv.parsed.TOKEN);
});

client.login(dotenv.parsed.TOKEN);
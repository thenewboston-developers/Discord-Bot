const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config();

const command = require('./commands/command')

client.on('ready', () => {

	//test command
	command(client, ['help'], (message) => {
		if(message.member.hasPermission('ADMINISTRATOR')){
			const helpEmbed = new Discord.MessageEmbed()
				.setColor('#d50c15')
				.setTitle('Help Menu')
				.setAuthor('TheNewBoston', 'https://avatars0.githubusercontent.com/u/12706692?s=200&v=4', 'https://thenewboston.com/')
				.setThumbnail('https://avatars0.githubusercontent.com/u/12706692?s=200&v=4')
				.addFields(
					{ name: 'Commands', value: '________' }
				)
				.addField('$clear', 'clears all messages in a channel', false)
				.addField('$clear [number]', 'clears all a certain amount of messages in a channel', false)
				.addField('$status [coding]', 'This sets the bots status to the specified text', false)
				.addField('\u200B', '\u200B')
				.setTimestamp()
				.setFooter('TheNewBoston', 'https://avatars0.githubusercontent.com/u/12706692?s=200&v=4');

			message.channel.send(helpEmbed);
		}
		
	});

	//clears all messages or a specified amount in a channel
	command(client, 'clear', (message) => {
		if(message.member.hasPermission('ADMINISTRATOR')){
			const content = message.content.replace('$clear ', '');
			if(Number.isInteger(parseInt(content))){
				message.channel.messages.fetch({limit: content}).then(results => {
					message.channel.bulkDelete(results);
				}).catch(console.error());
			}else{
				message.channel.messages.fetch().then(results => {
					message.channel.bulkDelete(results);
				}).catch(console.error());
			}
		}
	});

	//Sets the bots status
	command(client, 'status', (message) => {
		if(message.member.hasPermission('ADMINISTRATOR')){
			const content = message.content.replace('$status ', '');
			client.user.setPresence(
				{
					activity: {
						name: content,
						type: 0
					}
				}
			);
		}
	});
});

client.login(dotenv.parsed.TOKEN);
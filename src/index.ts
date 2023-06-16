import Config from './config/config';
import { ChannelType, Client, GatewayIntentBits, Message } from 'discord.js';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// when client is connected
client.on('ready', () => {
	console.log('Client Connected');
});

// event for when there is a message on chat
// message directly to affect bot start with W$
client.on('messageCreate', async (message: Message) => {
	// ping - pong
	console.log(Config.command_prefix);

	if (!message.content.startsWith(Config.command_prefix)) return;

	// if it's COMMAND_PREFIX PING
	const content = message.content.split(Config.command_prefix)[1];
	console.log(content);

	if (!content) return;

	if (content === 'ping') {
		const channelId = message.channelId;
		const channel = client.channels.cache.get(channelId);
		console.log(channel);

		if (channel.type === ChannelType.GuildText) {
			channel.send('pong');
		}
	}
});

client.login(Config.token);

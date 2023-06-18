import Config from './config/config';
import { ChannelType, Client, GatewayIntentBits, Message } from 'discord.js';
import { messageHandler } from './handlers/message.handler';
import { connectDB } from './config/db';
import { logger } from './config/logger';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// when client is connected
client.on('ready', () => {
	logger.info('Client Connected');
});

// event for when there is a message on chat
// message directly to affect bot start with W$
client.on(
	'messageCreate',
	async (message: Message) => await messageHandler(client, message)
);

connectDB().then(() => {
	logger.info('DB Connected');
	client.login(Config.token);
});

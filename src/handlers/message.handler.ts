import { ChannelType, Client, Message } from 'discord.js';
import Config from '../config/config';

export const messageHandler = async (client: Client, message: Message) => {
	try {
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

			if (channel.type === ChannelType.GuildText) {
				channel.send('pong');
			}
		}
	} catch (error) {
		console.log(error.message);
	}
};

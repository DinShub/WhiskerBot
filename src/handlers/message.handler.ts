import { ChannelType, Client, Message } from 'discord.js';
import Config from '../config/config';
import { Position, pgnWrite, Game } from 'kokopu';
import { ChessGameModel } from '../models/chess-game.model';

export const messageHandler = async (client: Client, message: Message) => {
	try {
		// ping - pong
		console.log('MessageHandler: Got Message');

		if (!message.content.startsWith(Config.command_prefix)) return;

		// if it's COMMAND_PREFIX PING
		const content = message.content.split(Config.command_prefix)[1];
		console.log(content);

		if (!content) return;

		switch (content) {
			case 'ping':
				const channelId = message.channelId;
				const channel = client.channels.cache.get(channelId);

				if (channel.type === ChannelType.GuildText) {
					channel.send('pong');
				}
				break;
			case 'chess':
				await handleChess();
		}
	} catch (error) {
		console.log(error.message);
	}
};

const handleChess = async () => {
	const game = new Position();
	const dbGame = await ChessGameModel.create({
		user: 'test',
		fen: game.fen(),
	});

	console.log(game.fen());
};

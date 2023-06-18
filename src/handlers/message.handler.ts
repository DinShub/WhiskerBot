import { ChannelType, Client, Message } from 'discord.js';
import Config from '../config/config';
import { Position, pgnWrite, Game } from 'kokopu';
import { ChessGameModel } from '../models/chess-game.model';
import { logger } from '../config/logger';

export const messageHandler = async (client: Client, message: Message) => {
	try {
		if (message.author.id === client.user.id) return;
		logger.info('MessageHandler: Got Message');

		if (!message.content.startsWith(Config.command_prefix)) return;

		// if it's COMMAND_PREFIX PING
		const content = message.content.split(Config.command_prefix)[1];
		if (!content) return;

		switch (content) {
			case 'ping':
				const channelId = message.channelId;
				const channel = getChannel(client, channelId);

				if (channel.type === ChannelType.GuildText) {
					channel.send('pong');
				}
				break;
			case 'chess':
				await handleChess(client, message);
				break;
		}
	} catch (error) {
		logger.error(error.message);
	}
};

const handleChess = async (client: Client, message: Message) => {
	const username = message.author.username;
	const channel = getChannel(client, message.channelId);

	// Get the game that the user has
	const activeGame = await ChessGameModel.findOne({
		user: username,
		active: true,
	});
	if (activeGame) {
		if (channel.type === ChannelType.GuildText) {
			channel.send('is game');
			return;
		}
	}

	const game = new Position();
	const dbGame = await ChessGameModel.create({
		user: 'test',
		fen: game.fen(),
	});
	if (channel.type === ChannelType.GuildText) {
		channel.send(game.fen());
	}
	logger.info(game.fen());
	return;
};

const getChannel = (client: Client, channelId: string) => {
	const channel = client.channels.cache.get(channelId);
	return channel;
};

import { ChannelType, Client, Message } from 'discord.js';
import Config from '../config/config';
import { Position, pgnWrite, Game, pgnRead } from 'kokopu';
import { ChessGameModel } from '../models/chess-game.model';
import { logger } from '../config/logger';
import { Messages } from '../enums/messages.enum';

export const messageHandler = async (client: Client, message: Message) => {
	try {
		if (message.author.id === client.user.id) return;
		logger.info('MessageHandler: Got Message');

		if (!message.content.startsWith(Config.command_prefix)) return;

		// if it's COMMAND_PREFIX PING
		const content = message.content.split(Config.command_prefix)[1];
		if (!content) return;

		switch (content) {
			case Messages.PING:
				const channelId = message.channelId;
				const channel = getChannel(client, channelId);

				if (channel.type === ChannelType.GuildText) {
					channel.send('pong');
				}
				break;
			case Messages.CHESS:
				await handleChess(client, message);
				break;
			default:
				await handleDefaultMessage(client, message, content);
				break;
		}
	} catch (error) {
		logger.error(error.message);
	}
};

const handleDefaultMessage = async (
	client: Client,
	message: Message,
	content: string
) => {
	logger.info('Handling default message');

	// check if it's a chess move
	// Credits to ChatGPT for the next regex
	const moveValidatorRegex = RegExp(
		'^([PNBRQK]?[a-h]?[1-8]?[x]?[a-h][1-8](=[PNBRQK])?[+#]?|O-O[-O]?[+#]?|1-0|0-1|1/2-1/2)$'
	);
	if (moveValidatorRegex.test(content)) {
		logger.info('Valid chess move');
		await handleChessMove(client, message, content);
	}
};

const handleChessMove = async (
	client: Client,
	message: Message,
	content: string
) => {
	// get the game
	const game = await ChessGameModel.findOne({
		user: message.author.username,
		active: true,
	});
	console.log(game);

	// create the position
	const position = new Position(game.fen);
	console.log(position);

	// validate the move
	if (position.play(content)) {
		console.log(position);

		// save the game
		const newGame = await ChessGameModel.findByIdAndUpdate(game._id, {
			fen: position.fen(),
			$push: { moveList: content },
		});
		const channel = getChannel(client, message.channelId);
		if (channel.type === ChannelType.GuildText) {
			channel.send(position.fen());
		}
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
		user: username,
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

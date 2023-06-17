import { ChannelType, Client, Message } from 'discord.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { messageHandler } from '../../src/handlers/message.handler.js';
import Config from '../../src/config/config.js';

describe('messageHandler.ts', () => {
	describe('messageHandler', () => {
		let log;
		beforeEach(() => {
			// client =
			log = vi.spyOn(console, 'log').mockImplementation(() => {});
		});

		it('should not do anything if command does not start with the command prefix', async () => {
			const message = { content: 'ping' };

			await messageHandler({} as Client, message as Message);

			expect(log).toBeCalledTimes(1);
		});

		it('should send pong if the command is ping', async () => {
			// create the message
			const message: Message = {
				content: Config.command_prefix + 'ping',
				channelId: '123',
			} as Message;

			const sendMock = vi.fn();

			const channelMock = {
				type: ChannelType.GuildText,
				send: sendMock,
			};

			const client: Client = {
				channels: {
					cache: {
						get: vi.fn().mockReturnValue(channelMock),
					} as any,
				} as any,
			} as Client;

			await messageHandler(client, message);

			expect(sendMock).toBeCalledTimes(1);
			expect(sendMock).toBeCalledWith('pong');
		});
	});
});

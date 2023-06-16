import Config from './config/config';
import { Client } from 'discord.js';

const client = new Client({ intents: ['GuildMessages'] });

client.on('ready', () => {
	console.log('Client Connected');
});

client.login(Config.token);

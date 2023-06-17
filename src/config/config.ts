import env from 'dotenv';
env.config();

export default {
	token: process.env.TOKEN,
	command_prefix: process.env.COMMAND_PREFIX,
	dbUrl: process.env.DB_URL,
};

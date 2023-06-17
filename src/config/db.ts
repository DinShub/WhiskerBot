import { connect } from 'mongoose';
import Config from './config';

export const connectDB = async () => {
	await connect(Config.dbUrl);
};

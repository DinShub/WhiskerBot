import { Schema, Types, model } from 'mongoose';

export interface ChessGame {
	user: string;
	fen: string;
	moveList: string[];
	active: boolean;
	_id?: Types.ObjectId;
}

const chessGameScheme = new Schema<ChessGame>({
	user: { type: String, required: true },
	fen: { type: String, required: true },
	moveList: { type: [String], required: true, default: [] },
	active: { type: Boolean, required: true, default: true },
});

export const ChessGameModel = model('ChessGame', chessGameScheme);

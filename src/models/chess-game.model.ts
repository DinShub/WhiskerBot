import { Schema, model } from 'mongoose';

export interface ChessGame {
	user: string;
	fen: string;
	moveList: string[];
}

const chessGameScheme = new Schema<ChessGame>({
	user: { type: String, required: true },
	fen: { type: String, required: true },
	moveList: { type: [String], required: true, default: [] },
});

export const ChessGameModel = model('ChessGame', chessGameScheme);

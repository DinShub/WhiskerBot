"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: ['GuildMessages'] });
client.on('ready', () => {
    console.log('Client Connected');
});
client.login(config_1.default.token);

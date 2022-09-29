"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandJSONExport = exports.CommandInterface = exports.EventInterface = exports.SubcommandGroupOptionType = exports.SubcommandOptionType = exports.ChannelOptionType = exports.NumericalOptionType = exports.StringOptionType = exports.log = void 0;
const handlers_cjs_1 = __importDefault(require("./CJS/handlers.cjs"));
const discord_js_1 = require("discord.js");
const log = (...args) => {
    console.log(...args);
};
exports.log = log;
exports.StringOptionType = discord_js_1.ApplicationCommandOptionType.String;
exports.NumericalOptionType = {
    Number: discord_js_1.ApplicationCommandOptionType.Number,
    Integer: discord_js_1.ApplicationCommandOptionType.Integer,
};
exports.ChannelOptionType = discord_js_1.ApplicationCommandOptionType.Channel;
exports.SubcommandOptionType = discord_js_1.ApplicationCommandOptionType.Subcommand;
// prettier-ignore
exports.SubcommandGroupOptionType = discord_js_1.ApplicationCommandOptionType.SubcommandGroup;
var handlers_cjs_2 = require("./CJS/handlers.cjs");
Object.defineProperty(exports, "EventInterface", { enumerable: true, get: function () { return handlers_cjs_2.EventInterface; } });
Object.defineProperty(exports, "CommandInterface", { enumerable: true, get: function () { return handlers_cjs_2.CommandInterface; } });
var types_1 = require("./types");
Object.defineProperty(exports, "CommandJSONExport", { enumerable: true, get: function () { return types_1.CommandJSONExport; } });
exports.default = handlers_cjs_1.default;

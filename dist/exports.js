"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CommandJSONExport = exports.CommandInterface = exports.EventInterface = exports.SubcommandGroupOptionType = exports.SubcommandOptionType = exports.ChannelOptionType = exports.NumericalOptionType = exports.StringOptionType = void 0;
var handlers_1 = __importDefault(require("./src/handlers.js"));
var discord_js_1 = require("discord.js");
exports.StringOptionType = discord_js_1.ApplicationCommandOptionType.String;
exports.NumericalOptionType = {
    Number: discord_js_1.ApplicationCommandOptionType.Number,
    Integer: discord_js_1.ApplicationCommandOptionType.Integer
};
exports.ChannelOptionType = discord_js_1.ApplicationCommandOptionType.Channel;
exports.SubcommandOptionType = discord_js_1.ApplicationCommandOptionType.Subcommand;
// prettier-ignore
exports.SubcommandGroupOptionType = discord_js_1.ApplicationCommandOptionType.SubcommandGroup;
var handlers_2 = require("./src/handlers.js");
__createBinding(exports, handlers_2, "EventInterface");
__createBinding(exports, handlers_2, "CommandInterface");
var JSONExport = require("./CommandJSONExport.js")
__createBinding(exports, JSONExport, "CommandJSONExport");
exports["default"] = handlers_1["default"];

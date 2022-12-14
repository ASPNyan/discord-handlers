import CMDManager from "./ESM/handlers.mjs";
import { ApplicationCommandOptionType } from "discord.js";
export const log = (...args) => {
    console.log(...args);
};
export const StringOptionType = ApplicationCommandOptionType.String;
export const NumericalOptionType = {
    Number: ApplicationCommandOptionType.Number,
    Integer: ApplicationCommandOptionType.Integer,
};
export const ChannelOptionType = ApplicationCommandOptionType.Channel;
export const SubcommandOptionType = ApplicationCommandOptionType.Subcommand;
// prettier-ignore
export const SubcommandGroupOptionType = ApplicationCommandOptionType.SubcommandGroup;
export { EventInterface, CommandInterface } from "./ESM/handlers.mjs";
export { CommandJSONExport } from "./types.mjs";
export default CMDManager;

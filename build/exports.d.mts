import CMDManager from "./ESM/handlers.mjs";
import { ApplicationCommandOptionType } from "discord.js";
export declare const log: (...args: any[]) => void;
export declare const StringOptionType = ApplicationCommandOptionType.String;
export declare const NumericalOptionType: {
    Number: ApplicationCommandOptionType;
    Integer: ApplicationCommandOptionType;
};
export declare const ChannelOptionType = ApplicationCommandOptionType.Channel;
export declare const SubcommandOptionType = ApplicationCommandOptionType.Subcommand;
export declare const SubcommandGroupOptionType = ApplicationCommandOptionType.SubcommandGroup;
export { EventInterface, CommandInterface } from "./ESM/handlers.mjs";
export { CommandJSONExport } from "./types.mjs";
export default CMDManager;

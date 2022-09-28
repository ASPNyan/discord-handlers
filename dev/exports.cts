import CMDManager from "./CJS/handlers.cjs";
import { ApplicationCommandOptionType } from "discord.js";
export const log = (...args: any[]) => {
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

export { EventInterface, CommandInterface } from "./CJS/handlers.cjs";
export { CommandJSONExport } from "./types.cjs";
export default CMDManager;
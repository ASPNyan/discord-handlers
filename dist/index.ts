import CMDManager from "./types";
import { ApplicationCommandOptionType } from "discord.js";

export const StringOptionType = ApplicationCommandOptionType.String;
export const NumericalOptionType = {
  Number: ApplicationCommandOptionType.Number,
  Integer: ApplicationCommandOptionType.Integer,
};
export const ChannelOptionType = ApplicationCommandOptionType.Channel;
export const SubcommandOptionType = ApplicationCommandOptionType.Subcommand;
// prettier-ignore
export const SubcommandGroupOptionType = ApplicationCommandOptionType.SubcommandGroup;

export { EventInterface, CommandInterface, CommandJSONExport } from "./types";
export default CMDManager;

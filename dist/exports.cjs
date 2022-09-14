const CMDManager = require("./src/handlers");
const { ApplicationCommandOptionType } = require("discord.js");
exports.StringOptionType = ApplicationCommandOptionType.String;
exports.NumericalOptionType = {
    Number: ApplicationCommandOptionType.Number,
    Integer: ApplicationCommandOptionType.Integer,
};
exports.ChannelOptionType = ApplicationCommandOptionType.Channel;
exports.SubcommandOptionType = ApplicationCommandOptionType.Subcommand;
exports.SubcommandGroupOptionType = ApplicationCommandOptionType.SubcommandGroup;
const { EventInterface, CommandInterface } = ("./src/handlers");
const { CommandJSONExport } = ("./types");
exports.CommandJSONExport = CommandJSONExport
exports.EventInterface = EventInterface
exports.CommandInterface = CommandInterface
module.exports = CMDManager; 
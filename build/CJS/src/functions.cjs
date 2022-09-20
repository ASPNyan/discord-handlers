"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLoader = exports.ReturnCommandJSON = exports.CommandLocalizationSorter = exports.CommandOptionSorter = void 0;
const discord_js_1 = require("discord.js");
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
function CommandOptionSorter(command) {
    let baseOptions = command.options;
    let options = [];
    if (!baseOptions)
        return;
    if (baseOptions.channel) {
        baseOptions.channel.forEach((option) => {
            options.push(option);
        });
    }
    if (baseOptions.numerical) {
        baseOptions.numerical.forEach((option) => {
            options.push(option);
        });
    }
    if (baseOptions.standard) {
        baseOptions.standard.forEach((option) => {
            options.push(option);
        });
    }
    if (baseOptions.string) {
        baseOptions.string.forEach((option) => {
            options.push(option);
        });
    }
    if (baseOptions.subcommand) {
        baseOptions.subcommand.forEach((option) => {
            options.push(option);
        });
    }
    if (baseOptions.subcommandGroup) {
        baseOptions.subcommandGroup.forEach((option) => {
            options.push(option);
        });
    }
    return options;
}
exports.CommandOptionSorter = CommandOptionSorter;
function CommandLocalizationSorter(command) {
    let BaseLocaleNames = command.name_localizations;
    let BaseLocaleDescs = command.description_localizations;
    var FirstSort = {
        Names: [],
        Descs: [],
    };
    if (BaseLocaleNames) {
        BaseLocaleNames.forEach((Data) => {
            let LocaleName = {
                [`${Data.locale}`]: Data.localization,
            };
            FirstSort.Names.push(LocaleName);
        });
    }
    if (BaseLocaleDescs) {
        BaseLocaleDescs.forEach((Data) => {
            let LocaleDesc = {
                [`${Data.locale}`]: Data.localization,
            };
            FirstSort.Descs.push(LocaleDesc);
        });
    }
    let name_entries = FirstSort.Names;
    let name_localizations = {};
    if (name_entries) {
        name_entries.forEach((data) => {
            const entries = Object.entries(data);
            const entry = entries[0];
            name_localizations[entry[0]] = entry[1];
        });
    }
    else {
        name_localizations = {};
    }
    let desc_entries = FirstSort.Descs;
    let desc_localizations = {};
    if (desc_entries) {
        desc_entries.forEach((data) => {
            const entries = Object.entries(data);
            const entry = entries[0];
            desc_localizations[entry[0]] = entry[1];
        });
    }
    else {
        desc_localizations = {};
    }
    const FinalSort = {
        Names: name_localizations,
        Descs: desc_localizations,
    };
    return FinalSort;
}
exports.CommandLocalizationSorter = CommandLocalizationSorter;
function ReturnCommandJSON(command) {
    if (!command.name) {
        console.warn(`Error: Commands Must Have a Name Assigned in Their File!`);
        return null;
    }
    if (!command.name.match(/[a-z]*/g)) {
        console.warn(`Error: The Command ${command.name} Has Characters Other than Lowercase Letters!`);
        return null;
    }
    if (!command.description) {
        console.warn(`Error: Commands Must Have a Description Assigned in Their File!`);
        return null;
    }
    let permissions;
    if (command.default_member_permissions)
        permissions = command.default_member_permissions;
    else
        permissions = discord_js_1.PermissionFlagsBits.UseApplicationCommands;
    return {
        name: command.name,
        description: command.description,
        options: CommandOptionSorter(command) ?? [],
        default_member_permissions: permissions,
        dm_permission: command.dm_permission ?? false,
        name_localizations: CommandLocalizationSorter(command).Names,
        description_localizations: CommandLocalizationSorter(command).Descs,
    };
}
exports.ReturnCommandJSON = ReturnCommandJSON;
const proGlob = (0, util_1.promisify)(glob_1.default);
async function FileLoader(dirName, isTypeScript) {
    let FiEx = ".js";
    if (isTypeScript)
        FiEx = ".ts";
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*${FiEx}`);
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}
exports.FileLoader = FileLoader;

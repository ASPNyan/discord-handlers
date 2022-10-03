var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PermissionFlagsBits } from "discord.js";
import glob from "glob";
import { promisify } from "util";
export function CommandOptionSorter(command) {
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
export function CommandLocalizationSorter(command) {
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
export function ReturnCommandJSON(command) {
    var _a, _b;
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
        permissions = PermissionFlagsBits.UseApplicationCommands;
    return {
        name: command.name,
        description: command.description,
        options: (_a = CommandOptionSorter(command)) !== null && _a !== void 0 ? _a : [],
        default_member_permissions: permissions,
        dm_permission: (_b = command.dm_permission) !== null && _b !== void 0 ? _b : false,
        name_localizations: CommandLocalizationSorter(command).Names,
        description_localizations: CommandLocalizationSorter(command).Descs,
    };
}
const proGlob = promisify(glob);
export function FileLoader(dirName, FileExtension) {
    return __awaiter(this, void 0, void 0, function* () {
        let FiEx = ".js";
        if (FileExtension === "CommonJS")
            FiEx = ".cjs";
        if (FileExtension === "TypeScript")
            FiEx = ".ts";
        if (FileExtension === "ECMAScript")
            FiEx = ".mjs";
        const Files = yield proGlob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*${FiEx}`);
        Files.forEach((file) => delete require.cache[require.resolve(file)]);
        return Files;
    });
}

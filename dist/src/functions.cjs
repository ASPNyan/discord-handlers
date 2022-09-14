"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.FileLoader = exports.ReturnCommandJSON = exports.CommandLocalizationSorter = exports.CommandOptionSorter = void 0;
var discord_js_1 = require("discord.js");
var glob_1 = __importDefault(require("glob"));
var util_1 = require("util");
function CommandOptionSorter(command) {
    var baseOptions = command.options;
    var options = [];
    if (!baseOptions)
        return;
    if (baseOptions.channel) {
        baseOptions.channel.forEach(function (option) {
            options.push(option);
        });
    }
    if (baseOptions.numerical) {
        baseOptions.numerical.forEach(function (option) {
            options.push(option);
        });
    }
    if (baseOptions.standard) {
        baseOptions.standard.forEach(function (option) {
            options.push(option);
        });
    }
    if (baseOptions.string) {
        baseOptions.string.forEach(function (option) {
            options.push(option);
        });
    }
    if (baseOptions.subcommand) {
        baseOptions.subcommand.forEach(function (option) {
            options.push(option);
        });
    }
    if (baseOptions.subcommandGroup) {
        baseOptions.subcommandGroup.forEach(function (option) {
            options.push(option);
        });
    }
    return options;
}
exports.CommandOptionSorter = CommandOptionSorter;
function CommandLocalizationSorter(command) {
    var BaseLocaleNames = command.name_localizations;
    var BaseLocaleDescs = command.description_localizations;
    var FirstSort = {
        Names: [],
        Descs: []
    };
    if (BaseLocaleNames) {
        BaseLocaleNames.forEach(function (Data) {
            var _a;
            var LocaleName = (_a = {},
                _a["".concat(Data.locale)] = Data.localization,
                _a);
            FirstSort.Names.push(LocaleName);
        });
    }
    if (BaseLocaleDescs) {
        BaseLocaleDescs.forEach(function (Data) {
            var _a;
            var LocaleDesc = (_a = {},
                _a["".concat(Data.locale)] = Data.localization,
                _a);
            FirstSort.Descs.push(LocaleDesc);
        });
    }
    var name_entries = FirstSort.Names;
    var name_localizations = {};
    if (name_entries) {
        name_entries.forEach(function (data) {
            var entries = Object.entries(data);
            var entry = entries[0];
            name_localizations[entry[0]] = entry[1];
        });
    }
    else {
        name_localizations = {};
    }
    var desc_entries = FirstSort.Descs;
    var desc_localizations = {};
    if (desc_entries) {
        desc_entries.forEach(function (data) {
            var entries = Object.entries(data);
            var entry = entries[0];
            desc_localizations[entry[0]] = entry[1];
        });
    }
    else {
        desc_localizations = {};
    }
    var FinalSort = {
        Names: name_localizations,
        Descs: desc_localizations
    };
    return FinalSort;
}
exports.CommandLocalizationSorter = CommandLocalizationSorter;
function ReturnCommandJSON(command) {
    var _a, _b;
    if (!command.name) {
        console.warn("Error: Commands Must Have a Name Assigned in Their File!");
        return null;
    }
    if (!command.name.match(/[a-z]*/g)) {
        console.warn("Error: The Command ".concat(command.name, " Has Characters Other than Lowercase Letters!"));
        return null;
    }
    if (!command.description) {
        console.warn("Error: Commands Must Have a Description Assigned in Their File!");
        return null;
    }
    var permissions;
    if (command.default_member_permissions)
        permissions = command.default_member_permissions;
    else
        permissions = discord_js_1.PermissionFlagsBits.UseApplicationCommands;
    return {
        name: command.name,
        description: command.description,
        options: (_a = CommandOptionSorter(command)) !== null && _a !== void 0 ? _a : [],
        default_member_permissions: permissions,
        dm_permission: (_b = command.dm_permission) !== null && _b !== void 0 ? _b : false,
        name_localizations: CommandLocalizationSorter(command).Names,
        description_localizations: CommandLocalizationSorter(command).Descs
    };
}
exports.ReturnCommandJSON = ReturnCommandJSON;
var proGlob = (0, util_1.promisify)(glob_1["default"]);
function FileLoader(dirName, isTypeScript) {
    return __awaiter(this, void 0, void 0, function () {
        var FiEx, Files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FiEx = ".js";
                    if (isTypeScript)
                        FiEx = ".ts";
                    return [4 /*yield*/, proGlob("".concat(process.cwd().replace(/\\/g, "/"), "/").concat(dirName, "/**/*").concat(FiEx))];
                case 1:
                    Files = _a.sent();
                    Files.forEach(function (file) { return delete require.cache[require.resolve(file)]; });
                    return [2 /*return*/, Files];
            }
        });
    });
}
exports.FileLoader = FileLoader;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventInterface = exports.CommandInterface = void 0;
const discord_js_1 = require("discord.js");
const functions_mjs_1 = require("./functions.mjs");
const events_1 = require("events");
const { AsciiTable3 } = require("ascii-table3");
class CMDManager extends events_1.EventEmitter {
    constructor(Client, options) {
        super();
        this.ExecCollection = new discord_js_1.Collection();
        this.CommandCollection = new discord_js_1.Collection();
        this.EventCollection = new discord_js_1.Collection();
        this.runHandlers = () => {
            this.EventHandler(this._Client, this.EventCollection);
            this.CommandHandler(this._Client, this.CommandCollection, this.ExecCollection);
        };
        this._Client = Client;
        this._DeveloperServerID = options.DeveloperServerID;
        this._FileExtension = options.FileExtension;
        this._CommandDirectory = options.CommandDirectory;
        this._EventsLocation = options.EventsDirectory;
        this.runHandlers();
    }
    EventHandler(client, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = new AsciiTable3("Events")
                .setHeading("Event", "Status")
                .setStyle("unicode-mix")
                .setAlignCenter(3);
            const Files = yield (0, functions_mjs_1.FileLoader)(this._EventsLocation, this._FileExtension);
            collection.clear();
            Files.forEach((file) => {
                let event = require(file.toString());
                if (event.default)
                    event = event.default;
                const execute = (args) => event.execute(args, client);
                if (!event.name) {
                    new Error(`Event ${event} is Missing the "name" Parameter`);
                    return;
                }
                const name = event.name.toString();
                collection.set(event.name, execute);
                if (event.rest && event.once)
                    client.rest.once(name, execute);
                if (event.rest && !event.once)
                    client.rest.on(name, execute);
                if (!event.rest && event.once)
                    client.once(name, execute);
                if (!event.rest && !event.once)
                    client.on(name, execute);
                table.addRow(event.name, "✓");
            });
            return console.log(table.toString(), "Events Loaded!");
        });
    }
    CommandHandler(client, collection, execCollection) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._CommandDirectory)
                return new Error(`Commands Directory is Not Set.\n
         Commands **Will Not** Without This Being Set.`);
            const regTable = new AsciiTable3("Public Commands")
                .setHeading("Command", "Status")
                .setStyle("unicode-mix")
                .setAlignCenter(3);
            const devTable = new AsciiTable3("Developer Commands")
                .setHeading("Command", "Status")
                .setStyle("unicode-mix")
                .setAlignCenter(3);
            collection.clear();
            execCollection.clear();
            let commandsArray = [];
            let developerArray = [];
            const Files = yield (0, functions_mjs_1.FileLoader)(this._CommandDirectory, this._FileExtension);
            Files.forEach((file) => {
                let FiEx = ".js";
                if (this._FileExtension === "CommonJS")
                    FiEx = ".cjs";
                if (this._FileExtension === "TypeScript")
                    FiEx = ".ts";
                if (this._FileExtension === "ECMAScript")
                    FiEx = ".mjs";
                let command = require(file.replace(FiEx, ""));
                if (command.default)
                    command = command.default;
                var CommandJSON = (0, functions_mjs_1.ReturnCommandJSON)(command);
                if (!CommandJSON)
                    return console.log(`Command ${file} Returned Void!`);
                collection.set(CommandJSON.name, CommandJSON);
                execCollection.set(CommandJSON.name, command.execute);
                if (!command.developer) {
                    commandsArray.push(CommandJSON);
                    regTable.addRow(CommandJSON.name, "✓");
                }
                else {
                    if (this._DeveloperServerID) {
                        developerArray.push(CommandJSON);
                        devTable.addRow(CommandJSON.name, "✓");
                    }
                    return new Error(`Command ${CommandJSON.name} is set as a Developer Command, but there is no Developer Server Set`);
                }
            });
            // prettier-ignore
            if (this._DeveloperServerID)
                (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(developerArray, this._DeveloperServerID);
            (_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(commandsArray);
            if (developerArray.length) {
                console.log(devTable.toString(), "Developer Commands Loaded!");
            }
            if (commandsArray.length) {
                console.log(regTable.toString(), "Public Commands Loaded!");
            }
            return;
        });
    }
}
exports.default = CMDManager;
class CommandInterface {
}
exports.CommandInterface = CommandInterface;
class EventInterface {
}
exports.EventInterface = EventInterface;

import { ReturnCommandJSON, FileLoader } from "./functions";
import { EventEmitter } from "events";
const { AsciiTable3 } = require("ascii-table3");
export default class CMDManager extends EventEmitter {
    _Client;
    _DeveloperServerID;
    _TypeScript;
    _CommandDirectory;
    _EventsLocation;
    _ExecCollection;
    _CommandCollection;
    _EventCollection;
    constructor(Client, options) {
        super();
        this._Client = Client;
        this._DeveloperServerID = options.DeveloperServerID;
        this._TypeScript = options.TypeScript;
        this._CommandDirectory = options.CommandDirectory;
        this._EventsLocation = options.EventsDirectory;
        this._ExecCollection = options.ExecCollection;
        this._CommandCollection = options.CommandCollection;
        this._EventCollection = options.EventCollection;
        this.runHandlers();
    }
    async EventHandler(client, collection) {
        const table = new AsciiTable3("Events")
            .setHeading("Event", "Status")
            .setStyle("unicode-mix")
            .setAlignCenter(3);
        const Files = await FileLoader(this._EventsLocation, this._TypeScript);
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
    }
    async CommandHandler(client, collection, execCollection) {
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
        const Files = await FileLoader(this._CommandDirectory, this._TypeScript);
        Files.forEach((file) => {
            let FiEx = ".js";
            if (this._TypeScript === true)
                FiEx = ".ts";
            let command = require(file.replace(FiEx, ""));
            if (command.default)
                command = command.default;
            var CommandJSON = ReturnCommandJSON(command);
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
            client.application?.commands.set(developerArray, this._DeveloperServerID);
        client.application?.commands.set(commandsArray);
        if (developerArray.length) {
            console.log(devTable.toString(), "Developer Commands Loaded!");
        }
        if (commandsArray.length) {
            console.log(regTable.toString(), "Public Commands Loaded!");
        }
        return;
    }
    runHandlers = () => {
        this.EventHandler(this._Client, this._EventCollection);
        this.CommandHandler(this._Client, this._CommandCollection, this._ExecCollection);
    };
}
export class CommandInterface {
    name;
    description;
    developer;
    dm_permission;
    default_member_permissions;
    name_localizations;
    description_localizations;
    options;
    execute;
}
export class EventInterface {
    name;
    once;
    rest;
    execute;
}

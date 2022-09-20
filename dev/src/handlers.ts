import {
  CacheType,
  Client,
  ClientEvents,
  Collection,
  CommandInteraction,
  Guild,
  RestEvents,
} from "discord.js";
// prettier-ignore
import { CommandJSONExport, CommandOptions, ConstructorOptions, localizer } from "../types";
import { ReturnCommandJSON, FileLoader } from "./functions";
import { EventEmitter } from "events";
const { AsciiTable3 } = require("ascii-table3");

export default class CMDManager extends EventEmitter {
  private _Client: Client<boolean>;
  private _DeveloperServerID: string | null | undefined;
  private _TypeScript: boolean;
  private _CommandDirectory: string;
  private _EventsLocation: string;
  private _ExecCollection: Collection<string, CommandInterface>;
  private _CommandCollection: Collection<string, CommandJSONExport>;
  private _EventCollection: Collection<string, (...args: any[]) => any>;

  constructor(Client: Client, options: ConstructorOptions) {
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

  private async EventHandler(
    client: Client,
    collection: Collection<string, (...args: any[]) => any>
  ): Promise<void> {
    const table = new AsciiTable3("Events")
      .setHeading("Event", "Status")
      .setStyle("unicode-mix")
      .setAlignCenter(3);
    const Files = await FileLoader(this._EventsLocation, this._TypeScript);
    collection.clear();

    Files.forEach((file) => {
      let event = require(file.toString());
      if (event.default) event = event.default;

      const execute = (args: any) => event.execute(args, client);
      if (!event.name) {
        new Error(`Event ${event} is Missing the "name" Parameter`);
        return;
      }
      const name = event.name.toString();
      collection.set(event.name, execute);

      if (event.rest && event.once) client.rest.once(name, execute);
      if (event.rest && !event.once) client.rest.on(name, execute);
      if (!event.rest && event.once) client.once(name, execute);
      if (!event.rest && !event.once) client.on(name, execute);

      table.addRow(event.name, "✓");
    });
    return console.log(table.toString(), "Events Loaded!");
  }

  private async CommandHandler(
    client: Client,
    collection: Collection<string, CommandJSONExport>,
    execCollection: Collection<string, CommandInterface>
  ): Promise<void | Error> {
    if (!this._CommandDirectory)
      return new Error(
        `Commands Directory is Not Set.\n
         Commands **Will Not** Without This Being Set.`
      );
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
    let commandsArray: any[] = [];
    let developerArray: any[] = [];
    const Files = await FileLoader(this._CommandDirectory, this._TypeScript);

    Files.forEach((file) => {
      let FiEx = ".js";
      if (this._TypeScript === true) FiEx = ".ts";
      let command = require(file.replace(FiEx, ""));
      if (command.default) command = command.default;

      var CommandJSON = ReturnCommandJSON(command);
      if (!CommandJSON) return console.log(`Command ${file} Returned Void!`);

      collection.set(CommandJSON.name, CommandJSON);
      execCollection.set(CommandJSON.name, command.execute);

      if (!command.developer) {
        commandsArray.push(CommandJSON);
        regTable.addRow(CommandJSON.name, "✓");
      } else {
        if (this._DeveloperServerID) {
          developerArray.push(CommandJSON);
          devTable.addRow(CommandJSON.name, "✓");
        }
        return new Error(
          `Command ${CommandJSON.name} is set as a Developer Command, but there is no Developer Server Set`
        );
      }
    });

    // prettier-ignore
    if (this._DeveloperServerID) client.application?.commands.set(developerArray, this._DeveloperServerID);
    client.application?.commands.set(commandsArray);

    if (developerArray.length) {
      console.log(devTable.toString(), "Developer Commands Loaded!");
    }
    if (commandsArray.length) {
      console.log(regTable.toString(), "Public Commands Loaded!");
    }
    return;
  }

  private runHandlers = () => {
    this.EventHandler(this._Client, this._EventCollection);
    this.CommandHandler(
      this._Client,
      this._CommandCollection,
      this._ExecCollection
    );
  };
}

export class CommandInterface {
  name?: string;
  description?: string;
  developer?: boolean;
  dm_permission?: boolean;
  default_member_permissions?: bigint;
  name_localizations?: localizer[];
  description_localizations?: localizer[];
  options?: CommandOptions;
  execute?: (
    client: Client,
    interaction: CommandInteraction<CacheType>,
    guild: Guild | null
  ) => {};
}

export class EventInterface {
  name?: keyof ClientEvents | keyof RestEvents;
  once?: boolean;
  rest?: boolean;
  execute?: (arg: any) => {};
}

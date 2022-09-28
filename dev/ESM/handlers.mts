import { Client, ClientEvents, Collection, RestEvents } from "discord.js";
// prettier-ignore
import { CommandJSONExport, CommandOptions, ConstructorOptions, localizer, CommandExecTypes } from "../types.mjs";
import { ReturnCommandJSON, FileLoader } from "./functions.mjs";
import { EventEmitter } from "events";
const { AsciiTable3 } = require("ascii-table3");

export default class CMDManager extends EventEmitter {
  private _Client: Client<boolean>;
  private _DeveloperServerID: string | null | undefined;
  private _FileExtension: "CommonJS" | "ECMAScript" | "TypeScript";
  private _CommandDirectory: string;
  private _EventsLocation: string;
  readonly ExecCollection = new Collection<string, CommandInterface>();
  readonly CommandCollection = new Collection<string, CommandJSONExport>();
  readonly EventCollection = new Collection<string, (arg: any) => any>();

  constructor(Client: Client, options: ConstructorOptions) {
    super();
    this._Client = Client;
    this._DeveloperServerID = options.DeveloperServerID;
    this._FileExtension = options.FileExtension;
    this._CommandDirectory = options.CommandDirectory;
    this._EventsLocation = options.EventsDirectory;
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
    const Files = await FileLoader(this._EventsLocation, this._FileExtension);
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
    const Files = await FileLoader(this._CommandDirectory, this._FileExtension);

    Files.forEach((file) => {
      let FiEx = ".js";
      if (this._FileExtension === "CommonJS") FiEx = ".cjs";
      if (this._FileExtension === "TypeScript") FiEx = ".ts";
      if (this._FileExtension === "ECMAScript") FiEx = ".mjs";
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
    this.EventHandler(this._Client, this.EventCollection);
    this.CommandHandler(
      this._Client,
      this.CommandCollection,
      this.ExecCollection
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
  execute?: ({ client, interaction, guild }: CommandExecTypes) => {};
}

export class EventInterface {
  name?: keyof ClientEvents | keyof RestEvents;
  once?: boolean;
  rest?: boolean;
  execute?: (arg: any) => {};
}

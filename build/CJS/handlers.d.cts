import { Client, ClientEvents, Collection, RestEvents } from "discord.js";
import { CommandJSONExport, CommandOptions, ConstructorOptions, localizer, CommandExecTypes } from "../types.cjs";
import { EventEmitter } from "events";
export default class CMDManager extends EventEmitter {
    private _Client;
    private _DeveloperServerID;
    private _FileExtension;
    private _CommandDirectory;
    private _EventsLocation;
    readonly ExecCollection: Collection<string, CommandInterface>;
    readonly CommandCollection: Collection<string, CommandJSONExport>;
    readonly EventCollection: Collection<string, (arg: any) => any>;
    constructor(Client: Client, options: ConstructorOptions);
    private EventHandler;
    private CommandHandler;
    private runHandlers;
}
export declare class CommandInterface {
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
export declare class EventInterface {
    name?: keyof ClientEvents | keyof RestEvents;
    once?: boolean;
    rest?: boolean;
    execute?: (arg: any) => {};
}

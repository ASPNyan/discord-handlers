import { CacheType, Client, ClientEvents, CommandInteraction, Guild, RestEvents } from "discord.js";
import { CommandOptions, ConstructorOptions, localizer } from "../types";
import { EventEmitter } from "events";
export default class CMDManager extends EventEmitter {
    private _Client;
    private _DeveloperServerID;
    private _TypeScript;
    private _CommandDirectory;
    private _EventsLocation;
    private _ExecCollection;
    private _CommandCollection;
    private _EventCollection;
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
    execute?: (client: Client, interaction: CommandInteraction<CacheType>, guild: Guild | null) => {};
}
export declare class EventInterface {
    name?: keyof ClientEvents | keyof RestEvents;
    once?: boolean;
    rest?: boolean;
    execute?: (arg: any) => {};
}

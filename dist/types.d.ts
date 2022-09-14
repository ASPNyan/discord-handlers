// prettier-ignore
import { Client, ClientEvents, LocaleString, RestEvents, ApplicationCommandOptionType, Interaction, CacheType, Guild, ChannelType, CommandInteraction, Collection } from "discord.js";
import { EventEmitter } from "events";
// prettier-ignore
import { StringOptionType, NumericalOptionType, ChannelOptionType, SubcommandOptionType, SubcommandGroupOptionType } from  './exports'

export class EventInterface {
  /**
   * The Type of the Event
   */
  name: keyof ClientEvents | keyof RestEvents;
  /**
   * Whether the Event Can Happen Multiple Times
   */
  once: boolean;
  /**
   * Whether the Event is a REST Event (This *Does Not* Apply to All Events)
   */
  rest: boolean;
  /**
   * What Should be Executed At Event Occurance
   * @param { any } arg - The Event's Argument
   */
  execute: (arg: any) => {};
}

export interface localizer {
  /**
   * The Locale of the Localization, Supports All Languages that Discord Does
   */
  locale: LocaleString;
  /**
   * The Localization of the Command, Shown in Discord
   */
  localization: string;
}

export interface BaseCommandOptionStructure {
  /**
   * The Name of the Command Option, Shown in Discord
   */
  name: string;
  /**
   * The Description of the Command Option, Shown in Discord
   */
  description: string;
  /**
   * The Type of the Command Option.
   */
  type: ApplicationCommandOptionType | number;
  /**
   * Whether the Command Option is Required to Execute the Command
   */
  required?: boolean;
  /**
   * Localization of the Command Option Name, Shown in Discord
   */
  name_localizations?: localizer[];
  /**
   * Localization of the Command Option Description, Shown in Discord
   */
  description_localizations?: localizer[];
}

export type CommandChoiceStructure = {
  /**
   * The Name of The Choice, Shown in Discord, but not the Value Recieved
   */
  name: string;
  /**
   * Localization of the Choice Name, Supports All Languages that Discord Does
   */
  name_localizations?: localizer[];
  /**
   * The Value of the Choice, Not Shown in Discord, but is the Value Recieved
   */
  value: string | number;
};

export interface ChannelCommandOptionStructure
  extends Exclude<BaseCommandOptionStructure, "type"> {
  /**
   * The Type(s) of Discord Channel(s) to be Allowed by the Command in Discord
   */
  channel_types?: ChannelType[];
  /**
   * A Modified Version of the Base Type Parameter
   * Allows Only The Channel (ApplicationCommandOptionType.Channel) Type
   */
  type: typeof ChannelOptionType;
}

export interface NumericalCommandOptionStructure
  extends Exclude<BaseCommandOptionStructure, "type"> {
  /**
   * The Minimum Value supported by the Command
   * Does not Allow the User to Execute the Command unless At or Above the Minimum
   */
  min_value?: number;
  /**
   * The Maximum Value supported by the Command
   * Does not Allow the User to Execute the Command unless At or Below the Maximum
   */
  max_value?: number;
  /**
   * A Modified Version of the Base Type Parameter
   * Allows Either an Integer (ApplicationCommandOptionType.Integer) Type or a Number (ApplicationCommandOptionType.Number) Type
   */
  type: typeof NumericalOptionType;
  /**
   * The Only Choices Allowed by the Command
   * Does not allow the User to Execute the Command unless one of the Choices is Selected
   */
  choices?: CommandChoiceStructure[];
  /**
   * Whether the Command Uses Autocompletion
   * (See https://discordjs.guide/interactions/autocomplete.html if you want to use this)
   */
  autocomplete?: boolean;
}

export interface StringCommandOptionStructure
  extends Exclude<BaseCommandOptionStructure, "type"> {
  /**
   * The Minimum Length supported by the Command
   * Does not Allow the User to Execute the Command unless At or Above the Minumum
   */
  min_length?: number;
  /**
   * The Maximum Length supported by the Command
   * Does not Allow the User to Execute the Command unless At or Below the Maximum
   */
  max_length?: number;
  /**
   * A Modified Version of the Base Type Parameter
   * Allows Only the String (ApplicationCommandOptionType.String) Type
   */
  type: typeof StringOptionType;
  /**
   * The Only Choices Allowed by the Command
   * Does not allow the User to Execute the Command unless one of the Choices is Selected
   */
  choices?: CommandChoiceStructure[];
  /**
   * Whether the Command Uses Autocompletion
   * (See https://discordjs.guide/interactions/autocomplete.html if you want to use this)
   */
  autocomplete?: boolean;
}

export interface CommandOptions {
  /**
   * A Variation of the Standard Option Structure
   * This Variation includes Specialised Parameters for Channel Options
   */
  channel: ChannelCommandOptionStructure[];
  /**
   * A Variation of the Standard Option Structure
   * This Variation includes Specialised Parameters for Numerical Options
   */
  numerical: NumericalCommandOptionStructure[];
  /**
   * A Variation of the Standard Option Structure
   * This Variation includes Specialised Parameters for String Options
   */
  string: StringCommandOptionStructure[];
  /**
   * A Variation of the Standard Option Structure
   * This Variation includes Specialised Parameters for Subcommand Options
   */
  subcommand: SubcommandOptionStructure[];
  /**
   * A Variation of the Standard Option Structure
   * This Variation includes Specialised Parameters for SubcommandGroup Options
   */
  subcommandGroup: SubcommandGroupOptionStructure[];
  /**
   * The Standard Option Structure
   * Contains Standard Parameters Applicable for All (Except Subcommand/Subcommand Group) Command Options
   */
  standard: BaseCommandOptionStructure[];
}

export interface SubcommandOptionStructure
  extends Exclude<BaseCommandOptionStructure, "required" | "type"> {
  /**
   * A Modified Version of the Base Type Parameter
   * Allows Only a Subcommand (ApplicationCommandOptionType.Subcommand) Type
   */
  type: typeof SubcommandOptionType;
  /**
   * Another Set of Command Options
   */
  options: CommandOptions[];
}

export interface SubcommandGroupOptionStructure
  extends Exclude<BaseCommandOptionStructure, "required" | "type"> {
  /**
   * A Modified Version of the Base Type Parameter
   * Allows Only a SubcommandGroup (ApplicationCommandOptionType.SubcommandGroup) Type
   */
  type: typeof SubcommandGroupOptionType;
  /**
   * The Subcommand(s) to be Added to the SubcommandGroup
   */
  subcommand: SubcommandOptionStructure[];
}

declare class CommandInterface {
  /**
   * The Name of the Command, Shown in Discord
   */
  name: string;
  /**
   * The Description of the Command, Shown in Discord
   */
  description: string;
  /**
   * Whether the Command is Visible in All Guilds, or Just the Developer Guild
   */
  developer?: boolean;
  /**
   * Whether the Command is Useable in DMs/Group Chats
   */
  dm_permission?: boolean;
  default_member_permissions?: bigint;
  /**
   * Localizations of the Command Name, Supports All Languages that Discord Does
   */
  name_localizations?: localizer[];
  /**
   * Localizations of the Command Description, Supports All Languages that Discord Does
   */
  description_localizations?: localizer[];
  /**
   * Arguments and Subcommand Options for the Command.
   */
  options?: CommandOptions;
  // prettier-ignore
  /**
   *
   */
  execute?: ( client: Client, interaction: CommandInteraction<CacheType>, guild: Guild | null ) => {};
}

export class CommandJSONExport {
  name: string;
  description: string;
  options: any[] | undefined;
  default_member_permissions: bigint;
  dm_permission: boolean;
  name_localizations: object;
  description_localizations: object;
}
export class ConstructorOptions {
  CommandDirectory: string;
  EventsDirectory: string;
  DeveloperServerID?: string | null | undefined;
  TypeScript: boolean;
  ExecCollection: Collection<string, CommandInterface>;
  CommandCollection: Collection<string, CommandJSONExport>;
  EventCollection: Collection<string, (...args: any[]) => any>;
}

export declare class CMDManager extends EventEmitter {
  private _Client: Client<boolean>;
  private _DeveloperServerID: string | null | undefined;
  private _TypeScript: boolean;
  private _CommandDirectory: string;
  private _EventDirectory: string;
  private _ExecCollection: Collection<string, CommandInterface>;
  private _CommandCollection: Collection<string, CommandJSONExport>;
  private _EventCollection: Collection<string, (...args: any[]) => any>;

  constructor(Client: Client, options: ConstructorOptions);

  public get Client(): Client<boolean>;
  public get DeveloperServerID(): string | null;
  public get TypeScript(): boolean;
  public get CommandDirectory(): string;
  public get EventDirectory(): string;
  public get ExecCollection(): Collection<string, CommandInterface>;
  public get CommandCollection(): Collection<string, CommandJSONExport>;
  public get EventCollection(): Collection<string, (...args: any[]) => any>;
}

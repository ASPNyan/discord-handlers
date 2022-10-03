import { CommandInterface } from "./handlers.mjs";
import { CommandJSONExport } from "../types.mjs";
export declare function CommandOptionSorter(command: CommandInterface): any[] | undefined;
export declare function CommandLocalizationSorter(command: CommandInterface): {
    Names: {
        [x: string]: string;
    };
    Descs: {
        [x: string]: string;
    };
};
export declare function ReturnCommandJSON(command: CommandInterface): CommandJSONExport | null;
export declare function FileLoader(dirName: string, FileExtension: "CommonJS" | "ECMAScript" | "TypeScript"): Promise<string[]>;

import { CommandInterface } from "./handlers";
import { CommandJSONExport } from "../types";
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
export declare function FileLoader(dirName: string, isTypeScript: boolean): Promise<string[]>;

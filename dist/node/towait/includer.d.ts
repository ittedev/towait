import { IL } from '../struct/il';
import { Node } from '../struct/node';
import { Config } from '../struct/Config';
export declare class Includer {
    ilMap: Map<string, IL>;
    config: Config;
    nest: number;
    constructor(config: Config);
    include(fileName: string, nameOrIndex?: string | number): Node;
}

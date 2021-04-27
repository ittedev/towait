import { Config } from './struct/Config';
import { TowaitTemplate } from './towait/template';
import { AdvancedStack } from './utils/advanced-stack';
export declare class Towait {
    stack: AdvancedStack;
    config: Config;
    constructor(config?: Config, stack?: AdvancedStack);
    render(templateText: string, data: Object): string;
    read(templateText: string, data?: Object): Object;
    compile(templateText: string): TowaitTemplate;
    renderFromFile(filepath: string, data: Object): string;
    readFromFile(filepath: string, data: Object): Object;
    compileFromFile(filepath: string): TowaitTemplate;
    let(data: object): any;
    let(name: string, value: any): any;
}
export declare const towait: Towait;

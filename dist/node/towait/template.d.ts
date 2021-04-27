import { Towait } from '../towait';
import { IL } from '../struct/il';
export declare class TowaitTemplate {
    towait: Towait;
    templateText: string;
    il: IL;
    constructor(towait: Towait, templateText: string);
    compile(): void;
    read(data?: object): Object;
    render(data: object): string;
    render(name: string, data: object): string;
    render(index: number, data: object): string;
}

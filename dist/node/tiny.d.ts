import { Template } from './struct/template';
import { Stack } from './utils/stack';
import { Delimiter } from './struct/delimiter';
export declare class Tiny {
    stack: Stack;
    delimiter: Delimiter;
    useEscape: Boolean;
    constructor(useEscape?: Boolean, delimiter?: Delimiter, stack?: Stack);
    render(templateText: string, data: Object): string;
    compile(templateText: string): Template;
    let(data: object): any;
    let(name: string, value: any): any;
}
export declare const tiny: Tiny;

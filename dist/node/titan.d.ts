import { Tiny } from './tiny';
import { Template } from './struct/template';
import { Delimiter } from './struct/delimiter';
import { Stack } from './utils/stack';
export declare class Titan extends Tiny {
    constructor(useEscape?: Boolean, delimiter?: Delimiter, stack?: Stack);
    render(templateText: string, data: Object): string;
    compile(templateText: string): Template;
}
export declare const titan: Titan;

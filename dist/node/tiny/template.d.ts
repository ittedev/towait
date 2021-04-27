import { Block } from '../struct/block';
import { Template } from '../struct/template';
import { Tiny } from '../tiny';
export declare class TinyTemplate implements Template {
    tiny: Tiny;
    templateText: string;
    block: Block;
    constructor(tiny: Tiny, templateText: string);
    compile(): void;
    render(data?: object): string;
}

import { Node } from '../struct/node';
import { Template } from '../struct/template';
import { Titan } from '../titan';
export declare class TitanTemplate implements Template {
    titan: Titan;
    templateText: string;
    node: Node;
    constructor(titan: Titan, templateText: string);
    compile(): void;
    render(data?: object): string;
}

import { Node } from '../struct/node';
import { Section, SectionType } from '../struct/section';
export declare class TinySection implements Section {
    type: SectionType;
    node: Node;
    constructor(node: Node);
}

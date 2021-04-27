import { Node } from '../struct/node';
import { Section, SectionType } from '../struct/section';
export declare class LineSection implements Section {
    type: SectionType;
    node: Node;
    constructor(node: Node);
}

import { Node } from './node';
export declare const enum SectionType {
    tiny = 0,
    line = 1,
    start = 2,
    end = 3
}
export interface Section {
    type: SectionType;
    node: Node;
}

import { Node } from '../struct/node';
import { BlockNode } from '../nodes/block';
import { Section, SectionType } from '../struct/section';
export declare const StartType: {
    readonly start: 2;
    readonly else: 3;
    readonly case: 4;
    readonly default: 5;
};
export declare type StartType = typeof StartType[keyof typeof StartType];
export declare const ComplexType: {
    readonly if: 1;
    readonly for: 2;
    readonly switch: 3;
};
export declare type ComplexType = typeof ComplexType[keyof typeof ComplexType];
export declare class StartSection implements Section {
    type: SectionType;
    node: BlockNode;
    constructor(node: BlockNode);
    get startType(): StartType;
    has(type: ComplexType): boolean;
    add(node: Node): void;
}

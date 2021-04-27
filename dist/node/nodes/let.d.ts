import { Node, NodeType } from '../struct/node';
import { BlockNode } from './block';
import { Stack } from '../utils/stack';
export declare class LetNode extends BlockNode {
    type: NodeType;
    name: string;
    constructor(name: string, node: Node);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

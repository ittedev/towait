import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
import { BlockNode } from './block';
export declare class ForNode extends BlockNode {
    type: NodeType;
    hash: Node;
    variableName: string;
    indexName?: string;
    constructor(node: Node, hash: Node, variableName: string, indexName?: string);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

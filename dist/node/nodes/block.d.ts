import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class BlockNode implements Node {
    type: NodeType;
    node: Node;
    _isTitantNode: true;
    constructor(node: Node);
    trace(callback: (node: Node) => Node): Node;
    find(callback: (node: BlockNode) => boolean): BlockNode | undefined;
    evalute(stack: Stack): any;
}

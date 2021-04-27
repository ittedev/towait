import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class LiteralNode implements Node {
    type: NodeType;
    value: any;
    _isTitantNode: true;
    constructor(value: any);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

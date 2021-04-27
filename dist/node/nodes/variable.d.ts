import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class VariableNode implements Node {
    type: NodeType;
    _isTitantNode: true;
    name: string;
    constructor(name: string);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

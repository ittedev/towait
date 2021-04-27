import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class EndNode implements Node {
    type: NodeType;
    pipe?: Node;
    _isTitantNode: true;
    constructor(pipe?: Node);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

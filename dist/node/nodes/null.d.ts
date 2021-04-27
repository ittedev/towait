import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class NullNode implements Node {
    type: NodeType;
    _isTitantNode: true;
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class DefaultsNode {
    type: NodeType;
    node: Node;
    data: Array<[string, any]>;
    _isTitantNode: true;
    constructor(node: Node, data: Array<[string, any]>);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

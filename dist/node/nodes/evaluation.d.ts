import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class EvaluationNode implements Node {
    type: NodeType;
    node: Node;
    _isTitantNode: true;
    params: Array<Node>;
    constructor(node: Node, params?: Array<Node>);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

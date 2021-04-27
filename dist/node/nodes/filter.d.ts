import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
import './advanced-evaluation';
export declare class FilterNode implements Node {
    type: NodeType;
    _isTitantNode: true;
    params: Array<string>;
    node: Node;
    constructor(node: Node, params?: Array<string>);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

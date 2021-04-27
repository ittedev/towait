import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class IncludeNode implements Node {
    type: NodeType;
    fileName: string;
    _isTitantNode: true;
    constructor(fileName: string);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

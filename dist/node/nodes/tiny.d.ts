import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class TinyNode implements Node {
    type: NodeType;
    text: string;
    _isTitantNode: true;
    constructor(text: string);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

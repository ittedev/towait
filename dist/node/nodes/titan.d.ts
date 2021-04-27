import { Block } from '../struct/block';
import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
export declare class TitanNode implements Node {
    type: NodeType;
    block: Block;
    _isTitantNode: true;
    constructor(block?: Block);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
import { BlockNode } from './block';
import { ElseNode } from './else';
export declare class IfNode extends BlockNode {
    type: NodeType;
    condition: Node;
    in?: Node;
    elseNode?: ElseNode;
    constructor(node: Node, condition: Node, inNode?: Node, elseNode?: ElseNode);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

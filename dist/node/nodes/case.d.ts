import { Node, NodeType } from '../struct/node';
import { BlockNode } from './block';
export declare class CaseNode extends BlockNode {
    type: NodeType;
    values: Array<Node>;
    constructor(node: Node, values: Array<Node>);
    trace(callback: (node: Node) => Node): Node;
}

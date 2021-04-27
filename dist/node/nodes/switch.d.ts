import { Node, NodeType } from '../struct/node';
import { Stack } from '../utils/stack';
import { BlockNode } from './block';
import { CaseNode } from './case';
import { DefaultNode } from './default';
export declare class SwitchNode extends BlockNode {
    type: NodeType;
    value: Node;
    cases: Array<CaseNode>;
    defaultNode?: DefaultNode;
    constructor(node: Node, value: Node, cases?: Array<CaseNode>, defaultNode?: DefaultNode);
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

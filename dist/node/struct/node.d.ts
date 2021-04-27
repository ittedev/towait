import { Stack } from '../utils/stack';
export declare const enum NodeType {
    null = 0,
    term = 1,
    evaluation = 2,
    literal = 3,
    variable = 4,
    tiny = 5,
    titan = 6,
    filter = 7,
    block = 8,
    if = 9,
    else = 10,
    switch = 11,
    case = 12,
    default = 13,
    for = 14,
    end = 15,
    var = 16,
    let = 17,
    include = 18,
    defaults = 19
}
export interface Node {
    type: NodeType;
    _isTitantNode: true;
    trace(callback: (node: Node) => Node): Node;
    evalute(stack: Stack): any;
}

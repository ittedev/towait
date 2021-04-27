import { Node } from '../struct/node';
import { Block } from '../struct/block';
import { Delimiter } from '../struct/delimiter';
import { EvaluationNode } from '../nodes/evaluation';
export declare const lineout: (prefix: string, node: Node, useEscape: Boolean) => EvaluationNode;
export declare const noLastLine: (node: Node) => EvaluationNode;
export declare const compile: (text: string, useEscape: Boolean, delimiter: Delimiter) => Block;

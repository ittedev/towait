import { Node, NodeType } from '../struct/node'
import { BlockNode } from './block'
import { Stack } from '../utils/stack'

export class ElseNode extends BlockNode {
  type: NodeType = NodeType.else
}

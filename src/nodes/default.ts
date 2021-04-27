import { Node, NodeType } from '../struct/node'
import { BlockNode } from './block'
import { Stack } from '../utils/stack'

export class DefaultNode extends BlockNode {
  type: NodeType = NodeType.default
}

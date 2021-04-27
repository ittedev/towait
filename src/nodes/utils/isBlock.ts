import { Node, NodeType } from '../../struct/node'
import { LetNode } from '../../nodes/let'
import { VarNode } from '../../nodes/var'

export const isBlock = (node: Node) => {
  switch(node.type) {
    case NodeType.block:
    case NodeType.if:
    case NodeType.else:
    case NodeType.switch:
    case NodeType.case:
    case NodeType.default:
    case NodeType.for: return true
    case NodeType.var: return isBlock((node as VarNode).node)
    case NodeType.let: return isBlock((node as LetNode).node)
    default: return false
  }
}

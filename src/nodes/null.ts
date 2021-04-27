import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class NullNode implements Node {
  type: NodeType = NodeType.null
  _isTitantNode: true = true

  trace(callback: (node: Node) => Node): Node {
    return callback(this)
  }
  evalute(stack: Stack): any {
    return undefined
  }
}
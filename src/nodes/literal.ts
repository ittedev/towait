import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class LiteralNode implements Node {
  type: NodeType = NodeType.literal
  value: any
  _isTitantNode: true = true
  constructor(value: any) {
    this.value = value
  }
  trace(callback: (node: Node) => Node): Node {
    return callback(this)
  }
  evalute(stack: Stack): any {
    return this.value
  }
}

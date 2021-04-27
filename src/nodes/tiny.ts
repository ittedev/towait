import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class TinyNode implements Node {
  type: NodeType = NodeType.tiny
  text: string
  _isTitantNode: true = true

  constructor(text: string) {
    this.text = text
  }

  trace(callback: (node: Node) => Node): Node {
    return callback(this)
  }
  evalute(stack: Stack): any {
    return undefined
  }
}
import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class EndNode implements Node {
  type: NodeType = NodeType.end
  pipe?: Node
  _isTitantNode: true = true

  constructor(pipe?: Node) {
    this.pipe = pipe
  }

  trace(callback: (node: Node) => Node): Node {
    if (this.pipe) this.pipe = callback(this.pipe)
    return callback(this)
  }
  evalute(stack: Stack): any {
    return undefined
  }
}
import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class VariableNode implements Node {
  type: NodeType = NodeType.variable
  _isTitantNode: true = true
  name: string
  constructor(name: string) {
    this.name = name
  }
  trace(callback: (node: Node) => Node): Node {
    return callback(this)
  }
  evalute(stack: Stack): any {
    // console.log('//// stack ////\n', stack.data)
    return stack.get(this.name)
  }
}
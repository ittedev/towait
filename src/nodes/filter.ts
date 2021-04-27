import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import './advanced-evaluation'

export class FilterNode implements Node {
  type: NodeType = NodeType.filter
  _isTitantNode: true = true
  params: Array<string>
  node: Node

  constructor(node: Node, params: Array<string> = []) {
    this.node = node
    this.params = params
  }

  trace(callback: (node: Node) => Node): Node {
    return callback(this)
  }

  evalute(stack: Stack): any {
    return this.node.evalute(stack)
  }
}

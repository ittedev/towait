import { Node, NodeType } from '../struct/node'
import { BlockNode } from './block'

export class CaseNode extends BlockNode {
  type: NodeType = NodeType.case
  values: Array<Node>
  constructor(node: Node, values: Array<Node>) {
    super(node)
    this.values = values
  }
  trace(callback: (node: Node) => Node): Node {
    for (let index = this.values.length - 1; index >= 0; index--) {
      this.values[index] = this.values[index].trace(callback)
    }
    this.node = this.node.trace(callback)
    return callback(this)
  }
}

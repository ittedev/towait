import { Node, NodeType } from '../struct/node'
import { BlockNode } from './block'
import { Stack } from '../utils/stack'

export class VarNode extends BlockNode {
  type: NodeType = NodeType.let
  name: string
  constructor(name: string, node: Node) {
    super(node)
    this.name = name
  }
  trace(callback: (node: Node) => Node): Node {
    this.node = this.node.trace(callback)
    return callback(this)
  }
  evalute(stack: Stack): any {
    stack.add([this.name, this.node.evalute(stack)])
    return ''
  }
}
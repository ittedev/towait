import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import { isBlock } from './utils/isBlock'

export class BlockNode implements Node {
  type: NodeType = NodeType.block
  node: Node
  _isTitantNode: true = true

  constructor(node: Node) {
    this.node = node
  }

  trace(callback: (node: Node) => Node): Node {
    this.node = this.node.trace(callback)
    return callback(this)
  }
  find(callback: (node: BlockNode) => boolean): BlockNode | undefined {
    return callback(this) ? this : isBlock(this.node) ? (this.node as BlockNode).find(callback) : undefined
  }
  evalute(stack: Stack): any {
    stack.push()
    const value = this.node.evalute(stack)
    stack.pop()
    return value
  }
}
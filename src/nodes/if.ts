import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import { BlockNode } from './block'
import { ElseNode } from './else'

export class IfNode extends BlockNode {
  type: NodeType = NodeType.if
  condition: Node
  in?: Node
  elseNode?: ElseNode
  constructor(node: Node, condition: Node, inNode?: Node, elseNode?: ElseNode) {
    super(node)
    this.condition = condition
    this.in = inNode
    this.elseNode = elseNode
  }
  trace(callback: (node: Node) => Node): Node {
    this.condition = this.condition.trace(callback)
    this.node = this.node.trace(callback)
    if (this.elseNode) this.elseNode = this.elseNode.trace(callback) as ElseNode
    return callback(this)
  }
  evalute(stack: Stack): any {
    if (this.in ?
      (() => {
        const hash = this.in.evalute(stack)
        const value = this.condition.evalute(stack)
        return Array.isArray(hash) ? hash.includes(value) : value in hash
      })() :
      this.condition.evalute(stack)) {
      stack.push()
      const value = this.node.evalute(stack)
      stack.pop()
      return value
    } else if (this.elseNode){
      return this.elseNode.evalute(stack)
    } else {
      return ''
    }
  }
}

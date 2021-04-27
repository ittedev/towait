import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import { BlockNode } from './block'
import { CaseNode } from './case'
import { DefaultNode } from './default'

export class SwitchNode extends BlockNode {
  type: NodeType = NodeType.switch
  value: Node
  cases: Array<CaseNode>
  defaultNode?: DefaultNode
  constructor(node: Node, value: Node, cases: Array<CaseNode> = [], defaultNode?: DefaultNode) {
    super(node)
    this.value = value
    this.cases = cases
    this.defaultNode = defaultNode
  }
  trace(callback: (node: Node) => Node): Node {
    this.node = this.node.trace(callback)
    this.value = this.value.trace(callback)
    for (let index = this.cases.length - 1; index >= 0; index--) {
      this.cases[index] = this.cases[index].trace(callback) as CaseNode
    }
    if (this.defaultNode) this.defaultNode = this.defaultNode.trace(callback) as DefaultNode
    return callback(this)
  }
  evalute(stack: Stack): any {
    const target = this.value.evalute(stack)
    stack.push()
    let value = this.node.evalute(stack) || ''
    let isMatch = false
    for (const caseNode of this.cases) {
      if (caseNode.values.some(value => value.evalute(stack) === target)) {
        value += (value?'\n':'') + caseNode.evalute(stack) || ''
        isMatch = true
      }
    }
    if (!isMatch && this.defaultNode) {
      value += (value?'\n':'') + this.defaultNode.evalute(stack) || ''
    }
    stack.pop()
    return value
  }
}
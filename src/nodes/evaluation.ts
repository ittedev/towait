import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class EvaluationNode implements Node {
  type: NodeType = NodeType.evaluation
  node: Node
  _isTitantNode: true = true
  params: Array<Node>

  constructor(node: Node, params: Array<Node> = []) {
    this.node = node
    this.params = params
  }

  trace(callback: (node: Node) => Node): Node {
    this.node = this.node.trace(callback)
    for (let index = this.params.length - 1; index >= 0; index--) {
      this.params[index] = this.params[index].trace(callback)
    }
    return callback(this)
  }

  evalute(stack: Stack): any {
    const variable = this.node.evalute(stack)
    return typeof variable === 'function' ? variable(...this.params.map(node => node.evalute(stack))) : variable
  }
}
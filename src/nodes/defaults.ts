import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import { AdvancedStack } from '../utils/advanced-stack'

export class DefaultsNode {
  type: NodeType = NodeType.defaults
  node: Node
  data: Array<[string, any]>
  _isTitantNode: true = true

  constructor(node: Node, data: Array<[string, any]>) {
    this.node = node
    this.data = data
  }

  trace(callback: (node: Node) => Node): Node {
    this.node = this.node.trace(callback)
    return callback(this)
  }
  evalute(stack: Stack): any {
    (stack as AdvancedStack).pushDefaults(this.data)
    const value = this.node.evalute(stack);
    (stack as AdvancedStack).popDefaults()
    return value
  }
}


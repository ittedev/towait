import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'

export class IncludeNode implements Node {
  type: NodeType = NodeType.include
  fileName: string
  _isTitantNode: true = true
  constructor(fileName: string) {
    this.fileName = fileName
  }
  trace(callback: (node: Node) => Node): Node {
    return callback(this)
  }
  evalute(stack: Stack): any {
    return undefined
  }
}
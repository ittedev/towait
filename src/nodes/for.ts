import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import { BlockNode } from './block'

export class ForNode extends BlockNode {
  type: NodeType = NodeType.for
  hash: Node
  variableName: string
  indexName?: string
  constructor(node: Node, hash: Node, variableName: string, indexName?: string) {
    super(node)
    this.hash = hash
    this.variableName = variableName
    this.indexName = indexName
  }
  trace(callback: (node: Node) => Node): Node {
    this.hash = this.hash.trace(callback)
    this.node = this.node.trace(callback)
    return callback(this)
  }
  evalute(stack: Stack): any {
    const hash = this.hash.evalute(stack)
    const entries = (() => {
      if (typeof hash === 'object') {
        if (Array.isArray(hash)) return [...hash.entries()]
        else return Object.entries(hash)
      } else return [[0, hash]]
    })()
    let value = ''
    for (let index = 0; index < entries.length; index++) {
      const [key, variable] = entries[index]
      stack.push([[this.variableName, variable]])
      if (this.indexName) stack.add([this.indexName, key])
      const text = this.node.evalute(stack) || ''
      if (text) value += text + (index < entries.length - 1 ? '\n' : '')
      stack.pop()
    }
    return value
  }
}
import { Block } from '../struct/block'
import { Node, NodeType } from '../struct/node'
import { Stack } from '../utils/stack'
import { render } from '../tiny/render'

export class TitanNode implements Node {
  type: NodeType = NodeType.titan
  block: Block
  _isTitantNode: true = true

  constructor(block: Block = []) {
    this.block = block
  }

  trace(callback: (node: Node) => Node): Node {
    (function traceBlock(block: Block) {
      for (let index = block.length - 1; index >= 0; index--) {
        if (Array.isArray(block[index])) traceBlock(block[index] as Block)
        else if (typeof block[index] !== 'string') block[index] = (block[index] as Node).trace(callback)
      }
    })(this.block)
    return callback(this)
  }
  evalute(stack: Stack): any {
    return render(this.block, stack)
  }
}

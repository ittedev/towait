import { Node, NodeType } from '../struct/node'
import { BlockNode } from '../nodes/block'
import { TitanNode } from '../nodes/titan'
import { IfNode } from '../nodes/if'
import { ElseNode } from '../nodes/else'
import { SwitchNode } from '../nodes/switch'
import { CaseNode } from '../nodes/case'
import { DefaultNode } from '../nodes/default'
import { EndNode } from '../nodes/end'
import { Section, SectionType } from '../struct/section'
import { pipein } from '../parser/utils/pipein'

export const StartType = {
  start   :  2,
  else    :  3,
  case    :  4,
  default :  5
} as const
export type StartType = typeof StartType[keyof typeof StartType]

export const ComplexType = {
  if      :  1,
  for     :  2,
  switch  :  3,
} as const
export type ComplexType = typeof ComplexType[keyof typeof ComplexType]

export class StartSection implements Section {
  type: SectionType = SectionType.start
  node: BlockNode

  constructor(node: BlockNode) {
    this.node = node
  }

  get startType(): StartType {
    switch (this.node.type) {
      case NodeType.block:
      case NodeType.if:
      case NodeType.for:
      case NodeType.let:
      case NodeType.var:
      case NodeType.switch: return StartType.start
      case NodeType.else: return StartType.else
      case NodeType.case: return StartType.case
      case NodeType.default: return StartType.default
    }
  }

  has(type: ComplexType): boolean {
    const nodeType = (() => {
      switch (type) {
        case ComplexType.if: return NodeType.if
        case ComplexType.for: return NodeType.for
        case ComplexType.switch: return NodeType.switch
      }
    })()
    return !!this.node.find((node: BlockNode) => node.type === nodeType)
  }

  add(node: Node) {
    switch (node.type) {
      case NodeType.titan: {
        const target = this.node.find((current: BlockNode) => current.node.type === NodeType.titan).node as TitanNode
        target.block = target.block.concat((node as TitanNode).block)
        break
      }
      case NodeType.end: {
        const end = node as EndNode
        if (end.pipe) pipein(this.node.find((current: BlockNode) => current.node.type === NodeType.titan), end.pipe)
        break
      }
      case NodeType.default: {
        const switchNode = this.node.find((node: BlockNode) => node.type === NodeType.switch) as SwitchNode
        if (switchNode && !switchNode.defaultNode) switchNode.defaultNode = node as DefaultNode
        break
      }
      case NodeType.case: {
        const switchNode = this.node.find((node: BlockNode) => node.type === NodeType.switch) as SwitchNode
        switchNode.cases.push(node as CaseNode)
        break
      }
      case NodeType.else: {
        let ifNode: IfNode = null
        this.node.find((current: BlockNode) => {
          if (current.type === NodeType.if) ifNode = current as IfNode
          return false
        })
        ifNode.elseNode = node as ElseNode
        break
      }
    }
  }
}

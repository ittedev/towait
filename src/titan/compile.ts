import { Node, NodeType } from '../struct/node'
import { TinyNode } from '../nodes/tiny'
import { split } from '../spliter/split'
import { joinTitan } from '../joiner/titan'
import { compile as compileTiny } from '../tiny/compile'
import { TitanNode } from '../nodes/titan'
import { Delimiter } from '../struct/delimiter'

export const compile = (text: string, useEscape: Boolean, delimiter: Delimiter): Node => {
  const sections = split(text, delimiter)

  return joinTitan(sections.reverse())
    .trace((node: Node) => node.type === NodeType.tiny ? new TitanNode(compileTiny((node as TinyNode).text, useEscape, delimiter)) : node) // expand tiny
}

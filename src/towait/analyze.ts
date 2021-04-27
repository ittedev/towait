import { Node, NodeType } from '../struct/node'
import { Includer } from './includer'
import { Config } from '../struct/config'
import { objectificate } from "./objectificate"
import { IL } from '../struct/il'
import { compile } from '../titan/compile'
import { IncludeNode } from '../nodes/include'
import { DefaultsNode } from '../nodes/defaults'

export const analyze = (text: string, config: Config, orIncluder?: Includer): IL => {
  const includer = orIncluder || new Includer(config)
  const source = objectificate(text, config.objectification)
  const data = Object.entries(source.data)
  for (const set of source.indexed) {
    set[1] = new DefaultsNode(
      compile(set[0], config.useEscape, config.delimiter)
        .trace((node: Node) => node.type === NodeType.include ? includer.include((node as IncludeNode).fileName) : node) // expand include
      , data)
  }
  return source
}
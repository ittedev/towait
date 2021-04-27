import { Stack } from '../utils/stack'
import { Block } from '../struct/block'
import { NodeType } from '../struct/node'

export const render = (block: Block, stack: Stack): string => {
  return block.reduce((text, section, index) => {
    if (typeof section === 'string') return text + section // text block
    else if (Array.isArray(section)) return text + render(section as Block, stack) + (index < block.length - 1 ? '\n' : '') // 
    else return text + section.evalute(stack) + (section.type === NodeType.titan && index < block.length - 1 ? '\n' : '')
  }, '') as string
}

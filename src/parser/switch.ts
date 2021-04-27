import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { expression } from './expression'
import { SwitchNode } from '../nodes/switch'
import { TitanNode } from '../nodes/titan'

// <switch> = switch E
export const switchFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.switch)
  return new SwitchNode(new TitanNode(), expression(tokens))
}

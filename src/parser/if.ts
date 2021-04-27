import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { nextIsJoin } from './utils/next-is-join'
import { Node } from '../struct/node'
import { expression } from './expression'
import { IfNode } from '../nodes/if'
import { join } from './join'
import { TitanNode } from '../nodes/titan'
import { nextIs } from './utils/next-is'

// <if> = if E (in E) <join>?
export const ifFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.if)
  const condition = expression(tokens)
  const inNode = (() => {
    if (nextIs(tokens, TokenType.in)) {
      tokens.pop()
      return expression(tokens)
    } else return undefined
  })()
  if (nextIsJoin(tokens)) return new IfNode(join(tokens), condition, inNode)
  else return new IfNode(new TitanNode(), condition, inNode)
}

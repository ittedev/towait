import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { nextIsJoin } from './utils/next-is-join'
import { Node } from '../struct/node'
import { expression } from './expression'
import { ForNode } from '../nodes/for'
import { nextIs } from './utils/next-is'
import { join } from './join'
import { TitanNode } from '../nodes/titan'

// <for> = for W (,W)? in E <join>?
export const forFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.for)
  const word = tokens.pop().value
  const [vName, iName] = (() => {
    if (nextIs(tokens, TokenType.comma)) {
      tokens.pop()
      if (nextIs(tokens, TokenType.word)) return [tokens.pop().value, word]
      else throw new Error()
    } else return [word, undefined]
  })()
  must(tokens.pop(), TokenType.in)
  const hash = expression(tokens)
  if (nextIsJoin(tokens)) return new ForNode(join(tokens), hash, vName, iName)
  else return new ForNode(new TitanNode(), hash, vName, iName)
}

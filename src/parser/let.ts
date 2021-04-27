import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { LetNode } from '../nodes/let'
import { FilterNode } from '../nodes/filter'
import { right } from './right'
import { nextIs } from './utils/next-is'

// <let> = let W( W)* = <right>
export const letFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.let)
  const name = tokens.pop().value
  const params = []
  while (nextIs(tokens, TokenType.word)) params.push(tokens.pop().value)
  must(tokens.pop(), TokenType.equal)
  const node = right(tokens)
  return new LetNode(name, params.length ? new FilterNode(node, params) : node)
}

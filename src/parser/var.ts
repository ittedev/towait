import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { VarNode } from '../nodes/var'
import { right } from './right'

// <var> = var W = <right>
export const varFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.var)
  const name = tokens.pop().value
  must(tokens.pop(), TokenType.equal)
  const node = right(tokens)
  return new VarNode(name, node)
}

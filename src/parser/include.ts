import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { IncludeNode } from '../nodes/include'
import { cast } from './utils/cast'
import { nextIs } from './utils/next-is'

// <include> = include s
export const include = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.include)
  nextIs(tokens, TokenType.string)
  return new IncludeNode(cast(tokens.pop()))
}

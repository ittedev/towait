import { Token, TokenType } from '../struct/token'
import { nextIs } from './utils/next-is'
import { Node } from '../struct/node'
import { condition } from './condition'
import { pipe } from './pipe'
import { pipein } from './utils/pipein'

// E = CP?
export const expression = (tokens: Array<Token>): Node => {
  const node = condition(tokens)
  if (nextIs(tokens, TokenType.pipe)) {
    return pipein(node, pipe(tokens))
  }
  else return node
}

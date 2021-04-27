import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { EndNode } from '../nodes/end'
import { nextIs } from './utils/next-is'
import { pipe } from './pipe'

// <end> = end P?
export const end = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.end)
  const node = nextIs(tokens, TokenType.pipe) ? pipe(tokens) : undefined
  return new EndNode(node)
}


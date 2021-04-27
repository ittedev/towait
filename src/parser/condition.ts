import { Token, TokenType } from '../struct/token'
import { nextIs } from './utils/next-is'
import { Node } from '../struct/node'
import { arithmetic } from './arithmetic'
import { branch } from './branch'

// C = AB*
export const condition = (tokens: Array<Token>): Node => {
  let node = arithmetic(tokens)
  while (nextIs(tokens, TokenType.question)) {
    node = branch(tokens, node)
  }
  return node
}

import { tokenize } from '../lexer/tokenize'
import { TokenType } from '../struct/token'
import { Node } from '../struct/node'
import { LiteralNode } from '../nodes/literal'
import { expression } from '../parser/expression'

export const parse = (text: string): Node => {
  const tokens = tokenize(text).filter(token => token.type !== TokenType.space).reverse()
  if (tokens.length === 0) return new LiteralNode('')
  else return expression(tokens)
}

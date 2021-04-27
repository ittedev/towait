import { tokenize } from '../lexer/tokenize'
import { TokenType } from '../struct/token'
import { Node } from '../struct/node'
import { NullNode } from '../nodes/null'
import { formula } from '../parser/formula'

export const parse = (text: string): Node => {
  const tokens = tokenize(text).filter(token => token.type !== TokenType.space).reverse()
  if (tokens.length === 0) return new NullNode()
  else return formula(tokens)
}

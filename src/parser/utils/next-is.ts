import { Token, TokenType } from '../../struct/token'

export const nextIs = (tokens: Array<Token>, type: TokenType): boolean => {
  const next = tokens[tokens.length - 1]
  return next && next.type === type
}

import { Token, TokenType } from '../../struct/token'

export const nextIsJoin = (tokens: Array<Token>): boolean => {
  const next = tokens[tokens.length - 1]
  if (next === undefined) return false
  switch (next.type){
    case TokenType.block:
    case TokenType.if:
    case TokenType.for:
    case TokenType.switch:
    case TokenType.include:
    case TokenType.colon: return true
    default: return false
  }
}

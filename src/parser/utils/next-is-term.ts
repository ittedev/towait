import { Token, TokenType } from '../../struct/token'

export const nextIsTerm = (tokens: Array<Token>): boolean => {
  const next = tokens[tokens.length - 1]
  if (next === undefined) return false
  switch (next.type){
    case TokenType.word:
    case TokenType.number: case TokenType.string: case TokenType.boolean:
    case TokenType.leftRound:
    case TokenType.exclamation:
      return true
    case TokenType.operator:
      switch (next.value) {
        case '-': case '+': return true
        default: return false
      }
    default: return false
  }
}

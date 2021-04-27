import { Token, TokenType } from '../../struct/token'

export const cast = (token: Token): any  =>{
  switch (token.type) {
    case TokenType.number: return Number(token.value)
    case TokenType.undefined: return undefined
    case TokenType.null: return null
    case TokenType.boolean: return token.value === 'true' ? true : false
    case TokenType.string:
      if (token.value[0] === '"') return token.value.slice(1, -1).replace('\\"', '"')
      else return token.value.slice(1, -1).replace('\\\'', '\'')
    default: throw new Error()
  }
}

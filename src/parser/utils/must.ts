import { Token, TokenType } from '../../struct/token'

export const must = (token: Token | undefined, type: TokenType, message: string = ''): void => {
  if (!token || token.type !== type) throw new Error(message)
}

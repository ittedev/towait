import { TokenType, Token } from '../struct/token'

const strToToken = (value: string): Token => ({
  value,
  type: ((): TokenType => {
    switch (value) {
      case 'block': return TokenType.block
      case 'if': return TokenType.if
      case 'else': return TokenType.else
      case 'for': return TokenType.for
      case 'in': return TokenType.in
      case 'switch': return TokenType.switch
      case 'case': return TokenType.case
      case 'default': return TokenType.default
      case 'include': return TokenType.include
      case 'let': return TokenType.let
      case 'var': return TokenType.var
      case 'end': return TokenType.end
      case 'false': case 'true': return TokenType.boolean
      case 'null': return TokenType.null
      case 'undefined': return TokenType.undefined
      case '|': case '&': return TokenType.partial
      case '+': case '-': case '*': case '/': case '%': case '==': case '===':case '!=':case '!==':
      case '<': case '>': case '<=': case '>=': case '||': case '&&': return TokenType.operator
      case '.': return TokenType.dot
      case '[': return TokenType.leftSquare
      case ']': return TokenType.rightSquare
      case '|>': return TokenType.pipe
      case '(': return TokenType.leftRound
      case ')': return TokenType.rightRound
      case '!': return TokenType.exclamation
      case '?': return TokenType.question
      case ':': return TokenType.colon
      case ',': return TokenType.comma
      case '=': return TokenType.equal
    }
    switch (true) {
      case /^\s+$/.test(value): return TokenType.space
      case /^\/\/.*$/.test(value): return TokenType.comment
      case /^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(value): return TokenType.word
      case /^'([^']|\\')*$|^"([^"]|\\")*$/.test(value): return TokenType.partial
      case /^'([^']|\\')*'$|^"([^"]|\\")*"$/.test(value): return TokenType.string
      case /^\d+\.?\d*$|^\.?\d+$/.test(value): return TokenType.number
      default: return TokenType.other
    }
  })()
})

const addtoTokens = (tokens: Array<Token>, char: string): Array<Token> => {
  if (tokens.length) {
    const token = tokens.pop()
    const added = strToToken(token.value + char)
    if (added.type === TokenType.other) tokens.push(token, strToToken(char))
    else tokens.push(added)
  } else tokens.push(strToToken(char))
  return tokens
}

export const tokenize = (text: string, tokens: Array<Token> = []): Array<Token> =>
  text === '' ? tokens : tokenize(text.slice(1), addtoTokens(tokens, text[0]))

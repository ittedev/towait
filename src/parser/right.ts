import { Token, TokenType } from '../struct/token'
import { Node } from '../struct/node'
import { ifFormula } from './if'
import { forFormula } from './for'
import { switchFormula } from './switch'
import { blockFormula } from './block'
import { include } from './include'
import { expression } from './expression'

// <right> = <block> | <if> | <for> | <switch> | <include> | :E
export const right = (tokens: Array<Token>): Node => {
  const next = tokens[tokens.length - 1]
  switch (next.type){
    case TokenType.if: return ifFormula(tokens)
    case TokenType.for: return forFormula(tokens)
    case TokenType.switch: return switchFormula(tokens)
    case TokenType.block: return blockFormula(tokens)
    case TokenType.include: return include(tokens)
    default: return expression(tokens)
  }
}

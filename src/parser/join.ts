import { Token, TokenType } from '../struct/token'
import { Node } from '../struct/node'
import { ifFormula } from './if'
import { forFormula } from './for'
import { switchFormula } from './switch'
import { blockFormula } from './block'
import { expression } from './expression'
import { include } from './include'
import { TitanNode } from '../nodes/titan'

// <join> = <block> | <if> | <for> | <switch> | <include> | :E
export const join = (tokens: Array<Token>): Node => {
  const next = tokens[tokens.length - 1]
  switch (next.type){
    case TokenType.if: return ifFormula(tokens)
    case TokenType.for: return forFormula(tokens)
    case TokenType.switch: return switchFormula(tokens)
    case TokenType.block: return blockFormula(tokens)
    case TokenType.include: return include(tokens)
    case TokenType.colon: {
      tokens.pop()
      return new TitanNode([expression(tokens)])
    }
    default: return new TitanNode()
  }
}

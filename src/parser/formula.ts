import { Token, TokenType } from '../struct/token'
import { Node } from '../struct/node'
import { NullNode } from '../nodes/null'
import { nextIs } from './utils/next-is'
import { include } from './include'
import { ifFormula } from './if'
import { forFormula } from './for'
import { switchFormula } from './switch'
import { blockFormula } from './block'
import { end } from './end'
import { letFormula } from './let'
import { varFormula } from './var'
import { elseFormula } from './else'
import { caseFormula } from './case'
import { defaultFormula } from './default'

// <formula> = (<block> | <if> | <for> | <switch> | <end> | <let> | <var> | <include>)? <comment>?
export const formula = (tokens: Array<Token>): Node => {
  const node = (() => {
    const next = tokens[tokens.length - 1]
    if (next) {
      switch (next.type) {
        case TokenType.if: return ifFormula(tokens)
        case TokenType.for: return forFormula(tokens)
        case TokenType.switch: return switchFormula(tokens)
        case TokenType.block: return blockFormula(tokens)
        case TokenType.else: return elseFormula(tokens)
        case TokenType.let: return letFormula(tokens)
        case TokenType.var: return varFormula(tokens)
        case TokenType.case: return caseFormula(tokens)
        case TokenType.default: return defaultFormula(tokens)
        case TokenType.include: return include(tokens)
        case TokenType.end: return end(tokens)
        case TokenType.comment: return new NullNode()
        default: throw Error()
      }
    } else return new NullNode()
  })()
  if (tokens.length) {
    if (nextIs(tokens, TokenType.comment)) tokens.pop()
    else throw new Error()
  }
  return node
}

// <formula> = (<start> | <end> | <else> | <case> | <default> | <let> | <include>)* <comment>?
// <start> = <block> | <if> | <for> | <switch>
// <join> = <start> | <include> | :E
// <block> = block
// <if> = if E <join>?
// <else> = else <join>?
// <for> = for W (,W)? in E <join>?
// <switch> = switch E
// <case> = case E <join>?
// <default> = default <join>?
// <end> = P? ;;
// <let> = let W( W)* = (E | <include> | <start>)
// <var> = var W = (E | <include> | <start>)
// <include> = include s

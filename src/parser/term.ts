import { Token, TokenType } from '../struct/token'
import { nextIs } from './utils/next-is'
import { must } from './utils/must'
import { cast } from './utils/cast'
import { Node } from '../struct/node'
import { EvaluationNode } from '../nodes/evaluation'
import { VariableNode } from '../nodes/variable'
import { LiteralNode } from '../nodes/literal'
import { expression } from './expression'
import { hash } from './hash'
import { func } from './func'

// T = w | H | F | L | oT | (E)
export const term = (tokens: Array<Token>): Node => {
  const token = tokens.pop()
  switch (token.type) {
    // w | H | F
    case TokenType.word: {
      if (nextIs(tokens, TokenType.dot) || nextIs(tokens, TokenType.leftSquare))  return hash(tokens, new VariableNode(token.value))
      else if (nextIs(tokens, TokenType.leftRound)) return func(tokens, new VariableNode(token.value))
      else return new EvaluationNode(new VariableNode(token.value))
    }

    // L = n | s | b
    case TokenType.number: case TokenType.string: case TokenType.boolean: return new LiteralNode(cast(token))

    // !T
    case TokenType.exclamation: return new EvaluationNode(new VariableNode(token.value), [term(tokens)])

    // oT
    case TokenType.operator: {
      switch (token.value) {
        case '-': case '+': return new EvaluationNode(new VariableNode(token.value), [term(tokens)])
        default: throw new Error()
      }
    }

    // (E)
    case TokenType.leftRound: {
      const node = expression(tokens)
      must(tokens.pop(), TokenType.rightRound)
      return node
    }
    default: throw new Error(JSON.stringify(token))
  }
}

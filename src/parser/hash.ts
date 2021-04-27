import { Token, TokenType } from '../struct/token'
import { nextIs } from './utils/next-is'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { VariableNode } from '../nodes/variable'
import { LiteralNode } from '../nodes/literal'
import { EvaluationNode } from '../nodes/evaluation'
import { expression } from './expression'
import { func } from './func'

// H = w[E]* | w.w*
export const hash = (tokens: Array<Token>, node: Node): Node => {
  const index = (() => {
    switch (tokens.pop().type) {
      case TokenType.dot: {
        const symbol = tokens.pop()
        must(symbol, TokenType.word)
        return new LiteralNode(symbol.value)
      }
      case TokenType.leftSquare: {
        const node = expression(tokens)
        must(tokens.pop(), TokenType.rightSquare)
        return node
      }
    }
  })()
  const result =  new EvaluationNode(new VariableNode('.'), [index, node])
  if (nextIs(tokens, TokenType.dot) || nextIs(tokens, TokenType.leftSquare))  return hash(tokens, result)
  if (nextIs(tokens, TokenType.leftRound)) return func(tokens, result)
  return result
}

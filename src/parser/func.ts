import { Token, TokenType } from '../struct/token'
import { nextIs } from './utils/next-is'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { EvaluationNode } from '../nodes/evaluation'
import { expression } from './expression'
import { hash } from './hash'

// F = W(E, ..E*)
export const func = (tokens: Array<Token>, node: Node): Node => {
  must(tokens.pop(), TokenType.leftRound)
  const params: Array<Node> = []
  while (!nextIs(tokens, TokenType.rightRound)) {
    params.push(expression(tokens))
    if (nextIs(tokens, TokenType.comma)) tokens.pop()
    else break
  }
  must(tokens.pop(), TokenType.rightRound)
  const result =  new EvaluationNode(node, params)
  if (nextIs(tokens, TokenType.dot) || nextIs(tokens, TokenType.leftSquare))  return hash(tokens, result)
  if (nextIs(tokens, TokenType.leftRound)) return func(tokens, result)
  return result
}

import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { EvaluationNode } from '../nodes/evaluation'
import { expression } from './expression'
import { arithmetic } from './arithmetic'
import { VariableNode } from '../nodes/variable'

// B = ? E : A
export const branch = (tokens: Array<Token>, node: Node): Node => {
  must(tokens.pop(), TokenType.question)
  const params = []
  params.push(expression(tokens))
  must(tokens.pop(), TokenType.colon)
  params.push(arithmetic(tokens))
  params.push(node)
  return new EvaluationNode(new VariableNode('?:'), params)
}

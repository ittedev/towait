import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { nextIs } from './utils/next-is'
import { nextIsTerm } from './utils/next-is-term'
import { Node, NodeType } from '../struct/node'
import { VariableNode } from '../nodes/variable'
import { EvaluationNode } from '../nodes/evaluation'
import { term } from './term'
import { pipein } from './utils/pipein'

// P = |> (O|!|T)T* P?
export const pipe = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.pipe)
  const node = (() => {
    if (nextIs(tokens, TokenType.operator) || nextIs(tokens, TokenType.exclamation) || nextIs(tokens, TokenType.word)) return new VariableNode(tokens.pop().value)
    else if (nextIsTerm(tokens)) return term(tokens)
    else throw new Error()
  })()

  const params = []
  while(nextIsTerm(tokens)) params.push(term(tokens))

  let used = false
  const evaluation = (new EvaluationNode(node, params)).trace((node: Node) => {
    if (node.type === NodeType.variable && (node as VariableNode).name === '_') used = true
    return node
  }) as EvaluationNode
  if (!used) evaluation.params.push(new EvaluationNode(new VariableNode('_')))

  if (nextIs(tokens, TokenType.pipe)) return pipein(evaluation, pipe(tokens))
  else return evaluation
}

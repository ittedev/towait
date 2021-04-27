import { Node, NodeType } from '../../struct/node'
import { VariableNode } from '../../nodes/variable'
import { EvaluationNode } from '../../nodes/evaluation'

export const pipein = (node: Node, pipe: Node): Node => {
  return pipe.trace((current: Node) => {
    return current.type === NodeType.evaluation && (current as EvaluationNode).node.type === NodeType.variable && ((current as EvaluationNode).node as VariableNode).name === '_' ? node : current
  })
}

import { Stack } from '../utils/stack'
import { FilterNode } from './filter'
import { EvaluationNode } from './evaluation'

EvaluationNode.prototype.evalute = function (stack: Stack): any {
  const variable = this.node.evalute(stack)
  switch (typeof variable) {
    case 'function': return variable(...this.params.map(node => node.evalute(stack)))
    case 'object':
      if (variable._isTitantNode) {
        if (variable.type === 'filter') {
          const filter = variable as FilterNode
          stack.push(filter.params.map((value, index) => [value, this.params[index].evalute(stack)] as [string, any]))
          const value = filter.evalute(stack)
          stack.pop()
          return value
        } else return variable.evalute(stack)
      }
    default: return variable
  }
}

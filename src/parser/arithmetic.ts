import { Token, TokenType } from '../struct/token'
import { power } from './utils/power'
import { nextIs } from './utils/next-is'
import { term } from './term'
import { Node } from '../struct/node'
import { EvaluationNode } from '../nodes/evaluation'
import { VariableNode } from '../nodes/variable'

// A = T(oT)*
export const arithmetic = (tokens: Array<Token>): Node => {
  const list = new Array<Node | string>()
  list.push(term(tokens))
  while(nextIs(tokens, TokenType.operator)) {
    const next = tokens.pop()
    if (next.value !== '!') {
      list.push(next.value)
      list.push(term(tokens))
    } else break
  }

  // 優先度解析
  while (list.length > 1) {
    for (let index = 0; index + 1 < list.length; index += 2) {
      if (index + 3 >= list.length || power(list[index + 1] as string) > power(list[index + 3] as string)) {
        const node = new EvaluationNode(new VariableNode(list[index + 1] as string), [list[index + 2] as Node, list[index] as Node])
        list.splice(index, 3, node)
      }
    }
  }

  return typeof list[0] === 'string' ? new VariableNode(list[0]) : list[0] as Node
}

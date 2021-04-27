import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { nextIsJoin } from './utils/next-is-join'
import { Node } from '../struct/node'
import { expression } from './expression'
import { CaseNode } from '../nodes/case'
import { join } from './join'
import { TitanNode } from '../nodes/titan'
import { nextIs } from './utils/next-is'

// <case> = case E(,E)* <join>?
export const caseFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.case)
  const values = [expression(tokens)]
  while(nextIs(tokens, TokenType.comma)) {
    tokens.pop()
    values.push(expression(tokens))
  }
  if (nextIsJoin(tokens)) return new CaseNode(join(tokens), values)
  else return new CaseNode(new TitanNode(), values)
}

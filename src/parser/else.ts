import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { nextIsJoin } from './utils/next-is-join'
import { Node } from '../struct/node'
import { ElseNode } from '../nodes/else'
import { join } from './join'
import { TitanNode } from '../nodes/titan'

// <else> = else <join>?
export const elseFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.else)
  if (nextIsJoin(tokens)) return new ElseNode(join(tokens))
  else return new ElseNode(new TitanNode())
}

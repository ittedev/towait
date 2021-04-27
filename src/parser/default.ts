import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { nextIsJoin } from './utils/next-is-join'
import { Node } from '../struct/node'
import { DefaultNode } from '../nodes/default'
import { join } from './join'
import { TitanNode } from '../nodes/titan'

// <default> = default <join>?
export const defaultFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.default)
  if (nextIsJoin(tokens)) return new DefaultNode(join(tokens))
  else return new DefaultNode(new TitanNode())
}

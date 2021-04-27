import { Token, TokenType } from '../struct/token'
import { must } from './utils/must'
import { Node } from '../struct/node'
import { nextIsJoin } from './utils/next-is-join'
import { BlockNode } from '../nodes/block'
import { TitanNode } from '../nodes/titan'
import { join } from './join'

// <block> = block
export const blockFormula = (tokens: Array<Token>): Node => {
  must(tokens.pop(), TokenType.block)
  if (nextIsJoin(tokens)) return new BlockNode(join(tokens))
  else return new BlockNode(new TitanNode())
}

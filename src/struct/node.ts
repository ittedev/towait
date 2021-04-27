import { Stack } from '../utils/stack'

export const enum NodeType {
  null,   // leaf
  term,
  evaluation,
  literal,    // leaf
  variable,   // leaf
  tiny,       // leaf
  titan,
  filter,
  block,
  if,
  else,
  switch,
  case,
  default,
  for,
  end,
  var,
  let,
  include,    // leaf
  defaults
}

export interface Node {
  type: NodeType
  _isTitantNode: true
  trace(callback: (node: Node) => Node): Node
  evalute(stack: Stack): any
}

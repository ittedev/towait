import { Node } from '../struct/node'
import { Section, SectionType } from '../struct/section'

export class LineSection implements Section {
  type: SectionType = SectionType.line
  node: Node
  constructor(node: Node) {
    this.node = node
  }
}

import { Node } from '../struct/node'
import { Section, SectionType } from '../struct/section'

export class EndSection implements Section {
  type: SectionType = SectionType.end
  node: Node
  constructor(node: Node) {
    this.node = node
  }
}

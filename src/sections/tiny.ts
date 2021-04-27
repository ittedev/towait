import { Node } from '../struct/node'
import { Section, SectionType } from '../struct/section'

export class TinySection implements Section {
  type: SectionType = SectionType.tiny
  node: Node
  constructor(node: Node) {
    this.node = node
  }
}

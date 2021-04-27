import { Node } from './node'

export const enum SectionType {
  tiny,
  line,
  start,
  end
}

export interface Section {
  type: SectionType
  node: Node
}

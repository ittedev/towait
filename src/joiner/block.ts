import { Section, SectionType } from '../struct/section'
import { StartSection, StartType, ComplexType } from '../sections/start'
import { Node } from '../struct/node'
import { joinTitan } from './titan'

const nextIs = (sections: Array<Section>, type: StartType) => {
  if (!sections.length) return false
  const section = sections[sections.length - 1]
  return section.type === SectionType.start && (section as StartSection).startType === type
}

// [block] = [start] [titan] has(switch){([joint<case>.])* ([joint<default>.])?} has(if){[joint<else>.*]?} !is(start){[end]}
export const joinBlock = (sections: Array<Section>): Node => {
  const start = sections.pop() as StartSection
  start.add(joinTitan(sections))
  if (start.has(ComplexType.switch)) {
    while (nextIs(sections, StartType.case)) {
      start.add(joinBlock(sections))
    }
    if (nextIs(sections, StartType.default)) {
      start.add(joinBlock(sections))
    }
  }
  if (start.has(ComplexType.if)) {
    if (nextIs(sections, StartType.else)) {
      start.add(joinBlock(sections))
    }
  }
  if (sections.length && start.startType === StartType.start) {
    const end = sections.pop()
    if (end.type === SectionType.end) {
      start.add(end.node)
    } else throw new Error()
  }
  return start.node
}

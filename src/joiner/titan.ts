import { Section, SectionType } from '../struct/section'
import { StartSection, StartType } from '../sections/start'
import { Node } from '../struct/node'
import { TitanNode } from '../nodes/titan'
import { joinBlock } from './block'

// [titan] = ([tiny] | [block] | [line])*
export const joinTitan = (sections: Array<Section>): Node => {
  const titan = new TitanNode()
  loop: do {
    const next = sections[sections.length - 1]
    if (next) {
      switch (next.type) {
        case SectionType.tiny:
        case SectionType.line: {
          titan.block.push(sections.pop().node)
          break
        }
        case SectionType.start:
          if ((next as StartSection).startType === StartType.start) {
            titan.block.push(joinBlock(sections))
            break
          } else break loop
        case SectionType.end: break loop
      }
    } else break
  } while (true)
  return titan
}

// [titan] = ([tiny] | [block] | [line])*
// [block] = [start] [titan] has(switch){([joint<case>.])* ([joint<default>.])?} has(if){[joint<else>.*]?} !is(start){[end]}

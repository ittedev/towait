import { NodeType } from '../struct/node'
import { BlockNode } from '../nodes/block'
import { Section } from '../struct/section'
import { TinySection } from '../sections/tiny'
import { TinyNode } from '../nodes/tiny'
import { parse } from '../titan/parse'
import { isBlock } from '../nodes/utils/isBlock'
import { StartSection } from '../sections/start'
import { LineSection } from '../sections/line'
import { EndSection } from '../sections/end'
import { Delimiter, escape } from '../struct/delimiter'

export const split = (text: string, delimiter: Delimiter): Array<Section> => {
  const lineDelimiter = delimiter.line.length < 2 ? `${escape(delimiter.line)}{3,}` : escape(delimiter.line)
  const lineRegExp = new RegExp(`^(.*?)(?<!\\\\)${lineDelimiter}\\s*(block|if|else|for|end|let|var|include|switch|case|default)(.*)$`)
  const lineEscapeRegExp = new RegExp(`\\\\(${lineDelimiter}\\s*)(block|if|else|for|end|let|var|include|switch|case|default)`, 'g')
  const lineUnescape = (text: string) => text.replace(lineEscapeRegExp, '$1$2')
  const sections: Array<Section> = []
  const buffer: Array<string> = []
  for (const line of text.split('\n')) {
    const result = line.match(lineRegExp)
    if (result) {
      const formula = parse(result[2] + lineUnescape(result[3]))
      if (formula.type === NodeType.null) continue
      if (buffer.length) {
        sections.push(new TinySection(new TinyNode(buffer.join('\n'))))
        buffer.length = 0
      }
      if (isBlock(formula)) sections.push(new StartSection(formula as BlockNode))
      else if (formula.type === NodeType.end) sections.push(new EndSection(formula))
      else sections.push(new LineSection(formula))
    } else {
      buffer.push(line)
    }
  }
  if (buffer.length) {
    sections.push(new TinySection(new TinyNode(buffer.join('\n'))))
  }
  return sections
}
import { IL, NodeSet } from '../struct/il'
import { Objectification } from '../struct/objectification'

const separatorRegExp = /^\-\-\-.*$/
const separatorNameRegExp = /^\-\-\-\s*([_\$a-zA-Z][_\$a-zA-Z0-9]*)?.*$/

export const objectificate = (text: string, objectification: Objectification ): IL => {
  const lines = text.split('\n')
  const parts: Array<string> = []
  const separators: Array<string> = []
  const buffer: Array<string> = []
  for (const line of lines) {
    if (line.match(separatorRegExp)) {
      separators.push(line)
      parts.push(buffer.join('\n'))
      buffer.length = 0
    } else buffer.push(line)
  }
  if (buffer.length) parts.push(buffer.join('\n'))
  const il: IL = { data: {}, indexed: [], named: {} }
  if (parts.length === 1) {
    il.indexed.push([parts[0]] as NodeSet)
  } else if (parts.length > 1) {
    il.data = objectification(parts[0])
    for (let index = 1; index < parts.length; index++) {
      const set = [parts[index]] as NodeSet
      il.indexed.push(set)
      const match = separators[index - 1].match(separatorNameRegExp)
      if (match) il.named[match[1]] = set
    }
  }
  return il
}

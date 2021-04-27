import { Node } from '../struct/node'
import { Block } from '../struct/block'
import { Delimiter, escape } from '../struct/delimiter'
import { EvaluationNode } from '../nodes/evaluation'
import { LiteralNode } from '../nodes/literal'
import { VariableNode } from '../nodes/variable'
import { parse } from './parse'

const inlineout = (node: Node, useEscape: Boolean) => {
  return new EvaluationNode(new VariableNode(useEscape ? 'escape' : 'output'), [node])
}

export const lineout = (prefix: string, node: Node, useEscape: Boolean) => {
  const wrap1 = useEscape ? new EvaluationNode(new VariableNode('escape'), [node]) : node
  const wrap2 = new EvaluationNode(new VariableNode('prefix'), [new LiteralNode(prefix), wrap1])
  return wrap2
}
export const noLastLine = (node: Node) => {
  return new EvaluationNode(new VariableNode('append'), [new LiteralNode('\n'), node])
}

export const compile = (text: string, useEscape: Boolean, delimiter: Delimiter): Block => {
  const lineDelimiter = delimiter.line.length <= 1 ? `${escape(delimiter.line)}{3,}` : escape(delimiter.line)
  const openDelimiter = escape(delimiter.open)
  const closeDelimiter = escape(delimiter.close)
  const lineRegExp = new RegExp(`^(.*)(?<!\\\\)${lineDelimiter}(.*)$`)
  const lineEscapeRegExp = new RegExp(`\\\\(${lineDelimiter})(.*)`, 'g')
  const lineUnescape = (text: string) => text.replace(lineEscapeRegExp, '$1$2')
  const inlineRegExp = new RegExp(`(?<!\\\\)${openDelimiter}.*?(?<!\\\\)${closeDelimiter}`, 'g')
  const inlineGroupRegExp = new RegExp(`(?<!\\\\)${openDelimiter}(.*?)(?<!\\\\)${closeDelimiter}`, 'g')
  const inlineEscapeRegExp = new RegExp(`\\\\(${openDelimiter}|${closeDelimiter})`, 'g')
  const inlineUnescape = (text: string) => text.replace(inlineEscapeRegExp, '$1')
  const lines = text.split('\n')
  const preBlock: Block = []
  const buffer: Array<string> = []
  // Line展開文で分割
  lines.forEach((line, index) => {
    const result = line.match(lineRegExp)
    if (result) {
      if (buffer.length) {
        preBlock.push(buffer.join('\n'))
        buffer.length = 0
      }
      const node = lineout(result[1], parse(lineUnescape(result[2])), useEscape)
      preBlock.push(index < lines.length - 1 ? noLastLine(node) : node)
    } else {
      buffer.push(lineUnescape(line))
    }
  })
  if (buffer.length) preBlock.push(buffer.join('\n'))

  return preBlock.map((preSection) => {
    if (typeof preSection === 'string') {
      // Block展開文で分割
      const stringParts = preSection.split(inlineRegExp)
      const nodeParts = [...preSection.matchAll(inlineGroupRegExp)]
      const section: Block = [inlineUnescape(stringParts[0])]
      if (nodeParts) {
        for (let index = 0; index < nodeParts.length; index++) {
          section.push(inlineout(parse(inlineUnescape(nodeParts[index][1])), useEscape))
          section.push(inlineUnescape(stringParts[index + 1]))
        }
      }
      return section
    } else {
      return preSection
    }
  })
}

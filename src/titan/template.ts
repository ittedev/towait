import { Node } from '../struct/node'
import { Template } from '../struct/template'
import { Titan } from '../titan'
import { compile } from './compile'

export class TitanTemplate implements Template {
  titan: Titan
  templateText: string
  node: Node

  constructor(titan: Titan, templateText: string) {
    this.titan = titan
    this.templateText = templateText
    this.node = null
  }

  compile(): void {
    if (!this.node) {
      this.node = compile(this.templateText.replace(/\r\n/g, '\n'), this.titan.useEscape, this.titan.delimiter)
    }
  }

  render (data: object = {}): string {
    this.compile()
    const stack = this.titan.stack.clone()
    stack.push(Object.entries(data))
    const text = this.node.evalute(stack)
    stack.pop()
    return text
  }
}


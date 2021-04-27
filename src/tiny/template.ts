import { Block } from '../struct/block'
import { Template } from '../struct/template'
import { Tiny } from '../tiny'
import { compile } from './compile'
import { render } from './render'

export class TinyTemplate implements Template {
  tiny: Tiny
  templateText: string
  block: Block

  constructor(tiny: Tiny, templateText: string) {
    this.tiny = tiny
    this.templateText = templateText
    this.block = null
  }

  compile(): void {
    if (!this.block) {
      this.block = compile(this.templateText.replace(/\r\n/g, '\n'), this.tiny.useEscape, this.tiny.delimiter)
    }
  }

  render (data: object = {}): string {
    this.compile()
    this.tiny.stack.push(Object.entries(data))
    const text = render(this.block, this.tiny.stack)
    this.tiny.stack.pop()
    return text
  }
}


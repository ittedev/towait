import { Template } from './struct/template'
import { Stack } from './utils/stack'
import { TinyTemplate } from './tiny/template'
import { builtin } from './tiny/builtin'
import { Delimiter } from './struct/delimiter'

export class Tiny {
  stack: Stack
  delimiter: Delimiter
  useEscape: Boolean

  constructor (useEscape: Boolean = true, delimiter: Delimiter = {}, stack: Stack = new Stack(builtin)) {
    this.stack = stack
    this.useEscape = useEscape
    this.delimiter = {
      line: delimiter.line || ':',
      open: delimiter.open || '{|',
      close: delimiter.close || '|}'
    }
  }

  render(templateText: string, data: Object): string {
    const renderer = new TinyTemplate(this, templateText)
    return renderer.render(data)
  }

  compile(templateText: string): Template {
    const template = new TinyTemplate(this, templateText)
    template.compile()
    return template
  }

  let(data: object)
  let(name: string, value: any)
  let(x: string | object, y?: any) {
    if (y) {
      this.stack.add([x as string, y])
    } else {
      for (const [name, value] of Object.entries(x)) {
        this.stack.add([name, value])
      }
    }
  }
}

export const tiny = new Tiny()

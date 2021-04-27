import fs from 'fs'
import { Config } from './struct/Config'
import { TowaitTemplate } from './towait/template'
import { AdvancedStack } from './utils/advanced-stack'
import { builtin } from './titan/builtin'
import { into } from './utils/into'
import { y } from './y'

export class Towait {
  stack: AdvancedStack
  config: Config

  constructor (config: Config = {}, stack: AdvancedStack = new AdvancedStack(builtin)) {
    this.stack = stack
    this.config = into({
      root: process.cwd(),
      useEscape: true,
      delimiter: {
        line: ':',
        open: '{|',
        close: '|}'
      },
      objectification: y
    }, config)
  }

  render(templateText: string, data: Object): string {
    const template = new TowaitTemplate(this, templateText)
    return template.render(data)
  }

  read(templateText: string, data?: Object): Object {
    const template = new TowaitTemplate(this, templateText)
    return template.read(data)
  }

  compile(templateText: string): TowaitTemplate {
    const template = new TowaitTemplate(this, templateText)
    template.compile()
    return template
  }

  renderFromFile(filepath: string, data: Object): string {
    const template = this.compileFromFile(filepath)
    return template.render(data)
  }

  readFromFile(filepath: string, data: Object): Object {
    const template = this.compileFromFile(filepath)
    return template.read(data)
  }

  compileFromFile(filepath: string): TowaitTemplate {
    const text = fs.readFileSync(filepath).toString()
    return this.compile(text)
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

export const towait = new Towait()

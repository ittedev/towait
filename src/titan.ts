import { Tiny } from './tiny'
import { Template } from './struct/template'
import { TitanTemplate } from './titan/template'
// import { TitanReader } from './titan/reader'
import { Delimiter, escape } from './struct/delimiter'
import { Stack } from './utils/stack'
import { builtin } from './titan/builtin'

export class Titan extends Tiny{

  constructor (useEscape: Boolean = true, delimiter: Delimiter = {}, stack: Stack = new Stack(builtin)) {
    super(useEscape, delimiter, stack)
  }

  render(templateText: string, data: Object): string {
    const template = new TitanTemplate(this, templateText)
    return template.render(data)
  }

  compile(templateText: string): Template {
    const titan =  new TitanTemplate(this, templateText)
    titan.compile()
    return titan
  }
}

export const titan = new Titan()

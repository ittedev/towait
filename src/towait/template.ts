import { deserialize, serialize } from 'v8'
import { Node } from '../struct/node'
import { Towait } from '../towait'
import { IL } from '../struct/il'
import { analyze } from './analyze'

export class TowaitTemplate {
  towait: Towait
  templateText: string
  il: IL

  constructor(towait: Towait, templateText: string) {
    this.towait = towait
    this.templateText = templateText
    this.il = null
  }

  compile(): void {
    if (!this.il) {
      this.il = analyze(this.templateText.replace(/\r\n/g, '\n'), this.towait.config)
    }
  }

  read (data?: object): Object {
    this.compile()
    const il = this.il
    if (data) {
      const stack = this.towait.stack.clone()
      const value = deserialize(serialize(il.data))
      for (const name in il.named) {
        stack.push(Object.entries(data))
        value[name] = il.named[name][1].evalute(stack)
        stack.pop()
      }
      return value
    } else return deserialize(serialize(il.data))
  }

  render (data: object): string
  render (name: string, data: object): string
  render (index: number, data: object): string
  render (dataOrNameOrIndex: object | string | number, maybeContext?: object): string {
    this.compile()
    const il = this.il
    const stack = this.towait.stack.clone()
    const [node, data] = (() => {
      switch (typeof dataOrNameOrIndex) {
        case 'object': return [il.indexed[0][1], dataOrNameOrIndex as Object] as [Node, Object]
        case 'string': return [il.named[dataOrNameOrIndex as string][1], maybeContext || {}] as [Node, Object]
        case 'number': return [il.indexed[dataOrNameOrIndex as number][1], maybeContext || {}] as [Node, Object]
      }
    })()
    stack.pushDefaults(Object.entries(il.data))
    stack.push(Object.entries(data))
    const value = node.evalute(this.towait.stack)
    stack.pop()
    stack.popDefaults()
    return value
  }
}


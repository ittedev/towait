import { Stack } from './stack'

export class AdvancedStack extends Stack{
  defaults: Array<[string, any]>
  defaultsLengths: Array<number>

  constructor(builtin: (name: string) => any, data: Array<[string, any]> = [], dataLengths: Array<number> = [0]) {
    super(builtin, data, dataLengths)
    this.defaults = []
    this.defaultsLengths = []
  }

  pushDefaults(data: Array<[string, any]>) {
    for (const datum of data) {
      this.defaults.push(datum)
    }
    this.defaultsLengths.push(data.length)
  }

  popDefaults() {
    let length = this.defaultsLengths.pop() || 0
    while (length--) this.defaults.pop()
  }

  get(name: string): any {
    const result = this.builtin(name)
    if (result) return result
    else {
      for (let index = this.data.length - 1; index >= 0; index--) {
        if (this.data[index][0] === name) return this.data[index][1]
      }
      for (const data of this.defaults) {
        if (data[0] === name) return data[1]
      }
      return undefined
    }
  }

  clone() {
    return new AdvancedStack(this.builtin, this.data, this.dataLengths)
  }
}

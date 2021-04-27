export class Stack {
  builtin: (name: string) => any
  data: Array<[string, any]>
  dataLengths: Array<number>

  constructor(builtin: (name: string) => any, data: Array<[string, any]> = [], dataLengths: Array<number> = [0]) {
    this.builtin = builtin
    this.data = data
    this.dataLengths = dataLengths
  }

  push(data: Array<[string, any]> = []) {
    for (const datum of data) {
      this.data.push(datum)
    }
    this.dataLengths.push(data.length)
  }

  add(data: [string, any]) {
    this.data.push(data as [string, any])
    this.dataLengths[this.dataLengths.length - 1]++
  }

  pop() {
    let length = this.dataLengths.pop() || 0
    while (length--) this.data.pop()
  }

  get(name: string): any {
    const result = this.builtin(name)
    if (result) return result
    else {
      for (let index = this.data.length - 1; index >= 0; index--) {
        if (this.data[index][0] === name) return this.data[index][1]
      }
      return undefined
    }
  }

  clone() {
    return new Stack(this.builtin, this.data.slice(), this.dataLengths.slice())
  }
}

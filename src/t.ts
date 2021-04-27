export const t = (text: string, data: Object) => text
  .replace(/\r/g, '').split(/\{\|(.*?)\|\}/g).reduce((result: string, text: string, index: number) =>
    result + (index % 2 ? (() => {
      const tokens = [...text.matchAll(/(\$|\w)+|\|\>|\./g)].map(value => value[0])
      const next = (token: string) => tokens[0] == token ? tokens.shift() : 0
      const hash = (pre: any): any => next('.') ? hash(pre[tokens.shift()]) : pre
      const pipe = (pre: any): any => next('|>') ? pipe(data[tokens.shift()](pre)) : pre
      return pipe(hash(data[tokens.shift()]))
    })() : text)
  )

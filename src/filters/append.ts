import { output } from './output'

export const append = (x: any, y: any): string => {
  const y2 = output(y)
  return y2 ? y2 + output(x) : ''
}

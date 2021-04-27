import { output } from './output'

export const prepend = (x: any, y: any): string => {
  const y2 = output(y)
  return y2 ? output(x) + y2 : ''
}

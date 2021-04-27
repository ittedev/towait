import { output } from './output'

export const prefix = (x: any, y: any): string => {
  const y2 = output(y)
  return y2 ? y2.split('\n').map(l => output(x) + l).join('\n') : ''
}

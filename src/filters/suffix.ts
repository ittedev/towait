import { output } from './output'

export const suffix = (x: any, y: any): string => {
  const y2 = output(y)
  return y2 ? y2.split('\n').map(l => l + output(x)).join('\n') : ''
}

import { output } from './output'

const escapeRegex = /[<>&"'`]/g
export const escape = (x: any): string => {
  const x2 = output(x)
  return !x2 ? x2 : x2.replace(escapeRegex, match => {
    switch (match) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '"': return '&quot;'
      case '\'': return '&#39;'
      case '`': return '&#x60;'
    }
  })
}

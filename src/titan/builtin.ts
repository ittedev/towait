import { dot, not, plus, minus, multi, div, mod, eq, seq, ne, sne, lt, gt, le, ge, or, and, cond } from '../filters/operators'
import { output } from '../filters/output'
import { escape } from '../filters/escape'
import { prefix } from '../filters/prefix'
import { suffix } from '../filters/suffix'
import { append } from '../filters/append'
import { prepend } from '../filters/prepend'

export const builtin = (name: string): any => {
  switch (name) {
    case '.': return dot
    case '!': return not
    case '+': return plus
    case '-': return minus
    case '*': return multi
    case '/': return div
    case '%': return mod
    case '==': return eq
    case '===': return seq
    case '!=': return ne
    case '!==': return sne
    case '<': return lt
    case '>': return gt
    case '<=': return le
    case '>=': return ge
    case '||': return or
    case '&&': return and
    case '?:': return cond
    case 'output': return output
    case 'escape': return escape
    case 'prefix': return prefix
    case 'suffix': return suffix
    // case 'affix': return affix
    case 'append': return append
    case 'prepend': return prepend
  }
}

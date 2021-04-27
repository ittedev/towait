export interface Delimiter {
  line?: string
  open?: string
  close?: string
}

export const escape = (delimiter: string) => delimiter.replace(/[|{}.*+?()\[\]-^$\\]/g, '\\$&')

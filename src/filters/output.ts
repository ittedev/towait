export const output = (x: string) => typeof x === 'string' || typeof x === 'number' && Number.isFinite(x) ? '' + x : ''

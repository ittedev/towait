export const into = (dest: object, src: object) => {
  for (const prop in dest) {
    if (prop in src) {
      if (typeof dest[prop] === typeof src[prop]) {
        if (typeof dest[prop] === 'object') {
          into(dest[prop], src[prop])
        } else {
          dest[prop] = src[prop]
        }
      } else {
        throw new Error(`A type is not match[${prop}]`)
      }
    }
  }
  return dest
}

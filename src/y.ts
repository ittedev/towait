type LineType = number // 0:key, 1:item, 2:value
type Line = [number, LineType, string]
const nonStringRegExp = /^(on|off|\d+|\d+\.\d+)$/
const replaces: Array<[RegExp, string | ((substring: string, ...args: any[]) => string)]> = [
  // (1) Remove windows returns and add a last brank line
  [/\r\n|$/g, '\n'],

  // (2) Remove brank lines and comment Lines
  [/(\n|^)([\n\t ]*|[\t ]*#.*)\n/g, '$1'],

  // (3) Replace multiline text to singleline text
  [/\|.*?\n([\t ]*\|.*?(\n|$))*/g, match => match.replace(/\n\s*\|/g, '\\n').slice(1)],

  // (4) Replace singleline to 2-lines
  [/^([\t ]*)(-[\t ]*|[\$a-zA-Z_](?:\$|\w)*:[\t ]*)(\S.*?)$/gm, (match, p1, p2, p3) => p1 + p2 + '\n' + p1 + ' '.repeat(p2.length) + (nonStringRegExp.test(p3) ? p3 : '|' + p3)],
]
// (5) Repeat (4)
replaces[4] = replaces[3]

const lineof = (text: string): Line => {
  if (!text) return [-1, 2, text]
  const match = text.match(/^([\t ]*)(.+)$/)
  const indent = match[1].length
  const value = match[2]
  if (/^-[\t ]*$/.test(value)) return [indent, 1, '']
  const keyMatch = value.match(/^([\$a-zA-Z_](?:\$|\w)*):[\t ]*$/)
  if (keyMatch) {
    return [indent, 0, `"${keyMatch[1].replace(/"/g, '\\"')}":`]
  }
  if (nonStringRegExp.test(value)) return [indent, 2, (value === 'on' || (value === 'off' ? false : value)) + '']
  return [indent, 2, `"${(value[0] === '|' ? value.slice(1) : value).replace('"', '\\"')}"`]
}

export const y = (text: string) => {
  const stack: Array<Line> = []

  return JSON.parse(replaces.reduce((text, [src, dest]) => text.replace(src, dest as string), text)

    // Split lines
    .split('\n')

    // Change and insert json chars
    .map(text => {
      const line = lineof(text)
      let prefix = ''
      while (stack.length && line[0] < stack[stack.length - 1][0]){
        prefix += '}]'[stack.pop()[1]] || ''
      }
      if (!stack.length || line[0] > stack[stack.length - 1][0]) {
        stack.push(line)
        prefix += '{['[line[1]] || ''
      } else {
        prefix += ',,'[line[1]] || ''
      }
      return prefix + line[2]
    })

    // Join lines
    .join(''))
}

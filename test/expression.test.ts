import { parse } from '../src/tiny/parse'
import { Stack } from '../src/utils/stack'
import { builtin } from '../src/titan/builtin'

const stack = new Stack(builtin)
stack.push([
  ['x', 1],
  ['y', 10],
  ['s', 's'],
  ['h', { x: 2, y: { x: 3 }, z: [7] }],
  ['a', [4, 5, [6], { x: 8 }]],
  ['text', 'x']
])

test('empty', () => {
  const node = parse('')
  expect(node.evalute(stack)).toBe('')
})

test('literal', () => {
  expect(parse('\'string\'').evalute(stack)).toBe('string')
  expect(parse('50.5').evalute(stack)).toBe(50.5)
  expect(parse('true').evalute(stack)).toBe(true)
})

test('word', () => {
  expect(parse('x').evalute(stack)).toBe(1)
  expect(parse('text').evalute(stack)).toBe('x')
})

test('hash', () => {
  expect(parse('h.x').evalute(stack)).toBe(2)
  expect(parse('h[\'x\']').evalute(stack)).toBe(2)
  expect(parse('h[text]').evalute(stack)).toBe(2)
  expect(parse('h.y.x').evalute(stack)).toBe(3)
  expect(parse('a[0]').evalute(stack)).toBe(4)
  expect(parse('a[2][0]').evalute(stack)).toBe(6)
  expect(parse('a[2-1]').evalute(stack)).toBe(5)
  expect(parse('h.z[0]').evalute(stack)).toBe(7)
  expect(parse('a[3].x').evalute(stack)).toBe(8)
})

test('oparate', () => {
  expect(parse('x + 1').evalute(stack)).toBe(2)
  expect(parse('x - 1').evalute(stack)).toBe(0)
  expect(parse('x - 2').evalute(stack)).toBe(-1)
  expect(parse('x * 2').evalute(stack)).toBe(2)
  expect(parse('y / 2').evalute(stack)).toBe(5)
  expect(parse('x / 2').evalute(stack)).toBe(0.5)
  expect(parse('y % 7').evalute(stack)).toBe(3)
})

test('compare', () => {
  expect(parse('x == 1').evalute(stack)).toBe(true)
  expect(parse('x == \'1\'').evalute(stack)).toBe(true)
  expect(parse('x != 1').evalute(stack)).toBe(false)
  expect(parse('x != \'1\'').evalute(stack)).toBe(false)
  expect(parse('x === 1').evalute(stack)).toBe(true)
  expect(parse('x === \'1\'').evalute(stack)).toBe(false)
  expect(parse('x !== 1').evalute(stack)).toBe(false)
  expect(parse('x !== \'1\'').evalute(stack)).toBe(true)
  expect(parse('x < 1').evalute(stack)).toBe(false)
  expect(parse('x < 2').evalute(stack)).toBe(true)
  expect(parse('x <= 1').evalute(stack)).toBe(true)
  expect(parse('x > 1').evalute(stack)).toBe(false)
  expect(parse('x > -1').evalute(stack)).toBe(true)
  expect(parse('x >= 1').evalute(stack)).toBe(true)
  expect(parse('true || false').evalute(stack)).toBe(true)
  expect(parse('true && false').evalute(stack)).toBe(false)
})

test('?:', () => {
  expect(parse('1?2:3').evalute(stack)).toBe(2)
  expect(parse('0?1:2?3:4').evalute(stack)).toBe(3)
})

test('pipe', () => {
  expect(parse('x + 1 |> + 1').evalute(stack)).toBe(3)
  expect(parse('x + 1 |> suffix 1').evalute(stack)).toBe('21')
  expect(parse('suffix(3, x |> suffix 2)').evalute(stack)).toBe('123')
})
import { Stack } from '../src/utils/stack'
import { AdvancedStack } from '../src/utils/advanced-stack'

const builtin = (name: string): any => {
  if (name === 'builtin') return 'builtin value'
}

test('builtin', () => {
  const stack = new Stack(builtin)
  stack.push([['builtin', 'overwrite value']])
  expect(stack.get('builtin')).toEqual('builtin value')
})

test('undefined', () => {
  const stack = new Stack(builtin)
  expect(stack.get('x')).toBeUndefined()
})

test('push', () => {
  const stack = new Stack(builtin)
  stack.push([['x', 'value']])
  expect(stack.get('x')).toEqual('value')
})

test('overwrite', () => {
  const stack = new Stack(builtin)
  stack.push([['x', 'value']])
  stack.push([['x', 'overwrite value']])
  expect(stack.get('x')).toEqual('overwrite value')
})

test('pop', () => {
  const stack = new Stack(builtin)
  stack.push([['x', 'value']])
  stack.push([['x', 'overwrite value']])
  stack.pop()
  expect(stack.get('x')).toEqual('value')
})

test('add', () => {
  const stack = new Stack(builtin)
  stack.push([['x', 'value']])
  stack.add(['x', 'overwrite value'])
  expect(stack.get('x')).toEqual('overwrite value')
})

test('add pop', () => {
  const stack = new Stack(builtin)
  stack.push([['x', 'value']])
  stack.add(['x', 'overwrite value'])
  stack.pop()
  expect(stack.get('x')).toBeUndefined()
})

test('clone', () => {
  const stack = new Stack(builtin)
  stack.push([['x', 'value']])
  expect(stack.clone().get('x')).toEqual('value')
})

test('advanced builtin', () => {
  const stack = new AdvancedStack(builtin)
  expect(stack.get('builtin')).toEqual('builtin value')
})

test('advanced undefined', () => {
  const stack = new AdvancedStack(builtin)
  expect(stack.get('x')).toBeUndefined()
})

test('advanced push', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  expect(stack.get('x')).toEqual('value')
})

test('advanced overwrite', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  stack.push([['x', 'overwrite value']])
  expect(stack.get('x')).toEqual('overwrite value')
})

test('advanced pop', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  stack.push([['x', 'overwrite value']])
  stack.pop()
  expect(stack.get('x')).toEqual('value')
})

test('advanced add', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  stack.add(['x', 'overwrite value'])
  expect(stack.get('x')).toEqual('overwrite value')
})

test('advanced add pop', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  stack.add(['x', 'overwrite value'])
  stack.pop()
  expect(stack.get('x')).toBeUndefined()
})

test('advanced clone', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  expect(stack.clone().get('x')).toEqual('value')
})

test('advanced push defaults', () => {
  const stack = new AdvancedStack(builtin)
  stack.pushDefaults([['x', 'default value']])
  expect(stack.get('x')).toEqual('default value')
})

test('advanced push and push defaults', () => {
  const stack = new AdvancedStack(builtin)
  stack.push([['x', 'value']])
  stack.pushDefaults([['x', 'default value']])
  expect(stack.get('x')).toEqual('value')
})

test('advanced pop defaults', () => {
  const stack = new AdvancedStack(builtin)
  stack.pushDefaults([['x', 'default value']])
  stack.popDefaults()
  expect(stack.get('x')).toBeUndefined()
})
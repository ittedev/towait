import fs from 'fs'
import { titan } from '../src'

test('if', () => {
  const src = fs.readFileSync('./test/files/titan/if.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/if.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: true }
  expect(titan.render(src, data)).toEqual(dest)
})

test('if in', () => {
  const src = fs.readFileSync('./test/files/titan/ifin.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/ifin.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'b', y: 'c', a: ['a', 'b'] }
  expect(titan.render(src, data)).toEqual(dest)
})

test('else', () => {
  const src = fs.readFileSync('./test/files/titan/else.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/else.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: false }
  expect(titan.render(src, data)).toEqual(dest)
})

test('for', () => {
  const src = fs.readFileSync('./test/files/titan/for.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/for.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: ['First', 'Second'] }
  expect(titan.render(src, data)).toEqual(dest)
})

test('for index', () => {
  const src = fs.readFileSync('./test/files/titan/forindex.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/forindex.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: ['First', 'Second'] }
  expect(titan.render(src, data)).toEqual(dest)
})

test('for key', () => {
  const src = fs.readFileSync('./test/files/titan/forkey.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/forkey.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: { first: 1, second: 2 } }
  expect(titan.render(src, data)).toEqual(dest)
})

test('switch', () => {
  const src = fs.readFileSync('./test/files/titan/switch.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/switch.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'Second' }
  expect(titan.render(src, data)).toEqual(dest)
})

test('default', () => {
  const src = fs.readFileSync('./test/files/titan/default.titan').toString()
  const dest = fs.readFileSync('./test/files/titan/default.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'Third' }
  expect(titan.render(src, data)).toEqual(dest)
})
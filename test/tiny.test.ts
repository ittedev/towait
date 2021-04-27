import fs from 'fs'
import { tiny } from '../src'

test('plain', () => {
  const src = fs.readFileSync('./test/files/tiny/plain.tiny').toString()
  const dest = fs.readFileSync('./test/files/tiny/plain.txt').toString().replace(/\r\n/g, '\n')
  const data = {}
  expect(tiny.render(src, data)).toEqual(dest)
})

test('inline', () => {
  const src = fs.readFileSync('./test/files/tiny/inline.tiny').toString()
  const dest = fs.readFileSync('./test/files/tiny/inline.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'Second' }
  expect(tiny.render(src, data)).toEqual(dest)
})

test('line', () => {
  const src = fs.readFileSync('./test/files/tiny/line.tiny').toString()
  const dest = fs.readFileSync('./test/files/tiny/line.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'Second Line' }
  expect(tiny.render(src, data)).toEqual(dest)
})

test('multiline', () => {
  const src = fs.readFileSync('./test/files/tiny/multiline.tiny').toString()
  const dest = fs.readFileSync('./test/files/tiny/multiline.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'Second Line\nThird Line' }
  expect(tiny.render(src, data)).toEqual(dest)
})

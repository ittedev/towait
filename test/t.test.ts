import fs from 'fs'
import { t } from '../src'

test('plain', () => {
  const src = fs.readFileSync('./test/files/t/plain.t').toString()
  const dest = fs.readFileSync('./test/files/t/plain.txt').toString().replace(/\r\n/g, '\n')
  const data = {}
  expect(t(src, data)).toEqual(dest)
})

test('inline', () => {
  const src = fs.readFileSync('./test/files/t/inline.t').toString()
  const dest = fs.readFileSync('./test/files/t/inline.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 'Second' }
  expect(t(src, data)).toEqual(dest)
})

test('hash', () => {
  const src = fs.readFileSync('./test/files/t/hash.t').toString()
  const dest = fs.readFileSync('./test/files/t/hash.txt').toString().replace(/\r\n/g, '\n')
  const data = {
    x: { x: { x: 'Second' } }
  }
  expect(t(src, data)).toEqual(dest)
})

test('pipe', () => {
  const src = fs.readFileSync('./test/files/t/pipe.t').toString()
  const dest = fs.readFileSync('./test/files/t/pipe.txt').toString().replace(/\r\n/g, '\n')
  const data = {
    x: 1,
    add: x => x + 1,
    count: x => x + 'nd'
  }
  expect(t(src, data)).toEqual(dest)
})

test('hashpipe', () => {
  const src = fs.readFileSync('./test/files/t/hashpipe.t').toString()
  const dest = fs.readFileSync('./test/files/t/hashpipe.txt').toString().replace(/\r\n/g, '\n')
  const data = {
    x: { x: 1 },
    add: x => x + 1,
    count: x => x + 'nd'
  }
  expect(t(src, data)).toEqual(dest)
})


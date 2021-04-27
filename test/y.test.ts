import fs from 'fs'
import { y } from '../src'

test('onoff', () => {
  const src = fs.readFileSync('./test/files/y/onoff.y').toString()
  const dest = fs.readFileSync('./test/files/y/onoff.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

test('number', () => {
  const src = fs.readFileSync('./test/files/y/number.y').toString()
  const dest = fs.readFileSync('./test/files/y/number.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

test('string', () => {
  const src = fs.readFileSync('./test/files/y/string.y').toString()
  const dest = fs.readFileSync('./test/files/y/string.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

test('object', () => {
  const src = fs.readFileSync('./test/files/y/object.y').toString()
  const dest = fs.readFileSync('./test/files/y/object.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

test('array', () => {
  const src = fs.readFileSync('./test/files/y/array.y').toString()
  const dest = fs.readFileSync('./test/files/y/array.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

test('nest', () => {
  const src = fs.readFileSync('./test/files/y/nest.y').toString()
  const dest = fs.readFileSync('./test/files/y/nest.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

test('nest', () => {
  const src = fs.readFileSync('./test/files/y/comment.y').toString()
  const dest = fs.readFileSync('./test/files/y/comment.json').toString()
  expect(y(src)).toEqual(JSON.parse(dest))
})

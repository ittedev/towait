import fs from 'fs'
import { towait } from '../src'

test('titan', () => {
  const src = fs.readFileSync('./test/files/towait/titan.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/titan.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: true }
  expect(towait.render(src, data)).toEqual(dest)
})

test('render', () => {
  const src = fs.readFileSync('./test/files/towait/render.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/render.txt').toString().replace(/\r\n/g, '\n')
  expect(towait.render(src, {})).toEqual(dest)
})

test('overwrite', () => {
  const src = fs.readFileSync('./test/files/towait/overwrite.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/overwrite.txt').toString().replace(/\r\n/g, '\n')
  const data = { x: 2 }
  expect(towait.render(src, data)).toEqual(dest)
})

test('read only', () => {
  const src = fs.readFileSync('./test/files/towait/readonly.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/readonly.json').toString()
  expect(towait.read(src)).toEqual(JSON.parse(dest))
})

test('read', () => {
  const src = fs.readFileSync('./test/files/towait/read.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/read.json').toString()
  expect(towait.read(src, {})).toEqual(JSON.parse(dest))
})

test('render from file', () => {
  const src = './test/files/towait/render.tw'
  const dest = fs.readFileSync('./test/files/towait/render.txt').toString().replace(/\r\n/g, '\n')
  expect(towait.renderFromFile(src, {})).toEqual(dest)
})

test('read from file', () => {
  const src = './test/files/towait/read.tw'
  const dest = fs.readFileSync('./test/files/towait/read.json').toString()
  expect(towait.readFromFile(src, {})).toEqual(JSON.parse(dest))
})

test('multi', () => {
  const src = fs.readFileSync('./test/files/towait/multi.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/multi.json').toString()
  expect(towait.read(src, {})).toEqual(JSON.parse(dest))
})

test('include', () => {
  const src = fs.readFileSync('./test/files/towait/include.tw').toString()
  const dest = fs.readFileSync('./test/files/towait/include.txt').toString().replace(/\r\n/g, '\n')
  expect(towait.render(src, {})).toEqual(dest)
})
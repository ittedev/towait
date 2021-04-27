import { cast } from '../src/parser/utils/cast'
import { nextIs } from '../src/parser/utils/next-is'
import { nextIsJoin } from '../src/parser/utils/next-is-join'
import { nextIsTerm } from '../src/parser/utils/next-is-term'
import { must } from '../src/parser/utils/must'
import { pipein } from '../src/parser/utils/pipein'
import { TokenType } from '../src/struct/token'
import { LiteralNode as LN } from '../src/nodes/literal'
import { EvaluationNode as EN } from '../src/nodes/evaluation'
import { VariableNode as VN } from '../src/nodes/variable'


test('to literal', () => {
  expect(cast({ type: TokenType.undefined, value: 'undefined' })).toBe(undefined)
  expect(cast({ type: TokenType.null, value: 'null' })).toBe(null)
  expect(cast({ type: TokenType.boolean, value: 'true' })).toBe(true)
  expect(cast({ type: TokenType.boolean, value: 'false' })).toBe(false)
})

test('cast number', () => {
  expect(cast({ type: TokenType.number, value: '0' })).toBe(0)
  expect(cast({ type: TokenType.number, value: '00' })).toBe(0)
  expect(cast({ type: TokenType.number, value: '1' })).toBe(1)
  expect(cast({ type: TokenType.number, value: '01' })).toBe(1)
  expect(cast({ type: TokenType.number, value: '10' })).toBe(10)
})

test('cast string', () => {
  expect(cast({ type: TokenType.string, value: '\'\'' })).toBe('')
  expect(cast({ type: TokenType.string, value: '""' })).toBe('')
  expect(cast({ type: TokenType.string, value: '\'x\'' })).toBe('x')
  expect(cast({ type: TokenType.string, value: '"x"' })).toBe('x')
  expect(cast({ type: TokenType.string, value: '\'\\\'\'' })).toBe('\'')
  expect(cast({ type: TokenType.string, value: '"\\""' })).toBe('"')
  expect(cast({ type: TokenType.string, value: '\'x\\\'x\'' })).toBe('x\'x')
  expect(cast({ type: TokenType.string, value: '"x\\"x"' })).toBe('x"x')
})

test('nextIs', () => {
  expect(nextIs([], TokenType.dot)).toBeFalsy()
  expect(nextIs([{ type: TokenType.dot, value: '.' }], TokenType.dot)).toBeTruthy()
  expect(nextIs([{ type: TokenType.dot, value: '.' }], TokenType.comma)).toBeFalsy()
  expect(nextIs([{ type: TokenType.comma, value: '.' }], TokenType.dot)).toBeFalsy()
  expect(nextIs([{ type: TokenType.if, value: 'if' }], TokenType.if)).toBeTruthy()
})

test('nextIsTerm', () => {
  expect(nextIsTerm([])).toBe(false)
  expect(nextIsTerm([{ type: TokenType.word, value: 'x' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.leftRound, value: '(' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.leftSquare, value: '[' }])).toBe(false)
  expect(nextIsTerm([{ type: TokenType.exclamation, value: '!' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.operator, value: '-' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.operator, value: '+' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.operator, value: '/' }])).toBe(false)
  expect(nextIsTerm([{ type: TokenType.number, value: '0' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.string, value: '\'x\'' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.boolean, value: 'true' }])).toBe(true)
  expect(nextIsTerm([{ type: TokenType.if, value: 'if' }])).toBe(false)
})

test('nextIsJoin', () => {
  expect(nextIsJoin([])).toBe(false)
  expect(nextIsJoin([{ type: TokenType.block, value: 'block' }])).toBe(true)
  expect(nextIsJoin([{ type: TokenType.if, value: 'if' }])).toBe(true)
  expect(nextIsJoin([{ type: TokenType.for, value: 'for' }])).toBe(true)
  expect(nextIsJoin([{ type: TokenType.switch, value: 'switch' }])).toBe(true)
  expect(nextIsJoin([{ type: TokenType.else, value: 'else' }])).toBe(false)
  expect(nextIsJoin([{ type: TokenType.include, value: 'include' }])).toBe(true)
  expect(nextIsJoin([{ type: TokenType.word, value: 'x' }])).toBe(false)
  expect(nextIsJoin([{ type: TokenType.colon, value: ':' }])).toBe(true)
})


test('must', () => {
  expect(() => must({ type: TokenType.dot, value: '.' }, TokenType.dot))
  expect(() => must({ type: TokenType.dot, value: '.' }, TokenType.comma)).toThrow()
  expect(() => must({ type: TokenType.comma, value: ',' }, TokenType.dot)).toThrow()
  expect(() => must({ type: TokenType.if, value: 'if' }, TokenType.if))
})

// test('pipein', () => {
//   expect(pipein(new LN(1), new EN(new VN('x'), new EN(new VN('_')))
// })
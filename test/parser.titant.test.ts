import { parse } from '../src/titan/parse'
import { LiteralNode as LN } from '../src/nodes/literal'
import { VariableNode as VN } from '../src/nodes/variable'
import { EvaluationNode as EN } from '../src/nodes/evaluation'
import { IfNode as If } from '../src/nodes/if'
import { ForNode as For } from '../src/nodes/for'
import { SwitchNode as Switch } from '../src/nodes/switch'
import { CaseNode as Case } from '../src/nodes/case'
import { DefaultNode as Default } from '../src/nodes/default'
import { TitanNode } from '../src/nodes/titan'
import { ElseNode as Else } from '../src/nodes/else'
import { EndNode as End } from '../src/nodes/end'
import { LetNode as Let } from '../src/nodes/let'
import { VarNode as Var } from '../src/nodes/var'
import { BlockNode as Block } from '../src/nodes/block'

const x = new EN(new VN('x'))
const titan = new TitanNode()

test('block', () => {
  expect(parse('block')).toEqual(new Block(titan))
})

test('if', () => {
  expect(parse('if x')).toEqual(new If(titan, x))
  expect(parse('if x in x')).toEqual(new If(titan, x, x))
})

test('else', () => {
  expect(parse('else')).toEqual(new Else(titan))
})

test('end', () => {
  expect(parse('end')).toEqual(new End(undefined))
})

test('for', () => {
  expect(parse('for v in x')).toEqual(new For(titan, x, 'v'))
  expect(parse('for i,v in x')).toEqual(new For(titan, x, 'v', 'i'))
})

test('switch', () => {
  expect(parse('switch x')).toEqual(new Switch(titan, x))
})

test('case', () => {
  expect(parse('case x')).toEqual(new Case(titan, [x]))
})

test('multi case', () => {
  expect(parse('case x, x')).toEqual(new Case(titan, [x, x]))
})

test('default', () => {
  expect(parse('default')).toEqual(new Default(titan))
})


test('let', () => {
  expect(parse('let y = x')).toEqual(new Let('y', x))
})

test('var', () => {
  expect(parse('var y = x')).toEqual(new Var('y', x))
})

test('if block', () => {
  expect(parse('if x block')).toEqual(new If(new Block(titan), x))
})

test('if for', () => {
  expect(parse('if x for i,v in x')).toEqual(new If(new For(titan, x, 'v', 'i'), x))
})

test('if switch', () => {
  expect(parse('if x switch x')).toEqual(new If(new Switch(titan, x), x))
})

test('block if', () => {
  expect(parse('block if x')).toEqual(new Block(new If(titan, x)))
})

test('for if', () => {
  expect(parse('for i, v in x if x')).toEqual(new For(new If(titan, x), x, 'v', 'i'))
})

test('else if', () => {
  expect(parse('else if x')).toEqual(new Else(new If(titan, x)))
})

test('case if', () => {
  expect(parse('case x if x')).toEqual(new Case(new If(titan, x), [x]))
})

test('default if', () => {
  expect(parse('default if x')).toEqual(new Default(new If(titan, x)))
})

test('triple if', () => {
  expect(parse('if x if x if x')).toEqual(new If(new If(new If(titan, x), x), x))
})

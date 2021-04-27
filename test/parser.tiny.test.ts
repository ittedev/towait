import { parse } from '../src/tiny/parse'
import { LiteralNode as LN } from '../src/nodes/literal'
import { VariableNode as VN } from '../src/nodes/variable'
import { EvaluationNode as EN } from '../src/nodes/evaluation'


test('empty', () => {
  expect(parse('')).toEqual(new LN(''))
})

test('W', () => {
  expect(parse('x')).toEqual(new EN(new VN('x')))
})

test('L', () => {
  expect(parse('0')).toEqual(new LN(0))
  expect(parse('\'\'')).toEqual(new LN(''))
})

test('E', () => {
  expect(parse('10 + 3')).toEqual(new EN(new VN('+'), [new LN(3), new LN(10)]))
  expect(parse('-10 - -3')).toEqual(new EN(new VN('-'), [new EN(new VN('-'), [new LN(3)]), new EN(new VN('-'), [new LN(10)])]))
  expect(parse('+10 + +3')).toEqual(new EN(new VN('+'), [new EN(new VN('+'), [new LN(3)]), new EN(new VN('+'), [new LN(10)])]))
  expect(parse('10 + 3 * 2')).toEqual(new EN(new VN('+'), [new EN(new VN('*'), [new LN(2), new LN(3)]), new LN(10)]))
  expect(parse('10 * 3 + 2')).toEqual(new EN(new VN('+'), [new LN(2), new EN(new VN('*'), [new LN(3), new LN(10)])]))
  expect(parse('10 * (3 + 2)')).toEqual(new EN(new VN('*'), [new EN(new VN('+'), [new LN(2), new LN(3)]), new LN(10)]))
  expect(parse('10 < 3')).toEqual(new EN(new VN('<'), [new LN(3), new LN(10)]))
  expect(parse('!(10 < 3)')).toEqual(new EN(new VN('!'), [new EN(new VN('<'), [new LN(3), new LN(10)])]))
  expect(parse('10 !== 3')).toEqual(new EN(new VN('!=='), [new LN(3), new LN(10)]))
  expect(parse('0 == !3')).toEqual(new EN(new VN('=='), [new EN(new VN('!'), [new LN(3)]), new LN(0)]))
  expect(parse('3 < 10 ? 10 - 3 : 10 + 3')).toEqual(new EN(new VN('?:'), [
    new EN(new VN('-'), [new LN(3), new LN(10)]),
    new EN(new VN('+'), [new LN(3), new LN(10)]),
    new EN(new VN('<'), [new LN(10), new LN(3)])
  ]))
  expect(parse('10 + (3 > 10 ? 10 - 3 : 10 + 3)')).toEqual(new EN(new VN('+'), [
    new EN(new VN('?:'), [
      new EN(new VN('-'), [new LN(3), new LN(10)]),
      new EN(new VN('+'), [new LN(3), new LN(10)]),
      new EN(new VN('>'), [new LN(10), new LN(3)])
    ]),
    new LN(10)
  ]))
  expect(parse('3 < 10 ? 10 - 3 ? 10 : 3 : 10 + 3')).toEqual(
    new EN(new VN('?:'), [
      new EN(new VN('?:'), [
        new LN(10),
        new LN(3),
        new EN(new VN('-'), [new LN(3), new LN(10)])
      ]),
      new EN(new VN('+'), [new LN(3), new LN(10)]),
      new EN(new VN('<'), [new LN(10), new LN(3)])
    ])
  )
  expect(parse('true ? false : true ? \'x\' : \'y\'')).toEqual(
    new EN(new VN('?:'), [
      new LN('x'),
      new LN('y'),
      new EN(new VN('?:'), [
        new LN(false),
        new LN(true),
        new LN(true)
      ])
    ])
  )
})

test('W(E*)', () => {
  expect(parse('o(x,1+2)')).toEqual(new EN(new VN('o'), [new EN(new VN('x')), new EN(new VN('+'), [new LN(2), new LN(1)]) ]))
})

test('W[E] W.W', () => {
  expect(parse('item[0]')).toEqual(new EN(new VN('.'), [new LN(0), new VN('item')]))
  expect(parse('item[index]')).toEqual(new EN(new VN('.'), [new EN(new VN('index')), new VN('item')]))
})

test('W[E][E] W.W.W', () => {
  expect(parse('item[0][1]')).toEqual(new EN(new VN('.'), [new LN(1), new EN(new VN('.'), [new LN(0), new VN('item')])]))
  expect(parse('item.name1.name2')).toEqual(new EN(new VN('.'), [new LN('name2'), new EN(new VN('.'), [new LN('name1'), new VN('item')])]))
  expect(parse('item[0].name')).toEqual(new EN(new VN('.'), [new LN('name'), new EN(new VN('.'), [new LN(0), new VN('item')])]))
  expect(parse('item.name[0]')).toEqual(new EN(new VN('.'), [new LN(0), new EN(new VN('.'), [new LN('name'), new VN('item')])]))
})

test('|>', () => {
  expect(parse('z |> x')).toEqual(new EN(new VN('x'), [new EN(new VN('z'))]))
  expect(parse('z |> x 1')).toEqual(new EN(new VN('x'), [new LN(1), new EN(new VN('z'))]))
  expect(parse('z |> x 1 y')).toEqual(new EN(new VN('x'), [new LN(1), new EN(new VN('y')), new EN(new VN('z'))]))
  expect(parse('z |> x _')).toEqual(new EN(new VN('x'), [new EN(new VN('z'))]))
  expect(parse('z |> x _ y')).toEqual(new EN(new VN('x'), [new EN(new VN('z')), new EN(new VN('y'))]))
  expect(parse('z |> x 1 _')).toEqual(new EN(new VN('x'), [new LN(1), new EN(new VN('z'))]))
  expect(parse('1 |> x |> y')).toEqual(new EN(new VN('y'), [new EN(new VN('x'), [new LN(1)])]))
  expect(parse('1 |> + 2 |> y')).toEqual(new EN(new VN('y'), [new EN(new VN('+'), [new LN(2), new LN(1)])]))
})
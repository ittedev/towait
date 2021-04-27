import { TokenType } from '../src/struct/token'
import { tokenize } from '../src/lexer/tokenize'

test('empty', () => {
  expect(tokenize('')).toEqual([])
})

test('literal only', () => {
  expect(tokenize('null undefined false true')).toEqual([
    { type: TokenType.null, value: 'null' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.undefined, value: 'undefined' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.boolean, value: 'false' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.boolean, value: 'true' },
  ])
})

test('number only', () => {
  expect(tokenize('0 1 10 01')).toEqual([
    { type: TokenType.number, value: '0' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '1' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '10' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '01' },
  ])
})

test('float only', () => {
  expect(tokenize('0.1 10.0 .01 0.')).toEqual([
    { type: TokenType.number, value: '0.1' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '10.0' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '.01' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '0.' },
  ])
})

test('string only', () => {
  expect(tokenize('"" \'\' "x" \'x\' "xx" \'xx\' "\'" \'"\'')).toEqual([
    { type: TokenType.string, value: '""' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '\'\'' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '"x"' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '\'x\'' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '"xx"' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '\'xx\'' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '"\'"' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.string, value: '\'"\'' },
  ])
})

test('word only', () => {
  expect(tokenize('x xx xxx x0 0x $ $0 _ _0')).toEqual([
    { type: TokenType.word, value: 'x' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: 'xx' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: 'xxx' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: 'x0' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.number, value: '0' },
    { type: TokenType.word, value: 'x' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: '$' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: '$0' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: '_' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: '_0' },
  ])
})

test('operator only', () => {
  expect(tokenize('+ - * / % ! == === != !== < > <= >= || &&')).toEqual([
    { type: TokenType.operator, value: '+' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '-' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '*' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '/' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '%' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.exclamation, value: '!' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '==' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '===' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '!=' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '!==' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '<' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '>' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '<=' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '>=' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '||' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.operator, value: '&&' }
  ])
})

test('keyword', () => {
  expect(tokenize('block if else for switch case default in end include let var')).toEqual([
    { type: TokenType.block, value: 'block' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.if, value: 'if' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.else, value: 'else' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.for, value: 'for' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.switch, value: 'switch' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.case, value: 'case' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.default, value: 'default' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.in, value: 'in' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.end, value: 'end' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.include, value: 'include' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.let, value: 'let' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.var, value: 'var' }
  ])
})

test('symbol only', () => {
  expect(tokenize('. [ ] |> ( ) : = ,')).toEqual([
    { type: TokenType.dot, value: '.' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.leftSquare, value: '[' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.rightSquare, value: ']' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.pipe, value: '|>' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.leftRound, value: '(' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.rightRound, value: ')' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.colon, value: ':' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.equal, value: '=' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.comma, value: ',' },
  ])
})

test('comment only', () => {
  expect(tokenize(', // if ,')).toEqual([
    { type: TokenType.comma, value: ',' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.comment, value: '// if ,' },
  ])
})

test('hash', () => {
  expect(tokenize('x.y x[y] x[0] x.0')).toEqual([
    { type: TokenType.word, value: 'x' },
    { type: TokenType.dot, value: '.' },
    { type: TokenType.word, value: 'y' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: 'x' },
    { type: TokenType.leftSquare, value: '[' },
    { type: TokenType.word, value: 'y' },
    { type: TokenType.rightSquare, value: ']' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: 'x' },
    { type: TokenType.leftSquare, value: '[' },
    { type: TokenType.number, value: '0' },
    { type: TokenType.rightSquare, value: ']' },
    { type: TokenType.space, value: ' ' },
    { type: TokenType.word, value: 'x' },
    { type: TokenType.number, value: '.0' },
  ])
})

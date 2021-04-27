import { joinBlock } from '../src/joiner/block'
import { joinTitan } from '../src/joiner/titan'
import { LiteralNode as LN } from '../src/nodes/literal'
import { VariableNode as VN } from '../src/nodes/variable'
import { EvaluationNode as EN } from '../src/nodes/evaluation'
import { StartSection } from '../src/sections/start'
import { IfNode as If } from '../src/nodes/if'
import { ForNode as For } from '../src/nodes/for'
import { TitanNode as Titan } from '../src/nodes/titan'
import { ElseNode as Else } from '../src/nodes/else'
import { EndNode as End } from '../src/nodes/end'
import { SwitchNode as Switch } from '../src/nodes/switch'
import { CaseNode as Case } from '../src/nodes/case'
import { DefaultNode as Default } from '../src/nodes/default'
import { LetNode as Let } from '../src/nodes/let'
import { VarNode as Var } from '../src/nodes/var'
import { BlockNode as Block } from '../src/nodes/block'
import { TinyNode as Tiny } from '../src/nodes/tiny'
import { TinySection } from '../src/sections/tiny'
import { EndSection } from '../src/sections/end'

const x = new EN(new VN('x'))
const titan = () => new Titan()

test('plane', () => {
  const sections = [
    new TinySection(new Tiny('x')),
  ]
  expect(joinTitan(sections.reverse())).toEqual(
    new Titan([
      new Tiny('x')
    ])
  )
})

test('if', () => {
  const sections = [
    new StartSection(new If(titan(), x)),
    new TinySection(new Tiny('')),
    new EndSection(new End(undefined)),
  ]
  expect(joinTitan(sections.reverse())).toEqual(
    new Titan([
      new If(
        new Titan([new Tiny('')]),
        x
      ),
    ])
  )
})

test('else', () => {
  const sections = [
    new StartSection(new If(titan(), x)),
    new TinySection(new Tiny('a')),
    new StartSection(new Else(titan())),
    new TinySection(new Tiny('b')),
    new EndSection(new End(undefined)),
  ]
  expect(joinTitan(sections.reverse())).toEqual(
    new Titan([
      new If(
        new Titan([new Tiny('a')]),
        x,
        undefined,
        new Else(
          new Titan([new Tiny('b')])
        ),
      ),
    ])
  )
})

test('wrap', () => {
  const sections = [
    new TinySection(new Tiny('a')),
    new StartSection(new If(titan(), x)),
    new TinySection(new Tiny('b')),
    new EndSection(new End(undefined)),
    new TinySection(new Tiny('c'))
  ]
  expect(joinTitan(sections.reverse())).toEqual(
    new Titan([
      new Tiny('a'),
      new If(
        new Titan([new Tiny('b')]),
        x
      ),
      new Tiny('c')
    ])
  )
})

test('for', () => {
  const sections = [
    new StartSection(new For(titan(), x, 'v')),
    new TinySection(new Tiny('')),
    new EndSection(new End(undefined)),
  ]
  expect(joinTitan(sections.reverse())).toEqual(
    new Titan([
      new For(
        new Titan([new Tiny('')]),
        x,
        'v'
      )
    ])
  )
})

test('switch', () => {
  const sections = [
    new StartSection(new Switch(titan(), x)),
    new TinySection(new Tiny('a')),
    new StartSection(new Case(titan(), [x])),
    new TinySection(new Tiny('b')),
    new StartSection(new Default(titan())),
    new TinySection(new Tiny('c')),
    new EndSection(new End(undefined)),
  ]
  expect(joinTitan(sections.reverse())).toEqual(
    new Titan([
      new Switch(
        new Titan([new Tiny('a')]),
        x,
        [new Case(new Titan([new Tiny('b')]), [x])],
        new Default(new Titan([new Tiny('c')]))
      )
    ])
  )
})

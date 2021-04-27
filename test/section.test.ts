import { joinBlock } from '../src/joiner/block'
import { joinTitan } from '../src/joiner/titan'
import { LiteralNode as LN } from '../src/nodes/literal'
import { VariableNode as VN } from '../src/nodes/variable'
import { EvaluationNode as EN } from '../src/nodes/evaluation'
import { StartSection, StartType } from '../src/sections/start'
import { IfNode as If } from '../src/nodes/if'
import { TitanNode as Titan } from '../src/nodes/titan'
import { ElseNode as Else } from '../src/nodes/else'
import { EndNode as End } from '../src/nodes/end'
import { LetNode as Let } from '../src/nodes/let'
import { VarNode as Var } from '../src/nodes/var'
import { BlockNode as Block } from '../src/nodes/block'
import { TinyNode as Tiny } from '../src/nodes/tiny'
import { TinySection } from '../src/sections/tiny'
import { EndSection } from '../src/sections/end'

const x = new EN(new VN('x'))
const titan = new Titan()

test('if', () => {
  const section = new StartSection(new If(x, titan))
  expect(section.startType).toEqual(StartType.start)
})

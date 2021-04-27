import fs from 'fs'
import path from 'path'
import { IL } from '../struct/il'
import { Node, NodeType } from '../struct/node'
import { NullNode } from '../nodes/null'
import { analyze } from './analyze'
import { Config } from '../struct/Config'

export class Includer {
  ilMap: Map<string, IL>
  config: Config
  nest: number
  constructor(config: Config) {
    this.config = config
    this.ilMap = new Map<string, IL>()
    this.nest = 0
  }
  include(fileName: string, nameOrIndex?: string | number): Node {
    const filePath = path.normalize(path.isAbsolute(fileName) ? fileName : path.join(this.config.root, fileName))
    if (this.nest < 100 || this.ilMap.has(filePath) || fs.existsSync(filePath)) {
      if (!this.ilMap.has(filePath)) {
        this.ilMap.set(filePath, analyze(fs.readFileSync(filePath).toString().replace(/\r\n/g, '\n'), this.config, this))
      }
      const il = this.ilMap.get(filePath)
      this.nest++
      const node = (() => {
        if (nameOrIndex) {
          switch (typeof nameOrIndex) {
            case 'string': return il.named[nameOrIndex][1]
            case 'number': return il.indexed[nameOrIndex][1]
          }
        } else return il.indexed[0][1]
      })()
      this.nest--
      return node
    } else return new NullNode()
  }
}

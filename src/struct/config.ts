import { Delimiter } from "./delimiter";
import { Objectification } from "./objectification";

export interface Config {
  root?: string
  delimiter?: Delimiter
  useEscape?: Boolean
  objectification?: Objectification
}
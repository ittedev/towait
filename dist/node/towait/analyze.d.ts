import { Includer } from './includer';
import { Config } from '../struct/config';
import { IL } from '../struct/il';
export declare const analyze: (text: string, config: Config, orIncluder?: Includer) => IL;

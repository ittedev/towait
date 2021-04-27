import { Node } from './node';
export declare type NodeSet = [string, Node?];
export interface IL {
    data: Object;
    indexed: Array<NodeSet>;
    named: {
        [prop: string]: NodeSet;
    };
}

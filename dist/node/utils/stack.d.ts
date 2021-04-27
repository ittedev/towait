export declare class Stack {
    builtin: (name: string) => any;
    data: Array<[string, any]>;
    dataLengths: Array<number>;
    constructor(builtin: (name: string) => any, data?: Array<[string, any]>, dataLengths?: Array<number>);
    push(data?: Array<[string, any]>): void;
    add(data: [string, any]): void;
    pop(): void;
    get(name: string): any;
    clone(): Stack;
}

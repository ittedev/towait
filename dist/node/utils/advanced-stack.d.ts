import { Stack } from './stack';
export declare class AdvancedStack extends Stack {
    defaults: Array<[string, any]>;
    defaultsLengths: Array<number>;
    constructor(builtin: (name: string) => any, data?: Array<[string, any]>, dataLengths?: Array<number>);
    pushDefaults(data: Array<[string, any]>): void;
    popDefaults(): void;
    get(name: string): any;
    clone(): AdvancedStack;
}

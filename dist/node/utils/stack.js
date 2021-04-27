"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor(builtin, data = [], dataLengths = [0]) {
        this.builtin = builtin;
        this.data = data;
        this.dataLengths = dataLengths;
    }
    push(data = []) {
        for (const datum of data) {
            this.data.push(datum);
        }
        this.dataLengths.push(data.length);
    }
    add(data) {
        this.data.push(data);
        this.dataLengths[this.dataLengths.length - 1]++;
    }
    pop() {
        let length = this.dataLengths.pop() || 0;
        while (length--)
            this.data.pop();
    }
    get(name) {
        const result = this.builtin(name);
        if (result)
            return result;
        else {
            for (let index = this.data.length - 1; index >= 0; index--) {
                if (this.data[index][0] === name)
                    return this.data[index][1];
            }
            return undefined;
        }
    }
    clone() {
        return new Stack(this.builtin, this.data.slice(), this.dataLengths.slice());
    }
}
exports.Stack = Stack;
//# sourceMappingURL=stack.js.map
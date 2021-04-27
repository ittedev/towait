"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedStack = void 0;
const stack_1 = require("./stack");
class AdvancedStack extends stack_1.Stack {
    constructor(builtin, data = [], dataLengths = [0]) {
        super(builtin, data, dataLengths);
        this.defaults = [];
        this.defaultsLengths = [];
    }
    pushDefaults(data) {
        for (const datum of data) {
            this.defaults.push(datum);
        }
        this.defaultsLengths.push(data.length);
    }
    popDefaults() {
        let length = this.defaultsLengths.pop() || 0;
        while (length--)
            this.defaults.pop();
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
            for (const data of this.defaults) {
                if (data[0] === name)
                    return data[1];
            }
            return undefined;
        }
    }
    clone() {
        return new AdvancedStack(this.builtin, this.data, this.dataLengths);
    }
}
exports.AdvancedStack = AdvancedStack;
//# sourceMappingURL=advanced-stack.js.map
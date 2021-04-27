"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchNode = void 0;
const block_1 = require("./block");
class SwitchNode extends block_1.BlockNode {
    constructor(node, value, cases = [], defaultNode) {
        super(node);
        this.type = 11 /* switch */;
        this.value = value;
        this.cases = cases;
        this.defaultNode = defaultNode;
    }
    trace(callback) {
        this.node = this.node.trace(callback);
        this.value = this.value.trace(callback);
        for (let index = this.cases.length - 1; index >= 0; index--) {
            this.cases[index] = this.cases[index].trace(callback);
        }
        if (this.defaultNode)
            this.defaultNode = this.defaultNode.trace(callback);
        return callback(this);
    }
    evalute(stack) {
        const target = this.value.evalute(stack);
        stack.push();
        let value = this.node.evalute(stack) || '';
        let isMatch = false;
        for (const caseNode of this.cases) {
            if (caseNode.values.some(value => value.evalute(stack) === target)) {
                value += (value ? '\n' : '') + caseNode.evalute(stack) || '';
                isMatch = true;
            }
        }
        if (!isMatch && this.defaultNode) {
            value += (value ? '\n' : '') + this.defaultNode.evalute(stack) || '';
        }
        stack.pop();
        return value;
    }
}
exports.SwitchNode = SwitchNode;
//# sourceMappingURL=switch.js.map
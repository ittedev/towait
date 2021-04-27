"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableNode = void 0;
class VariableNode {
    constructor(name) {
        this.type = 4 /* variable */;
        this._isTitantNode = true;
        this.name = name;
    }
    trace(callback) {
        return callback(this);
    }
    evalute(stack) {
        // console.log('//// stack ////\n', stack.data)
        return stack.get(this.name);
    }
}
exports.VariableNode = VariableNode;
//# sourceMappingURL=variable.js.map
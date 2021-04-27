"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralNode = void 0;
class LiteralNode {
    constructor(value) {
        this.type = 3 /* literal */;
        this._isTitantNode = true;
        this.value = value;
    }
    trace(callback) {
        return callback(this);
    }
    evalute(stack) {
        return this.value;
    }
}
exports.LiteralNode = LiteralNode;
//# sourceMappingURL=literal.js.map
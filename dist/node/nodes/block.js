"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockNode = void 0;
const isBlock_1 = require("./utils/isBlock");
class BlockNode {
    constructor(node) {
        this.type = 8 /* block */;
        this._isTitantNode = true;
        this.node = node;
    }
    trace(callback) {
        this.node = this.node.trace(callback);
        return callback(this);
    }
    find(callback) {
        return callback(this) ? this : isBlock_1.isBlock(this.node) ? this.node.find(callback) : undefined;
    }
    evalute(stack) {
        stack.push();
        const value = this.node.evalute(stack);
        stack.pop();
        return value;
    }
}
exports.BlockNode = BlockNode;
//# sourceMappingURL=block.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetNode = void 0;
const block_1 = require("./block");
class LetNode extends block_1.BlockNode {
    constructor(name, node) {
        super(node);
        this.type = 17 /* let */;
        this.name = name;
    }
    trace(callback) {
        this.node = this.node.trace(callback);
        return callback(this);
    }
    evalute(stack) {
        stack.add([this.name, this.node]);
        return '';
    }
}
exports.LetNode = LetNode;
//# sourceMappingURL=let.js.map
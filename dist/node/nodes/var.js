"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarNode = void 0;
const block_1 = require("./block");
class VarNode extends block_1.BlockNode {
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
        stack.add([this.name, this.node.evalute(stack)]);
        return '';
    }
}
exports.VarNode = VarNode;
//# sourceMappingURL=var.js.map
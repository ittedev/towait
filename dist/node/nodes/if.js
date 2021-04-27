"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfNode = void 0;
const block_1 = require("./block");
class IfNode extends block_1.BlockNode {
    constructor(node, condition, inNode, elseNode) {
        super(node);
        this.type = 9 /* if */;
        this.condition = condition;
        this.in = inNode;
        this.elseNode = elseNode;
    }
    trace(callback) {
        this.condition = this.condition.trace(callback);
        this.node = this.node.trace(callback);
        if (this.elseNode)
            this.elseNode = this.elseNode.trace(callback);
        return callback(this);
    }
    evalute(stack) {
        if (this.in ?
            (() => {
                const hash = this.in.evalute(stack);
                const value = this.condition.evalute(stack);
                return Array.isArray(hash) ? hash.includes(value) : value in hash;
            })() :
            this.condition.evalute(stack)) {
            stack.push();
            const value = this.node.evalute(stack);
            stack.pop();
            return value;
        }
        else if (this.elseNode) {
            return this.elseNode.evalute(stack);
        }
        else {
            return '';
        }
    }
}
exports.IfNode = IfNode;
//# sourceMappingURL=if.js.map
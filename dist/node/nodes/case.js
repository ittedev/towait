"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseNode = void 0;
const block_1 = require("./block");
class CaseNode extends block_1.BlockNode {
    constructor(node, values) {
        super(node);
        this.type = 12 /* case */;
        this.values = values;
    }
    trace(callback) {
        for (let index = this.values.length - 1; index >= 0; index--) {
            this.values[index] = this.values[index].trace(callback);
        }
        this.node = this.node.trace(callback);
        return callback(this);
    }
}
exports.CaseNode = CaseNode;
//# sourceMappingURL=case.js.map
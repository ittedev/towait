"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterNode = void 0;
require("./advanced-evaluation");
class FilterNode {
    constructor(node, params = []) {
        this.type = 7 /* filter */;
        this._isTitantNode = true;
        this.node = node;
        this.params = params;
    }
    trace(callback) {
        return callback(this);
    }
    evalute(stack) {
        return this.node.evalute(stack);
    }
}
exports.FilterNode = FilterNode;
//# sourceMappingURL=filter.js.map
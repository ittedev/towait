"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultsNode = void 0;
class DefaultsNode {
    constructor(node, data) {
        this.type = 19 /* defaults */;
        this._isTitantNode = true;
        this.node = node;
        this.data = data;
    }
    trace(callback) {
        this.node = this.node.trace(callback);
        return callback(this);
    }
    evalute(stack) {
        stack.pushDefaults(this.data);
        const value = this.node.evalute(stack);
        stack.popDefaults();
        return value;
    }
}
exports.DefaultsNode = DefaultsNode;
//# sourceMappingURL=defaults.js.map
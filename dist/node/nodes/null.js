"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullNode = void 0;
class NullNode {
    constructor() {
        this.type = 0 /* null */;
        this._isTitantNode = true;
    }
    trace(callback) {
        return callback(this);
    }
    evalute(stack) {
        return undefined;
    }
}
exports.NullNode = NullNode;
//# sourceMappingURL=null.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyNode = void 0;
class TinyNode {
    constructor(text) {
        this.type = 5 /* tiny */;
        this._isTitantNode = true;
        this.text = text;
    }
    trace(callback) {
        return callback(this);
    }
    evalute(stack) {
        return undefined;
    }
}
exports.TinyNode = TinyNode;
//# sourceMappingURL=tiny.js.map
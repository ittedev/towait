"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncludeNode = void 0;
class IncludeNode {
    constructor(fileName) {
        this.type = 18 /* include */;
        this._isTitantNode = true;
        this.fileName = fileName;
    }
    trace(callback) {
        return callback(this);
    }
    evalute(stack) {
        return undefined;
    }
}
exports.IncludeNode = IncludeNode;
//# sourceMappingURL=include.js.map
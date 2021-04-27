"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndNode = void 0;
class EndNode {
    constructor(pipe) {
        this.type = 15 /* end */;
        this._isTitantNode = true;
        this.pipe = pipe;
    }
    trace(callback) {
        if (this.pipe)
            this.pipe = callback(this.pipe);
        return callback(this);
    }
    evalute(stack) {
        return undefined;
    }
}
exports.EndNode = EndNode;
//# sourceMappingURL=end.js.map
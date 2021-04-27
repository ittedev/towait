"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitanNode = void 0;
const render_1 = require("../tiny/render");
class TitanNode {
    constructor(block = []) {
        this.type = 6 /* titan */;
        this._isTitantNode = true;
        this.block = block;
    }
    trace(callback) {
        (function traceBlock(block) {
            for (let index = block.length - 1; index >= 0; index--) {
                if (Array.isArray(block[index]))
                    traceBlock(block[index]);
                else if (typeof block[index] !== 'string')
                    block[index] = block[index].trace(callback);
            }
        })(this.block);
        return callback(this);
    }
    evalute(stack) {
        return render_1.render(this.block, stack);
    }
}
exports.TitanNode = TitanNode;
//# sourceMappingURL=titan.js.map
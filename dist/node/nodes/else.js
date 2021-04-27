"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElseNode = void 0;
const block_1 = require("./block");
class ElseNode extends block_1.BlockNode {
    constructor() {
        super(...arguments);
        this.type = 10 /* else */;
    }
}
exports.ElseNode = ElseNode;
//# sourceMappingURL=else.js.map
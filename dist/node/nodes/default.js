"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNode = void 0;
const block_1 = require("./block");
class DefaultNode extends block_1.BlockNode {
    constructor() {
        super(...arguments);
        this.type = 13 /* default */;
    }
}
exports.DefaultNode = DefaultNode;
//# sourceMappingURL=default.js.map
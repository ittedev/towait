"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condition = void 0;
const next_is_1 = require("./utils/next-is");
const arithmetic_1 = require("./arithmetic");
const branch_1 = require("./branch");
// C = AB*
const condition = (tokens) => {
    let node = arithmetic_1.arithmetic(tokens);
    while (next_is_1.nextIs(tokens, 9 /* question */)) {
        node = branch_1.branch(tokens, node);
    }
    return node;
};
exports.condition = condition;
//# sourceMappingURL=condition.js.map
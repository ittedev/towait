"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.right = void 0;
const if_1 = require("./if");
const for_1 = require("./for");
const switch_1 = require("./switch");
const block_1 = require("./block");
const include_1 = require("./include");
const expression_1 = require("./expression");
// <right> = <block> | <if> | <for> | <switch> | <include> | :E
const right = (tokens) => {
    const next = tokens[tokens.length - 1];
    switch (next.type) {
        case 16 /* if */: return if_1.ifFormula(tokens);
        case 18 /* for */: return for_1.forFormula(tokens);
        case 20 /* switch */: return switch_1.switchFormula(tokens);
        case 15 /* block */: return block_1.blockFormula(tokens);
        case 23 /* include */: return include_1.include(tokens);
        default: return expression_1.expression(tokens);
    }
};
exports.right = right;
//# sourceMappingURL=right.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = void 0;
const if_1 = require("./if");
const for_1 = require("./for");
const switch_1 = require("./switch");
const block_1 = require("./block");
const expression_1 = require("./expression");
const include_1 = require("./include");
const titan_1 = require("../nodes/titan");
// <join> = <block> | <if> | <for> | <switch> | <include> | :E
const join = (tokens) => {
    const next = tokens[tokens.length - 1];
    switch (next.type) {
        case 16 /* if */: return if_1.ifFormula(tokens);
        case 18 /* for */: return for_1.forFormula(tokens);
        case 20 /* switch */: return switch_1.switchFormula(tokens);
        case 15 /* block */: return block_1.blockFormula(tokens);
        case 23 /* include */: return include_1.include(tokens);
        case 10 /* colon */: {
            tokens.pop();
            return new titan_1.TitanNode([expression_1.expression(tokens)]);
        }
        default: return new titan_1.TitanNode();
    }
};
exports.join = join;
//# sourceMappingURL=join.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.letFormula = void 0;
const must_1 = require("./utils/must");
const let_1 = require("../nodes/let");
const filter_1 = require("../nodes/filter");
const right_1 = require("./right");
const next_is_1 = require("./utils/next-is");
// <let> = let W( W)* = <right>
const letFormula = (tokens) => {
    must_1.must(tokens.pop(), 24 /* let */);
    const name = tokens.pop().value;
    const params = [];
    while (next_is_1.nextIs(tokens, 30 /* word */))
        params.push(tokens.pop().value);
    must_1.must(tokens.pop(), 11 /* equal */);
    const node = right_1.right(tokens);
    return new let_1.LetNode(name, params.length ? new filter_1.FilterNode(node, params) : node);
};
exports.letFormula = letFormula;
//# sourceMappingURL=let.js.map
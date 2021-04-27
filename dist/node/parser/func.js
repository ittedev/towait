"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = void 0;
const next_is_1 = require("./utils/next-is");
const must_1 = require("./utils/must");
const evaluation_1 = require("../nodes/evaluation");
const expression_1 = require("./expression");
const hash_1 = require("./hash");
// F = W(E, ..E*)
const func = (tokens, node) => {
    must_1.must(tokens.pop(), 3 /* leftRound */);
    const params = [];
    while (!next_is_1.nextIs(tokens, 4 /* rightRound */)) {
        params.push(expression_1.expression(tokens));
        if (next_is_1.nextIs(tokens, 7 /* comma */))
            tokens.pop();
        else
            break;
    }
    must_1.must(tokens.pop(), 4 /* rightRound */);
    const result = new evaluation_1.EvaluationNode(node, params);
    if (next_is_1.nextIs(tokens, 0 /* dot */) || next_is_1.nextIs(tokens, 1 /* leftSquare */))
        return hash_1.hash(tokens, result);
    if (next_is_1.nextIs(tokens, 3 /* leftRound */))
        return exports.func(tokens, result);
    return result;
};
exports.func = func;
//# sourceMappingURL=func.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const next_is_1 = require("./utils/next-is");
const must_1 = require("./utils/must");
const variable_1 = require("../nodes/variable");
const literal_1 = require("../nodes/literal");
const evaluation_1 = require("../nodes/evaluation");
const expression_1 = require("./expression");
const func_1 = require("./func");
// H = w[E]* | w.w*
const hash = (tokens, node) => {
    const index = (() => {
        switch (tokens.pop().type) {
            case 0 /* dot */: {
                const symbol = tokens.pop();
                must_1.must(symbol, 30 /* word */);
                return new literal_1.LiteralNode(symbol.value);
            }
            case 1 /* leftSquare */: {
                const node = expression_1.expression(tokens);
                must_1.must(tokens.pop(), 2 /* rightSquare */);
                return node;
            }
        }
    })();
    const result = new evaluation_1.EvaluationNode(new variable_1.VariableNode('.'), [index, node]);
    if (next_is_1.nextIs(tokens, 0 /* dot */) || next_is_1.nextIs(tokens, 1 /* leftSquare */))
        return exports.hash(tokens, result);
    if (next_is_1.nextIs(tokens, 3 /* leftRound */))
        return func_1.func(tokens, result);
    return result;
};
exports.hash = hash;
//# sourceMappingURL=hash.js.map
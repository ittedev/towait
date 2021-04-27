"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.term = void 0;
const next_is_1 = require("./utils/next-is");
const must_1 = require("./utils/must");
const cast_1 = require("./utils/cast");
const evaluation_1 = require("../nodes/evaluation");
const variable_1 = require("../nodes/variable");
const literal_1 = require("../nodes/literal");
const expression_1 = require("./expression");
const hash_1 = require("./hash");
const func_1 = require("./func");
// T = w | H | F | L | oT | (E)
const term = (tokens) => {
    const token = tokens.pop();
    switch (token.type) {
        // w | H | F
        case 30 /* word */: {
            if (next_is_1.nextIs(tokens, 0 /* dot */) || next_is_1.nextIs(tokens, 1 /* leftSquare */))
                return hash_1.hash(tokens, new variable_1.VariableNode(token.value));
            else if (next_is_1.nextIs(tokens, 3 /* leftRound */))
                return func_1.func(tokens, new variable_1.VariableNode(token.value));
            else
                return new evaluation_1.EvaluationNode(new variable_1.VariableNode(token.value));
        }
        // L = n | s | b
        case 27 /* number */:
        case 28 /* string */:
        case 14 /* boolean */: return new literal_1.LiteralNode(cast_1.cast(token));
        // !T
        case 8 /* exclamation */: return new evaluation_1.EvaluationNode(new variable_1.VariableNode(token.value), [exports.term(tokens)]);
        // oT
        case 29 /* operator */: {
            switch (token.value) {
                case '-':
                case '+': return new evaluation_1.EvaluationNode(new variable_1.VariableNode(token.value), [exports.term(tokens)]);
                default: throw new Error();
            }
        }
        // (E)
        case 3 /* leftRound */: {
            const node = expression_1.expression(tokens);
            must_1.must(tokens.pop(), 4 /* rightRound */);
            return node;
        }
        default: throw new Error(JSON.stringify(token));
    }
};
exports.term = term;
//# sourceMappingURL=term.js.map
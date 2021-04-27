"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.branch = void 0;
const must_1 = require("./utils/must");
const evaluation_1 = require("../nodes/evaluation");
const expression_1 = require("./expression");
const arithmetic_1 = require("./arithmetic");
const variable_1 = require("../nodes/variable");
// B = ? E : A
const branch = (tokens, node) => {
    must_1.must(tokens.pop(), 9 /* question */);
    const params = [];
    params.push(expression_1.expression(tokens));
    must_1.must(tokens.pop(), 10 /* colon */);
    params.push(arithmetic_1.arithmetic(tokens));
    params.push(node);
    return new evaluation_1.EvaluationNode(new variable_1.VariableNode('?:'), params);
};
exports.branch = branch;
//# sourceMappingURL=branch.js.map
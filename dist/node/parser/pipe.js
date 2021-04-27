"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
const must_1 = require("./utils/must");
const next_is_1 = require("./utils/next-is");
const next_is_term_1 = require("./utils/next-is-term");
const variable_1 = require("../nodes/variable");
const evaluation_1 = require("../nodes/evaluation");
const term_1 = require("./term");
const pipein_1 = require("./utils/pipein");
// P = |> (O|!|T)T* P?
const pipe = (tokens) => {
    must_1.must(tokens.pop(), 5 /* pipe */);
    const node = (() => {
        if (next_is_1.nextIs(tokens, 29 /* operator */) || next_is_1.nextIs(tokens, 8 /* exclamation */) || next_is_1.nextIs(tokens, 30 /* word */))
            return new variable_1.VariableNode(tokens.pop().value);
        else if (next_is_term_1.nextIsTerm(tokens))
            return term_1.term(tokens);
        else
            throw new Error();
    })();
    const params = [];
    while (next_is_term_1.nextIsTerm(tokens))
        params.push(term_1.term(tokens));
    let used = false;
    const evaluation = (new evaluation_1.EvaluationNode(node, params)).trace((node) => {
        if (node.type === 4 /* variable */ && node.name === '_')
            used = true;
        return node;
    });
    if (!used)
        evaluation.params.push(new evaluation_1.EvaluationNode(new variable_1.VariableNode('_')));
    if (next_is_1.nextIs(tokens, 5 /* pipe */))
        return pipein_1.pipein(evaluation, exports.pipe(tokens));
    else
        return evaluation;
};
exports.pipe = pipe;
//# sourceMappingURL=pipe.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caseFormula = void 0;
const must_1 = require("./utils/must");
const next_is_join_1 = require("./utils/next-is-join");
const expression_1 = require("./expression");
const case_1 = require("../nodes/case");
const join_1 = require("./join");
const titan_1 = require("../nodes/titan");
const next_is_1 = require("./utils/next-is");
// <case> = case E(,E)* <join>?
const caseFormula = (tokens) => {
    must_1.must(tokens.pop(), 21 /* case */);
    const values = [expression_1.expression(tokens)];
    while (next_is_1.nextIs(tokens, 7 /* comma */)) {
        tokens.pop();
        values.push(expression_1.expression(tokens));
    }
    if (next_is_join_1.nextIsJoin(tokens))
        return new case_1.CaseNode(join_1.join(tokens), values);
    else
        return new case_1.CaseNode(new titan_1.TitanNode(), values);
};
exports.caseFormula = caseFormula;
//# sourceMappingURL=case.js.map
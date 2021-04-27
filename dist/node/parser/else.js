"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elseFormula = void 0;
const must_1 = require("./utils/must");
const next_is_join_1 = require("./utils/next-is-join");
const else_1 = require("../nodes/else");
const join_1 = require("./join");
const titan_1 = require("../nodes/titan");
// <else> = else <join>?
const elseFormula = (tokens) => {
    must_1.must(tokens.pop(), 17 /* else */);
    if (next_is_join_1.nextIsJoin(tokens))
        return new else_1.ElseNode(join_1.join(tokens));
    else
        return new else_1.ElseNode(new titan_1.TitanNode());
};
exports.elseFormula = elseFormula;
//# sourceMappingURL=else.js.map
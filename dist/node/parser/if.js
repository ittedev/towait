"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifFormula = void 0;
const must_1 = require("./utils/must");
const next_is_join_1 = require("./utils/next-is-join");
const expression_1 = require("./expression");
const if_1 = require("../nodes/if");
const join_1 = require("./join");
const titan_1 = require("../nodes/titan");
const next_is_1 = require("./utils/next-is");
// <if> = if E (in E) <join>?
const ifFormula = (tokens) => {
    must_1.must(tokens.pop(), 16 /* if */);
    const condition = expression_1.expression(tokens);
    const inNode = (() => {
        if (next_is_1.nextIs(tokens, 19 /* in */)) {
            tokens.pop();
            return expression_1.expression(tokens);
        }
        else
            return undefined;
    })();
    if (next_is_join_1.nextIsJoin(tokens))
        return new if_1.IfNode(join_1.join(tokens), condition, inNode);
    else
        return new if_1.IfNode(new titan_1.TitanNode(), condition, inNode);
};
exports.ifFormula = ifFormula;
//# sourceMappingURL=if.js.map
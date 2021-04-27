"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forFormula = void 0;
const must_1 = require("./utils/must");
const next_is_join_1 = require("./utils/next-is-join");
const expression_1 = require("./expression");
const for_1 = require("../nodes/for");
const next_is_1 = require("./utils/next-is");
const join_1 = require("./join");
const titan_1 = require("../nodes/titan");
// <for> = for W (,W)? in E <join>?
const forFormula = (tokens) => {
    must_1.must(tokens.pop(), 18 /* for */);
    const word = tokens.pop().value;
    const [vName, iName] = (() => {
        if (next_is_1.nextIs(tokens, 7 /* comma */)) {
            tokens.pop();
            if (next_is_1.nextIs(tokens, 30 /* word */))
                return [tokens.pop().value, word];
            else
                throw new Error();
        }
        else
            return [word, undefined];
    })();
    must_1.must(tokens.pop(), 19 /* in */);
    const hash = expression_1.expression(tokens);
    if (next_is_join_1.nextIsJoin(tokens))
        return new for_1.ForNode(join_1.join(tokens), hash, vName, iName);
    else
        return new for_1.ForNode(new titan_1.TitanNode(), hash, vName, iName);
};
exports.forFormula = forFormula;
//# sourceMappingURL=for.js.map
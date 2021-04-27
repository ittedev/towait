"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFormula = void 0;
const must_1 = require("./utils/must");
const next_is_join_1 = require("./utils/next-is-join");
const default_1 = require("../nodes/default");
const join_1 = require("./join");
const titan_1 = require("../nodes/titan");
// <default> = default <join>?
const defaultFormula = (tokens) => {
    must_1.must(tokens.pop(), 22 /* default */);
    if (next_is_join_1.nextIsJoin(tokens))
        return new default_1.DefaultNode(join_1.join(tokens));
    else
        return new default_1.DefaultNode(new titan_1.TitanNode());
};
exports.defaultFormula = defaultFormula;
//# sourceMappingURL=default.js.map
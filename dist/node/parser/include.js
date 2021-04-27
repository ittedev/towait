"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.include = void 0;
const must_1 = require("./utils/must");
const include_1 = require("../nodes/include");
const cast_1 = require("./utils/cast");
const next_is_1 = require("./utils/next-is");
// <include> = include s
const include = (tokens) => {
    must_1.must(tokens.pop(), 23 /* include */);
    next_is_1.nextIs(tokens, 28 /* string */);
    return new include_1.IncludeNode(cast_1.cast(tokens.pop()));
};
exports.include = include;
//# sourceMappingURL=include.js.map
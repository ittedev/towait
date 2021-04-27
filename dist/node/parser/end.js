"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = void 0;
const must_1 = require("./utils/must");
const end_1 = require("../nodes/end");
const next_is_1 = require("./utils/next-is");
const pipe_1 = require("./pipe");
// <end> = end P?
const end = (tokens) => {
    must_1.must(tokens.pop(), 26 /* end */);
    const node = next_is_1.nextIs(tokens, 5 /* pipe */) ? pipe_1.pipe(tokens) : undefined;
    return new end_1.EndNode(node);
};
exports.end = end;
//# sourceMappingURL=end.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockFormula = void 0;
const must_1 = require("./utils/must");
const next_is_join_1 = require("./utils/next-is-join");
const block_1 = require("../nodes/block");
const titan_1 = require("../nodes/titan");
const join_1 = require("./join");
// <block> = block
const blockFormula = (tokens) => {
    must_1.must(tokens.pop(), 15 /* block */);
    if (next_is_join_1.nextIsJoin(tokens))
        return new block_1.BlockNode(join_1.join(tokens));
    else
        return new block_1.BlockNode(new titan_1.TitanNode());
};
exports.blockFormula = blockFormula;
//# sourceMappingURL=block.js.map
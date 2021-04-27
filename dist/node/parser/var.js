"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varFormula = void 0;
const must_1 = require("./utils/must");
const var_1 = require("../nodes/var");
const right_1 = require("./right");
// <var> = var W = <right>
const varFormula = (tokens) => {
    must_1.must(tokens.pop(), 25 /* var */);
    const name = tokens.pop().value;
    must_1.must(tokens.pop(), 11 /* equal */);
    const node = right_1.right(tokens);
    return new var_1.VarNode(name, node);
};
exports.varFormula = varFormula;
//# sourceMappingURL=var.js.map
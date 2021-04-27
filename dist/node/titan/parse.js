"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const tokenize_1 = require("../lexer/tokenize");
const null_1 = require("../nodes/null");
const formula_1 = require("../parser/formula");
const parse = (text) => {
    const tokens = tokenize_1.tokenize(text).filter(token => token.type !== 31 /* space */).reverse();
    if (tokens.length === 0)
        return new null_1.NullNode();
    else
        return formula_1.formula(tokens);
};
exports.parse = parse;
//# sourceMappingURL=parse.js.map
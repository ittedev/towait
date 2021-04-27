"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const tokenize_1 = require("../lexer/tokenize");
const literal_1 = require("../nodes/literal");
const expression_1 = require("../parser/expression");
const parse = (text) => {
    const tokens = tokenize_1.tokenize(text).filter(token => token.type !== 31 /* space */).reverse();
    if (tokens.length === 0)
        return new literal_1.LiteralNode('');
    else
        return expression_1.expression(tokens);
};
exports.parse = parse;
//# sourceMappingURL=parse.js.map
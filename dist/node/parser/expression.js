"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expression = void 0;
const next_is_1 = require("./utils/next-is");
const condition_1 = require("./condition");
const pipe_1 = require("./pipe");
const pipein_1 = require("./utils/pipein");
// E = CP?
const expression = (tokens) => {
    const node = condition_1.condition(tokens);
    if (next_is_1.nextIs(tokens, 5 /* pipe */)) {
        return pipein_1.pipein(node, pipe_1.pipe(tokens));
    }
    else
        return node;
};
exports.expression = expression;
//# sourceMappingURL=expression.js.map
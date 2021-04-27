"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextIs = void 0;
const nextIs = (tokens, type) => {
    const next = tokens[tokens.length - 1];
    return next && next.type === type;
};
exports.nextIs = nextIs;
//# sourceMappingURL=next-is.js.map
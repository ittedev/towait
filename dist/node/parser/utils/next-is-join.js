"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextIsJoin = void 0;
const nextIsJoin = (tokens) => {
    const next = tokens[tokens.length - 1];
    if (next === undefined)
        return false;
    switch (next.type) {
        case 15 /* block */:
        case 16 /* if */:
        case 18 /* for */:
        case 20 /* switch */:
        case 23 /* include */:
        case 10 /* colon */: return true;
        default: return false;
    }
};
exports.nextIsJoin = nextIsJoin;
//# sourceMappingURL=next-is-join.js.map
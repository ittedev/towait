"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextIsTerm = void 0;
const nextIsTerm = (tokens) => {
    const next = tokens[tokens.length - 1];
    if (next === undefined)
        return false;
    switch (next.type) {
        case 30 /* word */:
        case 27 /* number */:
        case 28 /* string */:
        case 14 /* boolean */:
        case 3 /* leftRound */:
        case 8 /* exclamation */:
            return true;
        case 29 /* operator */:
            switch (next.value) {
                case '-':
                case '+': return true;
                default: return false;
            }
        default: return false;
    }
};
exports.nextIsTerm = nextIsTerm;
//# sourceMappingURL=next-is-term.js.map
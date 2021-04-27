"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = void 0;
const cast = (token) => {
    switch (token.type) {
        case 27 /* number */: return Number(token.value);
        case 13 /* undefined */: return undefined;
        case 12 /* null */: return null;
        case 14 /* boolean */: return token.value === 'true' ? true : false;
        case 28 /* string */:
            if (token.value[0] === '"')
                return token.value.slice(1, -1).replace('\\"', '"');
            else
                return token.value.slice(1, -1).replace('\\\'', '\'');
        default: throw new Error();
    }
};
exports.cast = cast;
//# sourceMappingURL=cast.js.map
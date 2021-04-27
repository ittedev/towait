"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.must = void 0;
const must = (token, type, message = '') => {
    if (!token || token.type !== type)
        throw new Error(message);
};
exports.must = must;
//# sourceMappingURL=must.js.map
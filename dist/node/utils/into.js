"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.into = void 0;
const into = (dest, src) => {
    for (const prop in dest) {
        if (prop in src) {
            if (typeof dest[prop] === typeof src[prop]) {
                if (typeof dest[prop] === 'object') {
                    exports.into(dest[prop], src[prop]);
                }
                else {
                    dest[prop] = src[prop];
                }
            }
            else {
                throw new Error(`A type is not match[${prop}]`);
            }
        }
    }
    return dest;
};
exports.into = into;
//# sourceMappingURL=into.js.map
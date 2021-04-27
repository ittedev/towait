"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = void 0;
const escape = (delimiter) => delimiter.replace(/[|{}.*+?()\[\]-^$\\]/g, '\\$&');
exports.escape = escape;
//# sourceMappingURL=delimiter.js.map
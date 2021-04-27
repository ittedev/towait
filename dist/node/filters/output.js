"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const output = (x) => typeof x === 'string' || typeof x === 'number' && Number.isFinite(x) ? '' + x : '';
exports.output = output;
//# sourceMappingURL=output.js.map
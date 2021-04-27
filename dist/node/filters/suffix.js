"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suffix = void 0;
const output_1 = require("./output");
const suffix = (x, y) => {
    const y2 = output_1.output(y);
    return y2 ? y2.split('\n').map(l => l + output_1.output(x)).join('\n') : '';
};
exports.suffix = suffix;
//# sourceMappingURL=suffix.js.map
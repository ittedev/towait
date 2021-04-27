"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = void 0;
const output_1 = require("./output");
const prefix = (x, y) => {
    const y2 = output_1.output(y);
    return y2 ? y2.split('\n').map(l => output_1.output(x) + l).join('\n') : '';
};
exports.prefix = prefix;
//# sourceMappingURL=prefix.js.map
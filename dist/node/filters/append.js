"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = void 0;
const output_1 = require("./output");
const append = (x, y) => {
    const y2 = output_1.output(y);
    return y2 ? y2 + output_1.output(x) : '';
};
exports.append = append;
//# sourceMappingURL=append.js.map
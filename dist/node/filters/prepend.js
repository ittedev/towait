"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepend = void 0;
const output_1 = require("./output");
const prepend = (x, y) => {
    const y2 = output_1.output(y);
    return y2 ? output_1.output(x) + y2 : '';
};
exports.prepend = prepend;
//# sourceMappingURL=prepend.js.map
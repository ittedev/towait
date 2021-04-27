"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = void 0;
const output_1 = require("./output");
const escapeRegex = /[<>&"'`]/g;
const escape = (x) => {
    const x2 = output_1.output(x);
    return !x2 ? x2 : x2.replace(escapeRegex, match => {
        switch (match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case '\'': return '&#39;';
            case '`': return '&#x60;';
        }
    });
};
exports.escape = escape;
//# sourceMappingURL=escape.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtin = void 0;
const operators_1 = require("../filters/operators");
const output_1 = require("../filters/output");
const escape_1 = require("../filters/escape");
const prefix_1 = require("../filters/prefix");
const suffix_1 = require("../filters/suffix");
const append_1 = require("../filters/append");
const prepend_1 = require("../filters/prepend");
const builtin = (name) => {
    switch (name) {
        case '.': return operators_1.dot;
        case '!': return operators_1.not;
        case '+': return operators_1.plus;
        case '-': return operators_1.minus;
        case '*': return operators_1.multi;
        case '/': return operators_1.div;
        case '%': return operators_1.mod;
        case '==': return operators_1.eq;
        case '===': return operators_1.seq;
        case '!=': return operators_1.ne;
        case '!==': return operators_1.sne;
        case '<': return operators_1.lt;
        case '>': return operators_1.gt;
        case '<=': return operators_1.le;
        case '>=': return operators_1.ge;
        case '||': return operators_1.or;
        case '&&': return operators_1.and;
        case '?:': return operators_1.cond;
        case 'output': return output_1.output;
        case 'escape': return escape_1.escape;
        case 'prefix': return prefix_1.prefix;
        case 'suffix': return suffix_1.suffix;
        // case 'affix': return affix
        case 'append': return append_1.append;
        case 'prepend': return prepend_1.prepend;
    }
};
exports.builtin = builtin;
//# sourceMappingURL=builtin.js.map
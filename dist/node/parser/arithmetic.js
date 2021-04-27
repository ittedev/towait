"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arithmetic = void 0;
const power_1 = require("./utils/power");
const next_is_1 = require("./utils/next-is");
const term_1 = require("./term");
const evaluation_1 = require("../nodes/evaluation");
const variable_1 = require("../nodes/variable");
// A = T(oT)*
const arithmetic = (tokens) => {
    const list = new Array();
    list.push(term_1.term(tokens));
    while (next_is_1.nextIs(tokens, 29 /* operator */)) {
        const next = tokens.pop();
        if (next.value !== '!') {
            list.push(next.value);
            list.push(term_1.term(tokens));
        }
        else
            break;
    }
    // 優先度解析
    while (list.length > 1) {
        for (let index = 0; index + 1 < list.length; index += 2) {
            if (index + 3 >= list.length || power_1.power(list[index + 1]) > power_1.power(list[index + 3])) {
                const node = new evaluation_1.EvaluationNode(new variable_1.VariableNode(list[index + 1]), [list[index + 2], list[index]]);
                list.splice(index, 3, node);
            }
        }
    }
    return typeof list[0] === 'string' ? new variable_1.VariableNode(list[0]) : list[0];
};
exports.arithmetic = arithmetic;
//# sourceMappingURL=arithmetic.js.map
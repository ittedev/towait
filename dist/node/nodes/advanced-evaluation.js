"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluation_1 = require("./evaluation");
evaluation_1.EvaluationNode.prototype.evalute = function (stack) {
    const variable = this.node.evalute(stack);
    switch (typeof variable) {
        case 'function': return variable(...this.params.map(node => node.evalute(stack)));
        case 'object':
            if (variable._isTitantNode) {
                if (variable.type === 'filter') {
                    const filter = variable;
                    stack.push(filter.params.map((value, index) => [value, this.params[index].evalute(stack)]));
                    const value = filter.evalute(stack);
                    stack.pop();
                    return value;
                }
                else
                    return variable.evalute(stack);
            }
        default: return variable;
    }
};
//# sourceMappingURL=advanced-evaluation.js.map
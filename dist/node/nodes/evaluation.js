"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationNode = void 0;
class EvaluationNode {
    constructor(node, params = []) {
        this.type = 2 /* evaluation */;
        this._isTitantNode = true;
        this.node = node;
        this.params = params;
    }
    trace(callback) {
        this.node = this.node.trace(callback);
        for (let index = this.params.length - 1; index >= 0; index--) {
            this.params[index] = this.params[index].trace(callback);
        }
        return callback(this);
    }
    evalute(stack) {
        const variable = this.node.evalute(stack);
        return typeof variable === 'function' ? variable(...this.params.map(node => node.evalute(stack))) : variable;
    }
}
exports.EvaluationNode = EvaluationNode;
//# sourceMappingURL=evaluation.js.map
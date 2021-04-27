"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForNode = void 0;
const block_1 = require("./block");
class ForNode extends block_1.BlockNode {
    constructor(node, hash, variableName, indexName) {
        super(node);
        this.type = 14 /* for */;
        this.hash = hash;
        this.variableName = variableName;
        this.indexName = indexName;
    }
    trace(callback) {
        this.hash = this.hash.trace(callback);
        this.node = this.node.trace(callback);
        return callback(this);
    }
    evalute(stack) {
        const hash = this.hash.evalute(stack);
        const entries = (() => {
            if (typeof hash === 'object') {
                if (Array.isArray(hash))
                    return [...hash.entries()];
                else
                    return Object.entries(hash);
            }
            else
                return [[0, hash]];
        })();
        let value = '';
        for (let index = 0; index < entries.length; index++) {
            const [key, variable] = entries[index];
            stack.push([[this.variableName, variable]]);
            if (this.indexName)
                stack.add([this.indexName, key]);
            const text = this.node.evalute(stack) || '';
            if (text)
                value += text + (index < entries.length - 1 ? '\n' : '');
            stack.pop();
        }
        return value;
    }
}
exports.ForNode = ForNode;
//# sourceMappingURL=for.js.map
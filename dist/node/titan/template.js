"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitanTemplate = void 0;
const compile_1 = require("./compile");
class TitanTemplate {
    constructor(titan, templateText) {
        this.titan = titan;
        this.templateText = templateText;
        this.node = null;
    }
    compile() {
        if (!this.node) {
            this.node = compile_1.compile(this.templateText.replace(/\r\n/g, '\n'), this.titan.useEscape, this.titan.delimiter);
        }
    }
    render(data = {}) {
        this.compile();
        const stack = this.titan.stack.clone();
        stack.push(Object.entries(data));
        const text = this.node.evalute(stack);
        stack.pop();
        return text;
    }
}
exports.TitanTemplate = TitanTemplate;
//# sourceMappingURL=template.js.map
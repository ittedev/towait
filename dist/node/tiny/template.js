"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyTemplate = void 0;
const compile_1 = require("./compile");
const render_1 = require("./render");
class TinyTemplate {
    constructor(tiny, templateText) {
        this.tiny = tiny;
        this.templateText = templateText;
        this.block = null;
    }
    compile() {
        if (!this.block) {
            this.block = compile_1.compile(this.templateText.replace(/\r\n/g, '\n'), this.tiny.useEscape, this.tiny.delimiter);
        }
    }
    render(data = {}) {
        this.compile();
        this.tiny.stack.push(Object.entries(data));
        const text = render_1.render(this.block, this.tiny.stack);
        this.tiny.stack.pop();
        return text;
    }
}
exports.TinyTemplate = TinyTemplate;
//# sourceMappingURL=template.js.map
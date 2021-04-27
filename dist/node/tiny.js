"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiny = exports.Tiny = void 0;
const stack_1 = require("./utils/stack");
const template_1 = require("./tiny/template");
const builtin_1 = require("./tiny/builtin");
class Tiny {
    constructor(useEscape = true, delimiter = {}, stack = new stack_1.Stack(builtin_1.builtin)) {
        this.stack = stack;
        this.useEscape = useEscape;
        this.delimiter = {
            line: delimiter.line || ':',
            open: delimiter.open || '{|',
            close: delimiter.close || '|}'
        };
    }
    render(templateText, data) {
        const renderer = new template_1.TinyTemplate(this, templateText);
        return renderer.render(data);
    }
    compile(templateText) {
        const template = new template_1.TinyTemplate(this, templateText);
        template.compile();
        return template;
    }
    let(x, y) {
        if (y) {
            this.stack.add([x, y]);
        }
        else {
            for (const [name, value] of Object.entries(x)) {
                this.stack.add([name, value]);
            }
        }
    }
}
exports.Tiny = Tiny;
exports.tiny = new Tiny();
//# sourceMappingURL=tiny.js.map
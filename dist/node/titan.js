"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titan = exports.Titan = void 0;
const tiny_1 = require("./tiny");
const template_1 = require("./titan/template");
const stack_1 = require("./utils/stack");
const builtin_1 = require("./titan/builtin");
class Titan extends tiny_1.Tiny {
    constructor(useEscape = true, delimiter = {}, stack = new stack_1.Stack(builtin_1.builtin)) {
        super(useEscape, delimiter, stack);
    }
    render(templateText, data) {
        const template = new template_1.TitanTemplate(this, templateText);
        return template.render(data);
    }
    compile(templateText) {
        const titan = new template_1.TitanTemplate(this, templateText);
        titan.compile();
        return titan;
    }
}
exports.Titan = Titan;
exports.titan = new Titan();
//# sourceMappingURL=titan.js.map
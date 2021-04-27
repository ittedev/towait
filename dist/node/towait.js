"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.towait = exports.Towait = void 0;
const fs_1 = __importDefault(require("fs"));
const template_1 = require("./towait/template");
const advanced_stack_1 = require("./utils/advanced-stack");
const builtin_1 = require("./titan/builtin");
const into_1 = require("./utils/into");
const y_1 = require("./y");
class Towait {
    constructor(config = {}, stack = new advanced_stack_1.AdvancedStack(builtin_1.builtin)) {
        this.stack = stack;
        this.config = into_1.into({
            root: process.cwd(),
            useEscape: true,
            delimiter: {
                line: ':',
                open: '{|',
                close: '|}'
            },
            objectification: y_1.y
        }, config);
    }
    render(templateText, data) {
        const template = new template_1.TowaitTemplate(this, templateText);
        return template.render(data);
    }
    read(templateText, data) {
        const template = new template_1.TowaitTemplate(this, templateText);
        return template.read(data);
    }
    compile(templateText) {
        const template = new template_1.TowaitTemplate(this, templateText);
        template.compile();
        return template;
    }
    renderFromFile(filepath, data) {
        const template = this.compileFromFile(filepath);
        return template.render(data);
    }
    readFromFile(filepath, data) {
        const template = this.compileFromFile(filepath);
        return template.read(data);
    }
    compileFromFile(filepath) {
        const text = fs_1.default.readFileSync(filepath).toString();
        return this.compile(text);
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
exports.Towait = Towait;
exports.towait = new Towait();
//# sourceMappingURL=towait.js.map
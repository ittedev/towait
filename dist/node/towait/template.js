"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowaitTemplate = void 0;
const v8_1 = require("v8");
const analyze_1 = require("./analyze");
class TowaitTemplate {
    constructor(towait, templateText) {
        this.towait = towait;
        this.templateText = templateText;
        this.il = null;
    }
    compile() {
        if (!this.il) {
            this.il = analyze_1.analyze(this.templateText.replace(/\r\n/g, '\n'), this.towait.config);
        }
    }
    read(data) {
        this.compile();
        const il = this.il;
        if (data) {
            const stack = this.towait.stack.clone();
            const value = v8_1.deserialize(v8_1.serialize(il.data));
            for (const name in il.named) {
                stack.push(Object.entries(data));
                value[name] = il.named[name][1].evalute(stack);
                stack.pop();
            }
            return value;
        }
        else
            return v8_1.deserialize(v8_1.serialize(il.data));
    }
    render(dataOrNameOrIndex, maybeContext) {
        this.compile();
        const il = this.il;
        const stack = this.towait.stack.clone();
        const [node, data] = (() => {
            switch (typeof dataOrNameOrIndex) {
                case 'object': return [il.indexed[0][1], dataOrNameOrIndex];
                case 'string': return [il.named[dataOrNameOrIndex][1], maybeContext || {}];
                case 'number': return [il.indexed[dataOrNameOrIndex][1], maybeContext || {}];
            }
        })();
        stack.pushDefaults(Object.entries(il.data));
        stack.push(Object.entries(data));
        const value = node.evalute(this.towait.stack);
        stack.pop();
        stack.popDefaults();
        return value;
    }
}
exports.TowaitTemplate = TowaitTemplate;
//# sourceMappingURL=template.js.map
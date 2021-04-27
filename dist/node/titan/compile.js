"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const split_1 = require("../spliter/split");
const titan_1 = require("../joiner/titan");
const compile_1 = require("../tiny/compile");
const titan_2 = require("../nodes/titan");
const compile = (text, useEscape, delimiter) => {
    const sections = split_1.split(text, delimiter);
    return titan_1.joinTitan(sections.reverse())
        .trace((node) => node.type === 5 /* tiny */ ? new titan_2.TitanNode(compile_1.compile(node.text, useEscape, delimiter)) : node); // expand tiny
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map
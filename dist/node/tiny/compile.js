"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.noLastLine = exports.lineout = void 0;
const delimiter_1 = require("../struct/delimiter");
const evaluation_1 = require("../nodes/evaluation");
const literal_1 = require("../nodes/literal");
const variable_1 = require("../nodes/variable");
const parse_1 = require("./parse");
const inlineout = (node, useEscape) => {
    return new evaluation_1.EvaluationNode(new variable_1.VariableNode(useEscape ? 'escape' : 'output'), [node]);
};
const lineout = (prefix, node, useEscape) => {
    const wrap1 = useEscape ? new evaluation_1.EvaluationNode(new variable_1.VariableNode('escape'), [node]) : node;
    const wrap2 = new evaluation_1.EvaluationNode(new variable_1.VariableNode('prefix'), [new literal_1.LiteralNode(prefix), wrap1]);
    return wrap2;
};
exports.lineout = lineout;
const noLastLine = (node) => {
    return new evaluation_1.EvaluationNode(new variable_1.VariableNode('append'), [new literal_1.LiteralNode('\n'), node]);
};
exports.noLastLine = noLastLine;
const compile = (text, useEscape, delimiter) => {
    const lineDelimiter = delimiter.line.length <= 1 ? `${delimiter_1.escape(delimiter.line)}{3,}` : delimiter_1.escape(delimiter.line);
    const openDelimiter = delimiter_1.escape(delimiter.open);
    const closeDelimiter = delimiter_1.escape(delimiter.close);
    const lineRegExp = new RegExp(`^(.*)(?<!\\\\)${lineDelimiter}(.*)$`);
    const lineEscapeRegExp = new RegExp(`\\\\(${lineDelimiter})(.*)`, 'g');
    const lineUnescape = (text) => text.replace(lineEscapeRegExp, '$1$2');
    const inlineRegExp = new RegExp(`(?<!\\\\)${openDelimiter}.*?(?<!\\\\)${closeDelimiter}`, 'g');
    const inlineGroupRegExp = new RegExp(`(?<!\\\\)${openDelimiter}(.*?)(?<!\\\\)${closeDelimiter}`, 'g');
    const inlineEscapeRegExp = new RegExp(`\\\\(${openDelimiter}|${closeDelimiter})`, 'g');
    const inlineUnescape = (text) => text.replace(inlineEscapeRegExp, '$1');
    const lines = text.split('\n');
    const preBlock = [];
    const buffer = [];
    // Line展開文で分割
    lines.forEach((line, index) => {
        const result = line.match(lineRegExp);
        if (result) {
            if (buffer.length) {
                preBlock.push(buffer.join('\n'));
                buffer.length = 0;
            }
            const node = exports.lineout(result[1], parse_1.parse(lineUnescape(result[2])), useEscape);
            preBlock.push(index < lines.length - 1 ? exports.noLastLine(node) : node);
        }
        else {
            buffer.push(lineUnescape(line));
        }
    });
    if (buffer.length)
        preBlock.push(buffer.join('\n'));
    return preBlock.map((preSection) => {
        if (typeof preSection === 'string') {
            // Block展開文で分割
            const stringParts = preSection.split(inlineRegExp);
            const nodeParts = [...preSection.matchAll(inlineGroupRegExp)];
            const section = [inlineUnescape(stringParts[0])];
            if (nodeParts) {
                for (let index = 0; index < nodeParts.length; index++) {
                    section.push(inlineout(parse_1.parse(inlineUnescape(nodeParts[index][1])), useEscape));
                    section.push(inlineUnescape(stringParts[index + 1]));
                }
            }
            return section;
        }
        else {
            return preSection;
        }
    });
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map
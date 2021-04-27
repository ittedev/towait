"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const tiny_1 = require("../sections/tiny");
const tiny_2 = require("../nodes/tiny");
const parse_1 = require("../titan/parse");
const isBlock_1 = require("../nodes/utils/isBlock");
const start_1 = require("../sections/start");
const line_1 = require("../sections/line");
const end_1 = require("../sections/end");
const delimiter_1 = require("../struct/delimiter");
const split = (text, delimiter) => {
    const lineDelimiter = delimiter.line.length < 2 ? `${delimiter_1.escape(delimiter.line)}{3,}` : delimiter_1.escape(delimiter.line);
    const lineRegExp = new RegExp(`^(.*?)(?<!\\\\)${lineDelimiter}\\s*(block|if|else|for|end|let|var|include|switch|case|default)(.*)$`);
    const lineEscapeRegExp = new RegExp(`\\\\(${lineDelimiter}\\s*)(block|if|else|for|end|let|var|include|switch|case|default)`, 'g');
    const lineUnescape = (text) => text.replace(lineEscapeRegExp, '$1$2');
    const sections = [];
    const buffer = [];
    for (const line of text.split('\n')) {
        const result = line.match(lineRegExp);
        if (result) {
            const formula = parse_1.parse(result[2] + lineUnescape(result[3]));
            if (formula.type === 0 /* null */)
                continue;
            if (buffer.length) {
                sections.push(new tiny_1.TinySection(new tiny_2.TinyNode(buffer.join('\n'))));
                buffer.length = 0;
            }
            if (isBlock_1.isBlock(formula))
                sections.push(new start_1.StartSection(formula));
            else if (formula.type === 15 /* end */)
                sections.push(new end_1.EndSection(formula));
            else
                sections.push(new line_1.LineSection(formula));
        }
        else {
            buffer.push(line);
        }
    }
    if (buffer.length) {
        sections.push(new tiny_1.TinySection(new tiny_2.TinyNode(buffer.join('\n'))));
    }
    return sections;
};
exports.split = split;
//# sourceMappingURL=split.js.map
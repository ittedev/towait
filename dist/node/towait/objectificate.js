"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectificate = void 0;
const separatorRegExp = /^\-\-\-.*$/;
const separatorNameRegExp = /^\-\-\-\s*([_\$a-zA-Z][_\$a-zA-Z0-9]*)?.*$/;
const objectificate = (text, objectification) => {
    const lines = text.split('\n');
    const parts = [];
    const separators = [];
    const buffer = [];
    for (const line of lines) {
        if (line.match(separatorRegExp)) {
            separators.push(line);
            parts.push(buffer.join('\n'));
            buffer.length = 0;
        }
        else
            buffer.push(line);
    }
    if (buffer.length)
        parts.push(buffer.join('\n'));
    const il = { data: {}, indexed: [], named: {} };
    if (parts.length === 1) {
        il.indexed.push([parts[0]]);
    }
    else if (parts.length > 1) {
        il.data = objectification(parts[0]);
        for (let index = 1; index < parts.length; index++) {
            const set = [parts[index]];
            il.indexed.push(set);
            const match = separators[index - 1].match(separatorNameRegExp);
            if (match)
                il.named[match[1]] = set;
        }
    }
    return il;
};
exports.objectificate = objectificate;
//# sourceMappingURL=objectificate.js.map
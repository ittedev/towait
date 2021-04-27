"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = void 0;
const includer_1 = require("./includer");
const objectificate_1 = require("./objectificate");
const compile_1 = require("../titan/compile");
const defaults_1 = require("../nodes/defaults");
const analyze = (text, config, orIncluder) => {
    const includer = orIncluder || new includer_1.Includer(config);
    const source = objectificate_1.objectificate(text, config.objectification);
    const data = Object.entries(source.data);
    for (const set of source.indexed) {
        set[1] = new defaults_1.DefaultsNode(compile_1.compile(set[0], config.useEscape, config.delimiter)
            .trace((node) => node.type === 18 /* include */ ? includer.include(node.fileName) : node) // expand include
        , data);
    }
    return source;
};
exports.analyze = analyze;
//# sourceMappingURL=analyze.js.map
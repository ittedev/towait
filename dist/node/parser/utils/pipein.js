"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipein = void 0;
const pipein = (node, pipe) => {
    return pipe.trace((current) => {
        return current.type === 2 /* evaluation */ && current.node.type === 4 /* variable */ && current.node.name === '_' ? node : current;
    });
};
exports.pipein = pipein;
//# sourceMappingURL=pipein.js.map
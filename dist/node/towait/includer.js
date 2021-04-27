"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Includer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const null_1 = require("../nodes/null");
const analyze_1 = require("./analyze");
class Includer {
    constructor(config) {
        this.config = config;
        this.ilMap = new Map();
        this.nest = 0;
    }
    include(fileName, nameOrIndex) {
        const filePath = path_1.default.normalize(path_1.default.isAbsolute(fileName) ? fileName : path_1.default.join(this.config.root, fileName));
        if (this.nest < 100 || this.ilMap.has(filePath) || fs_1.default.existsSync(filePath)) {
            if (!this.ilMap.has(filePath)) {
                this.ilMap.set(filePath, analyze_1.analyze(fs_1.default.readFileSync(filePath).toString().replace(/\r\n/g, '\n'), this.config, this));
            }
            const il = this.ilMap.get(filePath);
            this.nest++;
            const node = (() => {
                if (nameOrIndex) {
                    switch (typeof nameOrIndex) {
                        case 'string': return il.named[nameOrIndex][1];
                        case 'number': return il.indexed[nameOrIndex][1];
                    }
                }
                else
                    return il.indexed[0][1];
            })();
            this.nest--;
            return node;
        }
        else
            return new null_1.NullNode();
    }
}
exports.Includer = Includer;
//# sourceMappingURL=includer.js.map
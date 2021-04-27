"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
const t = (text, data) => text
    .replace(/\r/g, '').split(/\{\|(.*?)\|\}/g).reduce((result, text, index) => result + (index % 2 ? (() => {
    const tokens = [...text.matchAll(/(\$|\w)+|\|\>|\./g)].map(value => value[0]);
    const next = (token) => tokens[0] == token ? tokens.shift() : 0;
    const hash = (pre) => next('.') ? hash(pre[tokens.shift()]) : pre;
    const pipe = (pre) => next('|>') ? pipe(data[tokens.shift()](pre)) : pre;
    return pipe(hash(data[tokens.shift()]));
})() : text));
exports.t = t;
//# sourceMappingURL=t.js.map
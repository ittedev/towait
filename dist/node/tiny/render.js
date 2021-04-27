"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const render = (block, stack) => {
    return block.reduce((text, section, index) => {
        if (typeof section === 'string')
            return text + section; // text block
        else if (Array.isArray(section))
            return text + exports.render(section, stack) + (index < block.length - 1 ? '\n' : ''); // 
        else
            return text + section.evalute(stack) + (section.type === 6 /* titan */ && index < block.length - 1 ? '\n' : '');
    }, '');
};
exports.render = render;
//# sourceMappingURL=render.js.map
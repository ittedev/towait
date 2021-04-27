"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinBlock = void 0;
const start_1 = require("../sections/start");
const titan_1 = require("./titan");
const nextIs = (sections, type) => {
    if (!sections.length)
        return false;
    const section = sections[sections.length - 1];
    return section.type === 2 /* start */ && section.startType === type;
};
// [block] = [start] [titan] has(switch){([joint<case>.])* ([joint<default>.])?} has(if){[joint<else>.*]?} !is(start){[end]}
const joinBlock = (sections) => {
    const start = sections.pop();
    start.add(titan_1.joinTitan(sections));
    if (start.has(start_1.ComplexType.switch)) {
        while (nextIs(sections, start_1.StartType.case)) {
            start.add(exports.joinBlock(sections));
        }
        if (nextIs(sections, start_1.StartType.default)) {
            start.add(exports.joinBlock(sections));
        }
    }
    if (start.has(start_1.ComplexType.if)) {
        if (nextIs(sections, start_1.StartType.else)) {
            start.add(exports.joinBlock(sections));
        }
    }
    if (sections.length && start.startType === start_1.StartType.start) {
        const end = sections.pop();
        if (end.type === 3 /* end */) {
            start.add(end.node);
        }
        else
            throw new Error();
    }
    return start.node;
};
exports.joinBlock = joinBlock;
//# sourceMappingURL=block.js.map
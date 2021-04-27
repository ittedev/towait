"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinTitan = void 0;
const start_1 = require("../sections/start");
const titan_1 = require("../nodes/titan");
const block_1 = require("./block");
// [titan] = ([tiny] | [block] | [line])*
const joinTitan = (sections) => {
    const titan = new titan_1.TitanNode();
    loop: do {
        const next = sections[sections.length - 1];
        if (next) {
            switch (next.type) {
                case 0 /* tiny */:
                case 1 /* line */: {
                    titan.block.push(sections.pop().node);
                    break;
                }
                case 2 /* start */:
                    if (next.startType === start_1.StartType.start) {
                        titan.block.push(block_1.joinBlock(sections));
                        break;
                    }
                    else
                        break loop;
                case 3 /* end */: break loop;
            }
        }
        else
            break;
    } while (true);
    return titan;
};
exports.joinTitan = joinTitan;
// [titan] = ([tiny] | [block] | [line])*
// [block] = [start] [titan] has(switch){([joint<case>.])* ([joint<default>.])?} has(if){[joint<else>.*]?} !is(start){[end]}
//# sourceMappingURL=titan.js.map
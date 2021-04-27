"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchFormula = void 0;
const must_1 = require("./utils/must");
const expression_1 = require("./expression");
const switch_1 = require("../nodes/switch");
const titan_1 = require("../nodes/titan");
// <switch> = switch E
const switchFormula = (tokens) => {
    must_1.must(tokens.pop(), 20 /* switch */);
    return new switch_1.SwitchNode(new titan_1.TitanNode(), expression_1.expression(tokens));
};
exports.switchFormula = switchFormula;
//# sourceMappingURL=switch.js.map
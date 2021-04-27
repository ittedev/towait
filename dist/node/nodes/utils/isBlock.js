"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlock = void 0;
const isBlock = (node) => {
    switch (node.type) {
        case 8 /* block */:
        case 9 /* if */:
        case 10 /* else */:
        case 11 /* switch */:
        case 12 /* case */:
        case 13 /* default */:
        case 14 /* for */: return true;
        case 16 /* var */: return exports.isBlock(node.node);
        case 17 /* let */: return exports.isBlock(node.node);
        default: return false;
    }
};
exports.isBlock = isBlock;
//# sourceMappingURL=isBlock.js.map
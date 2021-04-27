"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartSection = exports.ComplexType = exports.StartType = void 0;
const pipein_1 = require("../parser/utils/pipein");
exports.StartType = {
    start: 2,
    else: 3,
    case: 4,
    default: 5
};
exports.ComplexType = {
    if: 1,
    for: 2,
    switch: 3,
};
class StartSection {
    constructor(node) {
        this.type = 2 /* start */;
        this.node = node;
    }
    get startType() {
        switch (this.node.type) {
            case 8 /* block */:
            case 9 /* if */:
            case 14 /* for */:
            case 17 /* let */:
            case 16 /* var */:
            case 11 /* switch */: return exports.StartType.start;
            case 10 /* else */: return exports.StartType.else;
            case 12 /* case */: return exports.StartType.case;
            case 13 /* default */: return exports.StartType.default;
        }
    }
    has(type) {
        const nodeType = (() => {
            switch (type) {
                case exports.ComplexType.if: return 9 /* if */;
                case exports.ComplexType.for: return 14 /* for */;
                case exports.ComplexType.switch: return 11 /* switch */;
            }
        })();
        return !!this.node.find((node) => node.type === nodeType);
    }
    add(node) {
        switch (node.type) {
            case 6 /* titan */: {
                const target = this.node.find((current) => current.node.type === 6 /* titan */).node;
                target.block = target.block.concat(node.block);
                break;
            }
            case 15 /* end */: {
                const end = node;
                if (end.pipe)
                    pipein_1.pipein(this.node.find((current) => current.node.type === 6 /* titan */), end.pipe);
                break;
            }
            case 13 /* default */: {
                const switchNode = this.node.find((node) => node.type === 11 /* switch */);
                if (switchNode && !switchNode.defaultNode)
                    switchNode.defaultNode = node;
                break;
            }
            case 12 /* case */: {
                const switchNode = this.node.find((node) => node.type === 11 /* switch */);
                switchNode.cases.push(node);
                break;
            }
            case 10 /* else */: {
                let ifNode = null;
                this.node.find((current) => {
                    if (current.type === 9 /* if */)
                        ifNode = current;
                    return false;
                });
                ifNode.elseNode = node;
                break;
            }
        }
    }
}
exports.StartSection = StartSection;
//# sourceMappingURL=start.js.map
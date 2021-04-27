"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formula = void 0;
const null_1 = require("../nodes/null");
const next_is_1 = require("./utils/next-is");
const include_1 = require("./include");
const if_1 = require("./if");
const for_1 = require("./for");
const switch_1 = require("./switch");
const block_1 = require("./block");
const end_1 = require("./end");
const let_1 = require("./let");
const var_1 = require("./var");
const else_1 = require("./else");
const case_1 = require("./case");
const default_1 = require("./default");
// <formula> = (<block> | <if> | <for> | <switch> | <end> | <let> | <var> | <include>)? <comment>?
const formula = (tokens) => {
    const node = (() => {
        const next = tokens[tokens.length - 1];
        if (next) {
            switch (next.type) {
                case 16 /* if */: return if_1.ifFormula(tokens);
                case 18 /* for */: return for_1.forFormula(tokens);
                case 20 /* switch */: return switch_1.switchFormula(tokens);
                case 15 /* block */: return block_1.blockFormula(tokens);
                case 17 /* else */: return else_1.elseFormula(tokens);
                case 24 /* let */: return let_1.letFormula(tokens);
                case 25 /* var */: return var_1.varFormula(tokens);
                case 21 /* case */: return case_1.caseFormula(tokens);
                case 22 /* default */: return default_1.defaultFormula(tokens);
                case 23 /* include */: return include_1.include(tokens);
                case 26 /* end */: return end_1.end(tokens);
                case 6 /* comment */: return new null_1.NullNode();
                default: throw Error();
            }
        }
        else
            return new null_1.NullNode();
    })();
    if (tokens.length) {
        if (next_is_1.nextIs(tokens, 6 /* comment */))
            tokens.pop();
        else
            throw new Error();
    }
    return node;
};
exports.formula = formula;
// <formula> = (<start> | <end> | <else> | <case> | <default> | <let> | <include>)* <comment>?
// <start> = <block> | <if> | <for> | <switch>
// <join> = <start> | <include> | :E
// <block> = block
// <if> = if E <join>?
// <else> = else <join>?
// <for> = for W (,W)? in E <join>?
// <switch> = switch E
// <case> = case E <join>?
// <default> = default <join>?
// <end> = P? ;;
// <let> = let W( W)* = (E | <include> | <start>)
// <var> = var W = (E | <include> | <start>)
// <include> = include s
//# sourceMappingURL=formula.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
const strToToken = (value) => ({
    value,
    type: (() => {
        switch (value) {
            case 'block': return 15 /* block */;
            case 'if': return 16 /* if */;
            case 'else': return 17 /* else */;
            case 'for': return 18 /* for */;
            case 'in': return 19 /* in */;
            case 'switch': return 20 /* switch */;
            case 'case': return 21 /* case */;
            case 'default': return 22 /* default */;
            case 'include': return 23 /* include */;
            case 'let': return 24 /* let */;
            case 'var': return 25 /* var */;
            case 'end': return 26 /* end */;
            case 'false':
            case 'true': return 14 /* boolean */;
            case 'null': return 12 /* null */;
            case 'undefined': return 13 /* undefined */;
            case '|':
            case '&': return 32 /* partial */;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '==':
            case '===':
            case '!=':
            case '!==':
            case '<':
            case '>':
            case '<=':
            case '>=':
            case '||':
            case '&&': return 29 /* operator */;
            case '.': return 0 /* dot */;
            case '[': return 1 /* leftSquare */;
            case ']': return 2 /* rightSquare */;
            case '|>': return 5 /* pipe */;
            case '(': return 3 /* leftRound */;
            case ')': return 4 /* rightRound */;
            case '!': return 8 /* exclamation */;
            case '?': return 9 /* question */;
            case ':': return 10 /* colon */;
            case ',': return 7 /* comma */;
            case '=': return 11 /* equal */;
        }
        switch (true) {
            case /^\s+$/.test(value): return 31 /* space */;
            case /^\/\/.*$/.test(value): return 6 /* comment */;
            case /^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(value): return 30 /* word */;
            case /^'([^']|\\')*$|^"([^"]|\\")*$/.test(value): return 32 /* partial */;
            case /^'([^']|\\')*'$|^"([^"]|\\")*"$/.test(value): return 28 /* string */;
            case /^\d+\.?\d*$|^\.?\d+$/.test(value): return 27 /* number */;
            default: return 33 /* other */;
        }
    })()
});
const addtoTokens = (tokens, char) => {
    if (tokens.length) {
        const token = tokens.pop();
        const added = strToToken(token.value + char);
        if (added.type === 33 /* other */)
            tokens.push(token, strToToken(char));
        else
            tokens.push(added);
    }
    else
        tokens.push(strToToken(char));
    return tokens;
};
const tokenize = (text, tokens = []) => text === '' ? tokens : exports.tokenize(text.slice(1), addtoTokens(tokens, text[0]));
exports.tokenize = tokenize;
//# sourceMappingURL=tokenize.js.map
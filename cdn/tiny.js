(() => {
  // src/utils/stack.ts
  var Stack = class {
    constructor(builtin2, data = [], dataLengths = [0]) {
      this.builtin = builtin2;
      this.data = data;
      this.dataLengths = dataLengths;
    }
    push(data = []) {
      for (const datum of data) {
        this.data.push(datum);
      }
      this.dataLengths.push(data.length);
    }
    add(data) {
      this.data.push(data);
      this.dataLengths[this.dataLengths.length - 1]++;
    }
    pop() {
      let length = this.dataLengths.pop() || 0;
      while (length--)
        this.data.pop();
    }
    get(name) {
      const result = this.builtin(name);
      if (result)
        return result;
      else {
        for (let index = this.data.length - 1; index >= 0; index--) {
          if (this.data[index][0] === name)
            return this.data[index][1];
        }
        return void 0;
      }
    }
    clone() {
      return new Stack(this.builtin, this.data.slice(), this.dataLengths.slice());
    }
  };

  // src/struct/delimiter.ts
  var escape = (delimiter) => delimiter.replace(/[|{}.*+?()\[\]-^$\\]/g, "\\$&");

  // src/struct/node.ts
  var NodeType;
  (function(NodeType2) {
    NodeType2[NodeType2["null"] = 0] = "null";
    NodeType2[NodeType2["term"] = 1] = "term";
    NodeType2[NodeType2["evaluation"] = 2] = "evaluation";
    NodeType2[NodeType2["literal"] = 3] = "literal";
    NodeType2[NodeType2["variable"] = 4] = "variable";
    NodeType2[NodeType2["tiny"] = 5] = "tiny";
    NodeType2[NodeType2["titan"] = 6] = "titan";
    NodeType2[NodeType2["filter"] = 7] = "filter";
    NodeType2[NodeType2["block"] = 8] = "block";
    NodeType2[NodeType2["if"] = 9] = "if";
    NodeType2[NodeType2["else"] = 10] = "else";
    NodeType2[NodeType2["switch"] = 11] = "switch";
    NodeType2[NodeType2["case"] = 12] = "case";
    NodeType2[NodeType2["default"] = 13] = "default";
    NodeType2[NodeType2["for"] = 14] = "for";
    NodeType2[NodeType2["end"] = 15] = "end";
    NodeType2[NodeType2["var"] = 16] = "var";
    NodeType2[NodeType2["let"] = 17] = "let";
    NodeType2[NodeType2["include"] = 18] = "include";
    NodeType2[NodeType2["defaults"] = 19] = "defaults";
  })(NodeType || (NodeType = {}));

  // src/nodes/evaluation.ts
  var EvaluationNode = class {
    constructor(node, params = []) {
      this.type = NodeType.evaluation;
      this._isTitantNode = true;
      this.node = node;
      this.params = params;
    }
    trace(callback) {
      this.node = this.node.trace(callback);
      for (let index = this.params.length - 1; index >= 0; index--) {
        this.params[index] = this.params[index].trace(callback);
      }
      return callback(this);
    }
    evalute(stack) {
      const variable = this.node.evalute(stack);
      return typeof variable === "function" ? variable(...this.params.map((node) => node.evalute(stack))) : variable;
    }
  };

  // src/nodes/literal.ts
  var LiteralNode = class {
    constructor(value) {
      this.type = NodeType.literal;
      this._isTitantNode = true;
      this.value = value;
    }
    trace(callback) {
      return callback(this);
    }
    evalute(stack) {
      return this.value;
    }
  };

  // src/nodes/variable.ts
  var VariableNode = class {
    constructor(name) {
      this.type = NodeType.variable;
      this._isTitantNode = true;
      this.name = name;
    }
    trace(callback) {
      return callback(this);
    }
    evalute(stack) {
      return stack.get(this.name);
    }
  };

  // src/struct/token.ts
  var TokenType;
  (function(TokenType2) {
    TokenType2[TokenType2["dot"] = 0] = "dot";
    TokenType2[TokenType2["leftSquare"] = 1] = "leftSquare";
    TokenType2[TokenType2["rightSquare"] = 2] = "rightSquare";
    TokenType2[TokenType2["leftRound"] = 3] = "leftRound";
    TokenType2[TokenType2["rightRound"] = 4] = "rightRound";
    TokenType2[TokenType2["pipe"] = 5] = "pipe";
    TokenType2[TokenType2["comment"] = 6] = "comment";
    TokenType2[TokenType2["comma"] = 7] = "comma";
    TokenType2[TokenType2["exclamation"] = 8] = "exclamation";
    TokenType2[TokenType2["question"] = 9] = "question";
    TokenType2[TokenType2["colon"] = 10] = "colon";
    TokenType2[TokenType2["equal"] = 11] = "equal";
    TokenType2[TokenType2["null"] = 12] = "null";
    TokenType2[TokenType2["undefined"] = 13] = "undefined";
    TokenType2[TokenType2["boolean"] = 14] = "boolean";
    TokenType2[TokenType2["block"] = 15] = "block";
    TokenType2[TokenType2["if"] = 16] = "if";
    TokenType2[TokenType2["else"] = 17] = "else";
    TokenType2[TokenType2["for"] = 18] = "for";
    TokenType2[TokenType2["in"] = 19] = "in";
    TokenType2[TokenType2["switch"] = 20] = "switch";
    TokenType2[TokenType2["case"] = 21] = "case";
    TokenType2[TokenType2["default"] = 22] = "default";
    TokenType2[TokenType2["include"] = 23] = "include";
    TokenType2[TokenType2["let"] = 24] = "let";
    TokenType2[TokenType2["var"] = 25] = "var";
    TokenType2[TokenType2["end"] = 26] = "end";
    TokenType2[TokenType2["number"] = 27] = "number";
    TokenType2[TokenType2["string"] = 28] = "string";
    TokenType2[TokenType2["operator"] = 29] = "operator";
    TokenType2[TokenType2["word"] = 30] = "word";
    TokenType2[TokenType2["space"] = 31] = "space";
    TokenType2[TokenType2["partial"] = 32] = "partial";
    TokenType2[TokenType2["other"] = 33] = "other";
  })(TokenType || (TokenType = {}));

  // src/lexer/tokenize.ts
  var strToToken = (value) => ({
    value,
    type: (() => {
      switch (value) {
        case "block":
          return TokenType.block;
        case "if":
          return TokenType.if;
        case "else":
          return TokenType.else;
        case "for":
          return TokenType.for;
        case "in":
          return TokenType.in;
        case "switch":
          return TokenType.switch;
        case "case":
          return TokenType.case;
        case "default":
          return TokenType.default;
        case "include":
          return TokenType.include;
        case "let":
          return TokenType.let;
        case "var":
          return TokenType.var;
        case "end":
          return TokenType.end;
        case "false":
        case "true":
          return TokenType.boolean;
        case "null":
          return TokenType.null;
        case "undefined":
          return TokenType.undefined;
        case "|":
        case "&":
          return TokenType.partial;
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
        case "==":
        case "===":
        case "!=":
        case "!==":
        case "<":
        case ">":
        case "<=":
        case ">=":
        case "||":
        case "&&":
          return TokenType.operator;
        case ".":
          return TokenType.dot;
        case "[":
          return TokenType.leftSquare;
        case "]":
          return TokenType.rightSquare;
        case "|>":
          return TokenType.pipe;
        case "(":
          return TokenType.leftRound;
        case ")":
          return TokenType.rightRound;
        case "!":
          return TokenType.exclamation;
        case "?":
          return TokenType.question;
        case ":":
          return TokenType.colon;
        case ",":
          return TokenType.comma;
        case "=":
          return TokenType.equal;
      }
      switch (true) {
        case /^\s+$/.test(value):
          return TokenType.space;
        case /^\/\/.*$/.test(value):
          return TokenType.comment;
        case /^[_\$a-zA-Z][_\$a-zA-Z0-9]*$/.test(value):
          return TokenType.word;
        case /^'([^']|\\')*$|^"([^"]|\\")*$/.test(value):
          return TokenType.partial;
        case /^'([^']|\\')*'$|^"([^"]|\\")*"$/.test(value):
          return TokenType.string;
        case /^\d+\.?\d*$|^\.?\d+$/.test(value):
          return TokenType.number;
        default:
          return TokenType.other;
      }
    })()
  });
  var addtoTokens = (tokens, char) => {
    if (tokens.length) {
      const token = tokens.pop();
      const added = strToToken(token.value + char);
      if (added.type === TokenType.other)
        tokens.push(token, strToToken(char));
      else
        tokens.push(added);
    } else
      tokens.push(strToToken(char));
    return tokens;
  };
  var tokenize = (text, tokens = []) => text === "" ? tokens : tokenize(text.slice(1), addtoTokens(tokens, text[0]));

  // src/parser/utils/next-is.ts
  var nextIs = (tokens, type) => {
    const next = tokens[tokens.length - 1];
    return next && next.type === type;
  };

  // src/parser/utils/power.ts
  var power = (operator) => {
    switch (operator) {
      case "!":
        return 70;
      case "*":
      case "/":
      case "%":
        return 60;
      case "+":
      case "-":
        return 50;
      case "<":
      case ">":
      case "<=":
      case ">=":
        return 40;
      case "==":
      case "!=":
      case "===":
      case "!==":
        return 30;
      case "&&":
        return 20;
      case "||":
        return 10;
    }
  };

  // src/parser/utils/must.ts
  var must = (token, type, message = "") => {
    if (!token || token.type !== type)
      throw new Error(message);
  };

  // src/parser/utils/cast.ts
  var cast = (token) => {
    switch (token.type) {
      case TokenType.number:
        return Number(token.value);
      case TokenType.undefined:
        return void 0;
      case TokenType.null:
        return null;
      case TokenType.boolean:
        return token.value === "true" ? true : false;
      case TokenType.string:
        if (token.value[0] === '"')
          return token.value.slice(1, -1).replace('\\"', '"');
        else
          return token.value.slice(1, -1).replace("\\'", "'");
      default:
        throw new Error();
    }
  };

  // src/parser/func.ts
  var func = (tokens, node) => {
    must(tokens.pop(), TokenType.leftRound);
    const params = [];
    while (!nextIs(tokens, TokenType.rightRound)) {
      params.push(expression(tokens));
      if (nextIs(tokens, TokenType.comma))
        tokens.pop();
      else
        break;
    }
    must(tokens.pop(), TokenType.rightRound);
    const result = new EvaluationNode(node, params);
    if (nextIs(tokens, TokenType.dot) || nextIs(tokens, TokenType.leftSquare))
      return hash(tokens, result);
    if (nextIs(tokens, TokenType.leftRound))
      return func(tokens, result);
    return result;
  };

  // src/parser/hash.ts
  var hash = (tokens, node) => {
    const index = (() => {
      switch (tokens.pop().type) {
        case TokenType.dot: {
          const symbol = tokens.pop();
          must(symbol, TokenType.word);
          return new LiteralNode(symbol.value);
        }
        case TokenType.leftSquare: {
          const node2 = expression(tokens);
          must(tokens.pop(), TokenType.rightSquare);
          return node2;
        }
      }
    })();
    const result = new EvaluationNode(new VariableNode("."), [index, node]);
    if (nextIs(tokens, TokenType.dot) || nextIs(tokens, TokenType.leftSquare))
      return hash(tokens, result);
    if (nextIs(tokens, TokenType.leftRound))
      return func(tokens, result);
    return result;
  };

  // src/parser/term.ts
  var term = (tokens) => {
    const token = tokens.pop();
    switch (token.type) {
      case TokenType.word: {
        if (nextIs(tokens, TokenType.dot) || nextIs(tokens, TokenType.leftSquare))
          return hash(tokens, new VariableNode(token.value));
        else if (nextIs(tokens, TokenType.leftRound))
          return func(tokens, new VariableNode(token.value));
        else
          return new EvaluationNode(new VariableNode(token.value));
      }
      case TokenType.number:
      case TokenType.string:
      case TokenType.boolean:
        return new LiteralNode(cast(token));
      case TokenType.exclamation:
        return new EvaluationNode(new VariableNode(token.value), [term(tokens)]);
      case TokenType.operator: {
        switch (token.value) {
          case "-":
          case "+":
            return new EvaluationNode(new VariableNode(token.value), [term(tokens)]);
          default:
            throw new Error();
        }
      }
      case TokenType.leftRound: {
        const node = expression(tokens);
        must(tokens.pop(), TokenType.rightRound);
        return node;
      }
      default:
        throw new Error(JSON.stringify(token));
    }
  };

  // src/parser/arithmetic.ts
  var arithmetic = (tokens) => {
    const list = new Array();
    list.push(term(tokens));
    while (nextIs(tokens, TokenType.operator)) {
      const next = tokens.pop();
      if (next.value !== "!") {
        list.push(next.value);
        list.push(term(tokens));
      } else
        break;
    }
    while (list.length > 1) {
      for (let index = 0; index + 1 < list.length; index += 2) {
        if (index + 3 >= list.length || power(list[index + 1]) > power(list[index + 3])) {
          const node = new EvaluationNode(new VariableNode(list[index + 1]), [list[index + 2], list[index]]);
          list.splice(index, 3, node);
        }
      }
    }
    return typeof list[0] === "string" ? new VariableNode(list[0]) : list[0];
  };

  // src/parser/branch.ts
  var branch = (tokens, node) => {
    must(tokens.pop(), TokenType.question);
    const params = [];
    params.push(expression(tokens));
    must(tokens.pop(), TokenType.colon);
    params.push(arithmetic(tokens));
    params.push(node);
    return new EvaluationNode(new VariableNode("?:"), params);
  };

  // src/parser/condition.ts
  var condition = (tokens) => {
    let node = arithmetic(tokens);
    while (nextIs(tokens, TokenType.question)) {
      node = branch(tokens, node);
    }
    return node;
  };

  // src/parser/utils/next-is-term.ts
  var nextIsTerm = (tokens) => {
    const next = tokens[tokens.length - 1];
    if (next === void 0)
      return false;
    switch (next.type) {
      case TokenType.word:
      case TokenType.number:
      case TokenType.string:
      case TokenType.boolean:
      case TokenType.leftRound:
      case TokenType.exclamation:
        return true;
      case TokenType.operator:
        switch (next.value) {
          case "-":
          case "+":
            return true;
          default:
            return false;
        }
      default:
        return false;
    }
  };

  // src/parser/utils/pipein.ts
  var pipein = (node, pipe2) => {
    return pipe2.trace((current) => {
      return current.type === NodeType.evaluation && current.node.type === NodeType.variable && current.node.name === "_" ? node : current;
    });
  };

  // src/parser/pipe.ts
  var pipe = (tokens) => {
    must(tokens.pop(), TokenType.pipe);
    const node = (() => {
      if (nextIs(tokens, TokenType.operator) || nextIs(tokens, TokenType.exclamation) || nextIs(tokens, TokenType.word))
        return new VariableNode(tokens.pop().value);
      else if (nextIsTerm(tokens))
        return term(tokens);
      else
        throw new Error();
    })();
    const params = [];
    while (nextIsTerm(tokens))
      params.push(term(tokens));
    let used = false;
    const evaluation = new EvaluationNode(node, params).trace((node2) => {
      if (node2.type === NodeType.variable && node2.name === "_")
        used = true;
      return node2;
    });
    if (!used)
      evaluation.params.push(new EvaluationNode(new VariableNode("_")));
    if (nextIs(tokens, TokenType.pipe))
      return pipein(evaluation, pipe(tokens));
    else
      return evaluation;
  };

  // src/parser/expression.ts
  var expression = (tokens) => {
    const node = condition(tokens);
    if (nextIs(tokens, TokenType.pipe)) {
      return pipein(node, pipe(tokens));
    } else
      return node;
  };

  // src/tiny/parse.ts
  var parse = (text) => {
    const tokens = tokenize(text).filter((token) => token.type !== TokenType.space).reverse();
    if (tokens.length === 0)
      return new LiteralNode("");
    else
      return expression(tokens);
  };

  // src/tiny/compile.ts
  var inlineout = (node, useEscape) => {
    return new EvaluationNode(new VariableNode(useEscape ? "escape" : "output"), [node]);
  };
  var lineout = (prefix2, node, useEscape) => {
    const wrap1 = useEscape ? new EvaluationNode(new VariableNode("escape"), [node]) : node;
    const wrap2 = new EvaluationNode(new VariableNode("prefix"), [new LiteralNode(prefix2), wrap1]);
    return wrap2;
  };
  var noLastLine = (node) => {
    return new EvaluationNode(new VariableNode("append"), [new LiteralNode("\n"), node]);
  };
  var compile = (text, useEscape, delimiter) => {
    const lineDelimiter = delimiter.line.length <= 1 ? `${escape(delimiter.line)}{3,}` : escape(delimiter.line);
    const openDelimiter = escape(delimiter.open);
    const closeDelimiter = escape(delimiter.close);
    const lineRegExp = new RegExp(`^(.*)(?<!\\\\)${lineDelimiter}(.*)$`);
    const lineEscapeRegExp = new RegExp(`\\\\(${lineDelimiter})(.*)`, "g");
    const lineUnescape = (text2) => text2.replace(lineEscapeRegExp, "$1$2");
    const inlineRegExp = new RegExp(`(?<!\\\\)${openDelimiter}.*?(?<!\\\\)${closeDelimiter}`, "g");
    const inlineGroupRegExp = new RegExp(`(?<!\\\\)${openDelimiter}(.*?)(?<!\\\\)${closeDelimiter}`, "g");
    const inlineEscapeRegExp = new RegExp(`\\\\(${openDelimiter}|${closeDelimiter})`, "g");
    const inlineUnescape = (text2) => text2.replace(inlineEscapeRegExp, "$1");
    const lines = text.split("\n");
    const preBlock = [];
    const buffer = [];
    lines.forEach((line, index) => {
      const result = line.match(lineRegExp);
      if (result) {
        if (buffer.length) {
          preBlock.push(buffer.join("\n"));
          buffer.length = 0;
        }
        const node = lineout(result[1], parse(lineUnescape(result[2])), useEscape);
        preBlock.push(index < lines.length - 1 ? noLastLine(node) : node);
      } else {
        buffer.push(lineUnescape(line));
      }
    });
    if (buffer.length)
      preBlock.push(buffer.join("\n"));
    return preBlock.map((preSection) => {
      if (typeof preSection === "string") {
        const stringParts = preSection.split(inlineRegExp);
        const nodeParts = [...preSection.matchAll(inlineGroupRegExp)];
        const section = [inlineUnescape(stringParts[0])];
        if (nodeParts) {
          for (let index = 0; index < nodeParts.length; index++) {
            section.push(inlineout(parse(inlineUnescape(nodeParts[index][1])), useEscape));
            section.push(inlineUnescape(stringParts[index + 1]));
          }
        }
        return section;
      } else {
        return preSection;
      }
    });
  };

  // src/tiny/render.ts
  var render = (block, stack) => {
    return block.reduce((text, section, index) => {
      if (typeof section === "string")
        return text + section;
      else if (Array.isArray(section))
        return text + render(section, stack) + (index < block.length - 1 ? "\n" : "");
      else
        return text + section.evalute(stack) + (section.type === NodeType.titan && index < block.length - 1 ? "\n" : "");
    }, "");
  };

  // src/tiny/template.ts
  var TinyTemplate = class {
    constructor(tiny2, templateText) {
      this.tiny = tiny2;
      this.templateText = templateText;
      this.block = null;
    }
    compile() {
      if (!this.block) {
        this.block = compile(this.templateText.replace(/\r\n/g, "\n"), this.tiny.useEscape, this.tiny.delimiter);
      }
    }
    render(data = {}) {
      this.compile();
      this.tiny.stack.push(Object.entries(data));
      const text = render(this.block, this.tiny.stack);
      this.tiny.stack.pop();
      return text;
    }
  };

  // src/filters/operators.ts
  var dot = (x, y) => y[x];
  var not = (x) => !x;
  var plus = (x, y) => y === void 0 ? x : y + x;
  var minus = (x, y) => y === void 0 ? -x : y - x;
  var multi = (x, y) => y * x;
  var div = (x, y) => y / x;
  var mod = (x, y) => y % x;
  var eq = (x, y) => y == x;
  var seq = (x, y) => y === x;
  var ne = (x, y) => y != x;
  var sne = (x, y) => y !== x;
  var lt = (x, y) => y < x;
  var gt = (x, y) => y > x;
  var le = (x, y) => y <= x;
  var ge = (x, y) => y >= x;
  var or = (x, y) => y || x;
  var and = (x, y) => y && x;
  var cond = (x, y, z) => z ? x : y;

  // src/filters/output.ts
  var output = (x) => typeof x === "string" || typeof x === "number" && Number.isFinite(x) ? "" + x : "";

  // src/filters/escape.ts
  var escapeRegex = /[<>&"'`]/g;
  var escape2 = (x) => {
    const x2 = output(x);
    return !x2 ? x2 : x2.replace(escapeRegex, (match) => {
      switch (match) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        case "`":
          return "&#x60;";
      }
    });
  };

  // src/filters/prefix.ts
  var prefix = (x, y) => {
    const y2 = output(y);
    return y2 ? y2.split("\n").map((l) => output(x) + l).join("\n") : "";
  };

  // src/filters/suffix.ts
  var suffix = (x, y) => {
    const y2 = output(y);
    return y2 ? y2.split("\n").map((l) => l + output(x)).join("\n") : "";
  };

  // src/filters/append.ts
  var append = (x, y) => {
    const y2 = output(y);
    return y2 ? y2 + output(x) : "";
  };

  // src/filters/prepend.ts
  var prepend = (x, y) => {
    const y2 = output(y);
    return y2 ? output(x) + y2 : "";
  };

  // src/tiny/builtin.ts
  var builtin = (name) => {
    switch (name) {
      case ".":
        return dot;
      case "!":
        return not;
      case "+":
        return plus;
      case "-":
        return minus;
      case "*":
        return multi;
      case "/":
        return div;
      case "%":
        return mod;
      case "==":
        return eq;
      case "===":
        return seq;
      case "!=":
        return ne;
      case "!==":
        return sne;
      case "<":
        return lt;
      case ">":
        return gt;
      case "<=":
        return le;
      case ">=":
        return ge;
      case "||":
        return or;
      case "&&":
        return and;
      case "?:":
        return cond;
      case "output":
        return output;
      case "escape":
        return escape2;
      case "prefix":
        return prefix;
      case "suffix":
        return suffix;
      case "append":
        return append;
      case "prepend":
        return prepend;
    }
  };

  // src/tiny.ts
  var Tiny = class {
    constructor(useEscape = true, delimiter = {}, stack = new Stack(builtin)) {
      this.stack = stack;
      this.useEscape = useEscape;
      this.delimiter = {
        line: delimiter.line || ":",
        open: delimiter.open || "{|",
        close: delimiter.close || "|}"
      };
    }
    render(templateText, data) {
      const renderer = new TinyTemplate(this, templateText);
      return renderer.render(data);
    }
    compile(templateText) {
      const template = new TinyTemplate(this, templateText);
      template.compile();
      return template;
    }
    let(x, y) {
      if (y) {
        this.stack.add([x, y]);
      } else {
        for (const [name, value] of Object.entries(x)) {
          this.stack.add([name, value]);
        }
      }
    }
  };
  var tiny = new Tiny();

  // src/cdn/tiny.ts
  window.Tiny = Tiny;
  window.TinyTemplate = TinyTemplate;
  window.tiny = tiny;
})();

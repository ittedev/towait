(() => {
  // src/utils/stack.ts
  var Stack = class {
    constructor(builtin3, data = [], dataLengths = [0]) {
      this.builtin = builtin3;
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

  // src/struct/section.ts
  var SectionType;
  (function(SectionType2) {
    SectionType2[SectionType2["tiny"] = 0] = "tiny";
    SectionType2[SectionType2["line"] = 1] = "line";
    SectionType2[SectionType2["start"] = 2] = "start";
    SectionType2[SectionType2["end"] = 3] = "end";
  })(SectionType || (SectionType = {}));

  // src/sections/tiny.ts
  var TinySection = class {
    constructor(node) {
      this.type = SectionType.tiny;
      this.node = node;
    }
  };

  // src/nodes/tiny.ts
  var TinyNode = class {
    constructor(text) {
      this.type = NodeType.tiny;
      this._isTitantNode = true;
      this.text = text;
    }
    trace(callback) {
      return callback(this);
    }
    evalute(stack) {
      return void 0;
    }
  };

  // src/nodes/null.ts
  var NullNode = class {
    constructor() {
      this.type = NodeType.null;
      this._isTitantNode = true;
    }
    trace(callback) {
      return callback(this);
    }
    evalute(stack) {
      return void 0;
    }
  };

  // src/nodes/include.ts
  var IncludeNode = class {
    constructor(fileName) {
      this.type = NodeType.include;
      this._isTitantNode = true;
      this.fileName = fileName;
    }
    trace(callback) {
      return callback(this);
    }
    evalute(stack) {
      return void 0;
    }
  };

  // src/parser/include.ts
  var include = (tokens) => {
    must(tokens.pop(), TokenType.include);
    nextIs(tokens, TokenType.string);
    return new IncludeNode(cast(tokens.pop()));
  };

  // src/parser/utils/next-is-join.ts
  var nextIsJoin = (tokens) => {
    const next = tokens[tokens.length - 1];
    if (next === void 0)
      return false;
    switch (next.type) {
      case TokenType.block:
      case TokenType.if:
      case TokenType.for:
      case TokenType.switch:
      case TokenType.include:
      case TokenType.colon:
        return true;
      default:
        return false;
    }
  };

  // src/nodes/utils/isBlock.ts
  var isBlock = (node) => {
    switch (node.type) {
      case NodeType.block:
      case NodeType.if:
      case NodeType.else:
      case NodeType.switch:
      case NodeType.case:
      case NodeType.default:
      case NodeType.for:
        return true;
      case NodeType.var:
        return isBlock(node.node);
      case NodeType.let:
        return isBlock(node.node);
      default:
        return false;
    }
  };

  // src/nodes/block.ts
  var BlockNode = class {
    constructor(node) {
      this.type = NodeType.block;
      this._isTitantNode = true;
      this.node = node;
    }
    trace(callback) {
      this.node = this.node.trace(callback);
      return callback(this);
    }
    find(callback) {
      return callback(this) ? this : isBlock(this.node) ? this.node.find(callback) : void 0;
    }
    evalute(stack) {
      stack.push();
      const value = this.node.evalute(stack);
      stack.pop();
      return value;
    }
  };

  // src/nodes/if.ts
  var IfNode = class extends BlockNode {
    constructor(node, condition2, inNode, elseNode) {
      super(node);
      this.type = NodeType.if;
      this.condition = condition2;
      this.in = inNode;
      this.elseNode = elseNode;
    }
    trace(callback) {
      this.condition = this.condition.trace(callback);
      this.node = this.node.trace(callback);
      if (this.elseNode)
        this.elseNode = this.elseNode.trace(callback);
      return callback(this);
    }
    evalute(stack) {
      if (this.in ? (() => {
        const hash2 = this.in.evalute(stack);
        const value = this.condition.evalute(stack);
        return Array.isArray(hash2) ? hash2.includes(value) : value in hash2;
      })() : this.condition.evalute(stack)) {
        stack.push();
        const value = this.node.evalute(stack);
        stack.pop();
        return value;
      } else if (this.elseNode) {
        return this.elseNode.evalute(stack);
      } else {
        return "";
      }
    }
  };

  // src/nodes/for.ts
  var ForNode = class extends BlockNode {
    constructor(node, hash2, variableName, indexName) {
      super(node);
      this.type = NodeType.for;
      this.hash = hash2;
      this.variableName = variableName;
      this.indexName = indexName;
    }
    trace(callback) {
      this.hash = this.hash.trace(callback);
      this.node = this.node.trace(callback);
      return callback(this);
    }
    evalute(stack) {
      const hash2 = this.hash.evalute(stack);
      const entries = (() => {
        if (typeof hash2 === "object") {
          if (Array.isArray(hash2))
            return [...hash2.entries()];
          else
            return Object.entries(hash2);
        } else
          return [[0, hash2]];
      })();
      let value = "";
      for (let index = 0; index < entries.length; index++) {
        const [key, variable] = entries[index];
        stack.push([[this.variableName, variable]]);
        if (this.indexName)
          stack.add([this.indexName, key]);
        const text = this.node.evalute(stack) || "";
        if (text)
          value += text + (index < entries.length - 1 ? "\n" : "");
        stack.pop();
      }
      return value;
    }
  };

  // src/nodes/titan.ts
  var TitanNode = class {
    constructor(block = []) {
      this.type = NodeType.titan;
      this._isTitantNode = true;
      this.block = block;
    }
    trace(callback) {
      (function traceBlock(block) {
        for (let index = block.length - 1; index >= 0; index--) {
          if (Array.isArray(block[index]))
            traceBlock(block[index]);
          else if (typeof block[index] !== "string")
            block[index] = block[index].trace(callback);
        }
      })(this.block);
      return callback(this);
    }
    evalute(stack) {
      return render(this.block, stack);
    }
  };

  // src/parser/for.ts
  var forFormula = (tokens) => {
    must(tokens.pop(), TokenType.for);
    const word = tokens.pop().value;
    const [vName, iName] = (() => {
      if (nextIs(tokens, TokenType.comma)) {
        tokens.pop();
        if (nextIs(tokens, TokenType.word))
          return [tokens.pop().value, word];
        else
          throw new Error();
      } else
        return [word, void 0];
    })();
    must(tokens.pop(), TokenType.in);
    const hash2 = expression(tokens);
    if (nextIsJoin(tokens))
      return new ForNode(join(tokens), hash2, vName, iName);
    else
      return new ForNode(new TitanNode(), hash2, vName, iName);
  };

  // src/nodes/switch.ts
  var SwitchNode = class extends BlockNode {
    constructor(node, value, cases = [], defaultNode) {
      super(node);
      this.type = NodeType.switch;
      this.value = value;
      this.cases = cases;
      this.defaultNode = defaultNode;
    }
    trace(callback) {
      this.node = this.node.trace(callback);
      this.value = this.value.trace(callback);
      for (let index = this.cases.length - 1; index >= 0; index--) {
        this.cases[index] = this.cases[index].trace(callback);
      }
      if (this.defaultNode)
        this.defaultNode = this.defaultNode.trace(callback);
      return callback(this);
    }
    evalute(stack) {
      const target = this.value.evalute(stack);
      stack.push();
      let value = this.node.evalute(stack) || "";
      let isMatch = false;
      for (const caseNode of this.cases) {
        if (caseNode.values.some((value2) => value2.evalute(stack) === target)) {
          value += (value ? "\n" : "") + caseNode.evalute(stack) || "";
          isMatch = true;
        }
      }
      if (!isMatch && this.defaultNode) {
        value += (value ? "\n" : "") + this.defaultNode.evalute(stack) || "";
      }
      stack.pop();
      return value;
    }
  };

  // src/parser/switch.ts
  var switchFormula = (tokens) => {
    must(tokens.pop(), TokenType.switch);
    return new SwitchNode(new TitanNode(), expression(tokens));
  };

  // src/parser/block.ts
  var blockFormula = (tokens) => {
    must(tokens.pop(), TokenType.block);
    if (nextIsJoin(tokens))
      return new BlockNode(join(tokens));
    else
      return new BlockNode(new TitanNode());
  };

  // src/parser/join.ts
  var join = (tokens) => {
    const next = tokens[tokens.length - 1];
    switch (next.type) {
      case TokenType.if:
        return ifFormula(tokens);
      case TokenType.for:
        return forFormula(tokens);
      case TokenType.switch:
        return switchFormula(tokens);
      case TokenType.block:
        return blockFormula(tokens);
      case TokenType.include:
        return include(tokens);
      case TokenType.colon: {
        tokens.pop();
        return new TitanNode([expression(tokens)]);
      }
      default:
        return new TitanNode();
    }
  };

  // src/parser/if.ts
  var ifFormula = (tokens) => {
    must(tokens.pop(), TokenType.if);
    const condition2 = expression(tokens);
    const inNode = (() => {
      if (nextIs(tokens, TokenType.in)) {
        tokens.pop();
        return expression(tokens);
      } else
        return void 0;
    })();
    if (nextIsJoin(tokens))
      return new IfNode(join(tokens), condition2, inNode);
    else
      return new IfNode(new TitanNode(), condition2, inNode);
  };

  // src/nodes/end.ts
  var EndNode = class {
    constructor(pipe2) {
      this.type = NodeType.end;
      this._isTitantNode = true;
      this.pipe = pipe2;
    }
    trace(callback) {
      if (this.pipe)
        this.pipe = callback(this.pipe);
      return callback(this);
    }
    evalute(stack) {
      return void 0;
    }
  };

  // src/parser/end.ts
  var end = (tokens) => {
    must(tokens.pop(), TokenType.end);
    const node = nextIs(tokens, TokenType.pipe) ? pipe(tokens) : void 0;
    return new EndNode(node);
  };

  // src/nodes/let.ts
  var LetNode = class extends BlockNode {
    constructor(name, node) {
      super(node);
      this.type = NodeType.let;
      this.name = name;
    }
    trace(callback) {
      this.node = this.node.trace(callback);
      return callback(this);
    }
    evalute(stack) {
      stack.add([this.name, this.node]);
      return "";
    }
  };

  // src/nodes/advanced-evaluation.ts
  EvaluationNode.prototype.evalute = function(stack) {
    const variable = this.node.evalute(stack);
    switch (typeof variable) {
      case "function":
        return variable(...this.params.map((node) => node.evalute(stack)));
      case "object":
        if (variable._isTitantNode) {
          if (variable.type === "filter") {
            const filter = variable;
            stack.push(filter.params.map((value2, index) => [value2, this.params[index].evalute(stack)]));
            const value = filter.evalute(stack);
            stack.pop();
            return value;
          } else
            return variable.evalute(stack);
        }
      default:
        return variable;
    }
  };

  // src/nodes/filter.ts
  var FilterNode = class {
    constructor(node, params = []) {
      this.type = NodeType.filter;
      this._isTitantNode = true;
      this.node = node;
      this.params = params;
    }
    trace(callback) {
      return callback(this);
    }
    evalute(stack) {
      return this.node.evalute(stack);
    }
  };

  // src/parser/right.ts
  var right = (tokens) => {
    const next = tokens[tokens.length - 1];
    switch (next.type) {
      case TokenType.if:
        return ifFormula(tokens);
      case TokenType.for:
        return forFormula(tokens);
      case TokenType.switch:
        return switchFormula(tokens);
      case TokenType.block:
        return blockFormula(tokens);
      case TokenType.include:
        return include(tokens);
      default:
        return expression(tokens);
    }
  };

  // src/parser/let.ts
  var letFormula = (tokens) => {
    must(tokens.pop(), TokenType.let);
    const name = tokens.pop().value;
    const params = [];
    while (nextIs(tokens, TokenType.word))
      params.push(tokens.pop().value);
    must(tokens.pop(), TokenType.equal);
    const node = right(tokens);
    return new LetNode(name, params.length ? new FilterNode(node, params) : node);
  };

  // src/nodes/var.ts
  var VarNode = class extends BlockNode {
    constructor(name, node) {
      super(node);
      this.type = NodeType.let;
      this.name = name;
    }
    trace(callback) {
      this.node = this.node.trace(callback);
      return callback(this);
    }
    evalute(stack) {
      stack.add([this.name, this.node.evalute(stack)]);
      return "";
    }
  };

  // src/parser/var.ts
  var varFormula = (tokens) => {
    must(tokens.pop(), TokenType.var);
    const name = tokens.pop().value;
    must(tokens.pop(), TokenType.equal);
    const node = right(tokens);
    return new VarNode(name, node);
  };

  // src/nodes/else.ts
  var ElseNode = class extends BlockNode {
    constructor() {
      super(...arguments);
      this.type = NodeType.else;
    }
  };

  // src/parser/else.ts
  var elseFormula = (tokens) => {
    must(tokens.pop(), TokenType.else);
    if (nextIsJoin(tokens))
      return new ElseNode(join(tokens));
    else
      return new ElseNode(new TitanNode());
  };

  // src/nodes/case.ts
  var CaseNode = class extends BlockNode {
    constructor(node, values) {
      super(node);
      this.type = NodeType.case;
      this.values = values;
    }
    trace(callback) {
      for (let index = this.values.length - 1; index >= 0; index--) {
        this.values[index] = this.values[index].trace(callback);
      }
      this.node = this.node.trace(callback);
      return callback(this);
    }
  };

  // src/parser/case.ts
  var caseFormula = (tokens) => {
    must(tokens.pop(), TokenType.case);
    const values = [expression(tokens)];
    while (nextIs(tokens, TokenType.comma)) {
      tokens.pop();
      values.push(expression(tokens));
    }
    if (nextIsJoin(tokens))
      return new CaseNode(join(tokens), values);
    else
      return new CaseNode(new TitanNode(), values);
  };

  // src/nodes/default.ts
  var DefaultNode = class extends BlockNode {
    constructor() {
      super(...arguments);
      this.type = NodeType.default;
    }
  };

  // src/parser/default.ts
  var defaultFormula = (tokens) => {
    must(tokens.pop(), TokenType.default);
    if (nextIsJoin(tokens))
      return new DefaultNode(join(tokens));
    else
      return new DefaultNode(new TitanNode());
  };

  // src/parser/formula.ts
  var formula = (tokens) => {
    const node = (() => {
      const next = tokens[tokens.length - 1];
      if (next) {
        switch (next.type) {
          case TokenType.if:
            return ifFormula(tokens);
          case TokenType.for:
            return forFormula(tokens);
          case TokenType.switch:
            return switchFormula(tokens);
          case TokenType.block:
            return blockFormula(tokens);
          case TokenType.else:
            return elseFormula(tokens);
          case TokenType.let:
            return letFormula(tokens);
          case TokenType.var:
            return varFormula(tokens);
          case TokenType.case:
            return caseFormula(tokens);
          case TokenType.default:
            return defaultFormula(tokens);
          case TokenType.include:
            return include(tokens);
          case TokenType.end:
            return end(tokens);
          case TokenType.comment:
            return new NullNode();
          default:
            throw Error();
        }
      } else
        return new NullNode();
    })();
    if (tokens.length) {
      if (nextIs(tokens, TokenType.comment))
        tokens.pop();
      else
        throw new Error();
    }
    return node;
  };

  // src/titan/parse.ts
  var parse2 = (text) => {
    const tokens = tokenize(text).filter((token) => token.type !== TokenType.space).reverse();
    if (tokens.length === 0)
      return new NullNode();
    else
      return formula(tokens);
  };

  // src/sections/start.ts
  var StartType = {
    start: 2,
    else: 3,
    case: 4,
    default: 5
  };
  var ComplexType = {
    if: 1,
    for: 2,
    switch: 3
  };
  var StartSection = class {
    constructor(node) {
      this.type = SectionType.start;
      this.node = node;
    }
    get startType() {
      switch (this.node.type) {
        case NodeType.block:
        case NodeType.if:
        case NodeType.for:
        case NodeType.let:
        case NodeType.var:
        case NodeType.switch:
          return StartType.start;
        case NodeType.else:
          return StartType.else;
        case NodeType.case:
          return StartType.case;
        case NodeType.default:
          return StartType.default;
      }
    }
    has(type) {
      const nodeType = (() => {
        switch (type) {
          case ComplexType.if:
            return NodeType.if;
          case ComplexType.for:
            return NodeType.for;
          case ComplexType.switch:
            return NodeType.switch;
        }
      })();
      return !!this.node.find((node) => node.type === nodeType);
    }
    add(node) {
      switch (node.type) {
        case NodeType.titan: {
          const target = this.node.find((current) => current.node.type === NodeType.titan).node;
          target.block = target.block.concat(node.block);
          break;
        }
        case NodeType.end: {
          const end2 = node;
          if (end2.pipe)
            pipein(this.node.find((current) => current.node.type === NodeType.titan), end2.pipe);
          break;
        }
        case NodeType.default: {
          const switchNode = this.node.find((node2) => node2.type === NodeType.switch);
          if (switchNode && !switchNode.defaultNode)
            switchNode.defaultNode = node;
          break;
        }
        case NodeType.case: {
          const switchNode = this.node.find((node2) => node2.type === NodeType.switch);
          switchNode.cases.push(node);
          break;
        }
        case NodeType.else: {
          let ifNode = null;
          this.node.find((current) => {
            if (current.type === NodeType.if)
              ifNode = current;
            return false;
          });
          ifNode.elseNode = node;
          break;
        }
      }
    }
  };

  // src/sections/line.ts
  var LineSection = class {
    constructor(node) {
      this.type = SectionType.line;
      this.node = node;
    }
  };

  // src/sections/end.ts
  var EndSection = class {
    constructor(node) {
      this.type = SectionType.end;
      this.node = node;
    }
  };

  // src/spliter/split.ts
  var split = (text, delimiter) => {
    const lineDelimiter = delimiter.line.length < 2 ? `${escape(delimiter.line)}{3,}` : escape(delimiter.line);
    const lineRegExp = new RegExp(`^(.*?)(?<!\\\\)${lineDelimiter}\\s*(block|if|else|for|end|let|var|include|switch|case|default)(.*)$`);
    const lineEscapeRegExp = new RegExp(`\\\\(${lineDelimiter}\\s*)(block|if|else|for|end|let|var|include|switch|case|default)`, "g");
    const lineUnescape = (text2) => text2.replace(lineEscapeRegExp, "$1$2");
    const sections = [];
    const buffer = [];
    for (const line of text.split("\n")) {
      const result = line.match(lineRegExp);
      if (result) {
        const formula2 = parse2(result[2] + lineUnescape(result[3]));
        if (formula2.type === NodeType.null)
          continue;
        if (buffer.length) {
          sections.push(new TinySection(new TinyNode(buffer.join("\n"))));
          buffer.length = 0;
        }
        if (isBlock(formula2))
          sections.push(new StartSection(formula2));
        else if (formula2.type === NodeType.end)
          sections.push(new EndSection(formula2));
        else
          sections.push(new LineSection(formula2));
      } else {
        buffer.push(line);
      }
    }
    if (buffer.length) {
      sections.push(new TinySection(new TinyNode(buffer.join("\n"))));
    }
    return sections;
  };

  // src/joiner/block.ts
  var nextIs2 = (sections, type) => {
    if (!sections.length)
      return false;
    const section = sections[sections.length - 1];
    return section.type === SectionType.start && section.startType === type;
  };
  var joinBlock = (sections) => {
    const start = sections.pop();
    start.add(joinTitan(sections));
    if (start.has(ComplexType.switch)) {
      while (nextIs2(sections, StartType.case)) {
        start.add(joinBlock(sections));
      }
      if (nextIs2(sections, StartType.default)) {
        start.add(joinBlock(sections));
      }
    }
    if (start.has(ComplexType.if)) {
      if (nextIs2(sections, StartType.else)) {
        start.add(joinBlock(sections));
      }
    }
    if (sections.length && start.startType === StartType.start) {
      const end2 = sections.pop();
      if (end2.type === SectionType.end) {
        start.add(end2.node);
      } else
        throw new Error();
    }
    return start.node;
  };

  // src/joiner/titan.ts
  var joinTitan = (sections) => {
    const titan2 = new TitanNode();
    loop:
      do {
        const next = sections[sections.length - 1];
        if (next) {
          switch (next.type) {
            case SectionType.tiny:
            case SectionType.line: {
              titan2.block.push(sections.pop().node);
              break;
            }
            case SectionType.start:
              if (next.startType === StartType.start) {
                titan2.block.push(joinBlock(sections));
                break;
              } else
                break loop;
            case SectionType.end:
              break loop;
          }
        } else
          break;
      } while (true);
    return titan2;
  };

  // src/titan/compile.ts
  var compile2 = (text, useEscape, delimiter) => {
    const sections = split(text, delimiter);
    return joinTitan(sections.reverse()).trace((node) => node.type === NodeType.tiny ? new TitanNode(compile(node.text, useEscape, delimiter)) : node);
  };

  // src/titan/template.ts
  var TitanTemplate = class {
    constructor(titan2, templateText) {
      this.titan = titan2;
      this.templateText = templateText;
      this.node = null;
    }
    compile() {
      if (!this.node) {
        this.node = compile2(this.templateText.replace(/\r\n/g, "\n"), this.titan.useEscape, this.titan.delimiter);
      }
    }
    render(data = {}) {
      this.compile();
      const stack = this.titan.stack.clone();
      stack.push(Object.entries(data));
      const text = this.node.evalute(stack);
      stack.pop();
      return text;
    }
  };

  // src/titan/builtin.ts
  var builtin2 = (name) => {
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

  // src/titan.ts
  var Titan = class extends Tiny {
    constructor(useEscape = true, delimiter = {}, stack = new Stack(builtin2)) {
      super(useEscape, delimiter, stack);
    }
    render(templateText, data) {
      const template = new TitanTemplate(this, templateText);
      return template.render(data);
    }
    compile(templateText) {
      const titan2 = new TitanTemplate(this, templateText);
      titan2.compile();
      return titan2;
    }
  };
  var titan = new Titan();

  // src/cdn/titan.ts
  window.Titan = Titan;
  window.TitanTemplate = TitanTemplate;
  window.titan = titan;
})();

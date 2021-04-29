(() => {
  // src/y.ts
  var nonStringRegExp = /^(on|off|\d+|\d+\.\d+)$/;
  var replaces = [
    [/\r\n|$/g, "\n"],
    [/(\n|^)([\n\t ]*|[\t ]*#.*)\n/g, "$1"],
    [/\|.*?\n([\t ]*\|.*?(\n|$))*/g, (match) => match.replace(/\n\s*\|/g, "\\n").slice(1)],
    [/^([\t ]*)(-[\t ]*|[\$a-zA-Z_](?:\$|\w)*:[\t ]*)(\S.*?)$/gm, (match, p1, p2, p3) => p1 + p2 + "\n" + p1 + " ".repeat(p2.length) + (nonStringRegExp.test(p3) ? p3 : "|" + p3)]
  ];
  replaces[4] = replaces[3];
  var lineof = (text) => {
    if (!text)
      return [-1, 2, text];
    const match = text.match(/^([\t ]*)(.+)$/);
    const indent = match[1].length;
    const value = match[2];
    if (/^-[\t ]*$/.test(value))
      return [indent, 1, ""];
    const keyMatch = value.match(/^([\$a-zA-Z_](?:\$|\w)*):[\t ]*$/);
    if (keyMatch) {
      return [indent, 0, `"${keyMatch[1].replace(/"/g, '\\"')}":`];
    }
    if (nonStringRegExp.test(value))
      return [indent, 2, (value === "on" || (value === "off" ? false : value)) + ""];
    return [indent, 2, `"${(value[0] === "|" ? value.slice(1) : value).replace('"', '\\"')}"`];
  };
  var y = (text) => {
    const stack = [];
    return JSON.parse(replaces.reduce((text2, [src, dest]) => text2.replace(src, dest), text).split("\n").map((text2) => {
      const line = lineof(text2);
      let prefix = "";
      while (stack.length && line[0] < stack[stack.length - 1][0]) {
        prefix += "}]"[stack.pop()[1]] || "";
      }
      if (!stack.length || line[0] > stack[stack.length - 1][0]) {
        stack.push(line);
        prefix += "{["[line[1]] || "";
      } else {
        prefix += ",,"[line[1]] || "";
      }
      return prefix + line[2];
    }).join(""));
  };

  // src/cdn/y.ts
  window.y = y;
})();

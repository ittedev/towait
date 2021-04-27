export const power = (operator: string): number => {
  switch (operator) {
    case '!': return 70
    case '*': case '/': case '%': return 60
    case '+': case '-': return 50
    case '<': case '>': case '<=': case '>=': return 40
    case '==': case '!=': case '===': case '!==': return 30
    case '&&': return 20
    case '||': return 10
  }
}

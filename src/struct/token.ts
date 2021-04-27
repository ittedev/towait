export const enum TokenType {
  dot,     // .
  leftSquare,  // [
  rightSquare, // ]
  leftRound,   // (
  rightRound,  // )
  pipe,        // |>
  comment,     // //~
  comma,       // ,
  exclamation, // !
  question,    // ?
  colon,       // :
  equal,       // =
  null,        // null
  undefined,   // undefined
  boolean,     // false, true
  block,       // block
  if,          // if
  else,        // else
  for,         // for
  in,          // in
  switch,      // switch
  case,        // case
  default,     // default
  include,     // include
  let,         // let
  var,         // var
  end,         // ;;
  number,      // 0, 1, 2, etc.,
  string,      // "~", '~'
  operator,    // +, -, *, /, %, ==, ===, !=, !==, <, >, <=, >=, ||, &&
  word,        // x
  space,       //
  partial,     // |, ;, &, '~, "~
  other        // other
}

export interface Token {
  type: TokenType
  value: string
}

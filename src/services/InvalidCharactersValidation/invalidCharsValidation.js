export function checkForIllegalChars(string) {
  const illegalChars = [
    ",",
    "#",
    "-",
    "!",
    "$",
    "%",
    "^",
    "*",
    "(",
    ")",
    "{",
    "}",
    "|",
    "[",
    "]",
    "\\",
    "<",
    ">",
    "/",
  ];
  let valid = true;
  for (let char of illegalChars) {
    if (string.includes(char)) {
      valid = false;
    }
  }
  return valid;
}

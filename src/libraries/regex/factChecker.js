// eslint-disable-next-line no-useless-escape
const factChecker = /(?<!(\b(?:Work cited|Works cited|Reference|References)\b)[\s\S]+)((?<=^|\s|\n)[^\n\.]+(\%|\d{4}(?!\)))[^\n\(\d{4}\)\.]*\.(?=\s?))(?!\n)/gi

export default factChecker;
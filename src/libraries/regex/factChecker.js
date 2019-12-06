// eslint-disable-next-line no-useless-escape
const factChecker = /((?<=^|\s|\n)[^\n\.]+(\%|\d{4}(?!\)))[^\n\(\d{4}\)\.]*\.(?=\s?))(?!\n)/gi

export default factChecker;
/* eslint-disable no-useless-escape */

let concludingSentencesRX = /(?<=(\.\s))(?!(.+)?(?:journal|\d{1,4}-\d{1,4}|\d{1,3}\(\d{1,3}\))(.+)?)([^\.]+)?\s?\b(?:example|instance|also|additionally|in addition|moreover|likewise|furthermore|besides|another|\d+)\b[^\.\n]+(\((.*)?\d{4}\))?(?=[.?!](\s{1,})?\n)/gi

export default concludingSentencesRX;
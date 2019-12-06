/* eslint-disable no-useless-escape */

let concludingSentencesRX = /(?<=(\.\s))([^\.]+)?\s?\b(?:example|instance|also|additionally|in addition|moreover|likewise|furthermore|besides|another|\d+)\b[^\s]+(\((.*)?\d{4}\))?[.?!](?=(\s{1,})?\n)/gi

export default concludingSentencesRX;
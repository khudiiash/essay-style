/* eslint-disable no-useless-escape */
const thesisRX = /(?<=(\.\s))(?!\.)([A-Za-z0-9%(),;&'\"\s]+)?\s?\b(?:paper|essay|research|analysis|discusses|analyzes|studies|examines|evaluates|example|instance|also|additionally|in addition|moreover|likewise|furthermore|besides|another|\d+)\b[A-Za-z0-9%(),;&'\"\s]+(\((.*)?\d{4}\))?[.?!](?=(\s{1,})?\n)/i

export default thesisRX
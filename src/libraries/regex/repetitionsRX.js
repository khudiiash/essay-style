// eslint-disable-next-line no-useless-escape
const repetitionsRX = /(?:(\b(?!this|that|those|these|thus|their|there|will|would|should|could|from|with)\w{4,})(?<=(?!span)\b\1\b[^\.\n]+)|\b(\w+)\s+\2\b)|((?<=\.\s)\b([A-Z][a-z]{4,}))(?<=(?!span)\.\s\b\4\b[\s\S]+)/gi
export default repetitionsRX
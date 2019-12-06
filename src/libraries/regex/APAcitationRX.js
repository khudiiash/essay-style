

/* eslint-disable no-useless-escape */

const APAcitation = /(?!\((?:\w+|\w+\-\w+)\,\s\d{4}(\,\sp\.\s\d+)?\)|\((?:\w+|\w+\-\w+)\s&\s(?:\w+|\w+\-\w+)\,\s\d{4}(\,\sp\.\s\d+)?\)|\(((?:\w+|\w+\-\w+)\,\s){2,4}&\s(?:\w+|\w+\-\w+)\,\s\d{4}(\,\sp\.\s\d+)?\)|\(([A-Z][a-z]+\s?){1,8}\,\s\d{4}(\,\sp\.\s\d+)?\)|\((?:\w+|\w+\-\w+)\set\sal\.\,\s\d{4}(\,\sp\.\s\d+)?\)|\((?:\"|\“).*\,(?:\"|\”)\s\d{4}(\,\sp\.\s\d+)?\)|\(\d{4}\))\([^\)]+\d{4}(\,[^\)\.\n]+)?\)/g

export default APAcitation;
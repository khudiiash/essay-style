/* eslint-disable no-useless-escape */
var reference = "Pritchard, M., & Holtzapple, M. (1997). Responsible engineering: Gilbane Gold revisited. Science and Engineering Ethics. TX. (3) 217-230."

const APARefs = {
    book: /^(\b[A-Z].+?(?=\,)\b\,\s([A-Z]\.\s?){1,3}\,?\s?\&?\s?){1,6}(?:\s\.{3}|\s\.\s\.\s\.\s)?(\b[A-Z]([a-z]+)\b\,\s([A-Z]\.\s?){1,3})?(\(\bEds\b\.\)\.)?\s\(\d{4}\)\.\s[A-Z].+?(?=\(\d{1,2}\bth\b\s\bed\b\.\))?(\(\d{1,2}\bth\b\s\bed\b\.\))?.+?(?=\.)\.(\s?\bIn\b.+?(?=(?:\(\bpp\b\.\s\d+\-\d+\)\.)|\.))?(\(\bpp\b\.\s\d+\-\d+\)\.)?\.?\s.+?(?=\:)\:\s.+?(?=\.)\./,

    journalArticle: /^(\b[A-Z].+?(?=\,)\b\,\s([A-Z]\.\s?){1,3}\,?\s?\&?\s?){1,6}(?:\s\.{3}|\s\.\s\.\s\.\s)?((?:[A-Z]([a-z]+)\-[A-Z]([a-z]+)|\b[A-Z]([a-z]+))\b\,\s([A-Z]\.\s?){1,3})?\s\(\d{4}\)\.\s(?:[A-Z]([a-z]+)|\d+)\s.+?(?=\.)\.\s(?:[A-Z]([a-z]+)|\d+)\s.+?(?=\,)\,\s\d{1,4}(\(\d{1,4}\))?\,\s\d{1,5}\-\d{1,5}\./,
    
    onlineArticle: /^((\b[A-Z].+?(?=\,)\b\,\s([A-Z]\.\s?){1,3}\,?\s?\&?\s?){1,6})?(\b((?!\b[a-z]+\b|\d|\b[A-Z]+\b).)*)?\s\(\d{4}\)\.\s(?:[A-Z]([a-z]+)|\d+)\s.+?(?=\.)(\.\s.+?(?=\.))?\.\s\bRetrieved\b\s\bfrom\s?\$?\s?https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/

}

export default APARefs

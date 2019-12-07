/* eslint-disable no-useless-escape */
const MLAcitationRX = /(?!(?:\(((qtd. in )?(?:[A-Z][a-z]+|[A-Z][a-z]+\-[A-Z][a-z]+)(\set\sal\.)?(\s\band\b\s(?:[A-Z][a-z]+|[A-Z][a-z]+\-[A-Z][a-z]+))?(\s\d+)?(;\s)?){1,4}\)|\(\d+(;\sch\.\s\d+)?\)|\((?:"|“)(\w+\s?)+(?:"|”)(\s\d+)?\)))\((?![A-Z]{2,})[^\)\.]+\)/g

export default MLAcitationRX
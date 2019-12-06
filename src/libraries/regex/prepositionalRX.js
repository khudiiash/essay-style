let prepositionalRX = [
    /([a-zA-Z]+\s?\b)\s\bfor\b\s([a-zA-Z]+\s?\b){1,3}\s\bwould\b\s\bbe\b/gi,
//the best outcome for this scenario would be an incremental withdrawal
   /([a-zA-Z]+\s?\b)\s\bof\b\s([a-zA-Z]+\s?\b){1,3}\s\bof\b\s([a-zA-Z]+\s?\b){1,2}/gi,
// the effect of the influence of corporation on state politics
    /([a-zA-Z]+\s?\b){1,2}\s\bof\b\s([a-zA-Z]+\s?\b){1,3}\s\bon\b\s([a-zA-Z]+\s?\b){1,3}\s\bof\b\s([a-zA-Z]+\s?\b){1,2}/gi
// the impact of the strategies on the psychology of the employees
    ]
export default prepositionalRX
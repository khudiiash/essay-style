import withoutReferences from './withoutReferences'

export default function checkPrepositional(text, suggestions) {

    text = withoutReferences(text)
    let matches = [],
        currentIndices = [],
        current = [],

        prep1 = /([a-zA-Z]+\s?\b)\s\bfor\b\s([a-zA-Z]+\s?\b){1,3}\s\bwould\b\s\bbe\b/gi,
        //the best outcome for this scenario would be an incremental withdrawal

        prep2 = /([a-zA-Z]+\s?\b)\s\bfor\b\s([a-zA-Z]+\s?\b){1,3}\s\bto\b\s([a-zA-Z]+\s?\b){1,2}/gi,
        // It is unethical for geese to do that

        prep3 = /([a-zA-Z]+\s?\b)\s\bof\b\s([a-zA-Z]+\s?\b){1,3}\s\bof\b\s([a-zA-Z]+\s?\b){1,2}/gi
        // the effect of the influence of corporation on state politics'

    let preps = [prep1, prep2, prep3]

    for (var g = 0; g < suggestions.length; g++) {
        current.push(suggestions[g].index);
    }
    for (var p = 0; p < preps.length; p++) {

        if ([...text.matchAll(preps[p])] && [...text.matchAll(preps[p])].length > 0) {
            for (var c = 0; c < matches.length; c++) {
                currentIndices.push(matches[c].index)
            }
            for (var m = 0; m < [...text.matchAll(preps[p])].length; m++) {

                if (!currentIndices.includes([...text.matchAll(preps[p])][m].index)) {
                    matches.push([...text.matchAll(preps[p])][m])
                }
            }
        }
    }
    for (var i = 0; i < matches.length; i++) {
        if (!current.includes(matches[i].index)) {

            suggestions.unshift({
                index: matches[i].index,
                offset: matches[i][0].length,
                reason: "Rephrase with fewer prepositions",
                type: 'sentence'
            })
        }
    }
    return suggestions
}


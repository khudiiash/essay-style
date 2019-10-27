import getIndicesOf from './getIndicesOf'
const nlp = require('compromise')

export default function checkWordOrder (text,suggestions) {
    let allInfinitives = [...text.matchAll(/\bto\b\s\w+\s\w+/gi)],
        allAdverbials = [...text.matchAll(/\bit\b\s\w+\s\w+/gi)],
        allToMatch = allInfinitives.concat(allAdverbials),
        current = [];

    
    for (var g = 0; g < suggestions.length; g++) {
        current.push(suggestions[g].index);
    }

    for ( var i = 0; i < allToMatch.length; i++ ) {
        let phrase = allToMatch[i]
        let {list:[{terms}]} = nlp(phrase[0])       
        if ((terms[0]._text === 'to' || terms[0]._text === 'it' || terms[0]._text === 'To' || terms[0]._text === 'It') && Object.keys(terms[1].tags)[0]==='Adverb' && Object.keys(terms[2].tags).includes('Verb')) {
            
            let wrongInfinitive = `${terms[0]._text} ${terms[1]._text} ${terms[2]._text}`
            let indices = getIndicesOf(text,wrongInfinitive)
           
            for (var b = 0; b < indices.length; b++) {
                if (!current.includes(indices[b])) {
                    suggestions.unshift({
                        index:indices[b],
                        offset:wrongInfinitive.length,
                        reason: `Wrong word order: ${terms[0]._text} ${terms[2]._text} ${terms[1]._text}`,
                        type: "punctuation"
                    })
                }
            }
        }
    }

    return suggestions
}
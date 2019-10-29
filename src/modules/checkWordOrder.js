import getIndicesOf from './getIndicesOf'
const nlp = require('compromise')

export default function checkWordOrder (text,suggestions) {
    let allInfinitives = [...text.matchAll(/\bto\b\s\w+\s\w+/gi)],
        thatIsVerb = [...text.matchAll(/\w+\s\b(?:that|which)\b\s\b(?:is|are)\b\s\w*ed/gi)]
        

    for ( var i = 0; i < allInfinitives.length; i++ ) {
        let phrase = allInfinitives[i]
        let {list:[{terms}]} = nlp(phrase[0])       
        if (Object.keys(terms[1].tags)[0]==='Adverb' && Object.keys(terms[2].tags).includes('Infinitive')) {
            
            let wrongInfinitive = `${terms[0]._text} ${terms[1]._text} ${terms[2]._text}`
            let indices = getIndicesOf(text,wrongInfinitive)
           
            for (var b = 0; b < indices.length; b++) {
                let current = [];
                for (var g = 0; g < suggestions.length; g++) {
                    current.push(suggestions[g].index);
                }   
                if (!current.includes(indices[b])) {
                    suggestions.unshift({
                        index:indices[b],
                        offset:wrongInfinitive.length,
                        reason: `Wrong word order: ${terms[0]._text} ${terms[2]._text} ${terms[1]._text}`,
                        type: "grammar"
                    })
                }
            }
        }
    }

    for ( var t = 0; t < thatIsVerb.length; t++ ) {
        let phrase = thatIsVerb[t]
            let index = phrase.index
            let {list:[{terms}]} = nlp(phrase[0])

            let current = [];
                for (g = 0; g < suggestions.length; g++) {
                    current.push(suggestions[g].index);
                }   
                if (!current.includes(index)) {
                    suggestions.unshift({
                        index: index,
                        offset: phrase[0].length,
                        reason: `Replace with "${terms[0]._text} ${terms[3]._text}" or "${terms[3]._text} ${terms[0]._text}" depending on the context`,
                        type: "grammar"
                    })
            
                }
            }
    return suggestions
}

import replace from '../../libraries/replace'
const nlp = require('compromise')

export default function checkWordOrder (text) {
    let wordOrder = []
    let allInfinitives = [...text.matchAll(/\bto\b\s\w+\s\w+/gi)],
        thatIsVerb = [...text.matchAll(/\w+\s\b(?:that|which)\b\s\b(?:is|are)\b\s\w+/gi)],
        twoVerbs =[...text.matchAll(/\bto\b\s\w+\s\bto\b\s\w+/)],
        thoseWhoAre = [...text.matchAll(/\bthose\b\s\bwho\b\s\bare\b\s(\w+\s?){1,4}/gi)], // to-do
        replaceWords = []; // stores all keywords from "replace" lib to avoid conflicts
        for (var r = 0; r< replace.length; r++) {
            let obj = replace[r];
            replaceWords.push(Object.keys(obj)[0])
        }
    try {
        for ( var i = 0; i < allInfinitives.length; i++ ) {
            let phrase = allInfinitives[i]
            let {list:[{terms}]} = nlp(phrase[0])       
            if (Object.keys(terms[1].tags)[0]==='Adverb' && (Object.keys(terms[2].tags).includes('Infinitive') || terms[2]._text === 'one')) {
                let wrongInfinitive = `${terms[0]._text} ${terms[1]._text} ${terms[2]._text}`              
                wordOrder.unshift(wrongInfinitive)
            }
        }
    } catch (e) {console.log(e)}
    
    try {
        for ( var t = 0; t < thatIsVerb.length; t++ ) {
            let phrase = thatIsVerb[t]
                let {list:[{terms}]} = nlp(phrase[0])
    
                if (!replaceWords.includes(terms[3]._text) && terms[3]._text.length>3 && !Object.keys(terms[3].tags).includes('QuestionWord') && !Object.keys(terms[3].tags).includes('Adverb')) {
                    wordOrder.unshift(phrase[0])
                }
                }
    } catch(e) {console.log(e)}
    

    for ( var h = 0; h < twoVerbs.length; h++ ) {
        let phrase = twoVerbs[h]
            let {list:[{terms}]} = nlp(phrase[0])           
            if (Object.keys(terms[1].tags).includes('Infinitive') && Object.keys(terms[3].tags).includes('Infinitive')) {
                wordOrder.unshift(phrase[0])
            }
    }
    return wordOrder
}
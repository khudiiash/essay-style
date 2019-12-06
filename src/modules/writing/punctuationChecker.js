
import findInnerIndex from '../checking/findInnerIndex'
import transitions from '../../libraries/transitions'
import withoutReferences from '../checking/withoutReferences';

const suggestions = [", that", ", because",", then"];
const nlp = require('compromise')


export default function punctuationChecker(text) {
    text = withoutReferences(text)

  
    var sentences = text.split(". ");
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i];
      try {
        let {list:[{terms}]} = nlp(sentence)
        for (var t = 1; t < terms.length; t++ ) {
          if (terms[t]._text === 'which' && Object.keys(terms[t-1].tags).includes('Noun') && !terms[t-1]._text.includes(',')) {
                suggestions.unshift(`${terms[t-1]._text} ${terms[t]._text}`)
            }

        } 
      } catch (e) {
        console.log(e)
      }
       
    }
  
    return suggestions;
  } 

import findInnerIndex from './findInnerIndex'
import transitions from '../libraries/transitions'
import withoutReferences from './withoutReferences';

const punctuationMistakes = [", that", ", because",", then"];
const nlp = require('compromise')


export default function punctuationChecker(text, suggestions) {
    text = withoutReferences(text)


    var current = [];
    for (var g = 0; g < suggestions.length; g++) {
      current.push(suggestions[g].index);
    }
  
    var sentences = text.split(". ");
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i];
      
      for (var p = 0; p < punctuationMistakes.length; p++) {
        var miscoma = punctuationMistakes[p];
        if (sentence.includes(miscoma)) {
         
          var pIndex = findInnerIndex(text, sentence, miscoma);
          
          if (!current.includes(pIndex)) {
            suggestions.unshift({
              index: pIndex,
              offset: miscoma.length,
              reason: "There must be no comma",
              type: 'grammar'
            });
          }
        }
      }
      for (let g = 0; g < transitions.length; g++) {
        if (sentence.includes(transitions[g] + " ")) {
          if (
            sentence.includes(",") &&
            sentence.split(",")[0] !== transitions[g]
          ) {
            suggestions.unshift({
              index: text.indexOf(sentence),
              offset: transitions[g].length,
              reason: `Use a comma to separate the introductory clause: ${
                transitions[g]
              }, ${sentence.split(transitions[g] + " ")[1].split(" ")[0] +
                " " +
                sentence.split(transitions[g] + " ")[1].split(" ")[1]}...`,
                type: 'grammar'
            });
            continue;
          }
        }
      }
      try {
        let {list:[{terms}]} = nlp(sentence)
        for (var t = 1; t < terms.length; t++ ) {
          if (terms[t]._text === 'which' && Object.keys(terms[t-1].tags).includes('Noun') && !terms[t-1]._text.includes(',')) {
              let index = findInnerIndex(text,sentence,'which')
  
              current = [];
              for (g = 0; g < suggestions.length; g++) {
                current.push(suggestions[g].index);
              }
              if (!current.includes(index)) {
                suggestions.unshift({
                  index:index,
                  offset: 5,
                  reason: `Since it is a restrictive clause, use "that" instead of "which"`,
                  type: 'grammar'
                })
              }
            }
        } 
      } catch (e) {
        console.log(e)
      }
       
    }
  
    return suggestions;
  } 
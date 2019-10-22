
import findInnerIndex from './findInnerIndex'
import transitions from '../libraries/transitions'
const punctuationMistakes = [", that", ", because"];

export default function punctuationChecker(text, suggestions) {
    if (text.includes("References")) {
      text = text.split("References")[0];
    } else if (text.includes("Reference")) {
      text = text.split("Reference")[0];
    } else if (text.includes("Work Cited")) {
      text = text.split("Work Cited")[0];
    } else if (text.includes("Works Cited")) {
      text = text.split("Works Cited")[0];
    }
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
              reason: "There must be no comma"
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
                sentence.split(transitions[g] + " ")[1].split(" ")[1]}...`
            });
            continue;
          }
        }
      }
    }
  
    return suggestions;
  }
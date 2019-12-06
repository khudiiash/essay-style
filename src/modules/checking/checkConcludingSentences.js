/* eslint-disable no-useless-escape */

import getLastSentences from './getLastSentences'
import checkThesisStatement from './checkThesisStatement'
import isCitationInSentence from './isCitationInSentence'
import withoutReferences from './withoutReferences'

export default function checkConcludingSentences(text, suggestions) {
    text = withoutReferences(text)
    let concludingSentences = getLastSentences(text);
    suggestions = checkThesisStatement(text, concludingSentences[0], suggestions);
    for (var i = 1; i < concludingSentences.length; i++) {
      let sentence = concludingSentences[i];
      if (isCitationInSentence(sentence)) {
        suggestions.unshift({
          index: text.indexOf(sentence),
          offset: sentence.length,
          reason: "Concluding sentence must not be a citation",
          type: 'structure'
        });
      }
      var current = [];
      for (var g = 0; g < suggestions.length; g++) {
        current.push(suggestions[g].index);
      }
      if (
        (  /\b(?:instance|example|also|addition|moreover|furthermore|besides|another)\b/i.test(sentence)  ||
          /[^\s()]+(?=[^()]*\))/.test(sentence) ||
          /\((\d{4})\)/.test(sentence) ||
          /\%/.test(sentence)) &&
        !current.includes(text.indexOf(sentence))
      ) {

        suggestions.unshift({
          index: text.indexOf(sentence),
          offset: sentence.length,
          reason:
            "Concluding sentence must sum up the paragraph, so do not conclude paragraphs with examples, evidence, or new facts.",
            type: 'structure'
        });
      }
    }
    return suggestions;
  }
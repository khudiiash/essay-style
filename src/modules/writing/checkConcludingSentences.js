/* eslint-disable no-useless-escape */

import getLastSentences from './getLastSentences'
import checkThesisStatement from './checkThesisStatement'
import isCitationInSentence from './isCitationInSentence'
import withoutReferences from './withoutReferences'

export default function checkConcludingSentences(text) {
    let sentences = []
    text = withoutReferences(text)
    let concludingSentences = getLastSentences(text);
    sentences = checkThesisStatement(concludingSentences[0], sentences);
    for (var i = 1; i < concludingSentences.length; i++) {
      let sentence = concludingSentences[i];
      if (isCitationInSentence(sentence)) {
        sentences.unshift(sentence);
      }

      if (
        (  /\b(?:instance|example|also|moreover|furthermore|besides|another)\b/i.test(sentence)  ||
          /[^\s()]+(?=[^()]*\))/.test(sentence) ||
          /\((\d{4})\)/.test(sentence) ||
          /\%/.test(sentence))
      ) {
        sentences.unshift(sentence);
      }
    }
    
    return sentences;
  }
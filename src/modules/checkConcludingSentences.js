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
          type: 'sentence'
        });
      }
      var current = [];
      for (var g = 0; g < suggestions.length; g++) {
        current.push(suggestions[g].index);
      }
      if (
        (   sentence.includes("Also,") ||
        sentence.includes("Besides,") ||
        sentence.includes("For example") ||
        sentence.includes("for example") ||
        sentence.includes("For instance") ||
        sentence.includes("for instance") ||
        sentence.includes("Moreover,") || 
        sentence.includes("It is also") || 
        sentence.includes("It has also") || 
        sentence.includes("It was also") || 
        sentence.includes("Another") || 
        sentence.includes("In addition") || 
        sentence.includes("Furthermore") || 
        sentence.includes("It is worth mentioning that") || 
        sentence.includes("Additionally") || 
        sentence.includes("They also") || 
        sentence.includes("They have also") || 
        sentence.includes("There was also") || 
        sentence.includes("There were also") || 
        sentence.includes("There is also") || 
        sentence.includes("He also") || 
        sentence.includes("He had also") || 
        sentence.includes("She also") || 
        sentence.includes("She had also") || 
        sentence.includes("And") || 
        sentence.includes("But") ||        
        sentence.includes("According to") ||        
        sentence.includes("In the study")  ||
          /[^\s()]+(?=[^()]*\))/.test(sentence) ||
          /\((\d{4})\)/.test(sentence) ||
          /\%/.test(sentence) ||
          sentence.includes("It has been identified that")) &&
        !current.includes(text.indexOf(sentence))
      ) {
        suggestions.unshift({
          index: text.indexOf(sentence),
          offset: sentence.length,
          reason:
            "Concluding sentence must sum up the paragraph, so do not conclude paragraphs with examples, evidence, or new facts.",
            type: 'sentence'
        });
      }
    }
    return suggestions;
  }
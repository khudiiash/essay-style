/* eslint-disable no-useless-escape */
import isCitationInSentence from './isCitationInSentence'
import purposeKeys from "../../libraries/thesis-check";


export default function checkThesisStatement(text, thesisStatement, suggestions) {
    if (thesisStatement) {
      var index = text.indexOf(thesisStatement);
      for (let i = 0; i < purposeKeys.length; i++) {
        if (isCitationInSentence(thesisStatement)) {
          suggestions.unshift({
            index: index,
            offset: thesisStatement.length,
            reason: "Thesis statement must not be a citation",
            type: 'structure'
          });
          return suggestions;
        }
        if (thesisStatement.includes(purposeKeys[i])) {
          suggestions.unshift({
            index: index,
            offset: thesisStatement.length,
            reason:
              "This is a purpose statement. Remember that you have to use a thesis statement",
            type: 'structure'
          });
          return suggestions;
        }
      }
  
      if (/\b(?:instance|example|also|moreover|furthermore|besides|additionally|another|review|paper|essay|research|analyse|analysis|discuss)\b/i.test(thesisStatement) ||
          /\%/.test(thesisStatement)
      ) {
        suggestions.unshift({
          index: index,
          offset: thesisStatement.length,
          reason:
            "Incorrect thesis statement. You must have presented a central claim on the topic",
          type: 'structure'
        });
      }
    }
    return suggestions;
  }
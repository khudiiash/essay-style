/* eslint-disable no-useless-escape */
import isCitationInSentence from './isCitationInSentence'
import purposeKeys from "../../libraries/thesis-check";


export default function checkThesisStatement(thesisStatement, sentences) {
    if (thesisStatement) {
      for (let i = 0; i < purposeKeys.length; i++) {
        if (isCitationInSentence(thesisStatement)) 
            {sentences.unshift(thesisStatement);
          return sentences;
        }
        if (thesisStatement.includes(purposeKeys[i])) {
            sentences.unshift(thesisStatement);
          return sentences;
        }
      }
  
      if (/\b(?:instance|example|also|moreover|furthermore|besides|additionally|another|review|paper|essay|research|analyse|analysis|discuss)\b/i.test(thesisStatement) ||
          /\%/.test(thesisStatement)
      ) {
        sentences.unshift(thesisStatement);
      }
    }
    return sentences;
  }
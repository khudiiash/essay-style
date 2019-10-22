import isCitationInSentence from './isCitationInSentence'
import purposeKeys from "../libraries/thesis-check";

export default function checkThesisStatement(text, thesisStatement, suggestions) {
    if (thesisStatement) {
      var index = text.indexOf(thesisStatement);
      for (let i = 0; i < purposeKeys.length; i++) {
        if (isCitationInSentence(thesisStatement)) {
          suggestions.unshift({
            index: index,
            offset: thesisStatement.length,
            reason: "Thesis statement must not be a citation"
          });
          return suggestions;
        }
        if (thesisStatement.includes(purposeKeys[i])) {
          suggestions.unshift({
            index: index,
            offset: thesisStatement.length,
            reason:
              "This is a purpose statement. Remember that you have to use a thesis statement"
          });
          return suggestions;
        }
      }
  
      if (
        thesisStatement.includes("Also,") ||
        thesisStatement.includes("Besides,") ||
        thesisStatement.includes("For Example,") ||
        thesisStatement.includes("For instance,") ||
        thesisStatement.includes("Moreover,")
      ) {
        suggestions.unshift({
          index: index,
          offset: thesisStatement.length,
          reason:
            "Incorrect thesis statement. You must have presented a central argument on the topic"
        });
      }
    }
    return suggestions;
  }
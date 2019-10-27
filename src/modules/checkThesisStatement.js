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
              "This is a purpose statement. Remember that you have to use a thesis statement",
            type: 'sentence'
          });
          return suggestions;
        }
      }
  
      if (
        thesisStatement.includes("Also,") ||
        thesisStatement.includes("Besides,") ||
        thesisStatement.includes("For example,") ||
        thesisStatement.includes("For instance,") ||
        thesisStatement.includes("Moreover,") || 
        thesisStatement.includes("It is also") || 
        thesisStatement.includes("In addition") || 
        thesisStatement.includes("Furthermore") || 
        thesisStatement.includes("It is worth mentioning that") || 
        thesisStatement.includes("Additionally") || 
        thesisStatement.includes("They also") || 
        thesisStatement.includes("They have also") || 
        thesisStatement.includes("He also") || 
        thesisStatement.includes("He had also") || 
        thesisStatement.includes("She also") || 
        thesisStatement.includes("She had also") || 
        thesisStatement.includes("And") || 
        thesisStatement.includes("But") ||        
        thesisStatement.includes("According to") ||        
        thesisStatement.includes("In the study")          

      ) {
        suggestions.unshift({
          index: index,
          offset: thesisStatement.length,
          reason:
            "Incorrect thesis statement. You must have presented a central claim on the topic",
          type: 'sentence'
        });
      }
    }
    return suggestions;
  }
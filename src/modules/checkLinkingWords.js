import getIndicesOf from './getIndicesOf'
import transitions from '../libraries/transitions'
import withoutReferences from './withoutReferences'

const linkingWords = [];
transitions.forEach(function(word) {
  var cutWord = word.slice(1, word.length);
  word = word[0].toLowerCase() + cutWord;
  if (word !== "it is") {
    linkingWords.push(word);
  }
});

export default function checkLinkingWords(text, suggestions) {
    text = withoutReferences(text)
    
    var exceptions = ["further", "often"];
  
    for (var i = 0; i < linkingWords.length; i++) {
      var linkWord = linkingWords[i];
  
      if (text.includes(" " + linkWord + " ")) {
        var indexes = getIndicesOf(text, " " + linkWord + " ");
        var current = [];
        for (var g = 0; g < suggestions.length; g++) {
          current.push(suggestions[g].index);
        }
        for (var k = 0; k < indexes.length; k++) {
          if (
            !current.includes(indexes[k] + 1) &&
            !exceptions.includes(linkWord)
          ) {
            if (
              (text.substring(
                indexes[k] + 1,
                indexes[k] + 1 + linkWord.length
              ) === "thus" ||
                text.substring(
                  indexes[k] + 1,
                  indexes[k] + 1 + linkWord.length
                ) === "hence") &&
              text
                .substring(indexes[k] + 1, text.length - 1)
                .split(" ")[1]
                .includes("ing")
            ) {
              continue;
            }
            if (!linkWord.includes("ly") && !current.includes(indexes[k] + 1)) {
              suggestions.unshift({
                index: indexes[k] + 1,
                offset: linkWord.length,
                reason: "Linking words must be separated by commas",
                type: 'grammar'
              });
            }
          }
        }
      }
    }
    return suggestions;
  }
import getIndicesOf from './getIndicesOf'

export default function checkAmerican(text, suggestions) {
    var americanisms = ["America", "American", "Americans"];
  
    for (var a = 0; a < americanisms.length; a++) {
      var word = americanisms[a];
      if (text.includes(word)) {
        let indices = getIndicesOf(text, word);
        for (var c = 0; c < indices.length; c++) {
          if (
            !text.substring(indices[c] - 15, indices[c]).includes("African") &&
            !text.substring(indices[c] - 15, indices[c]).includes("Native") &&
            !text.substring(indices[c] - 15, indices[c]).includes("North") &&
            !text.substring(indices[c] - 15, indices[c]).includes("South") &&
            !text.substring(indices[c] - 15, indices[c]).includes("East") &&
            !text.substring(indices[c] - 15, indices[c]).includes("West")
          ) {
            suggestions.unshift({
              index: indices[c],
              offset: word.length,
              reason:
                'Write "the US" or "the United States of America", but never "America" alone'
            });
          }
        }
      }
    }
    return suggestions;
  }
  
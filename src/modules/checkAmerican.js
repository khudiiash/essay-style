import getIndicesOf from './getIndicesOf'
import withoutReferences from './withoutReferences';

export default function checkAmerican(text, suggestions) {
  text = withoutReferences(text)
  var word = "America ";
  if (text.includes(word)) {
    let indices = getIndicesOf(text, word);
    for (var c = 0; c < indices.length; c++) {
      if (
        !text.substring(indices[c] - 10, indices[c]).includes("North") &&
        !text.substring(indices[c] - 10, indices[c]).includes("South") &&
        !text.substring(indices[c] - 10, indices[c]).includes("East") &&
        !text.substring(indices[c] - 10, indices[c]).includes("West")
      ) {
        var current = [];
        for (var g = 0; g < suggestions.length; g++) {
          current.push(suggestions[g].index);
        }
        if (!current.includes(indices[c])) {
          suggestions.unshift({
            index: indices[c],
            offset: word.length,
            reason:
              'Write "the US" or "the United States of America", but never "America" alone',
            type: 'Style'
          });
        }
      }
    }
  }

  return suggestions;
}

import getIndicesOf from './getIndicesOf'
import prepositions from '../libraries/prepositions';

const conjunctions = ["and", "but", "for", "norm", "of", "so"];


export default function checkRepetitions(text, suggestions) {
    const exceptions = [
      "this",
      "that",
      "with",
      "been",
      "whose",
      "thus",
      "they",
      "them",
      "will"
    ];
    if (text.includes("References")) {
      text = text.split("References")[0];
    } else if (text.includes("Reference")) {
      text = text.split("Reference")[0];
    } else if (text.includes("Work Cited")) {
      text = text.split("Work Cited")[0];
    } else if (text.includes("Works Cited")) {
      text = text.split("Works Cited")[0];
    }
    var inds = [];
  
    var sentences = text.split(". ");
  
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i];
      var loweredSentence = sentence.toLowerCase();
  
      var words = loweredSentence.split(" ");
  
      if (
        (sentence.includes("book") || sentence.includes("Book")) &&
        /“([^\\”]|\\”)*”/.test(sentence)
      ) {
        var baseIndex = text.indexOf(sentence);
        var firstQuoteIndex = baseIndex + sentence.indexOf("“");
        var secondQuoteIndex = baseIndex + sentence.indexOf("”");
        var offset = secondQuoteIndex - firstQuoteIndex + 1;
  
        suggestions.unshift({
          index: firstQuoteIndex,
          offset: offset,
          reason: "Book titles must be italicized without quotation marks",
          type: 'mistake'
        });
      }
  
      if (
        (sentence.includes("movie") ||
          sentence.includes("Movie") ||
          sentence.includes("film") ||
          sentence.includes("Film")) &&
        /“([^\\”]|\\”)*”/.test(sentence)
      ) {
        baseIndex = text.indexOf(sentence);
        firstQuoteIndex = baseIndex + sentence.indexOf("“");
        secondQuoteIndex = baseIndex + sentence.indexOf("”");
        offset = secondQuoteIndex - firstQuoteIndex + 1;
  
        suggestions.unshift({
          index: firstQuoteIndex,
          offset: offset,
          reason: "Movie titles must be italicized without quotation marks",
          type: 'mistake'
        });
      }
  
      for (var k = 0; k < words.length; k++) {
        var word = words[k];
        var howMany = loweredSentence.split(word).length - 1;
  
        if (word.length > 3 && howMany > 1) {
          var preIndex = text.indexOf(sentence),
            afterIndex = preIndex + sentence.length,
            indices = getIndicesOf(text, word);
          var current = [];
          for (var g = 0; g < suggestions.length; g++) {
            current.push(suggestions[g].index);
          }
          indices.sort();
  
          for (var j = 0; j < indices.length; j++) {
            if (
              indices[j] > preIndex - sentence.length &&
              indices[j] < afterIndex &&
              !current.includes(indices[j]) &&
              !prepositions.includes(word)
            ) {
              if (
                !conjunctions.includes(word) &&
                !prepositions.includes(word) &&
                !current.includes(indices[j]) &&
                !exceptions.includes(word)
              )
                suggestions.unshift({
                  index: indices[j],
                  offset: word.length,
                  reason: "Repetition",
                  type: 'repetition'
                });
            }
          }
        }
      }
    }
    for (var r = 0; r < inds.length; r++) {
      if (r % 2 !== 0 && r > 0) {
      }
    }
    return suggestions;
  }
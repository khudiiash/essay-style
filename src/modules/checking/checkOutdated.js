import getIndicesOf from './getIndicesOf';

export default function checkOutdated(text, suggestions) {
    var currentYear = new Date().getFullYear();
  
    for (var i = 1960; i < currentYear - 10; i++) {
      if (text.includes(`${i.toString()})`)) {
        var occurences = getIndicesOf(text, `${i})`);
  
        if (occurences.length > 0) {
          var current = [];
          for (var g = 0; g < suggestions.length; g++) {
            current.push(suggestions[g].index);
          }
          for (var k = 0; k < occurences.length; k++) {
            if (!current.includes(occurences[k])) {
              suggestions.unshift({
                index: occurences[k],
                offset: 4,
                reason:
                  "Outdated source; use only sources published within the last 10 years",
                type: 'formatting'
              });
            }
          }
        }
      }
    }
    return suggestions;
  }
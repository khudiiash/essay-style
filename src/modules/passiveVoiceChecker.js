import irregular from '../libraries/irregular'


export default function passiveVoiceChecker(text, suggestions) {
  var matches = [];
  for (var i = 0; i < irregular.length; i++) {
    
    var beIrrBy = new RegExp("\\b(?:be|are|were|was|is|being)\\b\\s\\b" + irregular[i] + "\\b\\s\\bby\\b", "g"),
        IrrBy = new RegExp("\\b(?!be|are|were|was|is|being\\b)\\w+\\s" + irregular[i] + "\\b\\s\\bby\\b", "g");

    if (text.includes(irregular[i])) {
      if ([...text.matchAll(beIrrBy)].length > 0)
        matches.push([...text.matchAll(beIrrBy)]);
      if ([...text.matchAll(IrrBy)].length > 0)
        matches.push([...text.matchAll(IrrBy)]);
    }
  }

  var beEdBy=/\b(?:be|are|were|was|is|being)\b\s\w*ed\b\s\bby\b/g;
  matches.push([...text.matchAll(beEdBy)]);
  var edBy = /\b(?!be|are|were|was|is|being\b)\w+\s\w*ed\b\s\bby\b/g;
  matches.push([...text.matchAll(edBy)]);
 
  var current = [];

  for (var g = 0; g < suggestions.length; g++) {
    current.push(suggestions[g].index);
  }
  for (var p = 0; p < matches.length; p++) {
    for (var u = 0; u < matches[p].length; u++) {
      if (!current.includes(matches[p][u].index)) {
          suggestions.unshift({
            index: matches[p][u].index,
            offset: matches[p][u][0].length,
            reason: `"${matches[p][u][0]}" can be passive voice`,
            type: 'academicStyle'
          });
          
        }
      }
  }
  return suggestions;
}


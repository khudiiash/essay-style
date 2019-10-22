import irregular from '../libraries/irregular'


export default function passiveVoiceChecker(text, suggestions) {
    var matches = [];
  
    for (var i = 0; i < irregular.length; i++) {
      var areIrr = new RegExp("\\b\\w*are\\b\\s\\b" + irregular[i] + "\\b", "g");
      var isIrr = new RegExp("\\b\\w*is\\b\\s\\b" + irregular[i] + "\\b", "g");
      var wasIrr = new RegExp("\\b\\w*was\\b\\s\\b" + irregular[i] + "\\b", "g");
      var wereIrr = new RegExp(
        "\\b\\w*were\\b\\s\\b" + irregular[i] + "\\b",
        "g"
      );
      var beIrr = new RegExp("\\bbe\\b\\s\\b" + irregular[i] + "\\b", "g");
      var beingIrr = new RegExp("\\bbeing\\b\\s\\b" + irregular[i] + "\\b", "g");
  
      if (text.includes(irregular[i])) {
        if ([...text.matchAll(areIrr)].length > 0)
          matches.push([...text.matchAll(areIrr)]);
        if ([...text.matchAll(isIrr)].length > 0)
          matches.push([...text.matchAll(isIrr)]);
        if ([...text.matchAll(wasIrr)].length > 0)
          matches.push([...text.matchAll(wasIrr)]);
        if ([...text.matchAll(wereIrr)].length > 0)
          matches.push([...text.matchAll(wereIrr)]);
        if ([...text.matchAll(beIrr)].length > 0)
          matches.push([...text.matchAll(beIrr)]);
        if ([...text.matchAll(beingIrr)].length > 0)
          matches.push([...text.matchAll(beingIrr)]);
      }
    }
  
    var edBy = /\w*ed\b\s\bby/g;
    matches.push([...text.matchAll(edBy)]);
    var areEd = /\bare\b\s\w*ed\b/g;
    matches.push([...text.matchAll(areEd)]);
    var wereEd = /\bwere\b\s\w*ed\b/g;
    matches.push([...text.matchAll(wereEd)]);
    var wasEd = /\b\was\b\s\w*ed\b/g;
    matches.push([...text.matchAll(wasEd)]);
    var isEd = /\bis\b\s\w*ed\b/g;
    matches.push([...text.matchAll(isEd)]);
    var beingEd = /\bbeing\b\s\w*ed\b/g;
    matches.push([...text.matchAll(beingEd)]);
    var current = [];
    for (var g = 0; g < suggestions.length; g++) {
      current.push(suggestions[g].index);
    }
    for (var p = 0; p < matches.length; p++) {
      for (var u = 0; u < matches[p].length; u++) {
            
          suggestions.unshift({
            index: matches[p][u].index,
            offset: matches[p][u][0].length,
            reason: `"${matches[p][u][0]}" can be passive voice`
          });
      }
    }
    return suggestions;
  }


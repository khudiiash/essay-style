import isCapitalized from './isCapitalized'
import countBrackets from './countBrackets'
import checkAPA from './checkAPA'
import checkMLA from './checkMLA'


export default function checkReferences(text, suggestions) {
    let references = [],
      referencePage,
      style;
  
    if (text.includes("References")) {
      referencePage = text.split("References")[1];
      style = "APA";
    } else if (text.includes("Reference")) {
      referencePage = text.split("Reference")[1];
      style = "APA";
    } else if (text.includes("REFERENCES")) {
        referencePage = text.split("Reference")[1];
        style = "APA";
    } else if (text.includes("Work Cited")) {
      referencePage = text.split("Work Cited")[1];
      style = "MLA";
    } else if (text.includes("Works Cited")) {
      referencePage = text.split("Works Cited")[1];
      style = "MLA";
    }else if (text.includes("Works cited")) {
      referencePage = text.split("Works Cited")[1];
      style = "MLA";
    }else if (text.includes("Works cited")) {
      referencePage = text.split("Works Cited")[1];
      style = "MLA";
    }else if (text.includes("Work cited")) {
      referencePage = text.split("Works Cited")[1];
      style = "MLA";
    }else if (text.includes("Work cited")) {
      referencePage = text.split("Works Cited")[1];
      style = "MLA";
    }
  
    if (referencePage) {
      referencePage = referencePage.split(/\n/);
      referencePage.forEach(function(ref) {
        if (ref.length > 12) {
          references.unshift(ref);
        }
      });
  
      var referenceTitle, referenceJournal;
      for (var i = 0; i < references.length; i++) {
        var reference = references[i];
  
        if (style === "APA") {
          if (/\((\d{4})\)/.test(reference)) {
            var titleBegins = reference.match(/\((\d{4})\)/).index + 8;
            var titleEnds =
              titleBegins +
              reference.substring(titleBegins, reference.length).indexOf(".");
  
            referenceTitle = reference.substring(titleBegins, titleEnds);
  
            var current = [];
  
            for (var g = 0; g < suggestions.length; g++) {
              current.push(suggestions[g].index);
            }
  
            if (
              isCapitalized(referenceTitle) &&
              !current.includes(text.lastIndexOf(referenceTitle)) &&
              referenceTitle.split(" ").length !== 0
            ) {
              suggestions.unshift({
                index: text.lastIndexOf(referenceTitle),
                offset: referenceTitle.length,
                reason: "In APA, capitalize only initial words and proper names",
                type: 'formatting'
              });
            }
            var splitReference = reference.split(". ");
  
            for (let i = 0; i < splitReference.length; i++) {
              if (
                splitReference[i].includes("Journal") ||
                /\((\d)\)/.test(splitReference[i]) ||
                /\((\d\d)\)/.test(splitReference[i])
              ) {
                referenceJournal = splitReference[i];
              }
            }
  
            if (
              referenceJournal &&
              referenceJournal.includes(",") &&
              isCapitalized(referenceJournal.split(",")[0])
            ) {
              if (
                reference.includes(referenceJournal) &&
                !reference.includes("doi:") &&
                !current.includes(text.lastIndexOf(referenceJournal)) &&
                referenceJournal.length
              ) {
                suggestions.unshift({
                  index: text.lastIndexOf(referenceJournal),
                  offset: referenceJournal.length,
                  reason:
                    "In APA, journal articles require doi identifier at the end of the reference (eg: doi:10.1000/182)",
                    type: 'formatting'
                });
              }
            }
            if (
              referenceJournal &&
              !isCapitalized(referenceJournal.split(",")[0])
            ) {
              var journalTitle = referenceJournal.split(",")[0];
  
              let titleWords = journalTitle.split(" ");
  
              var capitalTitle = [];
              for (var b = 0; b < titleWords.length; b++) {
                var w = titleWords[b];
                w.length > 3 ? (w = w.capitalize()) : (w = w.toLowerCase());
                capitalTitle.push(w);
              }
  
              capitalTitle = capitalTitle.join(" ");
  
              suggestions.unshift({
                index: text.lastIndexOf(journalTitle),
                offset: journalTitle.length,
                reason: `Capitalize all major words in journal titles: "${capitalTitle}"`,
                type: 'formatting'
              });
            }
            if (countBrackets(text) > 0) {
              var firstText;
              if (text.includes("Reference")) {
                firstText = text.split("Reference")[0];
              } else if (text.includes("References")) {
                firstText = text.split("References")[0];
              }
              let brackets = [...firstText.matchAll(/\(.*?\)/g)];
              for (var y = 0; y < brackets.length; y++) {
                var curr = [];
                for (var m = 0; m < suggestions.length; m++) {
                  curr.push(suggestions[m].index);
                }
                if (text[brackets[y].index + brackets[y][0].length] === ".") {
                  if (
                    !checkAPA(brackets[y][0]) &&
                    !curr.includes(brackets[y].index)
                  ) {
                    suggestions.unshift({
                      index: brackets[y].index,
                      offset: brackets[y][0].length,
                      reason: "Incorrect citation formatting",
                      type: 'formatting'
                    });
                  }
                }
              }
            }
          }
        }
  
        if (style === "MLA") {
          referenceTitle = reference.split(". ")[1];
          if (reference.includes("http")) {
            suggestions.unshift({
              index:
                text.lastIndexOf(reference) +
                text
                  .substring(text.lastIndexOf(reference), text.length - 1)
                  .indexOf("http"),
              offset:
                text
                  .substring(text.lastIndexOf(reference), text.length - 1)
                  .lastIndexOf("//") -
                text
                  .substring(text.lastIndexOf(reference), text.length - 1)
                  .indexOf("http"),
              reason:
                'In MLA, do not include http// or https// protocols. Begin with "www..."',
                type: 'formatting'
            });
          }
          if (!isCapitalized(referenceTitle)) {
            suggestions.unshift({
              index: text.lastIndexOf(referenceTitle),
              offset: referenceTitle.length,
              reason: "In MLA, capitalize all major words in the title",
              type: 'formatting'
            });
          }
          if (countBrackets(text) > 0) {
            if (text.includes("Work Cited")) {
              firstText = text.split("Work Cited")[0];
            } else if (text.includes("Works Cited")) {
              firstText = text.split("Works Cited")[0];
            }
            let brackets = [...firstText.matchAll(/\(.*?\)/g)];
            for (var o = 0; o < brackets.length; o++) {
              curr = [];
              for (var z = 0; z < suggestions.length; z++) {
                curr.push(suggestions[z].index);
              }
              if (text[brackets[o].index + brackets[o][0].length] === ".") {
                if (
                  !checkMLA(brackets[o][0]) &&
                  !curr.includes(brackets[o].index)
                ) {
                  suggestions.unshift({
                    index: brackets[o].index,
                    offset: brackets[o][0].length,
                    reason: "Incorrect citation formatting",
                    type: 'formatting'
                  });
                }
              }
            }
          }
        }
      }
    }
    return suggestions;
  }
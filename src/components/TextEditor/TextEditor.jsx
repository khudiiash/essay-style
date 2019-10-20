/* eslint-disable no-extend-native */
import React from "react";
import $ from "jquery";
import "./TextEditor.scss";
// Local modules
import checkAPA from "../../modules/checkAPA"
import checkMLA from "../../modules/checkMLA"

// Local Libs
import phrasalVerbs from "../../libraries/phrasal-verbs";
import shortForms from "../../libraries/short-forms";
import weakWords from "../../libraries/weak-words";
import pronouns from "../../libraries/pronouns";
import wordiness from "../../libraries/wordiness";
import purposeKeys from "../../libraries/thesis-check";
import transitions from "../../libraries/transitions";
import vague from "../../libraries/vague";
import informal from "../../libraries/informal"
import prepositions from "../../libraries/prepositions"
import irregular from "../../libraries/irregular"

const countBrackets = (str) => {
  const re = /\(.*?\)/g
  return ((str || '').match(re) || []).length
}

const conjunctions = ["and", "but", "for", "norm", "of", "so"]
const globalExceptions = [
  'understand',
  'understood',
  'many',
  'experience'

]
const punctuationMistakes = [', that', ', because']

function checkComment(comment) {
  if (comment.includes("<")) {
    if (comment.includes("passive"))
      comment = "Avoid passive voice";
    if (comment.includes('simpler alternative')) {
      comment = 'You could choose a better word for this context'
    }
    if (comment.includes("outdated"))
      comment =
        "The source is outdated; Use the most relevant information on the topic";
    if (comment.includes("weak")) comment = "Weak word";
    if (comment.includes("vague"))
      comment = "this might be vague";
    if (comment.includes("weasel")) comment = "Weasel word";
    if (comment.includes("wordy"))
      comment = "Avoid unnecessarily complex words";
  }
  if (comment.includes("<")) {comment = "Probably some mistake"}
  return comment
}

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}
function findInnerIndex(text,string,element) {
  let baseIndex = text.indexOf(string)
  let innerIndex = string.indexOf(element)
  return baseIndex+innerIndex
}

const linkingWords = [];
transitions.forEach(function(word) {
  var cutWord = word.slice(1, word.length);
  word = word[0].toLowerCase() + cutWord;
  if (word !== "it is") {
    linkingWords.push(word);
  }
});


String.prototype.capitalize = function () {
  return this[0].toUpperCase()+this.substring(1,this.length)
}
function passiveVoiceChecker(text,suggestions) {
 var matches = []


  for (var i = 0; i < irregular.length; i++) {   
    
  
    var areIrr = new RegExp('\\b\\w*are\\b\\s\\b'+irregular[i]+'\\b','g')
    var isIrr = new RegExp('\\b\\w*is\\b\\s\\b'+irregular[i]+'\\b','g')
    var wasIrr = new RegExp('\\b\\w*was\\b\\s\\b'+irregular[i]+'\\b','g')
    var wereIrr = new RegExp('\\b\\w*were\\b\\s\\b'+irregular[i]+'\\b','g')
    var beIrr = new RegExp('\\bbe\\b\\s\\b'+irregular[i]+'\\b','g')
    var beingIrr = new RegExp('\\bbeing\\b\\s\\b'+irregular[i]+'\\b','g')

    if (text.includes(irregular[i])) {
      if (([...text.matchAll(areIrr)].length>0)) matches.push([...text.matchAll(areIrr)])
      if (([...text.matchAll(isIrr)].length>0)) matches.push([...text.matchAll(isIrr)])
      if (([...text.matchAll(wasIrr)].length>0)) matches.push([...text.matchAll(wasIrr)])
      if (([...text.matchAll(wereIrr)].length>0)) matches.push([...text.matchAll(wereIrr)])
      if (([...text.matchAll(beIrr)].length>0)) matches.push([...text.matchAll(beIrr)])
      if (([...text.matchAll(beingIrr)].length>0)) matches.push([...text.matchAll(beingIrr)])
    }
  }

  var edBy = /\w*ed\b\s\bby/g
  matches.push([...text.matchAll(edBy)])
  var areEd = /\bare\b\s\w*ed\b/g
  matches.push([...text.matchAll(areEd)])
  var wereEd = /\bwere\b\s\w*ed\b/g
  matches.push([...text.matchAll(wereEd)])
  var wasEd =  /\b\was\b\s\w*ed\b/g
  matches.push([...text.matchAll(wasEd)])
  var isEd =  /\bis\b\s\w*ed\b/g
  matches.push([...text.matchAll(isEd)])
  var beingEd = /\bbeing\b\s\w*ed\b/g
  matches.push([...text.matchAll(beingEd)])
  
  var current = [];
  for (var g = 0; g< suggestions.length; g++) {
    current.push(suggestions[g].index);
  }
  for (var p = 0; p < matches.length; p++) {
   
      for (var u = 0; u < matches[p].length; u++) {
        if (!current.includes(matches[p][u].index))
        suggestions.unshift({
          index: matches[p][u].index,
          offset: matches[p][u][0].length,
          reason: `"${matches[p][u][0]}" can be passive voice`

        })
      }
  }
  return suggestions
}
function factChecker(text, suggestions) {
  if (text.includes("Reference")) {
    text = text.split("Reference")[0];
  }
  if (text.includes("Work Cited")) {
    text = text.split("Work Cited")[0];
  }
  if (text.includes("Works Cited")) {
    text = text.split("Works Cited")[0];
  }
  if (text.includes("Work cited")) {
    text = text.split("Work cited")[0];
  }

  let sections = text.split(/\n/);
  let paragraphs = [];
  let headings = [];
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].includes(". ")) {
      paragraphs.unshift(sections[i]);
    } else {
      headings.unshift(sections[i])
    }
  }

  
  var current = [];
  for (var g = 0; g< suggestions.length; g++) {
    current.push(suggestions[g].index);
  }

  if (/[^\s()]+(?=[^()]*\))/.test(paragraphs[0])) {
    let indices = [...paragraphs[0].matchAll(/\(([^)]+)\)/g)]
    for (var i = 0; i <indices.length; i++) {
     
      if (!current.includes(indices[i].index) && ((/\d+/).test(indices[i][0]) || indices[i][0].includes('et al') || indices[i][0].includes(','))) {
        
        suggestions.unshift({
          index: text.indexOf(paragraphs[0])+indices[i].index,
          offset: indices[i][0].length,
          reason: "Conclusion must not contain any new information, especially citations"
        })

        for (var t = 1; t <suggestions.length; t++) {
          let suggestion = suggestions[t]

          if (suggestion.index > suggestions[0].index && suggestion.index < suggestions[0].index+suggestions[0].offset) {
            for (var w = 1; w <suggestions.length; w++) {
              if (suggestions[w] === suggestions[t]) {
                suggestions.splice(w,1)
              }
            }
          }
        };
               
      }
    }
}
  for (let i = 0; i < paragraphs.length; i++) {
    let sentences = paragraphs[i].split(". ");
    for (let s = 0; s < sentences.length-1; s++) {
      var sentence = sentences[s];

      if (
        !/[^\s()]+(?=[^()]*\))/.test(sentence) &&
        (/\d{4}/.test(sentence) || /\d{3}/.test(sentence) ||
          /\%/.test(sentence) ||
          sentence.includes("It has been identified that")) &&
        !current.includes(text.indexOf(sentence))
      ) {
        suggestions.unshift({
          index: text.indexOf(sentence),
          offset: sentence.length,
          reason:
            "Any facts, statistics, or other specific information require citations"
        });
      }
    }
  }
  for (var h = 0; h < headings.length; h++) {
    let heading = headings[h] 
    if (heading && isLetter(heading[0])) {
      if (heading.includes(' ')) {
        let words = heading.split(' ')
        for (var x = 0; x < words.length; x++) {
          let index = findInnerIndex(text,heading,words[x])

          if ((prepositions.includes(words[x].toLowerCase()) || conjunctions.includes(words[x].toLowerCase())) && !current.includes(index) && words[x] !== words[x].toLowerCase()) {
            suggestions.unshift({
              index: index,
              offset: words[x].length,
              reason:
                "Do not capitalize prepositions, conjunctions, and other short words in a heading"
            });
          }
        }
      }
    }
  }
  return suggestions;
}
function getPos(str, subStr, i) {
  return str.split(subStr, i).join(subStr).length;
}

function getLastSentences(text, suggestions) {
  if (text.includes("Reference")) {
    text = text.split("Reference")[0];
  }
  if (text.includes("Work Cited")) {
    text = text.split("Work Cited")[0];
  }
  if (text.includes("Works Cited")) {
    text = text.split("Works Cited")[0];
  }
  if (text.includes("Work cited")) {
    text = text.split("Work cited")[0];
  }

  let sections = text.split(/\n/);
  let paragraphs = [];
  let concludingSentences = [];
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].includes(". ")) {
      paragraphs.unshift(sections[i]);
    }
  }

  for (let i = 0; i < paragraphs.length; i++) {
    let sentences = paragraphs[i].split(". ");
    if (sentences[sentences.length - 1].length > 5) {
      concludingSentences.unshift(sentences[sentences.length - 1]);
    } else if (sentences[sentences.length - 2].length > 5) {
      concludingSentences.unshift(sentences[sentences.length - 2]);
    }
  }
  return concludingSentences;
}

function getIndicesOf(text, string) {
  let instances = [];
  for (
    let index = text.indexOf(string);
    index >= 0;
    index = text.indexOf(string, index + 1)
  ) {
    // if (!isLetter(text[index-1]) && !isLetter(text[index+string.length]))
    instances.unshift(index);
  }
  return instances;
}
function isCapitalized(sentence) {
  if (sentence.charAt(0) === "“" || sentence.charAt(0) === '"') {
    sentence.replace(sentence.charAt(0), "");
  }
  var words = sentence.split(" ");
  var capital = [];
  var notCapital = [];

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (word.charAt(0) == word.charAt(0).toUpperCase()) {
      capital.unshift(word);
    } else {
      notCapital.unshift(word);
    }
  }

  return capital.length > notCapital.length;
}
function isCitationInSentence(sentence) {
  if (
    sentence.includes("(") &&
    sentence.includes(")") &&
    (sentence.includes("20") ||
      sentence.includes("19") ||
      sentence.includes("et al") ||
      sentence.includes("&"))
  ) {
    return true;
  }
}
function checkAmerican(text, suggestions) {

  var americanisms = ["America", "American", "Americans"];

  for (var a = 0; a < americanisms.length; a++) {
    var word = americanisms[a];
    if (text.includes(word)) {
      let indices = getIndicesOf(text,word)
      for (var c = 0; c < indices.length; c++) {
        if (!text.substring(indices[c]-15,indices[c]).includes("African") &&
        !text.substring(indices[c]-15,indices[c]).includes("Native") &&
        !text.substring(indices[c]-15,indices[c]).includes("North") &&
        !text.substring(indices[c]-15,indices[c]).includes("South") && 
        !text.substring(indices[c]-15,indices[c]).includes("East") && 
        !text.substring(indices[c]-15,indices[c]).includes("West")) {
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

function punctuationChecker(text,suggestions) {
  if (text.includes("References")) {
    text = text.split("References")[0];
  } else if (text.includes("Reference")) {
    text = text.split("Reference")[0];
  } else if (text.includes("Work Cited")) {
    text = text.split("Work Cited")[0];
  } else if (text.includes("Works Cited")) {
    text = text.split("Works Cited")[0];
  }
  var current = [];
  for (var g = 0; g< suggestions.length; g++) {
    current.push(suggestions[g].index);
  }
  
  var sentences = text.split(". ");
  for (var i = 0; i < sentences.length; i++) {
    var sentence = sentences[i];
    
    
    
    
    for (var p = 0; p < punctuationMistakes.length; p++) {
      var miscoma = punctuationMistakes[p]
      if (sentence.includes(miscoma)) {
        var pIndex = findInnerIndex(text,sentence,miscoma)
        if (!current.includes(pIndex)) {
          suggestions.unshift({
            index: pIndex,
            offset: miscoma.length,
            reason:
              'There must be no comma'
          });
        }
      }
    }
  for (let g = 0; g < transitions.length; g++) {
    if (sentence.includes(transitions[g]+' ')) {
     
      if (sentence.includes(',') && sentence.split(',')[0] !== transitions[g]) {
        suggestions.unshift({
          index: text.indexOf(sentence),
          offset: transitions[g].length,
          reason: `Use a comma to separate the introductory clause: ${transitions[g]}, ${sentence.split(transitions[g]+' ')[1].split(' ')[0]+' '+sentence.split(transitions[g]+' ')[1].split(' ')[1]}...`
        })
        continue
      }
    } 
  }
}

return suggestions
}
function checkRepetitions(text, suggestions) {
  const exceptions = ['this','that','with','been','whose','thus','they','them','will']
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

    if ((sentence.includes('book') || sentence.includes('Book')) && /“([^\\”]|\\”)*”/.test(sentence) && !current.includes) {
      var baseIndex = text.indexOf(sentence)
      var firstQuoteIndex = baseIndex + sentence.indexOf('“')
      var secondQuoteIndex = baseIndex + sentence.indexOf('”')
      var offset = secondQuoteIndex-firstQuoteIndex+1;
      
      suggestions.unshift({
        index: firstQuoteIndex,
        offset: offset,
        reason:
          "Book titles must be italicized without quotation marks"
      });

    }

    if ((sentence.includes('movie') || sentence.includes('Movie') || sentence.includes('film') || sentence.includes('Film')) && /“([^\\”]|\\”)*”/.test(sentence)) {
       baseIndex = text.indexOf(sentence)
       firstQuoteIndex = baseIndex + sentence.indexOf('“')
       secondQuoteIndex = baseIndex + sentence.indexOf('”')
       offset = secondQuoteIndex-firstQuoteIndex+1;
      
      suggestions.unshift({
        index: firstQuoteIndex,
        offset: offset,
        reason:
          "Movie titles must be italicized without quotation marks"
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
        for (var g = 0; g< suggestions.length; g++) {
          current.push(suggestions[g].index);
        }
        indices.sort();

        for (var j = 0; j < indices.length; j++) {
          if (indices[j] > preIndex-sentence.length &&
            indices[j] < afterIndex &&
            !current.includes(indices[j]) &&
            !prepositions.includes(word)
          ) {
            if (!conjunctions.includes(word) && !prepositions.includes(word) && !current.includes(indices[j]) && !exceptions.includes(word))
            suggestions.unshift({
              index: indices[j],
              offset: word.length,
              reason: "Repetition"
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

function checkOutdated(text, suggestions) {
  var currentYear = new Date().getFullYear();

  for (var i = 1960; i < currentYear-10; i++) {

    if (text.includes(`${i.toString()})`)) {
      var occurences = getIndicesOf(text, `${i})`);

      if (occurences.length > 0) {
        var current = [];
        for (var g = 0; g< suggestions.length; g++) {
          current.push(suggestions[g].index);
        }
        for (var k = 0; k < occurences.length; k++) {
          if (!current.includes(occurences[k])) {
            suggestions.unshift({
              index: occurences[k],
              offset: 4,
              reason:
                "Outdated source; use only sources published within the last 10 years"
            });
          }
        }
      }
    }
  }
  return suggestions;
}
function checkReferences(text, suggestions) {
  let references = [],
    referencePage,
    style;

  if (text.includes("References")) {
    referencePage = text.split("References")[1];
    style = "APA";
  } else if (text.includes("Reference")) {
    referencePage = text.split("Reference")[1];
    style = "APA";
  } else if (text.includes("Work Cited")) {
    referencePage = text.split("Work Cited")[1];
    style = "MLA";
  } else if (text.includes("Works Cited")) {
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

        
        var titleBegins = reference.match(/\((\d{4})\)/).index+8
        var titleEnds = titleBegins + reference.substring(titleBegins,reference.length).indexOf('.')
        
        referenceTitle = reference.substring(titleBegins,titleEnds)
         

          var current = [];

          for (var g = 0; g< suggestions.length; g++) {
            current.push(suggestions[g].index);
          }

          

          if (
            isCapitalized(referenceTitle) &&
            !current.includes(text.lastIndexOf(referenceTitle)) && 
            referenceTitle.split(' ').length !== 0
          ) {
            suggestions.unshift({
              index: text.lastIndexOf(referenceTitle),
              offset: referenceTitle.length,
              reason: "In APA, capitalize only initial words and proper names"
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
          
          if (referenceJournal && referenceJournal.includes(',') && isCapitalized(referenceJournal.split(',')[0])) {
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
                  "In APA, journal articles require doi identifier at the end of the reference (eg: doi:10.1000/182)"
              });
            }
          } 
          if (referenceJournal && !isCapitalized(referenceJournal.split(',')[0])) {
            var journalTitle = referenceJournal.split(',')[0]

            let titleWords = journalTitle.split(' ')
            
            var capitalTitle = []
            for (var b = 0; b < titleWords.length; b++) {
                var w = titleWords[b]
                w.length > 3? w=w.capitalize() : w=w.toLowerCase(); capitalTitle.push(w)}
            
            capitalTitle = capitalTitle.join(' ')

            suggestions.unshift({
              index: text.lastIndexOf(journalTitle),
              offset: journalTitle.length,
              reason:
                `Capitalize all major words in journal titles: "${capitalTitle}"`
            });
          }
          if (countBrackets(text) > 0) {
            var firstText;
            if (text.includes("Reference")) {
              firstText = text.split("Reference")[0];
            } else if (text.includes("References")) {
              firstText = text.split("References")[0];
            }
             let brackets = [...firstText.matchAll(/\(.*?\)/g)]
             for (var y = 0; y < brackets.length; y++) {
    
              var curr = []
              for (var g = 0; g< suggestions.length; g++) {
                curr.push(suggestions[g].index);
              }
               if (text[brackets[y].index+brackets[y][0].length] === '.') {
               
                if  (!checkAPA(brackets[y][0]) && !curr.includes(brackets[y].index)) {
                      suggestions.unshift({
                        index: brackets[y].index,
                        offset: brackets[y][0].length,
                        reason: "Incorrect citation formatting"
                      })
                    }
               }
                
             }
    
           }

          }

      }
      
      if (style === "MLA") {
        referenceTitle = reference.split(". ")[1];
        if (reference.includes('http')) {
          
          suggestions.unshift({
            index: text.lastIndexOf(reference)+text.substring(text.lastIndexOf(reference),text.length-1).indexOf('http'),
            offset: (text.substring(text.lastIndexOf(reference),text.length-1).lastIndexOf('//')) - text.substring(text.lastIndexOf(reference),text.length-1).indexOf('http'),
            reason: 'In MLA, do not include http// or https// protocols. Begin with "www..."'
          });
        }
        if (!isCapitalized(referenceTitle)) {
          suggestions.unshift({
            index: text.lastIndexOf(referenceTitle),
            offset: referenceTitle.length,
            reason: "In MLA, capitalize all major words"
          });
        }
       if (countBrackets(text) > 0) {
        if (text.includes("Work Cited")) {
          firstText = text.split("Work Cited")[0];
        } else if (text.includes("Works Cited")) {
          firstText = text.split("Works Cited")[0];
        }
         let brackets = [...firstText.matchAll(/\(.*?\)/g)]
         for (var y = 0; y < brackets.length; y++) {

          var curr = []
          for (var g = 0; g< suggestions.length; g++) {
            curr.push(suggestions[g].index);
          }
           if (text[brackets[y].index+brackets[y][0].length] === '.') {

            if  (!checkMLA(brackets[y][0]) && !curr.includes(brackets[y].index)) {
  
                  suggestions.unshift({
                    index: brackets[y].index,
                    offset: brackets[y][0].length,
                    reason: "Incorrect citation formatting"
                  })
                }
           }
            
         }

       }
      }  
    }
  }
  return suggestions;
}

function checkThesisStatement(text, thesisStatement, suggestions) {
  if (thesisStatement) {
    var index = text.indexOf(thesisStatement);
    for (let i = 0; i < purposeKeys.length; i++) {
      if (isCitationInSentence(thesisStatement)) {
        suggestions.unshift({
          index: index,
          offset: thesisStatement.length,
          reason: "Thesis statement must not be a citation"
        });
        return suggestions
      }
      if (thesisStatement.includes(purposeKeys[i])) {
        suggestions.unshift({
          index: index,
          offset: thesisStatement.length,
          reason:
            "This is a purpose statement. Remember that you have to use a thesis statement"
        });
        return suggestions
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
function checkLinkingWords(text, suggestions) {
  var exceptions = ['further','often']

  for (var i = 0; i < linkingWords.length; i++) {
    var linkWord = linkingWords[i];

    if (text.includes(" " + linkWord + " ")) {
      var indexes = getIndicesOf(text, " " + linkWord + " ");
      var current = [];
      for (var g = 0; g< suggestions.length; g++) {
        current.push(suggestions[g].index);
      }
      for (var k = 0; k < indexes.length; k++) {
        if (!current.includes(indexes[k] + 1) && !exceptions.includes(linkWord)) {
        
          if ((text.substring(indexes[k]+1,indexes[k]+1+linkWord.length) === 'thus' || text.substring(indexes[k]+1,indexes[k]+1+linkWord.length) === 'hence') && text.substring(indexes[k]+1,text.length-1).split(' ')[1].includes('ing')) {continue}
          if (!linkWord.includes('ly')) {
            suggestions.unshift({
              index: indexes[k] + 1,
              offset: linkWord.length,
              reason: "Linking words must be separated by commas"
            });
          }
          
        }
      }
    }
  }
  return suggestions;
}
function checkConcludingSentences(text, suggestions) {
  let concludingSentences = getLastSentences(text);
  suggestions = checkThesisStatement(text, concludingSentences[0], suggestions);
  for (var i = 1; i < concludingSentences.length; i++) {
    let sentence = concludingSentences[i];
    if (isCitationInSentence(sentence)) {
      suggestions.unshift({
        index: text.indexOf(sentence),
        offset: sentence.length,
        reason: "Concluding sentence must not be a citation"
      });
    }
    var current = [];
    for (var g = 0; g< suggestions.length; g++) {
      current.push(suggestions[g].index);
    }
    if (
      (sentence.includes("Also,") ||
      sentence.includes("Besides,") ||
      sentence.includes("For Example,") ||
      sentence.includes("For instance,") ||
      sentence.includes("Moreover,") ||
      sentence.includes("There is also") ||
      /[^\s()]+(?=[^()]*\))/.test(sentence) ||
      /\((\d{4})\)/.test(sentence) ||
      /\%/.test(sentence) ||
          sentence.includes("According to") ||
          sentence.includes("It has been identified that")) &&
        !current.includes(text.indexOf(sentence))
      
    ) {
      suggestions.unshift({
        index: text.indexOf(sentence),
        offset: sentence.length,
        reason:
          "Concluding sentence must sum up the paragraph, so do not conclude paragraphs with examples, evidence, or new facts."
      });
    }
  }
  return suggestions;
}

function isLetter(c) {
  if (c) {
    return c.toLowerCase() !== c.toUpperCase();
  }
}

class TextEditor extends React.Component {
  constructor() {
    super();
    this.checkForMistakes = (array, text, suggestions, comment) => {
      
      for (var i = 0; i < array.length; i++) {

        if (text.includes(array[i])) {
          if (array === shortForms) {
          }
          var indices = getIndicesOf(text, array[i]);
          var current = [];
          for (var g = 0; g< suggestions.length; g++) {
            current.push(suggestions[g].index);
          }
          if (indices.length > 0) {
            for (var k = 0; k < indices.length; k++) {
              if (!current.includes(indices[k])) {
                var newMistake = {
                  index: indices[k],
                  offset: array[i].length,
                  reason: comment
                };
                suggestions.unshift(newMistake);
              }
            }
          }
        }
      }

      return suggestions;
    };
    this.onChange = () => {
      var text = $("#text-area").val();
     
      var newLinesCount = 0;
      try {
        newLinesCount = text.match(/\n/g).length;
      } catch {}

      var suggestions = [];

      // Look for mistakes from libraries
      if (text.length > 0) {
        suggestions = this.checkForMistakes(
          wordiness,
          text,
          suggestions,
          "This phrase is redundant. Consider changing or removing"
        );
        suggestions = this.checkForMistakes(
          informal,
          text,
          suggestions,
          "Informal phrase. Do not use idiomatic expressions and metaphors"
        );
        suggestions = this.checkForMistakes(
          weakWords,
          text,
          suggestions,
          "Weak word. Consider replacing"
        );
        suggestions = this.checkForMistakes(
          phrasalVerbs,
          text,
          suggestions,
          "Phrasal verb. Consider replacing"
        );
        suggestions = this.checkForMistakes(
          pronouns,
          text,
          suggestions,
          "Do not use pronouns that associate with the reader"
        );
        suggestions = this.checkForMistakes(
          shortForms,
          text,
          suggestions,
          "Do not use short forms in academic writing"
        );
        suggestions = this.checkForMistakes(
          vague,
          text,
          suggestions,
          "This word is vague. Consider changing to a more specific synonym"
        );
      }
      //checking
      suggestions = punctuationChecker(text,suggestions);
      suggestions = checkAmerican(text, suggestions);
      suggestions = checkOutdated(text, suggestions);
      suggestions = checkLinkingWords(text, suggestions);
      suggestions = checkRepetitions(text, suggestions);
      suggestions = factChecker(text, suggestions);
      suggestions = passiveVoiceChecker(text,suggestions)
      suggestions = checkConcludingSentences(text, suggestions);
      suggestions = checkReferences(text, suggestions);

      // suggestions = suggestions.sort((a, b) => (a.index > b.index) ? 1 : -1)

      try {
        for (var i = 0; i < suggestions.length; i++) {
          let suggestion = suggestions[i];
          var index = suggestion.index;
          var offset = suggestion.offset;
          var abort = false;

            var mistake = text.substring(index, index + offset);
          for (var k = 0; k < globalExceptions.length; k++) {
            if (mistake === globalExceptions[k]) {abort=true}

          }
         
         
            for (let word = 0; word < transitions.length; word++) {
              if (mistake === transitions[word] && !suggestion.reason.includes('separate the introductory')) {
                abort = true;
              }
              if (mistake === "It is" || mistake === "it is") {
                abort = true;
              }
              if (suggestion.reason === 'sentence should be preceded by a space') {
                abort = true
              }
            }
            var mistakeClass = "mistake";
            if (
              suggestion.reason.includes("sentence") ||
              suggestion.reason.includes("thesis") ||
              suggestion.reason.includes("APA") ||
              suggestion.reason.includes("MLA") ||
              suggestion.reason.includes("Book titles")
            ) {
              
              mistakeClass = "sentence";
              mistake = text.substring(index, index + offset);
            }
            if (suggestion.reason.includes("comma")) {
              mistakeClass = "punctuation"
            }
            if ((isLetter(text[index - 1]) || isLetter(text[index + offset])) && mistakeClass!=='punctuation') {abort=true}
           
            if (abort) {
              continue;
            }
          
            var start = index;
            var end = start + offset;
                
            if (mistake.includes('Werbose')) console.log(index)
           
            if (!$(".editor__paragraph").html()) {
              var html = $("textarea").val();
            } else {
              html = $(".editor__paragraph").html();

              var startAfter = html.substring(start, html.length - 1);

              if (suggestion.reason === "Repetition") {
                mistakeClass = "repetition";
                var substringBetweenWords = startAfter.substring(
                  getPos(startAfter, mistake, 1),
                  getPos(startAfter, mistake, 2)
                );
                if (!isLetter(startAfter[startAfter.indexOf(mistake) - 1]) &&
                  !isLetter(
                    startAfter[startAfter.indexOf(mistake) + mistake.length]
                  ) &&
                  substringBetweenWords.length < 300 &&
                  !substringBetweenWords.includes("<div") &&
                  !substringBetweenWords.includes("repetition")
                ) {
                  start += getPos(startAfter, mistake, 2);
                } else {
                  continue;
                }
              } else {
                start += startAfter.indexOf(mistake);
                let largerSubstring = text.substring(index-5,index+mistake.length+5)

                if (!(largerSubstring.includes("Journal") ||
                /\((\d)\)/.test(largerSubstring) ||
                /\((\d\d)\)/.test(largerSubstring))) {
                  if (!largerSubstring.includes('>')) {
                    let newBeginning = html.indexOf(largerSubstring)
                    if (newBeginning !== -1) {
                      startAfter = html.substring(newBeginning,html.length-1)
                      start = html.indexOf(startAfter)+startAfter.indexOf(mistake)
                      
                    } else {
                      
                      if (mistake.includes('&')) {
                        console.log(mistake)
                        mistake=mistake.replace(/\&/,'&amp;')
                        
                       
                        start = html.lastIndexOf(mistake.split(' ')[0]+' '+mistake.split(' ')[1])
                        let rudiment = html.substring(start+mistake.length,start+mistake.length)
                        let beforeHTML = html.substring(0,start)
                        let afterHTML = html.substring(start,html.length-1)
                        afterHTML = afterHTML.replace(rudiment,'')
                        html = beforeHTML+afterHTML

                      }
                      if (html.indexOf(mistake) === -1) {abort = true}                  
                    }
                  } else {console.log("pizda")}
                } 
                else {
                if (mistake.includes('&')) {
                  start = html.lastIndexOf(mistake.split(' ')[0]+' '+mistake.split(' ')[1])
                  let rudiment = html.substring(start+mistake.length,start+mistake.length+4)
                  html = html.replace(rudiment,'')
                } else {
                  start = html.lastIndexOf(mistake)
                }
                
                  }
              }
              
             
            if (suggestion.reason.includes("facts, statistics") ||
                suggestion.reason.includes("journal titles")
            ) {
              mistakeClass = "sentence";
            }

            end = start + mistake.length;
            }
            
            if (abort || start === -1 || end === -1) {
              continue;
            }
            
            var beforeSpan =
              "<span class='" +
              mistakeClass +
              "' " +
              mistakeClass +
              "='" +
              suggestion.reason +
              "'>";
            var afterSpan = "</span>";

            if (suggestions.length > 0) {
              $(".editor__text-area").css({ opacity: 0 });
              html = `${html
                .substring(0, start)
                .concat(beforeSpan, mistake, afterSpan, html.substring(end))}`;

              $(".editor__paragraph").html(html.replace(/\n/, "</div><div>"));

              $(".editor__text-area").css({ zIndex: "-1" });
                    
            }
        }
      } catch (e) {
        console.log(e);
      }

      //Mistakes
      $(".mistake").on("click", function() {
        var comment = $(this).attr("mistake");  

        comment = checkComment(comment)
      
        $(`#mistake`).text(comment);
        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".mistake")
          .not(this)
          .css({ background: "rgb(255, 255, 124)" });
        $(".sentence").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".punctuation").css({ background: "#ead1dc" });
        $(`#mistake`).css({ opacity: "1" });
      });

      // Repetitions

      $(".repetition").on("click", function() {
        var comment = $(this).attr("repetition");

        comment = checkComment(comment)

        $(`#mistake`).text(comment);
        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".mistake").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".sentence").css({ background: "#fce5cd" });
        $(".repetition")
          .not(this)
          .css({ background: "#c9daf8" });
          $(".punctuation").css({ background: "#ead1dc" });
        $(`#mistake`).css({ opacity: "1" });
      });

      // Sentences
      $(".sentence").on("click", function() {
        var comment = $(this).attr("sentence");

        comment = checkComment(comment)

        $(`#mistake`).text(comment);

        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".mistake").css({ background: "rgb(255, 255, 124)", color: "#000" });
        $(".sentence")
          .not(this)
          .css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".punctuation").css({ background: "#ead1dc" });
        $(`#mistake`).css({ opacity: "1" });
      });

      // Punctuation 
      $(".punctuation").on("click", function() {
        var comment = $(this).attr("punctuation");

        comment = checkComment(comment)
        $(`#mistake`).text(comment);
        $(this).css({ background: "rgb(255, 155, 124)" });
        $(".mistake").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".sentence").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".punctuation").not(this).css({ background: "#ead1dc" });
        $(`#mistake`).css({ opacity: "1" });
      });
    };
    
  }
  
  state = {
    text: ""
  };

  render() {
    return (
      <div className="editor">
        <div className="editor__center">
          <textarea
            placeholder="Paste paper here"
            spellCheck="true"
            onChange={this.onChange}
            name="Text1"
            cols="40"
            rows="5"
            className="editor__text-area"
            id="text-area"
          ></textarea>
          <div className="editor__paragraph"></div>
        </div>
        <div className="editor__comment" id="mistake"></div>
      </div>
    );
  }
}

export default TextEditor;

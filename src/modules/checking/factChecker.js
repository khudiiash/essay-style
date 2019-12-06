/* eslint-disable no-useless-escape */


import prepositions from "../../libraries/prepositions";
import isLetter from './isLetter'
import findInnerIndex from './findInnerIndex'
import withoutReferences from "../writing/withoutReferences";

const conjunctions = ["and", "but", "for", "norm", "of", "so"];

export default function factChecker(text, suggestions) {
    text = withoutReferences(text)
  
    let sections = text.split(/\n/);
    let paragraphs = [];
    let headings = [];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].includes(". ")) {
        paragraphs.unshift(sections[i]);
      } else {
        headings.unshift(sections[i]);
      }
    }
  
    
  
    if (/[^\s()]+(?=[^()]*\))/.test(paragraphs[0])) {
      let indices = [...paragraphs[0].matchAll(/\(([^)]+)\)/g)];
      for (var i = 0; i < indices.length; i++) {
        var current = [];
      for (var g = 0; g < suggestions.length; g++) {
        current.push(suggestions[g].index);
      }
        if (
          !current.includes(indices[i].index) &&
          (/\d+/.test(indices[i][0]) ||
            indices[i][0].includes("et al") ||
            indices[i][0].includes(","))
        ) {
          suggestions.unshift({
            index: text.indexOf(paragraphs[0]) + indices[i].index,
            offset: indices[i][0].length,
            reason:
              "Conclusion must not contain any new information, especially citations",
              type: 'structure'
          });
  
          for (var t = 1; t < suggestions.length; t++) {
            let suggestion = suggestions[t];
  
            if (
              suggestion.index > suggestions[0].index &&
              suggestion.index < suggestions[0].index + suggestions[0].offset
            ) {
              for (var w = 1; w < suggestions.length; w++) {
                if (suggestions[w] === suggestions[t]) {
                  suggestions.splice(w, 1);
                }
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < paragraphs.length; i++) {
      let sentences = paragraphs[i].split(". ");
      for (let s = 0; s < sentences.length - 1; s++) {
        var sentence = sentences[s];
        current = [];
      for (g = 0; g < suggestions.length; g++) {
          current.push(suggestions[g].index);
      }
        if (
          !/[^\s()]+(?=[^()]*\))/.test(sentence) &&
          (/\d{4}/.test(sentence) ||
            /\d{3}/.test(sentence) ||
            /\%/.test(sentence) ||
            sentence.includes("It has been identified that")) &&
          !current.includes(text.indexOf(sentence))
        ) {
          if (!text.includes("marketing strategy") &&
          !text.includes("profit margin") &&
          !text.includes("target customer") &&
          !text.includes("marketing strategy") &&
          !text.includes("branding")) {
            suggestions.unshift({
              index: text.indexOf(sentence),
              offset: sentence.length,
              reason:
                "Any facts, statistics, or other specific information require citations",
                type: 'structure'
            });
          }

          
        }
      }
    }
    for (var h = 0; h < headings.length; h++) {
      let heading = headings[h];
      if (heading && isLetter(heading[0])) {
        if (heading.includes(" ")) {
          let words = heading.split(" ");
          for (var x = 0; x < words.length; x++) {
            let index = findInnerIndex(text, heading, words[x]);
            current = [];
            for (g = 0; g < suggestions.length; g++) {
                current.push(suggestions[g].index);
            }
            if (
              (prepositions.includes(words[x].toLowerCase()) ||
                conjunctions.includes(words[x].toLowerCase())) &&
              !current.includes(index) &&
              words[x] !== words[x].toLowerCase()
            ) {
              suggestions.unshift({
                index: index,
                offset: words[x].length,
                reason:
                  "Do not capitalize prepositions, conjunctions, and other short words in a heading",
                type: 'formatting'
              });
            }
          }
        }
      }
    }
    return suggestions;
  }
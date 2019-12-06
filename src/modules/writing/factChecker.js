

import withoutReferences from "../writing/withoutReferences";


export default function factChecker(text) {
    let facts = []
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
      for (var g = 0; g < facts.length; g++) {
        current.push(facts[g].index);
      }
        if (
          !current.includes(indices[i].index) &&
          (/\d+/.test(indices[i][0]) ||
            indices[i][0].includes("et al") ||
            indices[i][0].includes(","))
        ) {
          facts.unshift(indices[i][0])

        }
      }
    }
    for (let i = 0; i < paragraphs.length; i++) {
      let sentences = paragraphs[i].split(". ");
      for (let s = 0; s < sentences.length - 1; s++) {
        var sentence = sentences[s];
        
        if (
          !/[^\s()]+(?=[^()]*\))/.test(sentence) &&
          (/\d{4}/.test(sentence) ||
            /\d{3}/.test(sentence) ||
            /\%/.test(sentence) ||
            sentence.includes("It has been identified that"))
        ) {
          if (!text.includes("marketing strategy") &&
          !text.includes("profit margin") &&
          !text.includes("target customer") &&
          !text.includes("marketing strategy") &&
          !text.includes("branding")) {
            facts.unshift(sentence);
          }

          
        }
      }
    }

    return facts;
  }
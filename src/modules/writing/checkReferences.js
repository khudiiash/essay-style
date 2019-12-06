/* eslint-disable no-useless-escape */

import isCapitalized from '../checking/isCapitalized'
import countBrackets from '../checking/countBrackets'
import checkAPA from './checkAPA'
import checkMLA from './checkMLA'

import APARefs from '../checking/testRegEx'

let book = APARefs.book,
     journalArticle = APARefs.journalArticle,
     onlineArticle = APARefs.onlineArticle

export default function checkReferences(text) {
    let references = [],
      suggestions = [],
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
          if (!book.test(reference) && !journalArticle.test(reference) && !onlineArticle.test(reference)) {          
              suggestions.unshift(reference);
              
              continue
          }
        
          if (/\((\d{4})\)/.test(reference)) {
            var titleBegins = reference.match(/\((\d{4})\)/).index + 8;
            var titleEnds =
              titleBegins +
              reference.substring(titleBegins, reference.length).indexOf(".");
  
            referenceTitle = reference.substring(titleBegins, titleEnds);
  
              
            if (
              isCapitalized(referenceTitle) &&
              referenceTitle.split(" ").length !== 0
            ) {
              suggestions.unshift(referenceTitle);
              
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
                referenceJournal.length
              ) {
                suggestions.unshift(referenceJournal);
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
  
              suggestions.unshift(journalTitle);
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
                if (text[brackets[y].index + brackets[y][0].length] === ".") {
                  if (!checkAPA(brackets[y][0])) {
                    suggestions.unshift(brackets[y][0]);
                  }
                }
              }
            }
          }
        }
  
        if (style === "MLA") {
          referenceTitle = reference.split(". ")[1];
          if (reference.includes("http")) {
            suggestions.unshift('https//');
          }
          if (!isCapitalized(referenceTitle)) {
            suggestions.unshift(referenceTitle);
          }
          let brackets = [...firstText.matchAll(/\(.*?\)/g)];
              for (y = 0; y < brackets.length; y++) {
                if (text[brackets[y].index + brackets[y][0].length] === ".") {
                  if (!checkMLA(brackets[y][0])) {
                    suggestions.unshift(brackets[y][0]);
                  }
                }
              }
          if (countBrackets(text) > 0) {
            if (text.includes("Work Cited")) {
              firstText = text.split("Work Cited")[0];
            } else if (text.includes("Works Cited")) {
              firstText = text.split("Works Cited")[0];
            }
            let brackets = [...firstText.matchAll(/\(.*?\)/g)];
            for (var o = 0; o < brackets.length; o++) {
              
              if (text[brackets[o].index + brackets[o][0].length] === ".") {
                  if (!suggestions.includes(brackets[o][0])) suggestions.unshift(brackets[o][0]);
              }
            }
            
          }
        }
      }
    }
    return suggestions;
  }
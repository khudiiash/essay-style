/* eslint-disable no-extend-native */
import React from "react";
import $ from "jquery";
import "./TextEditor.scss";

// Local modules
import checkAmerican from "../../modules/checkAmerican";
import checkComment from "../../modules/checkComment";
import checkConcludingSentences from "../../modules/checkConcludingSentences";
import checkLinkingWords from "../../modules/checkLinkingWords";
import checkOutdated from "../../modules/checkOutdated";
import checkReferences from "../../modules/checkReferences";
import checkRepetitions from "../../modules/checkRepetitions";
import factChecker from "../../modules/factChecker";
import getIndicesOf from "../../modules/getIndicesOf";
import isLetter from "../../modules/isLetter";
import passiveVoiceChecker from "../../modules/passiveVoiceChecker";
import punctuationChecker from "../../modules/punctuationChecker";

// Local Libs
import phrasalVerbs from "../../libraries/phrasal-verbs";
import shortForms from "../../libraries/short-forms";
import weakWords from "../../libraries/weak-words";
import pronouns from "../../libraries/pronouns";
import wordiness from "../../libraries/wordiness";
import transitions from "../../libraries/transitions";
import vague from "../../libraries/vague";
import informal from "../../libraries/informal";

String.prototype.replaceAt = function(index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length - 1)
  );
};

const nlp = require("compromise");

const globalExceptions = ["understand", "understood", "many", "experience"];

String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.substring(1, this.length);
};

function getPos(str, subStr, i) {
  return str.split(subStr, i).join(subStr).length;
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
          for (var g = 0; g < suggestions.length; g++) {
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
      suggestions = punctuationChecker(text, suggestions);
      suggestions = checkAmerican(text, suggestions);
      suggestions = checkOutdated(text, suggestions);
      suggestions = checkLinkingWords(text, suggestions);
      suggestions = checkRepetitions(text, suggestions);
      suggestions = passiveVoiceChecker(text, suggestions);
      suggestions = factChecker(text, suggestions);
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
            if (mistake === globalExceptions[k]) {
              abort = true;
            }
          }

          if (mistake === "In conclusion") {
            suggestion.reason =
              'Avoid phrases like "in conclusion," "to conclude," "in summary," and "to sum up." These phrases can be useful in oral presentations. However, readers can see, by the tell-tale compression of the pages, when an essay is about to end.';
          }

          for (let word = 0; word < transitions.length; word++) {
            if (
              mistake === transitions[word] &&
              !suggestion.reason.includes("separate the introductory")
            ) {
              abort = true;
            }
            if (mistake === "It is" || mistake === "it is") {
              abort = true;
            }
            if (
              suggestion.reason === "sentence should be preceded by a space"
            ) {
              abort = true;
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
            mistakeClass = "punctuation";
          }
          if (
            (isLetter(text[index - 1]) || isLetter(text[index + offset])) &&
            mistakeClass !== "punctuation"
          ) {
            abort = true;
          }

          if (abort) {
            continue;
          }

          var start = index;
          var end = start + offset;

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
              if (
                !isLetter(startAfter[startAfter.indexOf(mistake) - 1]) &&
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
              let largerSubstring = text.substring(
                index - 5,
                index + mistake.length + 5
              );

              if (
                !(
                  largerSubstring.includes("Journal") ||
                  /\((\d)\)/.test(largerSubstring) ||
                  /\((\d\d)\)/.test(largerSubstring)
                )
              ) {
                if (!largerSubstring.includes(">")) {
                  let newBeginning = html.indexOf(largerSubstring);
                  if (newBeginning !== -1) {
                    startAfter = html.substring(newBeginning, html.length - 1);
                    start =
                      html.indexOf(startAfter) + startAfter.indexOf(mistake);
                  } else {
                    if (mistake.includes("&")) {
                      console.log(mistake);
                      mistake = mistake.replace(/\&/, "&amp;");

                      start = html.lastIndexOf(
                        mistake.split(" ")[0] + " " + mistake.split(" ")[1]
                      );
                      let rudiment = html.substring(
                        start + mistake.length,
                        start + mistake.length
                      );
                      let beforeHTML = html.substring(0, start);
                      let afterHTML = html.substring(start, html.length - 1);
                      afterHTML = afterHTML.replace(rudiment, "");
                      html = beforeHTML + afterHTML;
                    }
                    if (html.indexOf(mistake) === -1) {
                      abort = true;
                    }
                  }
                }
              } else {
                if (mistake.includes("&")) {
                  start = html.lastIndexOf(
                    mistake.split(" ")[0] + " " + mistake.split(" ")[1]
                  );
                  let rudiment = html.substring(
                    start + mistake.length,
                    start + mistake.length + 4
                  );
                  html = html.replace(rudiment, "");
                } else {
                  start = html.lastIndexOf(mistake);
                }
              }
            }

            if (
              suggestion.reason.includes("facts, statistics") ||
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

        comment = checkComment(comment);

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

        comment = checkComment(comment);

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

        comment = checkComment(comment);

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

        comment = checkComment(comment);
        $(`#mistake`).text(comment);
        $(this).css({ background: "rgb(255, 155, 124)" });
        $(".mistake").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".sentence").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".punctuation")
          .not(this)
          .css({ background: "#ead1dc" });
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

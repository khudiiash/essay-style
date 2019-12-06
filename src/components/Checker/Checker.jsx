/* eslint-disable no-extend-native */
/* eslint-disable no-useless-escape */
/* eslint-disable-next-line */
import React from "react";
import $ from "jquery";
import '../../jquery/jquery.highlight-within-textarea.js'
import '../../jquery/jquery.highlight-within-textarea.css'
import Clear from '../Clear/Clear'

import "./Checker.scss";
import Table from "../Table/Table";
import Comment from "../Comment/Comment";

// Local modules
import checkAmerican from "../../modules/checking/checkAmerican";
import checkComment from "../../modules/checking/checkComment";
import checkConcludingSentences from "../../modules/checking/checkConcludingSentences";
import checkLinkingWords from "../../modules/checking/checkLinkingWords";
import checkOutdated from "../../modules/checking/checkOutdated";
import checkReferences from "../../modules/checking/checkReferences";
import checkRepetitions from "../../modules/checking/checkRepetitions";
import factChecker from "../../modules/checking/factChecker";
import getIndicesOf from "../../modules/checking/getIndicesOf";
import isLetter from "../../modules/checking/isLetter";
import passiveVoiceChecker from "../../modules/checking/passiveVoiceChecker";
import punctuationChecker from "../../modules/checking/punctuationChecker";
import checkReplace from "../../modules/checking/checkReplace";
import checkPrepositional from "../../modules/checking/checkPrepositional";
import checkWordOrder from "../../modules/checking/checkWordOrder";
import withoutReferences from "../../modules/checking/withoutReferences";
// Local Libs
import phrasalVerbs from "../../libraries/phrasal-verbs-checker";
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
String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.substring(1, this.length);
};

const globalExceptions = ["understand", "understood", "many", "experience"];

function getPos(str, subStr, i) {
  return str.split(subStr, i).join(subStr).length;
}

class Checker extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this)
    this.checkForMistakes = this.checkForMistakes.bind(this)
    this.state = {
      number: 0,
      structure: 0,
      style: 0,
      formatting: 0,
      grammar: 0,
      comment: undefined
    };
  }
    componentDidMount() {
      console.log(this)
      $(".checker").css({display:'block'})
      $(".editor").css({display:'none'})
     
    }
    checkForMistakes (array, text, suggestions, comment) {
      text = withoutReferences(text);
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
                suggestions.unshift({
                  index: indices[k],
                  offset: array[i].length,
                  reason: comment,
                  type: "academicStyle"
                });
              }
            }
          }
        }
      }

      return suggestions;
    };
    onChange() {
      var text = $("#check-textarea").val();
      var suggestions = [];
      
      // Look for mistakes from libraries
     

      if (text && text.length) {
        suggestions = this.checkForMistakes(
          shortForms,
          text,
          suggestions,
          "Do not use contractions in academic writing"
        );      
        suggestions = this.checkForMistakes(
          weakWords,
          text,
          suggestions,
          "Weak word or phrase. Consider replacing with a more specific equivalent"
        );
        suggestions = this.checkForMistakes(
          informal,
          text,
          suggestions,
          "Informal phrase. Do not use idiomatic expressions and metaphors"
        );
        suggestions = this.checkForMistakes(
          pronouns,
          text,
          suggestions,
          "Do not use 1st and 2nd person pronouns. Prefer the 3rd person perspective (he, she, it, they)"
        );

        suggestions = this.checkForMistakes(
          vague,
          text,
          suggestions,
          "This word is vague. Consider changing to a more specific synonym"
        );
        suggestions = this.checkForMistakes(
          phrasalVerbs,
          text,
          suggestions,
          "Phrasal verb. Consider replacing with a one-word equivalent"
        );
        suggestions = this.checkForMistakes(
          wordiness,
          text,
          suggestions,
          "This phrase might be wordy. Consider changing or removing"
        );
      }
      //checking
      suggestions = checkRepetitions(text, suggestions);
      suggestions = punctuationChecker(text, suggestions);
      suggestions = checkAmerican(text, suggestions);
      suggestions = checkOutdated(text, suggestions);
      suggestions = checkLinkingWords(text, suggestions);

      suggestions = passiveVoiceChecker(text, suggestions);
      suggestions = factChecker(text, suggestions);
      suggestions = checkReferences(text, suggestions);
      suggestions = checkReplace(text, suggestions);
      suggestions = checkWordOrder(text, suggestions);
      suggestions = checkPrepositional(text, suggestions);
      suggestions = checkConcludingSentences(text, suggestions);

      // suggestions = suggestions.sort((a, b) => (a.index > b.index) ? 1 : -1)

      var style = 0,
        structure = 0,
        formatting = 0,
        grammar = 0,
        number = 0;

      try {
        for (var i = 0; i < suggestions.length; i++) {
          let suggestion = suggestions[i];
          var index = suggestion.index;
          var offset = suggestion.offset;
          var abort = false;
          if (suggestion.reason !== "Repetition") {
            number++;
            this.setState({ number: number });
          }
          var mistake = text.substring(index, index + offset);
          for (var k = 0; k < globalExceptions.length; k++) {
            if (mistake === globalExceptions[k]) {
              abort = true;
            }
          }
          if (mistake === "In conclusion") {
            suggestion.reason =
              'Avoid phrases like "in conclusion," "to conclude," "in summary," and "to sum up." These phrases can be useful in oral presentations. However, readers can see when an essay is about to end.';
          }

          for (let word = 0; word < transitions.length; word++) {
            if (
              mistake === transitions[word] &&
              !suggestion.reason.includes("separate the introductory")
            ) {
              abort = true;
            }
          }

          var mistakeClass = suggestion.type;
          
          if (mistakeClass === "academicStyle" || mistakeClass === "replace") {
            style += 1;
            this.setState({ style: style });
          } else if (mistakeClass === "structure") {
            structure += 1;
            this.setState({ structure: structure });
          } else if (mistakeClass === "formatting") {
            formatting += 1;
            this.setState({ formatting: formatting });
          } else if (mistakeClass === "grammar") {
            grammar += 1;
            this.setState({ grammar: grammar });
          }

          if (
            (isLetter(text[index - 1]) || isLetter(text[index + offset])) &&
            mistakeClass !== "grammar" &&
            mistakeClass !== "structure"
          ) {
            abort = true;
          }

          if (abort) {
            continue;
          }
         
          var start = index;
          var end = start + offset;

          if (!$(".checker__paragraph").html()) {
            var html = $("#check-textarea").val();
          } else {
            html = $(".checker__paragraph").html();

            var startAfter = html.substring(start, html.length - 1);

            if (suggestion.type === "repetition") {
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
                

                if (!largerSubstring.includes(">")) {
                  let newBeginning = html.indexOf(largerSubstring);
                  if (newBeginning !== -1) {
                    startAfter = html.substring(newBeginning, html.length - 1);
                    start =
                      html.indexOf(startAfter) + startAfter.indexOf(mistake);
                  } else {
                    if (mistake.includes("&")) {
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
            $(".check-textarea").css({ opacity: 0 });
            html = `${html
              .substring(0, start)
              .concat(beforeSpan, mistake, afterSpan, html.substring(end))}`;

            $(".checker__paragraph").html(html.replace(/\n/, "</div><div>"));

            $(".check-textarea").css({ zIndex: "-1" });
          }
        }
      } catch (e) {
        console.log(e);
      }

      $(".clear__container").css({ opacity: "1" });
      
      // style
      $(".academicStyle").on("click", function() {
        var comment = $(this).attr("academicStyle");

        comment = checkComment(comment);

        $(`#mistake`).text(comment);
        $('.comment').text(comment)
        $('.comment').css({opacity:'1'})
        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".academicStyle")
          .not(this)
          .css({ background: "rgb(255, 255, 124)" });
        $(".structure").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".grammar").css({ background: "#ead1dc" });
        $(".replace").css({ background: "#b6d7a8" });
        $(".formatting").css({ background: "#f9cb9c" });
        $('.comment').css({opacity:"1"})
      });

      // Replace
      $(".replace").on("click", function() {
        var comment = $(this).attr("replace");

        comment = checkComment(comment);

        $(`#mistake`).text(comment);
        $('.comment').text(comment)
        $('.comment').css({opacity:'1'})

        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".replace")
          .not(this)
          .css({ background: "#b6d7a8" });
        $(".academicStyle").css({ background: "rgb(255, 255, 124)" });
        $(".structure").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".formatting").css({ background: "#f9cb9c" });
        $(".grammar").css({ background: "#ead1dc" });
        $('.comment').css({opacity:"1"})
      });

      // Repetitions

      $(".repetition").on("click", function() {
        var comment = $(this).attr("repetition");

        comment = checkComment(comment);

        $(`#mistake`).text(comment);
        $('.comment').text(comment)
        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".academicStyle").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".structure").css({ background: "#fce5cd" });
        $(".repetition")
          .not(this)
          .css({ background: "#c9daf8" });
        $(".replace").css({ background: "#b6d7a8" });
        $(".grammar").css({ background: "#ead1dc" });
        $(".formatting").css({ background: "#f9cb9c" });
        $('.comment').css({opacity:"1"})
      });

      // Sentences
      $(".structure").on("click", function() {
        var comment = $(this).attr("structure");

        comment = checkComment(comment);
        $('.comment').text(comment)

        $(`#mistake`).text(comment);
        $(this).css({ background: "rgb(255, 155, 124)" });

        $(".academicStyle").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".structure")
          .not(this)
          .css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".grammar").css({ background: "#ead1dc" });
        $(".replace").css({ background: "#b6d7a8" });
        $(".formatting").css({ background: "#f9cb9c" });
        $('.comment').css({opacity:"1"})
      });

      // Grammar
      $(".grammar").on("click", function() {
        var comment = $(this).attr("grammar");

        comment = checkComment(comment);
        $(`#mistake`).text(comment);
        $('.comment').text(comment)
        $(this).css({ background: "rgb(255, 155, 124)" });
        $(".academicStyle").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".structure").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".replace").css({ background: "#b6d7a8" });
        $(".formatting").css({ background: "#f9cb9c" });
        $(".grammar")
          .not(this)
          .css({ background: "#ead1dc" });
        $('.comment').css({opacity:"1"})
      });

      // Formatting
      $(".formatting").on("click", function() {
        var comment = $(this).attr("formatting");

        comment = checkComment(comment);
        $(`#mistake`).text(comment);
        $('.comment').text(comment)
        $(this).css({ background: "rgb(255, 155, 124)" });
        $(".academicStyle").css({
          background: "rgb(255, 255, 124)",
          color: "#000"
        });
        $(".structure").css({ background: "#fce5cd" });
        $(".repetition").css({ background: "#c9daf8" });
        $(".replace").css({ background: "#b6d7a8" });
        $(".grammar").css({ background: "#ead1dc" });
        $(".formatting")
          .not(this)
          .css({ background: "#f9cb9c" });
        $('.comment').css({opacity:"1"})
      });
    };
  

  

  render() {
    return (
      <div className="checker">
        <div className="checker__center">
          <textarea
            placeholder="Paste paper here"
            spellCheck="true"
            onChange={this.onChange}
            name="Text1"
            cols="40"
            rows="5"
            className="check-textarea"
            id="check-textarea"
          
          ></textarea>
          <div className="checker__paragraph"></div>
        </div>
        <Comment 
          id='mistake'
          comment={this.state.comment}

        />
        <div className="checker__mistakes"></div>
        <Clear />
        <Table
          number={this.state.number}
          style={this.state.style}
          structure={this.state.structure}
          formatting={this.state.formatting}
          grammar={this.state.grammar}
        />
      </div>
    );
  }
}


export default Checker;

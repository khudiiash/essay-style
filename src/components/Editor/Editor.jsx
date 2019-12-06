/* eslint-disable no-extend-native */
import React from "react";
import "./Editor.scss";
import $ from "jquery";

import Comment from "../Comment/Comment";
import Theme from "../Buttons/Theme/Theme";
import Mode from "../Buttons/Mode/Mode";

//libs
import phrasalVerbs from "../../libraries/phrasal-verbs";
import weakWords from "../../libraries/weak-words";
import pronouns from "../../libraries/pronouns";
import wordiness from "../../libraries/wordiness";
import vague from "../../libraries/vague";
import informal from "../../libraries/informal";
import replace from "../../libraries/replace";
import weasel from "../../libraries/weasel";
import replacePV from "../../libraries/replacePV";

// regex
import concludingSentencesRX from "../../libraries/regex/concludingSentencesRX";
import {
  passiveRXglobal,
  passiveRXinline
} from "../../libraries/regex/passiveRX";
import {
  punctuationRXglobal,
  punctuationRXinline
} from "../../libraries/regex/punctuationRX";
import outdated from "../../libraries/regex/outdated.js";
import factChecker from "../../libraries/regex/factChecker";
import conjunctionStart from "../../libraries/regex/conjunctionStart";
import prepositionalRX from "../../libraries/regex/prepositionalRX";
import apostrophesRX from "../../libraries/regex/apostrophesRX";
import repetitionsRX from "../../libraries/regex/repetitionsRX";
import APAcitationRX from "../../libraries/regex/APAcitationRX";
import alsoRX from "../../libraries/regex/alsoRX";
import determiner from "../../libraries/regex/determiner";
import wordOrderRX from "../../libraries/regex/wordOrder";

//modules
import clean from "../../modules/clean";
import { disableScroll, enableScroll } from "../../modules/scroll";

let thesaurus = "https://thesaurus.com/browse/";
let citations =
  "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html";

let regexes = []
  .concat(prepositionalRX)
  .concat(concludingSentencesRX)
  .concat(passiveRXglobal)
  .concat(punctuationRXglobal)
  .concat(factChecker)
  .concat(conjunctionStart)
  .concat(apostrophesRX)
  .concat(repetitionsRX)
  .concat(APAcitationRX)
  .concat(outdated)
  .concat(alsoRX)
  .concat(determiner)
  .concat(wordOrderRX);

let spanColor = "transparent",
  spanColorSelected = "rgb(253, 238, 107)";
let sentences = [],
  wordOrder = [],
  facts = [],
  punctuation = [],
  references = [],
  empty = true;

let replaceArray = [];
for (var p = 0; p < replace.length; p++) {
  let pair = replace[p];

  let replaceWord = Object.keys(pair)[0];
  replaceArray.push(replaceWord);
}

let replacePVs = [];
for (p = 0; p < replacePV.length; p++) {
  let pair = replacePV[p];
  let replaceWord = Object.keys(pair)[0];
  replacePVs.push(replaceWord);
}
replaceArray = clean(replaceArray);

function cl(text) {
  console.log(text);
}

let mistakes = phrasalVerbs
  .concat(informal)
  .concat(pronouns)
  .concat(wordiness)
  .concat(vague)
  .concat(replaceArray)
  .concat(weasel)
  .concat(weakWords);

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.substring(1, this.length);
};

class Editor extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.toChecker = this.toChecker.bind(this);
    this.toEditor = this.toEditor.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.state = {
      comment: "",
      repetitions: [],
      concluding: [],
      theme: "white",
      mode: "edit"
    };
  }

  onChange() {}

  enableTab(id) {
    var el = document.getElementById(id);

    el.onkeydown = function(e) {
      if (e.key === "Tab") {
        // tab was pressed

        // get caret position/selection
        var val = this.value,
          start = this.selectionStart,
          end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value = val.substring(0, start) + "\t" + val.substring(end);

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        return false;
      }
    };
  }

  switchTheme(theme) {
    this.setState({ theme });
  }

  toChecker() {
    this.setState({ mode: "check" });
    this.componentDidMount(true, this.state.theme);
  }

  toEditor() {
    this.setState({ mode: "edit" });
    this.componentDidMount(false, this.state.theme);
  }
  componentDidMount(isChecker = false, theme = "white") {
    $(".checker").css({ display: "none" });
    $(".editor").css({ display: "block" });

    $(document).ready(function() {
      let white = "#e6e6e6",
        black = "#2d2d2d";
      let fontColor = theme === "white" ? black : white;
      if (isChecker) {
        $("span").css({
          background: "#ead1dc",
          color: "#2d2d2d"
        });
        $(".highlights").css({ color: fontColor });
      } else {
        $("span").css({
          background: "transparent",
          color: "transparent"
        });
        $("textarea").css({ color: fontColor });
      }
    });

    this.enableTab("text");
    $("#text").scrollTop(0, 0);
    var $editor = $(".editor");
    var $backdrop = $(".backdrop");
    var $highlights = $(".highlights");
    var $textarea = $("#text");
    var $toggle = $("button");

    var ua = window.navigator.userAgent.toLowerCase();
    var isIE = !!ua.match(/msie|trident\/7|edge/);
    var isWinPhone = ua.indexOf("windows phone") !== -1;
    var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

    function applyHighlights(text) {
      for (var x = 0; x < regexes.length; x++) {
        let re = regexes[x];
        text = text.replace(re, "<span>$&</span>");
      }
      for (var r = 0; r < mistakes.length; r++) {
        let re;

        if (mistakes[r] !== "us") {
          re = new RegExp(
            `(?<![A-Za-z0-9])${mistakes[r]}(?![A-Za-z0-9])`,
            `gi`
          );
        } else {
          re = new RegExp(`(?<![A-Za-z0-9])${mistakes[r]}(?![A-Za-z0-9])`, `g`);
        }

        text = text.replace(re, "<span>$&</span>");
        // text = text
        //   .replace(/\n$/, "\n\n");
      }

      let re = /<span><span>([A-Za-z0-9()?%$&,.;"':\s]+)<\/span><\/span>/gi;
      let matches = [...text.matchAll(re)];
      for (var f = 0; f < matches.length; f++) {
        var newM = new RegExp(`${matches[f][0]}`, "g");
        if (text.match(newM)) {
          let innerText = text
            .match(newM)[0]
            .replace(/<span><span>/, "")
            .replace(/<\/span><\/span>/, "");
          var finalRe = new RegExp(
            `<span><span>${innerText}</span></span>`,
            "g"
          );
          text = text.replace(finalRe, `<span>${innerText}</span>`);
        }
      }

      if (isIE) {
        // IE wraps whitespace differently in a div vs textarea, this fixes it
        text = text.replace(/ /g, " <wbr>");
      }

      $(document).ready(function() {
        $(".backdrop").on("mouseenter", function() {
          disableScroll();
        });
        $(".backdrop").on("mouseout", function() {
          enableScroll();
        });
        $("span").on("mouseenter", function() {
          disableScroll();
        });
        $("span").on("mouseout", function() {
          enableScroll();
        });

        let timer, displayTimer;

        $("span").hover(
          function() {
            clearTimeout(timer);
            clearTimeout(displayTimer);

            $(".comment-replaces")
              .children()
              .hide();

            $(".comment").css("cursor", "default");
            $(".comment-replace")
              .text("")
              .hide();
            var position = $(this).position();
            var TAposition = $("textarea").position();
            var commentWidth = $(".comment").width();
            var commentHeight = $(".comment").height();
            var windowHeight = $(".App").height();
            var spanHeight = 28;
            var spanWidth = $(this).width();
            if (windowHeight - position.top > windowHeight / 4) {
              $(".comment").css({
                opacity: "1",
                display: "block",
                position: "absolute",
                "z-index": "3",
                left: `${position.left +
                  TAposition.left -
                  commentWidth / 2 +
                  spanWidth / 2}px`,
                top: `${position.top + spanHeight * 2 + 10}px`
              });
            } else {
              $(".comment").css({
                opacity: "1",
                display: "block",
                position: "absolute",
                "z-index": "3",
                left: `${position.left +
                  TAposition.left -
                  commentWidth / 2 +
                  spanWidth / 2}px`,
                top: `${position.top - spanHeight - commentHeight}px`
              });
            }

            let mistake = $(this).text();

            var text = $("textarea").val();

            let repetitions = [...text.matchAll(repetitionsRX)].map(
              repetition => {
                return repetition[0];
              }
            );

            mistake = mistake.replace(/<span([^\>]+)?>/g, "");
            mistake = mistake.replace(/<\/span>/g, "");

            if (clean(weakWords).includes(mistake.toLowerCase())) {
              for (var w = 0; w < weakWords.length; w++) {
                if (clean(weakWords)[w] === mistake) {
                  $(".comment-heading").text("Weak word");
                  $(".comment-text").html(
                    `Replace with a more specific synonym. Check out synonyms for <a class='links' href='${thesaurus}${mistake}?s=t' target="_blank">${mistake}<a>`
                  );
                  return text;
                }
              }
            } else if (
              /(?:\%|\d{1,4}|example|instance|also|addition|likewise|moreover|furthermore|besides|another)/gi.test(
                mistake
              ) &&
              concludingSentencesRX.test(". " + mistake + "\n")
            ) {
              $(".comment-heading").text(`Structure`);
              $(".comment-text").text(
                `Concluding sentence must summarize the paragraph's main point`
              );
              $(this).html(mistake);
              return text;
            } else if (wordOrder.includes(mistake)) {
              $(".comment-heading").text("Word order");
              $(".comment-text").text("Wrong word order");
              return text;
            } else if (clean(vague).includes(mistake.toLowerCase())) {
              $(".comment-heading").text("Vagueness");
              $(".comment-text").text(
                "Vague word or phrase. Consider replacing"
              );
              return text;
            } else if (pronouns.includes(mistake.toLowerCase())) {
              $(".comment-heading").text("Wrong pronoun");
              $(".comment-text").html(
                "Do not use 1st and 2nd person pronouns such as <i>we</i>, <i>us</i>, <i>our</i>, <i>you</i>, <i>your</i>"
              );
              return text;
            } else if (
              phrasalVerbs.find(string => {
                let regex = new RegExp(`^${string}$`);
                return regex.test(mistake);
              })
            ) {
              $(".comment-heading").text("Phrasal Verb");
              $(".comment-text").text(
                "Do not use it in academic writing as it is considered informal"
              );
              return text;
            } else if (
              informal.includes(mistake.toLowerCase()) ||
              informal.find(string => {
                let regex = new RegExp(`^${string}$`);
                return regex.test(mistake);
              })
            ) {
              $(".comment-heading").text("Informal phrase");
              $(".comment-text").text(
                "This phrase might be informal or inappropriate in academic writing, so better do not use it"
              );
              return text;
            } else if (
              weasel.includes(mistake.toLowerCase()) ||
              weasel.find(string => {
                let regex = new RegExp(`^${string}$`, "i");
                return regex.test(mistake);
              })
            ) {
              $(".comment-heading").text(
                `Weasel  ${mistake.includes(" ") ? "phrase" : "word"}`
              );
              mistake.includes("society")
                ? $(".comment-text").text(
                    "Avoid writing about the whole society. It is a bad writing habit"
                  )
                : $(".comment-text").text(
                    `This ${
                      mistake.includes(" ") ? "phrase" : "word"
                    } might be ambiguous and vague. Please, replace with a more specific equivalent or edit out`
                  );

              return text;
            } else if (punctuation.includes(mistake)) {
              $(".comment-heading").text();
              $(".comment-text").text(
                'Since it is a restrictive clause, replace "which" with "that"'
              );
              return text;
            } else if (APAcitationRX.test(mistake)) {
              $(".comment-heading").text("Formatting");
              $(".comment-text").html(
                `Incorrect citation formatting, please check <a href=${citations} target='_blank' class='links'>Purdue Owl</a>`
              );
              return text;
            } else if (wordiness.includes(mistake)) {
              $(".comment-heading").text("Wordiness");
              $(".comment-text").text(
                "This phrase might be unnecessarily wordy. Reduce it or edit out"
              );
              return text;
            } else if (wordOrderRX.test(mistake)) {
              $(".comment-heading").text("Word Order");
              $(".comment-text").html(
                "Do not put adverbs in between <i class='italics'>to</i> and the infinitive"
              );
              let correctOne = `to ${mistake.split(" ")[2]}`;
              let correctTwo = `to ${mistake.split(" ")[2]} ${
                mistake.split(" ")[1]
              }`;
              let correctThree = `${mistake.split(" ")[1]} to ${
                mistake.split(" ")[2]
              }`;

              $(".btn-0")
                .text(correctOne)
                .show();
              $(".btn-1")
                .text(correctTwo)
                .show();
              $(".btn-2")
                .text(correctThree)
                .show();

              for (var i = 0; i < 3; i++) {
                // eslint-disable-next-line no-loop-func
                $(`.btn-${i.toString()}`).click(function() {
                  let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

                  $("textarea").val(
                    $("textarea")
                      .val()
                      .replace(replaceRX, $(this).text())
                  );
                  $(`span:contains("${mistake}")`).css("display", "none");
                  $(".comment").css({ opacity: "0" });
                  function doUndo() {
                    document.execCommand("undo", false, null);
                  }
                  $(`.btn-${i.toString()}`).unbind("click");
                  setTimeout(doUndo(), 1);
                });
              }
              return text;
            } else if (references.includes(mistake)) {
              $(".comment-text").text("Incorrect formatting");
              return text;
            } else if (mistake === "another" || mistake === "also") {
              $(".comment-heading").text("Tautology");
              $(".comment-text").text(
                `Do not use "${mistake}" after an introductory word that has the same meaning`
              );
              return text;
            } else if (
              /(?:\%|\d{1,4})/.test(mistake) &&
              factChecker.test(mistake)
            ) {
              $(".comment-heading").text("Citations");
              $(".comment-text").text(
                "Facts, dates, figures, statistics must be cited"
              );
              return text;
            } else if (apostrophesRX.test(mistake)) {
              let quotations = mistake.replace(/\‘/, "“").replace(/\’/, "”");
              $(".comment-heading").text(`Formatting`);
              $(".comment-text").text(`Use quotation marks: ${quotations}`);
              return text;
            } else if (passiveRXinline.test(mistake)) {
              $(".comment-heading").text(`Passive Voice`);
              $(".comment-text").text(
                `Avoid passive voice in academic writing as it is considered vague`
              );
              return text;
            } else if (mistake === "This" || mistake === "These") {
              $(".comment-heading").text("Unclear Antecedent");
              $(".comment-text").text(
                `Avoid using a determiner without a corresponding noun at the beginning of the sentence as it might be confusing what exactly "${mistake}" refers to`
              );
              return text;
            } else if (/^\d{4}$/.test(mistake)) {
              $(".comment-heading").text("Outdated source");
              $(".comment-text").text(
                "Use sources published within the last 10 years"
              );
              return text;
            } else if (punctuationRXinline.test(mistake)) {
              $(".comment-heading").text("Punctuation");
              $(".comment-text").text(
                "Linking words must be separated by commas"
              );
              if (mistake === mistake.capitalize()) {
                $(".btn-0")
                  .text(`${mistake},`)
                  .show();
              } else {
                $(".btn-0")
                  .text(`, ${mistake},`)
                  .show();
              }

              $(".btn-0").click(function() {
                let replaceRX = new RegExp(`\\s\\b${mistake}\\b`, "g");
                if (mistake === mistake.capitalize()) {
                  replaceRX = new RegExp(`\\b${mistake}\\b`, "g");
                }

                $("textarea").val(
                  $("textarea")
                    .val()
                    .replace(replaceRX, $(this).text())
                    .replace(/(\,){2,}/g, ",")
                );
                $(`span:contains("${mistake}")`).css("display", "none");
                $(".comment").css({ opacity: "0" });
                function doUndo() {
                  document.execCommand("undo", false, null);
                }

                $(".btn-0").unbind("click");
                setTimeout(doUndo(), 1);
              });

              return text;
            } else if (facts.includes(mistake)) {
              if (/^\(.*\)$/.test(mistake)) {
                $(".comment-heading").text("Citation at the end");
                $(".comment-text").text(
                  "Conclusion paragraph must not include any new information, especially citations"
                );
                return text;
              } else {
                $(".comment-heading").text("No citation");
                $(".comment-text").text(
                  "Any dates, statistics, and specific facts must be cited"
                );
                return text;
              }
            } else if (
              replaceArray.includes(mistake) ||
              replaceArray.includes(mistake.capitalize()) ||
              replaceArray.includes(mistake.toLowerCase()) ||
              /\b(?:end|ended|ends|ending)\b\s\bup\b\s\b\w+ing\b/.test(mistake)
            ) {
              $(".comment-text").text("");
              $(".comment").css("cursor", "pointer");
              $(".comment-heading").text("Replace");
              if (replacePVs.includes(mistake)) {
                $(".comment-heading").text("Phrasal Verb");
              }
              if (mistake !== mistake.capitalize()) {
                for (var r = 0; r < replace.length; r++) {
                  let pair = replace[r];

                  if (
                    clean(Object.keys(pair)[0]) === mistake ||
                    /\b(?:end|ended|ends|ending)\b\s\bup\b\s\b\w+ing\b/.test(
                      mistake
                    )
                  ) {
                    let repl = Object.values(pair)[0];

                    if (!repl.includes(",")) {
                      $(`.btn-0`)
                        .show()
                        .text(repl);
                      $(".btn-0").click(() => {
                        let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

                        $("textarea").val(
                          $("textarea")
                            .val()
                            .replace(replaceRX, repl)
                        );
                        $(`span:contains("${mistake}")`).css("display", "none");
                        $(".comment").css({ opacity: "0" });

                        function doUndo() {
                          document.execCommand("undo", false, null);
                        }
                        setTimeout(doUndo(), 1);
                        $(".comment-replace")
                          .text(``)
                          .hide();
                        $(".btn-0").unbind("click");
                      });
                    } else {
                      let repls = repl.split(",");
                      for (r = 0; r < repls.length; r++) {
                        $(`.btn-${r.toString()}`).text(repls[r].trim());

                        $(`.btn-${r.toString()}`).show();
                        // eslint-disable-next-line no-loop-func
                        $(`.btn-${r.toString()}`).click(function() {
                          let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

                          $("textarea").val(
                            $("textarea")
                              .val()
                              .replace(replaceRX, $(this).text())
                          );
                          $(`span:contains("${mistake}")`).css(
                            "display",
                            "none"
                          );
                          $(".comment").css({ opacity: "0" });
                          function doUndo() {
                            document.execCommand("undo", false, null);
                          }
                          setTimeout(doUndo(), 1);
                          $(".comment-replace")
                            .text(``)
                            .hide();
                          $(".comment-replaces")
                            .children()
                            .unbind("click");
                        });
                      }
                    }

                    return text;
                  }
                }
              } else {
                for (r = 0; r < replace.length; r++) {
                  let pair = replace[r];

                  if (
                    clean(Object.keys(pair)[0]) === mistake ||
                    clean(Object.keys(pair)[0]) === mistake.toLowerCase()
                  ) {
                    let repl = Object.values(pair)[0];
                    if (!repl.includes(",")) {
                      repl = mistake !== "America" ? repl.capitalize() : repl;
                      $(".btn-0")
                        .show()
                        .text(repl);
                      $(".btn-0").click(() => {
                        let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

                        $("textarea").val(
                          $("textarea")
                            .val()
                            .replace(replaceRX, repl)
                        );
                        $(`span:contains("${mistake}")`).css("display", "none");
                        $(".comment").css({ opacity: "0" });
                        function doUndo() {
                          document.execCommand("undo", false, null);
                        }
                        setTimeout(doUndo(), 1);
                        $(".comment-replace")
                          .text(``)
                          .hide();
                        $(".btn-0").unbind("click");
                      });
                    } else {
                      let repls = repl.split(",");
                      repls = repls.map(w => {
                        return w.capitalize();
                      });

                      for (r = 0; r < repls.length; r++) {
                        $(`.btn-${r.toString()}`).text(repls[r].trim());

                        $(`.btn-${r.toString()}`).show();
                        $(`.btn-${r.toString()}`).click(function() {
                          let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

                          $("textarea").val(
                            $("textarea")
                              .val()
                              .replace(replaceRX, $(this).text())
                          );
                          $(`span:contains("${mistake}")`).css(
                            "display",
                            "none"
                          );
                          $(".comment").css({ opacity: "0" });
                          function doUndo() {
                            document.execCommand("undo", false, null);
                          }
                          setTimeout(doUndo(), 1);
                          $(".comment-replace")
                            .text(``)
                            .hide();
                          $(".comment-replaces")
                            .children()
                            .unbind("click");
                        });
                      }
                    }

                    return text;
                  }
                }
              }
            } else if (
              repetitions.includes(mistake) &&
              !mistakes.includes(mistake)
            ) {
              $(".comment-heading").text("Repetition");

              $(".comment-text").html(
                `Avoid repeating the same words within a single sentence.\n\tCheck out synonyms for <a class='links' href='${thesaurus}${mistake}?s=t' target="_blank">${mistake}<a>`
              );
              if (mistake === mistake.capitalize()) {
                $(".comment-text").html(
                  `Do not begin two subsequent sentences with the same word.\n\tCheck out synonyms for <a class='links' href='${thesaurus}${mistake.toLowerCase()}?s=t' target="_blank">${mistake}<a>`
                );
              }

              if (
                mistake.includes(" ") &&
                mistake.split(" ")[0] === mistake.split(" ")[1]
              ) {
                $(".comment-text").html(
                  `You duplicated <i>${mistake.split(" ")[0]}</i>`
                );
                $(".btn-0")
                  .text(`${mistake.split(" ")[0]}`)
                  .show();
                $(".btn-0").click(function() {
                  let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

                  $("textarea").val(
                    $("textarea")
                      .val()
                      .replace(replaceRX, `${mistake.split(" ")[0]}`)
                  );
                  $(`span:contains("${mistake}")`).css("display", "none");
                  $(".comment").css({ opacity: "0" });
                  function doUndo() {
                    document.execCommand("undo", false, null);
                  }
                  $(".btn-0").unbind("click");
                  setTimeout(doUndo(), 1);
                });
              }
              return text;
            }

            for (var p = 0; p < prepositionalRX.length; p++) {
              let reg = prepositionalRX[p];
              if (reg.test(mistake)) {
                $(".comment-text").text(`Rephrase with fewer prepositions`);
                return text;
              }
            }
          },
          function() {
            $(".comment").hover(
              () => {
                clearTimeout(timer);
                clearTimeout(displayTimer);
              },
              () => {
                clearTimeout(timer);
                clearTimeout(displayTimer);
                timer = setTimeout(() => {
                  $(".comment").css({
                    opacity: "0"
                  });
                }, 50);
                displayTimer = setTimeout(() => {
                  $(".comment").css({
                    display: "none"
                  });
                }, 1);
              }
            );
            timer = setTimeout(() => {
              $(".comment").css({
                opacity: "0"
              });
            }, 1000);
            displayTimer = setTimeout(() => {
              $(".comment").css({
                display: "none"
              });
            }, 1000);
          }
        );

        $("#text").on("scroll", function() {
          $(".comment").css({
            display: "none"
          });
        });
      });

      return text;
    }

    function handleInput() {
      var text = $("textarea").val();
      var highlightedText = applyHighlights(text);
      $highlights.html(highlightedText);
    }
    handleInput = handleInput.bind(this);

    function handleScroll() {
      var scrollTop = $textarea.scrollTop();
      $backdrop.scrollTop(scrollTop);

      var scrollLeft = $textarea.scrollLeft();
      $backdrop.scrollLeft(scrollLeft);
    }

    function fixIOS() {
      // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
      $highlights.css({
        "padding-left": "+=3px",
        "padding-right": "+=3px"
      });
    }

    function bindEvents() {
      $textarea.on({
        input: handleInput,
        scroll: handleScroll
      });

      $toggle.on("click", function() {
        $editor.toggleClass("perspective");
      });
    }

    if (isIOS) {
      fixIOS();
    }

    bindEvents();
    handleInput();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="editor">
          <div className="backdrop">
            <div className="highlights"></div>
          </div>
          <textarea
            className="edit-textarea"
            onChange={this.onChange}
            id="text"
          ></textarea>
          <Comment comment={this.state.comment} />
        </div>
        <div className="buttons">
          <Theme switchTheme={this.switchTheme} mode={this.state.mode} />
          <Mode toEditor={this.toEditor} toChecker={this.toChecker} />
        </div>
      </div>
    );
  }
}

export default Editor;

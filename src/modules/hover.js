import $ from "jquery";

//libs
import phrasalVerbs from "../libraries/phrasal-verbs";
import weakWords from "../libraries/weak-words";
import pronouns from "../libraries/pronouns";
import wordiness from "../libraries/wordiness";
import vague from "../libraries/vague";
import informal from "../libraries/informal";
import replace from "../libraries/replace";
import weasel from "../libraries/weasel";

// regex
import concludingSentencesRX from "../libraries/regex/concludingSentencesRX";
import passiveRX from "../libraries/regex/passiveRX";
import punctuationRX from "../libraries/regex/punctuationRX";
import outdated from "../libraries/regex/outdated.js";
import factChecker from "../libraries/regex/factChecker";
import conjunctionStart from "../libraries/regex/conjunctionStart";
import prepositionalRX from "../libraries/regex/prepositionalRX"
import apostrophesRX from "../libraries/regex/apostrophesRX"
import repetitionsRX from "../libraries/regex/repetitionsRX"
import APAcitationRX from "../libraries/regex/APAcitationRX"
import alsoRX from "../libraries/regex/alsoRX"
import disableScroll from "disable-scroll";


let regexes = []
  .concat(prepositionalRX)
  .concat(concludingSentencesRX)
  .concat(passiveRX)
  .concat(punctuationRX)
  .concat(factChecker)
  .concat(conjunctionStart)
  .concat(apostrophesRX)
  .concat(repetitionsRX)
  .concat(APAcitationRX)
  .concat(outdated)
  .concat(alsoRX)

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

let mistakes = phrasalVerbs
  .concat(informal)
  .concat(pronouns)
  .concat(wordiness)
  .concat(vague)
  .concat(weasel)
  .concat(replaceArray)
  .concat(weakWords)

  // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1, this.length);
  };

export function mouseOver () {
    // clearTimeout(timer)
    // clearTimeout(displayTimer)
    $('.comment').css('cursor', 'default')
    $('.comment').hover(() => {
        $('.comment').css({
            'border-right': '12px solid rgb(48, 48, 48)',
            'border-left': '12px solid rgb(48, 48, 48)',
        })
    }, () => {
        $('.comment').css({
            'border-right': '12px solid rgb(67, 67, 67)',
            'border-left': '12px solid rgb(67, 67, 67)',
        })
    })
    console.log('this equals to', this)
    var position = $(this).position();
    var TAposition = $('textarea').position()
    var commentWidth = $('.comment').width()
    var commentHeight = $('.comment').height()
    var windowHeight = $('.App').height()
    var spanHeight = 28;
    var spanWidth = $(this).width()
    if (windowHeight - position.top > windowHeight / 4) {
        $(".comment").css({
            opacity: "1",
            display: "block",
            position: 'absolute',
            'z-index': '3',
            left: `${position.left + TAposition.left - (commentWidth / 2) + spanWidth / 2}px`,
            top: `${position.top + spanHeight * 2 + 10}px`

        })
    } else {
        $(".comment").css({
            opacity: "1",
            display: "block",
            position: 'absolute',
            'z-index': '3',
            left: `${position.left + TAposition.left - (commentWidth / 2) + spanWidth / 2}px`,
            top: `${position.top - spanHeight - commentHeight}px`

        })
    }

    let mistake = $(this).text();
    var text = $('textarea').val()
    let repetitions = [...text.matchAll(repetitionsRX)].map((repetition) => { return repetition[0] })
    mistake = mistake.replace(/<span>/g, "");
    mistake = mistake.replace(/<\/span>/g, "");


    $(this).css({ backgroundColor: spanColorSelected, color: '#2d2d2d' });
    $('span').not(this)
        .css({ backgroundColor: spanColor, color: 'transparent' });
    $(this).children().css({
        backgroundColor: spanColorSelected, color: '#2d2d2d'
    })



    if (weakWords.includes(mistake.toLowerCase())) {
        for (var w = 0; w < weakWords.length; w++) {
            if (weakWords[w] === mistake) {
                $(".comment").text(
                    "Weak word. Replace with a more specific synonym."
                );
                return text;
            }
        }
    } else if (wordOrder.includes(mistake)) {
        $(".comment").text("Wrong word order");
        return text;
    } else if (vague.includes(mistake.toLowerCase())) {
        $(".comment").text("Vague word or phrase. Consider replacing");
        return text;
    } else if (pronouns.includes(mistake.toLowerCase())) {
        $(".comment").text("Do not use 1st and 2nd person pronouns");
        return text;
    } else if (phrasalVerbs.find((string) => {
        let regex = new RegExp(`^${string}$`)
        return regex.test(mistake)
    })) {
        $(".comment").text(
            "Phrasal verb. Do not use it in academic writing."
        );
        return text;
    } else if (informal.includes(mistake.toLowerCase()) || informal.find((string) => {
        let regex = new RegExp(`^${string}$`)
        if (regex.test(mistake)) console.log(regex)
        return regex.test(mistake)
    }
    )) {

        $(".comment").text("Informal phrase, do not use it");
        return text;
    } else if (weasel.includes(mistake.toLowerCase()) || weasel.find((string) => {
        let regex = new RegExp(`^${string}$`, 'i')
        return regex.test(mistake)
    }
    )) {

        mistake.includes('society')
            ? $(".comment").text("Do not write about the whole society. It is a bad writing habit")
            : $(".comment").text("Weasel Word");

        return text;
    } else if (punctuation.includes(mistake)) {
        $(".comment").text(
            'Since it is a restrictive clause, replace "which" with "that"'
        );
        return text;
    } else if (repetitions.includes(mistake) && !mistakes.includes(mistake)) {
        $(".comment").text(
            'Repetition'
        );
        return text;
    } else if (APAcitationRX.test(mistake)) {
        $(".comment").text(
            'Incorrect citation formatting'
        );
        return text;
    } else if (wordiness.includes(mistake)) {
        $(".comment").text("This phrase might be wordy");
        return text;
    } else if (references.includes(mistake)) {
        $(".comment").text("Incorrect formatting");
        return text;
    } else if (mistake === 'another' || mistake === 'also') {
        $(".comment").text("Tautology");
        return text;
    } else if (/(?:\%|\d{1,4})/.test(mistake) && factChecker.test(' ' + mistake)) {
        $(".comment").text(
            "Facts, dates, figures, statistics must be cited"
        );
        return text;
    } else if (weasel.includes(mistake.toLowerCase())) {
        $(".comment").text(
            "Weasel Word"
        );
        return text;
    } else if (apostrophesRX.test(mistake)) {
        let quotations = mistake.replace(/\‘/, '“').replace(/\’/, '”')
        $(".comment").text(
            `Use quotation spans: ${quotations}`
        );
        return text;
    } else if (passiveRX.test(mistake)) {

        $(".comment").text(
            `Avoid passive voice in academic writing`
        );
        return text;
    } else if (/(?:\%|\d{1,4}|example|instance|also|addition|moreover|furthermore|besides|another)/gi.test(mistake) && concludingSentencesRX.test('. ' + mistake + '\n')) {
        $(".comment").text(
            `Incorrect concluding sentence`
        );
        return text;
    } else if (apostrophesRX.test(mistake)) {
        let quotations = mistake.replace(/\‘/, '“').replace(/\’/, '”')
        $(".comment").text(
            `Use quotation spans: ${quotations}`
        );
        return text;
    } else if (/^\d{4}$/.test(mistake)) {
        $(".comment").text(
            "Outdated source. Use sources published within the last 10 years"
        );
        return text;
    } else if (facts.includes(mistake)) {
        if (/^\(.*\)$/.test(mistake)) {
            $(".comment").text(
                "Conclusion paragraph must not include any new information, especially citations"
            );
            return text;
        } else {
            $(".comment").text(
                "Any dates, statistics, and specific facts must be cited"
            );
            return text;
        }

    } else if (replaceArray.includes(mistake) ||
        replaceArray.includes(mistake.capitalize()) ||
        replaceArray.includes(mistake.toLowerCase())
    ) {
        $('.comment').hover(() => {
            $('.comment').css({
                'border-right': '24px solid rgb(255,83,20)',
                'border-left': '0px solid rgb(48, 48, 48)'
            })
        }, () => {
            $('.comment').css({
                'border-right': '12px solid rgb(48, 48, 48)',
                'border-left': '12px solid rgb(48, 48, 48)'
            })
        })
        $('.comment').css('cursor', 'pointer')

        if (mistake !== mistake.capitalize()) {

            for (var r = 0; r < replace.length; r++) {
                let pair = replace[r];

                if (Object.keys(pair)[0] === mistake) {

                    let repl = Object.values(pair)[0]
                    if (!repl.includes(',')) {
                        $(".comment").text(repl);
                        $(".comment").click(() => {
                            let replaceRX = new RegExp(`\\b${mistake}\\b`, 'g')
                            $('textarea').val($('textarea').val().replace(replaceRX, repl))
                            $(`span:contains("${mistake}")`).css("display", "none");
                            $('.comment').css({ opacity: '0' })
                        })
                    } else {
                        let repls = repl.split(',')
                        $(".comment").text(repls.join(','));
                        $(".comment").click(() => {

                            let replaceRX = new RegExp(`\\b${mistake}\\b`, 'g')
                            $('textarea').val($('textarea').val().replace(replaceRX, repls[0].trim()))
                            $(`span:contains("${mistake}")`).css("display", "none");
                            $('.comment').css({ opacity: '0' })
                            $('textarea').val($('textarea').val() + ' ')

                        })
                    }


                    return text;
                }

            }
        } else {
            console.log('here')
            for (r = 0; r < replace.length; r++) {
                let pair = replace[r];

                if (Object.keys(pair)[0] === mistake.toLowerCase()) {

                    let repl = Object.values(pair)[0]
                    console.log(repl.capitalize())

                    if (!repl.includes(',')) {
                        $(".comment").text(repl.capitalize());
                        $(".comment").click(() => {
                            let replaceRX = new RegExp(`\\b${mistake}\\b`, 'g')
                            $('textarea').val($('textarea').val().replace(replaceRX, repl.capitalize()))
                            $(`span:contains("${mistake}")`).css("display", "none");
                            $('.comment').css({ opacity: '0' })
                            $('.highlights').css({ display: 'none' })
                            $('.highlights').css({ display: 'block' })

                        })
                    } else {
                        let repls = repl.split(',')
                        repls = repls.map((w) => { return w.capitalize() })

                        $(".comment").text(repls.join(','));
                        $(".comment").click(() => {
                            let replaceRX = new RegExp(`\\b${mistake}\\b`, 'g')
                            $('textarea').val($('textarea').val().replace(replaceRX, repls[0]))
                            $(`span:contains("${mistake}")`).css("display", "none");
                            $('.comment').css({ opacity: '0' })

                        })

                    }

                    return text;
                }
            }
        }


    }

    for (var p = 0; p < prepositionalRX.length; p++) {
        let reg = prepositionalRX[p];
        if (reg.test(mistake)) {
            $(".comment").text(`Rephrase with fewer prepositions`);
            return text;
        }
    }


    for (var c = 0; c < punctuationRX.length; c++) {
        let reg = punctuationRX[c];
        if (reg.test(mistake)) {
            $(".comment").text(`Linking words must be separated by commas`);
            return text;
        }
    }
}

export function mouseLeave(timer) {
    $(".comment").hover(() => {
        clearTimeout(timer)

    }, () => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            $(".comment").css({
                opacity: '0'
            })
        }, 50)

        $(".comment").css({
            display: 'none'
        })

    })
    timer = setTimeout(() => {
        $(".comment").css({
            opacity: '0'
        })
    }, 1000)

    $(".comment").css({
        display: 'none'
    })
}
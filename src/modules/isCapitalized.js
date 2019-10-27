export default function isCapitalized(sentence) {
    if (sentence.charAt(0) === "“" || sentence.charAt(0) === '"') {
      sentence.replace(sentence.charAt(0), "");
    }
    var words = sentence.split(" ");
    var capital = [];
    var notCapital = [];
  
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.charAt(0) === word.charAt(0).toUpperCase()) {
        capital.unshift(word);
      } else {
        notCapital.unshift(word);
      }
    }
    return capital.length > notCapital.length;
  }
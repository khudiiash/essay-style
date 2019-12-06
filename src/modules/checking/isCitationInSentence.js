export default function isCitationInSentence(sentence) {
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
export default function getLastSentences(text) {
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
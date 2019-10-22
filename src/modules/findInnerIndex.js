export default function findInnerIndex(text, string, element) {
    let baseIndex = text.indexOf(string);
    let innerIndex = string.indexOf(element);
    return baseIndex + innerIndex;
  }
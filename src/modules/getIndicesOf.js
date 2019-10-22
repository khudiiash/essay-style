export default function getIndicesOf(text, string) {
    let instances = [];
    for (
      let index = text.indexOf(string);
      index >= 0;
      index = text.indexOf(string, index + 1)
    ) {
      instances.unshift(index);
    }
    return instances;
  }
export default function isLetter(c) {
    if (c) {
      return c.toLowerCase() !== c.toUpperCase();
    }
  }
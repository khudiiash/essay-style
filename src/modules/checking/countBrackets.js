export default function countBrackets (str) {
    const re = /\(.*?\)/g;
    return ((str || "").match(re) || []).length;
  };
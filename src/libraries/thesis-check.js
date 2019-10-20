const purposeKeys = [
    "This report",
    "This essay",
    "This paper",
    "This analysis",
    "This study",
    "This work",
    "The purpose",
    "The report",
    "The essay",
    "The paper",
    "The study",
    "The analysis",
    "The given",
    "The aim of this",
    "By this",
    "In this",
    "The given",
    "It is imperative",
    "Discuss",
    "Analyze",
    "Examine",
];

var arrayLength = purposeKeys.length

  for (var i=0; i<arrayLength;i++) {
      var capital = purposeKeys[i].replace(purposeKeys[i].charAt(0),purposeKeys[i].charAt(0).toLowerCase())
      purposeKeys.push(capital);
  }
export default purposeKeys;
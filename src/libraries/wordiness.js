let wordiness = [
    "allegedly",
    "as a matter of fact",
    "by means of",
    "current trend that",
    "despite the fact that",
    "for this reason",
    "in the manner in which",
    "it is noted that",
    "it is evident that",
    "it can be said that",
    "it can be noted that ",
    'it can be seen that',
    "it can be concluded that",
    'it can be assumed that',
    "it may be said that",
    "it has been found out",
    "it has long been known that",
    "it is a fact that",
    'it is a clear indication that',
    "it is arguable that",
    "it is of immense importance",
    "it is prudent to note that",
    "it is very prudent to note that",
    "it is unarguable that",
    "it is worth mentioning that",
    "it is worth noting that",
    "it is argued that",
    "it had been argued that",
    "it is necessary to state that",
    "it is noteworthy that",
    "it is imperative to",
    "it is important to note that",
    "it has long been known that",
    "it is a fact that",
    "it has been found that",
    "it is well known that",
    "it may be said that",
    "it should be noted that",
    "it was evident that",
    'it was also noted that',
    "it has been identified that",
    "a sufficient amount of",
    "along the lins of",
    "at the present time",
    "at this point in time",
    "despite the fact that",
    "due to the fact the fact that",
    "during the time that",
    "for the reason that",
    "five consideration to",
    "happens to be",
    "has been proved to be",
    "imperative to note that",
    "in close proximity to",
    "in conclusion",
    "In the conclusion",
    "in the near future",
    "in the vicinity of",
    "in summary",
    "is in a position to",
    "it is interesting to note that",
    "in a manner that",
    "in a position to",
    "not with standing the fact that",
    "on the basis of",
    'based on the fact that',
    'it is often a case that',
    'have the ability to',
    'has the ability to',
    "prior to",
    "provided that",
    "reach a conclusion",
    "serves a function of being",
    "the question as to",
    "the reason is because",
    "to conclude",
    "to sum up",
    "to summarize",
    'until such time as',
    'on a daily basis',
    'on a weekly basis',
    'during the course of',
    'take under consideration',
    'of the opinion to',
    'to make reference to',
    'in the final analysis',
    'there is no doubt that',
    "with reference to",
    "with the exception that",
    "is able to",
    "was able to",
    'were able to',
    'has been able to',
    'have been able to',
    'considered as being',
    'considered to be',
    'so on and so forth'
  ]

var arrayLength = wordiness.length

  for (var i=0; i<arrayLength;i++) {
      var capital = wordiness[i][0].toUpperCase()+wordiness[i].slice(1,wordiness[i].length)
      wordiness.push(capital);
  }

export default wordiness;
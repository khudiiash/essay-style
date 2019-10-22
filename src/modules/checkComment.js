export default function checkComment(comment) {
    if (comment.includes("<")) {
      if (comment.includes("passive")) comment = "Avoid passive voice";
      if (comment.includes("simpler alternative")) {
        comment = "You could choose a better word for this context";
      }
      if (comment.includes("outdated"))
        comment =
          "The source is outdated; Use the most relevant information on the topic";
      if (comment.includes("weak")) comment = "Weak word";
      if (comment.includes("vague")) comment = "this might be vague";
      if (comment.includes("weasel")) comment = "Weasel word";
      if (comment.includes("wordy"))
        comment = "Avoid unnecessarily complex words";
    }
    if (comment.includes("<")) {
      comment = "Probably some mistake";
    }
    return comment;
  }
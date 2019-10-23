let weakWords = [
    "about", "also","absolutely","accordingly","anything","almost","etc.","as being","as to weather","at all times","at the end of the day","at the present time","big","little","care about","cease to exist","due to","easy","only","get","got","gotten","go on","I feel that","I believe that","in the event that","in the process of","on a regular basis","really","some of the","some", "sometimes","do something","something","things","things","somebody","someone","somewhat","maybe","probably","perhaps","I think","talk about","serious","kid","lady","which is","good","bad","majority of","like","among others",'literally','always',"never","amazing","a lot","just","stuff","very","Well,","went","actually","around","going","great","make","making", "quite","try","tried","trying","tries","kind of","possibly","sort of","a bit","all of a sudden","roughly","seem","eventually","interesting","began","it is right","it is wrong","make it easy","find it easy","makes it easy","made it easy","in that it","it is very important","it was very important","it is very important","it is important","important","so to say", "so to speak","even","too many", 'cannot be underestimated', "cannot be overestimated",
 ]


 var arrayLength = weakWords.length

 for (var i=0; i<arrayLength;i++) {
     var capital = weakWords[i].replace(weakWords[i].charAt(0),weakWords[i].charAt(0).toUpperCase())
     weakWords.push(capital);
 }



 export default weakWords;

 



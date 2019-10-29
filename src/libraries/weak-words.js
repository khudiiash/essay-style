let weakWords = [
    "also","absolutely","accordingly","anything","almost","etc.","as being","as to weather","at all times","at the end of the day","at the present time","little","cease to exist","get","got","gotten","go on","I feel that","I believe that","in the event that","in the process of","on a regular basis","really","some of the", "sometimes","do something","something","things","maybe","probably","perhaps","I think","talk about","all about","serious","good","bad",'literally','always',"never","amazing","awesome","just","stuff","very","Well,","went","actually","around","going","great","quite","kind of","possibly","sort of","a bit","all of a sudden","roughly","seem","eventually","interesting","began","it is right","it is wrong","make it easy","easily","find it easy","makes it easy","made it easy","it is very important","it was very important","it is very important","it is important","so to say", "so to speak","so","even","too many","sadly",'sad',"about","easy", 
 ]


 var arrayLength = weakWords.length

 for (var i=0; i<arrayLength;i++) {
     if (weakWords[i] !== 'also') {
        var capital = weakWords[i].replace(weakWords[i].charAt(0),weakWords[i].charAt(0).toUpperCase())
        weakWords.push(capital);
     }
    
 }



 export default weakWords;

 



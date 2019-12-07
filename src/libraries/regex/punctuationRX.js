    
let linkingWords = 'at the same time|nevertheless|however|nonetheless|consequently|undoubtedly|furthermore|in addition to this|to begin with|subsequently|besides|similarly|likewise|in the same manner|indeed|in fact|namely|accordingly|as a consequence|therefore|thus|hence|as a result|often|on the other hand|for example|for instance|firstly|secondly|moreover|as a matter of fact|in like manner|of course|in reality|after all|in this case|by all means|that is to say|surprisingly|on the whole|by and large|in either case|all in all|in short|in essence|in brief|altogether|as shown above|for the most part|finally|consequently|occasionally|presently|instantly|sooner or later|henceforth|generally speaking|all things considered|given these points|as has been noted|in a word|in the long run|in that case|for this reason|under those circumstances|accordingly|thereupon|forthwith|unfortunately'
   
   
export let punctuationRXglobal = new RegExp(`(?<!(?:\\,\\s|\\;\\s))\\b(?:${linkingWords})\\b(?!\\,)`, "gi")
export let punctuationRXinline = new RegExp(`^(?<!(?:\\,\\s|\\;\\s))\\b(?:${linkingWords})\\b(?!\\,)$`, "gi")
      


    



